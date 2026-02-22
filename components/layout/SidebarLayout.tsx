'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { User } from '@/lib/types'
import { LayoutDashboard, Plus, Settings, LogOut, Zap, AlertTriangle, BarChart3 } from 'lucide-react'
import { PLAN_LIMITS } from '@/lib/types'
import UpgradeModal from '@/components/ui/UpgradeModal'
import Logo from '@/components/ui/Logo'

interface Props {
    profile: User
    unreadAlertCount?: number
    avatarUrl?: string | null
    children: React.ReactNode
}

export default function SidebarLayout({ profile, unreadAlertCount = 0, avatarUrl, children }: Props) {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const supabase = createClient()
    const [showUpgrade, setShowUpgrade] = useState(false)

    // Automatically open upgrade modal if "?upgrade=true" is in the URL
    // (React's useEffect should be imported if not present, but it's imported at the top? Wait let me check if useEffect is imported.
    // I better replace the imports too)

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/')
    }

    const limit = PLAN_LIMITS[profile.plan]
    const used = profile.analyses_used_this_month
    const pct = Math.min(100, Math.round((used / limit) * 100))
    const isGrowth = profile.plan === 'growth'
    const isWarning = pct >= 70 && pct < 100
    const isDanger = pct >= 100

    const nav = [
        { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/analysis/new', icon: Plus, label: 'New Analysis' },
        { href: '/dashboard/reports', icon: BarChart3, label: 'Analyses' },
        ...(isGrowth ? [{ href: '/dashboard/insights', icon: Zap, label: 'Intelligence Center' }] : [])
    ]

    return (
        <div className="flex h-screen overflow-hidden relative" style={{ background: '#080808' }}>
            {/* Sidebar */}
            <aside className="w-60 flex flex-col border-r flex-shrink-0 relative z-20" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255,255,255,0.05)' }}>
                {/* Logo */}
                <div className="h-16 px-5 flex items-center border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <Logo size="sm" />
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 space-y-0.5">
                    {nav.map(({ href, icon: Icon, label }) => {
                        const active = pathname === href || (href !== '/dashboard' && href !== '/account' && pathname.startsWith(href))
                        return (
                            <Link key={href} href={href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-md transition-all text-[11px] font-semibold relative"
                                style={{
                                    background: active ? 'rgba(99,102,241,0.12)' : 'transparent',
                                    color: active ? '#a5b4fc' : '#6b7280',
                                }}>
                                <Icon className="w-4 h-4" />
                                {label}
                                {/* Notification dot for dashboard when alerts exist */}
                                {href === '/dashboard' && unreadAlertCount > 0 && (
                                    <span className="ml-auto flex h-4 min-w-[16px] items-center justify-center rounded-full text-[9px] font-bold text-white px-1"
                                        style={{ background: '#ef4444' }}>
                                        {unreadAlertCount > 9 ? '9+' : unreadAlertCount}
                                    </span>
                                )}
                            </Link>
                        )
                    })}

                </nav>

                {/* Usage Meter */}
                <div className="px-3 pb-3">
                    <div className="rounded-lg p-3.5 space-y-2.5"
                        style={{
                            background: isWarning ? 'rgba(234,179,8,0.04)' : isDanger ? 'rgba(239,68,68,0.04)' : 'rgba(255,255,255,0.02)',
                            border: `1px solid ${isWarning ? 'rgba(234,179,8,0.15)' : isDanger ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.06)'}`,
                        }}>
                        <div className="flex justify-between items-center">
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Usage</span>
                            <span className="text-[9px] font-bold"
                                style={{ color: isDanger ? '#f87171' : isWarning ? '#fbbf24' : '#94a3b8' }}>
                                {used}/{limit}
                            </span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#1e1e22' }}>
                            <div className="h-full rounded-full transition-all duration-500"
                                style={{
                                    width: `${pct}%`,
                                    background: isDanger ? '#ef4444' : isWarning ? '#eab308' : '#6366f1',
                                }} />
                        </div>
                        {isWarning && (
                            <div className="flex items-center gap-1.5">
                                <AlertTriangle className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                                <p className="text-[9px] text-yellow-400 font-medium">
                                    {pct}% used — upgrade soon
                                </p>
                            </div>
                        )}
                        {isDanger && (
                            <p className="text-[9px] text-red-400 font-bold">Limit reached</p>
                        )}
                        {!isGrowth && (
                            <button
                                onClick={() => setShowUpgrade(true)}
                                className="flex items-center gap-1.5 w-full px-2.5 py-1.5 rounded text-[9px] font-bold uppercase tracking-wider transition-all hover:scale-[1.02]"
                                style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)', color: '#818cf8' }}>
                                <Zap className="w-3 h-3" />
                                Upgrade to Growth
                            </button>
                        )}
                    </div>
                </div>

                {/* Account & User footer */}
                <div className="p-3 border-t space-y-2" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <Link href="/account"
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all text-[11px] font-semibold relative ${pathname === '/account' ? 'text-indigo-300 bg-indigo-500/10' : 'text-slate-500 hover:text-slate-300'}`}
                        style={{
                            background: pathname === '/account' ? 'rgba(99,102,241,0.12)' : 'transparent',
                            color: pathname === '/account' ? '#a5b4fc' : '#6b7280',
                        }}>
                        <Settings className="w-4 h-4" />
                        Account
                    </Link>

                    <div className="flex items-center gap-2.5 px-3 py-2">
                        {avatarUrl ? (
                            <img src={avatarUrl} alt="Avatar" className="w-7 h-7 rounded-full object-cover flex-shrink-0 border" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                        ) : (
                            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ background: '#6366f1' }}>
                                <span className="text-white text-[10px] font-bold">
                                    {(profile.full_name || profile.email || 'U')[0].toUpperCase()}
                                </span>
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-semibold text-white truncate">{profile.full_name || 'User'}</p>
                            <p className="text-[9px] text-slate-600 font-medium truncate">
                                {profile.plan === 'growth' ? '✦ Growth Plan' : 'Free Plan'}
                            </p>
                        </div>
                        <button onClick={handleSignOut} className="text-slate-600 hover:text-white transition-colors p-1 rounded flex-shrink-0">
                            <LogOut className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main area */}
            <main className="flex-1 overflow-y-auto">{children}</main>

            {/* Upgrade Modal */}
            {showUpgrade && (
                <UpgradeModal
                    onClose={() => setShowUpgrade(false)}
                    currentPlan={profile.plan}
                    used={used}
                    limit={limit}
                />
            )}
        </div>
    )
}
