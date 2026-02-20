import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SidebarLayout from '@/components/layout/SidebarLayout'
import { daysSince } from '@/lib/utils'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/sign-in')

    const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

    if (!profile) redirect('/sign-in')

    // Redirect new users to onboarding if not yet completed
    if (!profile.onboarding_completed) redirect('/onboarding')

    // Free plan reset check
    if (profile.plan === 'free' && daysSince(profile.last_usage_reset_at) >= 30) {
        const { createAdminClient } = await import('@/lib/supabase/admin')
        const admin = createAdminClient()
        await admin.from('users')
            .update({ analyses_used_this_month: 0, last_usage_reset_at: new Date().toISOString() })
            .eq('id', user.id)
        profile.analyses_used_this_month = 0
    }

    // Fetch unread alert count for notification dot
    const { count: unreadAlertCount } = await supabase
        .from('insight_alerts')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('seen', false)

    return <SidebarLayout profile={profile} unreadAlertCount={unreadAlertCount ?? 0}>{children}</SidebarLayout>
}
