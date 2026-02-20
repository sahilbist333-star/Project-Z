import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(request: NextRequest) {
    const supabase = await createClient()
    const { data: userData, error: userError } = await supabase.auth.getUser()

    if (userError || !userData?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const admin = createAdminClient()
    const { data: profile } = await admin
        .from('users')
        .select('plan, analyses_used_this_month')
        .eq('id', userData.user.id)
        .single()

    if (!profile) {
        return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    const limit = profile.plan === 'growth' || profile.plan === 'enterprise' ? 50 : 3
    const used = profile.analyses_used_this_month || 0

    return NextResponse.json({ used, limit, plan: profile.plan })
}
