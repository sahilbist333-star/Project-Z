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

    // 2. Fetch stats
    try {
        const [
            { count: totalUsers },
            { count: activeSubscriptions },
            { count: totalAnalyses },
            { count: totalFeedback },
            { count: totalSubscribers }
        ] = await Promise.all([
            supabase.from('users').select('*', { count: 'exact', head: true }),
            supabase.from('users').select('*', { count: 'exact', head: true }).neq('subscription_status', 'inactive'),
            supabase.from('analyses').select('*', { count: 'exact', head: true }),
            supabase.from('feedback').select('*', { count: 'exact', head: true }),
            supabase.from('newsletter_subscriptions').select('*', { count: 'exact', head: true })
        ])

        // Get some recent activity
        const { data: recentAnalyses } = await supabase
            .from('analyses')
            .select('id, title, status, created_at, user_id, users(email)')
            .order('created_at', { ascending: false })
            .limit(5)

        const { data: recentFeedback } = await supabase
            .from('feedback')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5)

        return NextResponse.json({
            stats: {
                totalUsers: totalUsers || 0,
                activeSubscriptions: activeSubscriptions || 0,
                totalAnalyses: totalAnalyses || 0,
                totalFeedback: totalFeedback || 0,
                totalSubscribers: totalSubscribers || 0
            },
            recentAnalyses,
            recentFeedback
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
