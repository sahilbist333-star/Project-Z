'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Zap, TrendingUp, Users, MessageSquare, ArrowLeft, Loader2, BarChart3, Target, Activity, Sparkles, ChevronRight } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion'
import Link from 'next/link'

export default function GrowthInsightsPage() {
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState<any>(null)
    const supabase = createClient()

    useEffect(() => {
        const fetchStats = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            // Simulated real-time intelligence data
            setStats({
                sentiment: { score: 92, trend: '+14%', status: 'Critical' },
                velocity: { score: 88, trend: '3.2x', status: 'Rising' },
                uniqueness: { score: 96, trend: '12 new', status: 'Emerging' }
            })
            setLoading(false)
        }
        fetchStats()
    }, [])

    if (loading) {
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-4" />
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Scanning Signal Waves...</p>
            </div>
        )
    }

    return (
        <FadeIn className="p-8 max-w-6xl mx-auto mb-20 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Insights</h1>
                    <p className="text-slate-500 text-sm mt-2 font-medium">Advanced cohort analysis and real-time signal tracking.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                    <Activity className="w-3.5 h-3.5" /> Live Signal Feed
                </div>
            </div>

            <StaggerContainer className="grid lg:grid-cols-3 gap-6">
                {/* Sentiment Trend Card */}
                <StaggerItem className="lg:col-span-2 p-8 rounded-[2.5rem] bg-white/2 border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-red-500/10 transition-colors" />
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-red-400/10 flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-red-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white uppercase tracking-tight">Sentiment Volatility</h3>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] font-black text-red-400 uppercase tracking-widest bg-red-400/10 px-3 py-1 rounded-full">High Sensitivity</span>
                            </div>
                        </div>

                        {/* Simulated Chart Placeholder */}
                        <div className="h-48 w-full flex items-end gap-2 mb-8">
                            {[40, 60, 45, 80, 55, 90, 75].map((h, i) => (
                                <div key={i} className="flex-1 bg-white/5 rounded-t-lg relative group/bar overflow-hidden">
                                    <div className="absolute bottom-0 left-0 w-full bg-red-400/20 transition-all duration-1000 group-hover/bar:bg-red-400/40" style={{ height: `${h}%` }} />
                                    {i === 5 && <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_10px_#f87171]" />}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="p-4 rounded-2xl bg-white/2 border border-white/5">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Weekly Delta</p>
                                <p className="text-lg font-black text-white">{stats.sentiment.trend}</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/2 border border-white/5">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Confidence</p>
                                <p className="text-lg font-black text-white">{stats.sentiment.score}%</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/2 border border-white/5">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</p>
                                <p className="text-lg font-black text-red-400">{stats.sentiment.status}</p>
                            </div>
                        </div>
                    </div>
                </StaggerItem>

                {/* Signal Confidence */}
                <StaggerItem className="p-8 rounded-[2.5rem] bg-indigo-600 shadow-2xl shadow-indigo-500/20 relative overflow-hidden group">
                    <Sparkles className="absolute -top-10 -right-10 w-40 h-40 text-white/10 rotate-12" />
                    <div className="relative z-10 h-full flex flex-col">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-12">
                            <Target className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-4">Signal Precision</h3>
                        <p className="text-indigo-100 text-sm font-medium mb-12">Tracking consistency of "Enterprise" cohort requests across all datasets.</p>

                        <div className="mt-auto">
                            <div className="flex justify-between items-end mb-4">
                                <span className="text-6xl font-black text-white tracking-tighter">98.4</span>
                                <span className="text-xs font-bold text-indigo-200 uppercase tracking-widest mb-2">/ 100</span>
                            </div>
                            <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                                <div className="h-full bg-white w-[98.4%] shadow-[0_0_20px_white]" />
                            </div>
                        </div>
                    </div>
                </StaggerItem>

                {/* Sub-cohort Drilldown */}
                <StaggerItem className="lg:col-span-3 p-8 rounded-[2.5rem] bg-white/2 border border-white/5 relative overflow-hidden group">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[9px] font-black uppercase tracking-widest mb-6">
                                <Users className="w-3 h-3" /> Cohort Intelligence
                            </div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">Emerging Segment Velocity</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">Identify which user segments are experiencing the most friction before they churn.</p>

                            <div className="space-y-4">
                                {[
                                    { label: 'Enterprise Admins', val: '72%', color: 'from-indigo-400 to-indigo-600' },
                                    { label: 'Free Tier Explorers', val: '24%', color: 'from-purple-400 to-purple-600' },
                                    { label: 'Early Adopters', val: '48%', color: 'from-teal-400 to-teal-600' }
                                ].map(seg => (
                                    <div key={seg.label} className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                            <span>{seg.label}</span>
                                            <span className="text-white">{seg.val}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className={`h-full bg-gradient-to-r ${seg.color} transition-all duration-1000 shadow-[0_0_10px_rgba(99,102,241,0.3)]`} style={{ width: seg.val }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="hidden lg:block w-px h-64 bg-white/5" />

                        <div className="flex-1 p-8 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 text-center relative">
                            <Zap className="w-12 h-12 text-indigo-500 mx-auto mb-6 opacity-20" />
                            <h4 className="text-white font-bold mb-2">Automated Evidence Logic</h4>
                            <p className="text-xs text-slate-500 leading-relaxed mb-6">Our AI is currently prioritizing 1,240 verbatim quotes based on these cohort insights.</p>
                            <Link href="/dashboard/reports" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 hover:text-indigo-300 transition-colors">
                                Review Verbatim Roadmap <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                </StaggerItem>
            </StaggerContainer>
        </FadeIn>
    )
}
