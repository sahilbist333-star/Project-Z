import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const admin = createAdminClient()

    const { data: analysis } = await admin
        .from('analyses')
        .select('id, status, error_message, created_at, completed_at, total_entries, is_sample, change_summary, analysis_period_start, analysis_period_end')
        .eq('id', id)
        .single()

    if (!analysis) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    // Stale-queued detection: if queued >2 minutes, auto-expire
    if (analysis.status === 'queued') {
        const ageMins = (Date.now() - new Date(analysis.created_at).getTime()) / 60000
        if (ageMins > 2) {
            await admin.from('analyses').update({
                status: 'failed',
                error_message: 'Processing timed out. Please retry.',
            }).eq('id', id)
            return NextResponse.json({ ...analysis, status: 'failed', error_message: 'Processing timed out. Please retry.' })
        }
    }

    return NextResponse.json(analysis)
}
