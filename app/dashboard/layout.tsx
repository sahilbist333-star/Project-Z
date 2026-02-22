import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SidebarLayout from '@/components/layout/SidebarLayout'
import { daysSince } from '@/lib/utils'
import Link from 'next/link'
import NotificationDropdown from '@/components/dashboard/NotificationDropdown'

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

    const avatarTimestamp = user.user_metadata?.avatar_version
    const avatarUrl = user.user_metadata?.has_avatar
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${user.id}.png?t=${avatarTimestamp}`
        : null

    return (
        <SidebarLayout profile={profile} unreadAlertCount={unreadAlertCount ?? 0} avatarUrl={avatarUrl}>
            {/* Top Header */}
            <div className="sticky top-0 z-30 flex items-center justify-between px-8 h-16 border-b backdrop-blur-xl"
                style={{ background: 'rgba(8,8,8,0.7)', borderColor: 'rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Workspace</span>
                    <span className="text-slate-700">/</span>
                    <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">
                        {profile.plan === 'growth' ? '✦ Growth' : 'Free Tier'}
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    {/* Notification Dropdown */}
                    <NotificationDropdown unreadCount={unreadAlertCount ?? 0} userId={user.id} />

                    <div className="h-8 w-px bg-white/5 mx-1" />

                    {/* User Profile Hook */}
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-black text-white uppercase tracking-tight leading-none">
                                {profile.full_name || 'User'}
                            </p>
                            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1 italic">
                                {profile.plan}
                            </p>
                        </div>
                        {avatarUrl ? (
                            <img src={avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full border border-white/10" />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white uppercase tracking-tight">
                                {(profile.full_name || profile.email || 'U')[0]}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="relative">
                {children}
            </div>
        </SidebarLayout>
    )
}
