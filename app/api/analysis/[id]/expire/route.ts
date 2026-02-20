import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const admin = createAdminClient()

    // Only expire if still queued — idempotent
    const { data: analysis } = await admin
        .from('analyses')
        .select('status')
        .eq('id', id)
        .single()

    if (!analysis || analysis.status !== 'queued') {
        return NextResponse.json({ ok: true, skipped: true })
    }

    const { error } = await admin
        .from('analyses')
        .update({
            status: 'failed',
            error_message: 'Processing timed out. Please retry.',
        })
        .eq('id', id)
        .eq('status', 'queued') // double-guard race condition

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
}
