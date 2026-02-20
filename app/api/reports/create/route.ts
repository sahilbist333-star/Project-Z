import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { nanoid } from 'nanoid'

export async function POST(request: NextRequest) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { analysis_id } = await request.json()
    if (!analysis_id) return NextResponse.json({ error: 'analysis_id required' }, { status: 400 })

    const admin = createAdminClient()

    // Verify ownership
    const { data: analysis } = await admin
        .from('analyses')
        .select('id, status, user_id')
        .eq('id', analysis_id)
        .eq('user_id', user.id)
        .single()

    if (!analysis) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    if (analysis.status !== 'completed') {
        return NextResponse.json({ error: 'Analysis not completed yet' }, { status: 400 })
    }

    // Check if report already exists
    const { data: existing } = await admin
        .from('reports')
        .select('public_slug')
        .eq('analysis_id', analysis_id)
        .single()

    if (existing) {
        return NextResponse.json({ slug: existing.public_slug })
    }

    // Create new report
    const slug = nanoid(12)
    const { error } = await admin.from('reports').insert({
        analysis_id,
        public_slug: slug,
    })

    if (error) return NextResponse.json({ error: 'Failed to create report' }, { status: 500 })

    return NextResponse.json({ slug })
}
