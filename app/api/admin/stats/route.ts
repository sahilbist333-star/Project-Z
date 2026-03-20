import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
    const supabase = await createClient()

    // 1. Check if user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', user.id)
        .single()

    if (!profile?.is_admin) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // 2. Fetch Detailed Data
    try {
        const [
            { data: allUsers, count: totalUsers },
            { data: allAnalyses, count: totalAnalyses },
            { data: allFeedback, count: totalFeedback },
            { data: allSubscribers, count: totalSubscribers },
            { count: activeSubscriptions }
        ] = await Promise.all([
            supabase.from('users').select('*', { count: 'exact' }).order('created_at', { ascending: false }),
            supabase.from('analyses').select('*, users(email)').order('created_at', { ascending: false }),
            supabase.from('feedback').select('*').order('created_at', { ascending: false }),
            supabase.from('newsletter_subscriptions').select('*').order('created_at', { ascending: false }),
            supabase.from('users').select('*', { count: 'exact', head: true }).neq('subscription_status', 'inactive')
        ])

        return NextResponse.json({
            stats: {
                totalUsers: totalUsers || 0,
                activeSubscriptions: activeSubscriptions || 0,
                totalAnalyses: totalAnalyses || 0,
                totalFeedback: totalFeedback || 0,
                totalSubscribers: totalSubscribers || 0
            },
            users: allUsers || [],
            analyses: allAnalyses || [],
            feedback: allFeedback || [],
            subscribers: allSubscribers || []
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
