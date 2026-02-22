'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Share2, FileText, CheckCircle2, AlertTriangle, Loader2, Sparkles, ChevronRight, BarChart3, Download, ArrowLeft, MoreVertical, Zap, MessageSquare } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import ShareModal from '@/components/analysis/ShareModal'

export default function AnalysisDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params)
    const [analysis, setAnalysis] = useState<any>(null)
    const [opportunities, setOpportunities] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [plan, setPlan] = useState('free')
    const [isShareModalOpen, setIsShareModalOpen] = useState(false)
    const [activeTab, setActiveTab] = useState('opportunities')
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const [{ data: analysisData }, { data: oppData }, { data: userData }] = await Promise.all([
                supabase.from('analyses').select('*').eq('id', id).single(),
                supabase.from('opportunities').select('*').eq('analysis_id', id).order('impact_score', { ascending: false }),
                supabase.from('users').select('plan').eq('id', user.id).single()
            ])

            if (analysisData) setAnalysis(analysisData)
            if (oppData) setOpportunities(oppData)
            if (userData) setPlan(userData.plan)
            setLoading(false)

            // If processing, poll every 3 seconds
            if (analysisData?.status === 'processing') {
                const interval = setInterval(async () => {
                    const { data: updated } = await supabase.from('analyses').select('status').eq('id', id).single()
                    if (updated?.status !== 'processing') {
                        window.location.reload()
                        clearInterval(interval)
                    }
                }, 3000)
                return () => clearInterval(interval)
            }
        }
        fetchData()
    }, [id])

    if (loading) {
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center gap-8">
                <div className="relative">
                    <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
                    <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
                </div>
                <div className="text-center">
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-2">Synchronizing Intelligence</p>
                    <p className="text-slate-500 text-xs font-medium animate-pulse">Large datasets may take up to 30 seconds...</p>
                </div>
            </div>
        )
    }

    if (!analysis || analysis.status === 'failed') {
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-3xl bg-red-400/10 border border-red-400/20 flex items-center justify-center mb-6">
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2 font-display not-italic">Analysis Failed</h2>
                <p className="text-slate-400 max-w-sm mb-12 font-medium">
                    {analysis?.error_message || "We couldn't process this feedback. Please try again with more data."}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/analysis/new" className="px-10 py-4 rounded-full bg-white text-black font-black text-[11px] uppercase tracking-widest hover:scale-105 transition-all not-italic">
                        Start New Analysis
                    </Link>
                    <Link href="/dashboard" className="px-10 py-4 rounded-full bg-white/5 text-white font-black text-[11px] uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all not-italic">
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        )
    }

    if (analysis.status === 'processing') {
        const steps = [
            { label: 'Ingesting Data', status: 'done' },
            { label: 'Cluster Mapping', status: 'done' },
            { label: 'Extracting Evidence', status: 'active' },
            { label: 'Prioritization Matrix', status: 'pending' },
        ]
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center p-8">
                <div className="w-full max-w-sm space-y-12">
                    <div className="text-center">
                        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mx-auto mb-6" />
                        <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2 font-display not-italic">Generating Insight</h2>
                        <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">Building your opportunity roadmap</p>
                    </div>
                    <div className="space-y-4">
                        {steps.map((step, i) => (
                            <div key={i} className="flex items-center justify-between group">
                                <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${step.status === 'done' ? 'text-green-400' : step.status === 'active' ? 'text-indigo-400 animate-pulse' : 'text-slate-600'}`}>
                                    {step.label}
                                </span>
                                <div className={`w-1.5 h-1.5 rounded-full transition-all ${step.status === 'done' ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]' : step.status === 'active' ? 'bg-indigo-400 scale-125' : 'bg-slate-800'}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    const reportUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://app.zointly.com'}/reports/${analysis.id}`

    return (
        <FadeIn className="max-w-7xl mx-auto p-4 md:p-8 mb-20 relative">
            {/* Nav Header */}
            <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-6">
                    <Logo size="sm" />
                    <Link href="/dashboard" className="group flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-all">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Back to Workspace
                    </Link>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsShareModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                        <Share2 className="w-3.5 h-3.5" /> Share Report
                    </button>
                    <div className="relative group">
                        <button
                            disabled={plan === 'free'}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${plan === 'growth' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:scale-105' : 'bg-white/2 border border-white/5 text-slate-500 cursor-not-allowed group-hover:border-red-500/30'}`}
                        >
                            <Download className="w-3.5 h-3.5" /> Export PDF
                        </button>
                        {plan === 'free' && (
                            <div className="absolute top-full right-0 mt-3 w-48 p-4 rounded-2xl bg-[#080808] border border-red-500/20 shadow-2xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50">
                                <p className="text-[9px] font-bold text-red-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                    <Zap className="w-3 h-3" /> Growth Feature
                                </p>
                                <p className="text-[10px] text-slate-400 leading-relaxed font-medium">Exporting is restricted to Growth plan users. Upgrade to unlock.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Analysis Header */}
            <div className="mb-16 grid lg:grid-cols-3 gap-12 items-end">
                <div className="lg:col-span-2">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-white/2 border border-white/5 flex items-center justify-center shadow-xl">
                            <BarChart3 className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-white uppercase tracking-tighter leading-none font-display not-italic">
                                {analysis.title || 'Intelligence Report'}
                            </h1>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">
                                {format(parseISO(analysis.created_at), 'MMMM d, yyyy')} · {analysis.total_entries || 0} Feedback Nodes
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex-1 p-6 rounded-3xl bg-white/2 border border-white/5 backdrop-blur-xl">
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Signal Confidence</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-white">94%</span>
                            <span className="text-[9px] font-bold text-green-400 uppercase tracking-widest">High</span>
                        </div>
                    </div>
                    <div className="flex-1 p-6 rounded-3xl bg-white/2 border border-white/5 backdrop-blur-xl">
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Opportunities</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-indigo-400">{opportunities.length}</span>
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Extracted</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1.5 mb-8 p-1.5 rounded-2xl bg-white/2 border border-white/5 w-fit">
                {['opportunities', 'raw-evidence', 'roadmap'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                    >
                        {tab.replace('-', ' ')}
                    </button>
                ))}
            </div>

            {/* Opportunities Grid */}
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {opportunities.map((opp, i) => (
                    <StaggerItem key={opp.id}>
                        <div className="group h-full flex flex-col rounded-[2.5rem] bg-white/2 border border-white/5 p-8 transition-all hover:border-indigo-500/30 hover:shadow-[0_40px_80px_rgba(0,0,0,0.4)] hover:-translate-y-1 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="text-[10px] font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 uppercase tracking-widest">
                                    Impact {opp.impact_score}/10
                                </div>
                                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pt-1">
                                    Priority {i + 1}
                                </div>
                            </div>

                            <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4 group-hover:text-indigo-400 transition-colors leading-tight">
                                {opp.title}
                            </h3>

                            <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6 line-clamp-3">
                                {opp.description}
                            </p>

                            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-2">
                                    <MessageSquare size={14} className="text-slate-600" />
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                        Evidence Logic Active
                                    </span>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-500 transition-all">
                                    <ChevronRight className="w-4 h-4 text-white" />
                                </div>
                            </div>
                        </div>
                    </StaggerItem>
                ))}
            </StaggerContainer>

            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                reportUrl={reportUrl}
                title={analysis.title}
            />
        </FadeIn>
    )
}
