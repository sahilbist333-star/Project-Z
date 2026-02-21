import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AccountClient from '@/components/account/AccountClient'
import { format, parseISO } from 'date-fns'
import { PLAN_LIMITS } from '@/lib/types'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion'

export default async function AccountPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/sign-in')

    const { data: profile } = await supabase.from('users').select('*').eq('id', user.id).single()
    if (!profile) redirect('/sign-in')

    const avatarTimestamp = user.user_metadata?.avatar_version
    const avatarUrl = user.user_metadata?.has_avatar
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${user.id}.png?t=${avatarTimestamp}`
        : null

    const isGrowth = profile.plan === 'growth'
    const limit = PLAN_LIMITS[profile.plan as 'free' | 'growth']
    const used = profile.analyses_used_this_month
    const pct = Math.min(100, Math.round((used / limit) * 100))
    const expiryStr = profile.plan_expiry
        ? format(parseISO(profile.plan_expiry), 'MMMM d, yyyy')
        : null

    return (
        <FadeIn className="p-8 max-w-3xl relative z-10">
            <div className="mb-8">
                <h1 className="font-display text-3xl font-bold text-white tracking-tight">Account Settings</h1>
                <p className="text-slate-400 text-sm mt-1.5">Manage your profile and subscription.</p>
            </div>

            <StaggerContainer className="space-y-6">
                {/* Profile card */}
                <StaggerItem className="rounded-2xl p-6" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-5">Profile</h2>
                    <div className="flex items-center gap-4 mb-6">
                        {avatarUrl ? (
                            <img src={avatarUrl} alt="Avatar" className="w-14 h-14 rounded-full object-cover border" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                        ) : (
                            <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white"
                                style={{ background: '#6366f1' }}>
                                {(profile.full_name || profile.email || 'U')[0].toUpperCase()}
                            </div>
                        )}
                        <div>
                            <p className="text-white font-semibold">{profile.full_name || 'No name set'}</p>
                            <p className="text-slate-400 text-sm">{profile.email}</p>
                        </div>
                    </div>
                    <AccountClient profile={profile} defaultAvatarUrl={avatarUrl} />
                </StaggerItem>

                {/* Subscription card */}
                <StaggerItem className="rounded-2xl p-6" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-5">Subscription</h2>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-white font-semibold">{isGrowth ? 'Growth Plan' : 'Free (Starter) Plan'}</p>
                            {isGrowth && expiryStr && (
                                <p className="text-slate-400 text-sm mt-0.5">Renews {expiryStr}</p>
                            )}
                        </div>
                        <span className="text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider"
                            style={{
                                background: isGrowth ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.05)',
                                color: isGrowth ? '#818cf8' : '#6b7280',
                            }}>
                            {isGrowth ? 'Active' : 'Free'}
                        </span>
                    </div>

                    <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-400">Analyses this month</span>
                            <span className="text-white font-medium">{used} / {limit}</span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ background: '#1e1e22' }}>
                            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct >= 90 ? '#ef4444' : '#6366f1' }} />
                        </div>
                    </div>

                    {!isGrowth && (
                        <a href="?upgrade=true"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-white font-bold text-[11px] uppercase tracking-widest transition-all hover:scale-[1.02] cursor-pointer border-none bg-gradient-to-r from-indigo-400 to-purple-400 shadow-[0_0_24px_rgba(192,132,252,0.4)]">
                            Upgrade to Growth →
                        </a>
                    )}
                </StaggerItem>

                {/* Danger zone */}
                <StaggerItem className="rounded-2xl p-6" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(239,68,68,0.15)' }}>
                    <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#ef4444' }}>Danger Zone</h2>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white text-sm font-medium">Sign out of Zointly</p>
                            <p className="text-slate-500 text-xs mt-0.5">You will be redirected to the home page.</p>
                        </div>
                        <AccountClient profile={profile} showSignOut />
                    </div>
                </StaggerItem>
            </StaggerContainer>
        </FadeIn>
    )
}
