import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Plus, Clock, CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import AlertPanel from '@/components/dashboard/AlertPanel'
import MonthlyInsightCard from '@/components/dashboard/MonthlyInsightCard'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion'

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/sign-in')

    const admin = createAdminClient()

    const [{ data: analyses }, { data: alerts }, { data: profile }] = await Promise.all([
        admin.from('analyses')
            .select('id, title, status, created_at, completed_at, total_entries, is_sample, error_message')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(20),
        admin.from('insight_alerts')
            .select('id, alert_type, message, seen, created_at, analysis_id')
            .eq('user_id', user.id)
            .eq('seen', false)
            .order('created_at', { ascending: false })
            .limit(5),
        admin.from('users')
            .select('analyses_used_this_month, plan, billing_interval, last_usage_reset_at')
            .eq('id', user.id)
            .single(),
    ])

    const unreadAlerts = alerts || []
    const analysesList = analyses || []

    // ── Rolling usage reset check (Free & Annual Growth) ──────────
    if (profile && (profile.plan === 'free' || (profile.plan === 'growth' && profile.billing_interval === 'annual'))) {
        const resetAt = new Date(profile.last_usage_reset_at)
        const daysSinceReset = Math.floor((Date.now() - resetAt.getTime()) / (1000 * 60 * 60 * 24))
        const cycles = Math.floor(daysSinceReset / 30)

        if (cycles > 0) {
            resetAt.setDate(resetAt.getDate() + (cycles * 30))
            await admin.from('users')
                .update({
                    analyses_used_this_month: 0,
                    last_usage_reset_at: resetAt.toISOString()
                })
                .eq('id', user.id)
            profile.analyses_used_this_month = 0
        }
    }

    const statusIcon = (status: string) => {
        if (status === 'completed') return <CheckCircle2 className="w-4 h-4 text-green-400" />
        if (status === 'failed') return <XCircle className="w-4 h-4 text-red-400" />
        if (status === 'processing') return <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
        return <Clock className="w-4 h-4 text-slate-500" />
    }

    // Most recent completed analysis for Monthly Insight Card
    const latestCompleted = analysesList.find(a => a.status === 'completed')

    return (
        <FadeIn className="p-8 max-w-5xl relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-display text-3xl font-bold text-white tracking-tight">Dashboard</h1>
                    <p className="text-slate-400 text-sm mt-1.5">Analyze feedback, discover opportunities.</p>
                </div>
                <Link href="/analysis/new"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-bold text-[10px] uppercase tracking-widest transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                    style={{ background: '#6366f1' }}>
                    <Plus className="w-4 h-4" />
                    New Analysis
                </Link>
            </div>

            {/* Monthly Insight Card */}
            {latestCompleted && (
                <MonthlyInsightCard
                    analysis={latestCompleted}
                    used={profile?.analyses_used_this_month ?? 0}
                    plan={profile?.plan ?? 'free'}
                />
            )}

            {/* Insight Alerts Panel */}
            {unreadAlerts.length > 0 && (
                <AlertPanel alerts={unreadAlerts} />
            )}

            {/* Analyses List */}
            {analysesList.length === 0 ? (
                <div className="text-center py-24 rounded-3xl"
                    style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
                    <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6"
                        style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
                        <Plus className="w-8 h-8 text-indigo-400" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-2">No analyses yet</h3>
                    <p className="text-slate-400 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
                        Paste customer feedback to generate your first set of prioritized product opportunities.
                    </p>
                    <Link href="/analysis/new"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-[10px] uppercase tracking-widest transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                        style={{ background: '#6366f1' }}>
                        <Plus className="w-4 h-4" /> Start Analysis
                    </Link>
                </div>
            ) : (
                <StaggerContainer className="space-y-4">
                    {analysesList.map((analysis) => (
                        <StaggerItem key={analysis.id}>
                            <Link href={`/analysis/${analysis.id}`}
                                className="block rounded-2xl p-6 transition-all hover:border-indigo-500/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.05)] hover:-translate-y-0.5"
                                style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3 min-w-0">
                                        {statusIcon(analysis.status)}
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-white truncate">
                                                {analysis.is_sample ? '📋 Sample Analysis' : (analysis.title || 'Feedback Analysis')}
                                            </p>
                                            <p className="text-xs text-slate-500 mt-0.5">
                                                {format(parseISO(analysis.created_at), 'MMM d, yyyy · h:mm a')}
                                                {analysis.total_entries > 0 && ` · ${analysis.total_entries} entries`}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest flex-shrink-0 px-2 py-1 rounded"
                                        style={{
                                            background: analysis.status === 'completed' ? 'rgba(34,197,94,0.1)' :
                                                analysis.status === 'failed' ? 'rgba(239,68,68,0.1)' :
                                                    analysis.status === 'processing' ? 'rgba(99,102,241,0.1)' : 'rgba(107,114,128,0.1)',
                                            color: analysis.status === 'completed' ? '#4ade80' :
                                                analysis.status === 'failed' ? '#f87171' :
                                                    analysis.status === 'processing' ? '#a5b4fc' : '#6b7280',
                                        }}>
                                        {analysis.status}
                                    </span>
                                </div>
                                {analysis.status === 'failed' && (
                                    <p className="mt-3 text-xs text-red-400 bg-red-900/10 border border-red-900/20 rounded-md px-4 py-2">
                                        {analysis.error_message || 'Processing failed.'}
                                    </p>
                                )}
                            </Link>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            )}
        </FadeIn>
    )
}
