'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Plus, Clock, CheckCircle2, XCircle, Loader2, Sparkles, ArrowRight, RefreshCw, BarChart3 } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import AlertPanel from '@/components/dashboard/AlertPanel'
import MonthlyInsightCard from '@/components/dashboard/MonthlyInsightCard'
import GrowthInsights from '@/components/dashboard/GrowthInsights'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion'
import { createClient } from '@/lib/supabase/client'
import Logo from '@/components/ui/Logo'

export default function DashboardPage() {
    const searchParams = useSearchParams()
    const success = searchParams.get('success')
    const [loading, setLoading] = useState(true)
    const [syncing, setSyncing] = useState(false)
    const [data, setData] = useState<any>(null)
    const supabase = createClient()

    const fetchData = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const [{ data: analyses }, { data: alerts }, { data: profile }] = await Promise.all([
            supabase.from('analyses')
                .select('id, title, status, created_at, completed_at, total_entries, is_sample, error_message')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(20),
            supabase.from('insight_alerts')
                .select('id, alert_type, message, seen, created_at, analysis_id')
                .eq('user_id', user.id)
                .eq('seen', false)
                .order('created_at', { ascending: false })
                .limit(5),
            supabase.from('users')
                .select('analyses_used_this_month, plan, billing_interval, last_usage_reset_at, subscription_id')
                .eq('id', user.id)
                .single(),
        ])

        setData({ analyses, alerts, profile, user })
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSync = async () => {
        if (!data?.profile?.subscription_id) return
        setSyncing(true)
        try {
            const res = await fetch('/api/razorpay/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subscriptionId: data.profile.subscription_id })
            })
            if (res.ok) {
                await fetchData()
            }
        } catch (err) {
            console.error('Sync failed:', err)
        } finally {
            setSyncing(false)
        }
    }

    if (loading) {
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center gap-6">
                <Logo link={false} size="lg" />
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Igniting workspace...</p>
                </div>
            </div>
        )
    }

    const { analyses, alerts, profile } = data
    const analysesList = (analyses || []).filter((a: any) => !a.is_sample)
    const unreadAlerts = alerts || []
    const realAnalysesCount = analysesList.length
    const latestCompleted = analysesList.find((a: any) => a.status === 'completed')
    const isGrowth = profile?.plan === 'growth'

    const statusIcon = (status: string) => {
        if (status === 'completed') return <CheckCircle2 className="w-4 h-4 text-green-400" />
        if (status === 'failed') return <XCircle className="w-4 h-4 text-red-400" />
        if (status === 'processing') return <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
        return <Clock className="w-4 h-4 text-slate-500" />
    }

    return (
        <div className="p-8 max-w-6xl mx-auto relative z-10 pb-20 min-h-screen">
            {/* Background Glows - Simplified for performance */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full bg-indigo-500/[0.02] blur-[150px] rounded-full pointer-events-none z-0" />

            {/* Success Banner */}
            {success === '1' && (
                <FadeIn className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-white/10 backdrop-blur-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
                    <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-black text-white uppercase tracking-tight">Welcome to Growth!</h2>
                                <p className="text-xs text-indigo-300 font-medium mt-0.5 tracking-wide">Your limits have been upgraded and premium insights are now active.</p>
                            </div>
                        </div>
                        {profile?.plan !== 'growth' && (
                            <button
                                onClick={handleSync}
                                disabled={syncing}
                                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl disabled:opacity-50"
                            >
                                {syncing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                                {syncing ? 'Syncing...' : 'Sync Account Status'}
                            </button>
                        )}
                    </div>
                </FadeIn>
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h1 className="font-display text-4xl font-black text-white tracking-tight uppercase not-italic">
                        Dashboard
                    </h1>
                    <p className="text-slate-500 text-sm mt-2 font-medium">
                        Welcome back. You&apos;ve analyzed <span className="text-white">{realAnalysesCount} datasets</span> to date.
                    </p>
                </div>
                <Link href="/analysis/new"
                    className="group flex items-center gap-3 px-8 py-3.5 rounded-full text-white font-black text-[11px] uppercase tracking-[0.15em] transition-all hover:scale-[1.02] shadow-[0_0_30px_rgba(99,102,241,0.3)] bg-gradient-to-r from-indigo-500 to-indigo-600">
                    <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                    New Analysis
                    <ArrowRight className="w-4 h-4 ml-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-12">
                    {/* Insights Section */}
                    <div className="space-y-8">
                        {isGrowth ? (
                            <GrowthInsights />
                        ) : (
                            <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 text-center relative overflow-hidden group">
                                <Sparkles className="absolute -top-10 -right-10 w-40 h-40 text-indigo-500/10 rotate-12 group-hover:text-indigo-500/20 transition-all" />
                                <h3 className="text-lg font-bold text-white mb-2">Unlock Growth Insights</h3>
                                <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">
                                    Get sub-cohort analysis, dark signals, and prioritized verbatim evidence logic.
                                </p>
                                <Link href="/pricing" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors">
                                    Explore Premium Features <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        )}

                        {latestCompleted && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <BarChart3 className="w-5 h-5 text-slate-400" />
                                    <h2 className="text-lg font-bold text-white tracking-tight">Monthly Performance</h2>
                                </div>
                                <MonthlyInsightCard
                                    analysis={latestCompleted}
                                    used={profile?.analyses_used_this_month ?? 0}
                                    plan={profile?.plan ?? 'free'}
                                />
                            </div>
                        )}
                    </div>

                    {/* Analyses List */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-white tracking-tight">Recent Analyses</h2>
                            <Link href="/dashboard/analyses" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors">
                                View History
                            </Link>
                        </div>

                        {analysesList.length === 0 ? (
                            <div className="text-center py-24 rounded-[3rem] bg-indigo-500/5 border border-indigo-500/10 backdrop-blur-md relative overflow-hidden group">
                                <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="w-20 h-20 mx-auto rounded-[2.5rem] flex items-center justify-center mb-8 bg-indigo-500/10 border border-indigo-500/20 relative z-10 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                                    <Sparkles className="w-8 h-8 text-indigo-400" />
                                </div>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-3 relative z-10">Ignite Your Intelligence</h3>
                                <p className="text-slate-500 text-sm mb-10 max-w-xs mx-auto font-medium relative z-10">
                                    Transform your raw feedback into actionable product strategies in under 60 seconds.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                                    <Link href="/analysis/new" className="px-10 py-4 rounded-full bg-indigo-500 text-white font-black text-[11px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-indigo-500/20">
                                        Start Your First Analysis
                                    </Link>
                                    <button onClick={() => fetchData()} className="px-10 py-4 rounded-full bg-white/5 text-slate-400 font-black text-[11px] uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all">
                                        Refresh Data
                                    </button>
                                </div>
                                <p className="text-[10px] text-slate-700 font-bold uppercase tracking-[0.2em] mt-10 relative z-10">
                                    Tip: Try uploading a CSV for faster bulk analysis
                                </p>
                            </div>
                        ) : (
                            <StaggerContainer className="grid sm:grid-cols-2 gap-4">
                                {analysesList.map((analysis: any) => (
                                    <StaggerItem key={analysis.id}>
                                        <Link href={`/analysis/${analysis.id}`}
                                            className="block rounded-3xl p-6 transition-all hover:border-indigo-500/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1 bg-white/2 border border-white/5 backdrop-blur-lg">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                                                    {statusIcon(analysis.status)}
                                                </div>
                                                <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                                                    style={{
                                                        background: analysis.status === 'completed' ? 'rgba(34,197,94,0.1)' :
                                                            analysis.status === 'failed' ? 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.05)',
                                                        color: analysis.status === 'completed' ? '#4ade80' :
                                                            analysis.status === 'failed' ? '#f87171' : '#94a3b8',
                                                    }}>
                                                    {analysis.status}
                                                </span>
                                            </div>
                                            <h3 className="text-sm font-bold text-white truncate mb-1">
                                                {analysis.is_sample ? '📋 Sample Analysis' : (analysis.title || 'Feedback Analysis')}
                                            </h3>
                                            <p className="text-[10px] text-slate-500 font-medium tracking-wide">
                                                {format(parseISO(analysis.created_at), 'MMM d, yyyy · h:mm a')}
                                            </p>
                                        </Link>
                                    </StaggerItem>
                                ))}
                            </StaggerContainer>
                        )}
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Insight Alerts Panel */}
                    <div className="sticky top-24">
                        <div className="flex items-center gap-2 mb-6">
                            <Sparkles className="w-5 h-5 text-indigo-400" />
                            <h2 className="text-lg font-bold text-white tracking-tight">Signal Alerts</h2>
                        </div>
                        {unreadAlerts.length > 0 ? (
                            <AlertPanel alerts={unreadAlerts} />
                        ) : (
                            <div className="p-10 rounded-[3rem] bg-white/2 border border-white/5 text-center">
                                <div className="w-12 h-12 mx-auto rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                                    <CheckCircle2 className="w-6 h-6 text-slate-600" />
                                </div>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">All Clear</p>
                                <p className="text-xs text-slate-600 font-medium max-w-[120px] mx-auto">No new signal anomalies detected.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
