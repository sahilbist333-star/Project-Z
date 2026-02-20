import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { alert_id } = await req.json()
    if (!alert_id) return NextResponse.json({ error: 'alert_id required' }, { status: 400 })

    // RLS ensures user can only update their own alerts
    const { error } = await supabase
        .from('insight_alerts')
        .update({ seen: true })
        .eq('id', alert_id)
        .eq('user_id', user.id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ ok: true })
}
