'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, XCircle, RefreshCw, Download, Share2, ChevronDown, ChevronUp, Quote } from 'lucide-react'
import { Analysis, Opportunity } from '@/lib/types'
import { format, parseISO } from 'date-fns'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion'

interface Props { params: Promise<{ id: string }> }

const PRIORITY_COLORS: Record<string, string> = {
    P0: '#ef4444', P1: '#f97316', P2: '#eab308', P3: '#6b7280',
}

export default function AnalysisPage({ params }: Props) {
    const [analysisId, setAnalysisId] = useState<string | null>(null)
    const [analysis, setAnalysis] = useState<Analysis | null>(null)
    const [opportunities, setOpportunities] = useState<Opportunity[]>([])
    const [selected, setSelected] = useState<Opportunity | null>(null)
    const [loading, setLoading] = useState(true)
    const [sharing, setSharing] = useState(false)
    const [shareUrl, setShareUrl] = useState<string | null>(null)
    const router = useRouter()

    // Resolve params
    useEffect(() => {
        params.then(p => setAnalysisId(p.id))
    }, [params])

    const fetchStatus = useCallback(async (id: string) => {
        const res = await fetch(`/api/analysis/${id}/status`)
        const data: Analysis = await res.json()
        setAnalysis(data)
        if (data.status === 'completed') {
            const opRes = await fetch(`/api/analysis/${id}/opportunities`)
            const opData = await opRes.json()
            setOpportunities(opData)
            setSelected(opData[0] || null)
            setLoading(false)
        } else if (data.status === 'failed') {
            setLoading(false)
        }
        return data.status
    }, [])

    useEffect(() => {
        if (!analysisId) return
        let interval: NodeJS.Timeout
        const startedAt = Date.now()
        const poll = async () => {
            const status = await fetchStatus(analysisId)
            if (status !== 'queued' && status !== 'processing') {
                clearInterval(interval)
                return
            }
            // Auto-expire if still queued after 2 minutes
            if (status === 'queued' && Date.now() - startedAt > 2 * 60 * 1000) {
                clearInterval(interval)
                await fetch(`/api/analysis/${analysisId}/expire`, { method: 'POST' })
                await fetchStatus(analysisId)
            }
        }
        poll()
        interval = setInterval(poll, 3000)
        return () => clearInterval(interval)
    }, [analysisId, fetchStatus])

    const handleShare = async () => {
        if (!analysisId) return
        setSharing(true)
        const res = await fetch('/api/reports/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ analysis_id: analysisId }),
        })
        const data = await res.json()
        setSharing(false)
        if (data.slug) {
            const url = `${window.location.origin}/reports/${data.slug}`
            setShareUrl(url)
            navigator.clipboard.writeText(url).catch(() => { })
        }
    }

    const handleRetry = () => {
        router.push('/analysis/new')
    }

    if (loading && (!analysis || analysis.status === 'queued' || analysis.status === 'processing')) {
        return (
            <div className="h-full flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
                <div className="text-center">
                    <p className="text-white font-medium">
                        {analysis?.status === 'processing' ? 'Analyzing your feedback...' : 'Queued for analysis...'}
                    </p>
                    <p className="text-slate-500 text-sm mt-1">This usually takes 20–40 seconds</p>
                </div>
                <div className="w-48 h-1 rounded-full overflow-hidden" style={{ background: '#1f1f23' }}>
                    <div className="h-full rounded-full animate-pulse" style={{ background: '#6366f1', width: '60%' }} />
                </div>
            </div>
        )
    }

    if (!analysis) return null

    if (analysis.status === 'failed') {
        return (
            <div className="h-full flex flex-col items-center justify-center gap-5">
                <XCircle className="w-12 h-12 text-red-400" />
                <div className="text-center max-w-sm">
                    <h3 className="text-white font-bold text-lg mb-2">Analysis Failed</h3>
                    <p className="text-slate-400 text-sm mb-5">{analysis.error_message || 'An error occurred during processing.'}</p>
                    <button onClick={handleRetry} className="btn-primary">
                        <RefreshCw className="w-4 h-4" />
                        Retry Analysis
                    </button>
                </div>
            </div>
        )
    }

    const opp = selected

    return (
        <FadeIn className="h-full flex flex-col relative z-10">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
                style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255,255,255,0.06)' }}>
                <div>
                    <h1 className="text-white font-bold">
                        {analysis.is_sample ? '📋 Sample Analysis' : 'Feedback Analysis'}
                    </h1>
                    {analysis.total_entries > 0 && (
                        <p className="text-slate-500 text-xs mt-0.5">
                            Based on {analysis.total_entries.toLocaleString()} entries
                            {analysis.analysis_period_start && ` · Last 30 days`}
                            {opportunities.length > 0 && ` · ${opportunities.length} opportunities`}
                        </p>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={handleShare} disabled={sharing}
                        className="btn-secondary text-xs py-2 px-3">
                        <Share2 className="w-3.5 h-3.5" />
                        {sharing ? 'Generating...' : 'Share Report'}
                    </button>
                </div>
            </div>

            {shareUrl && (
                <div className="px-6 py-3 text-sm text-indigo-300 border-b" style={{ background: 'rgba(99,102,241,0.06)', borderColor: 'rgba(99,102,241,0.2)' }}>
                    ✅ Report link copied! <a href={shareUrl} target="_blank" className="underline text-indigo-400">{shareUrl}</a>
                </div>
            )}

            {/* Split pane */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left: Opportunities list */}
                <div className="w-80 flex-shrink-0 border-r overflow-y-auto" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <div className="px-4 py-4 border-b hover:bg-white/5 transition-colors cursor-default" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Opportunities ({opportunities.length})</h2>
                    </div>
                    <StaggerContainer className="p-3 space-y-2">
                        {opportunities.map((opp, i) => {
                            const changeItem = analysis.change_summary?.items?.find(
                                item => item.detail?.toLowerCase().includes(opp.title.toLowerCase()) ||
                                    item.title?.toLowerCase().includes(opp.title.toLowerCase())
                            )
                            return (
                                <StaggerItem key={opp.id}>
                                    <button onClick={() => setSelected(opp)}
                                        className="w-full text-left p-3.5 rounded-lg transition-all hover:-translate-y-0.5"
                                        style={{
                                            background: selected?.id === opp.id ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.02)',
                                            border: `1px solid ${selected?.id === opp.id ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.06)'}`,
                                        }}>
                                        <div className="flex items-start justify-between gap-2 mb-1.5">
                                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                                                style={{ background: `${PRIORITY_COLORS[opp.priority]}18`, color: PRIORITY_COLORS[opp.priority] }}>
                                                {opp.priority}
                                            </span>
                                            {changeItem && (
                                                <span className="text-[9px] font-bold text-indigo-400">
                                                    {changeItem.type === 'new_opportunity' ? '🆕 NEW' :
                                                        changeItem.type === 'demand_surge' ? '🔺' : '⚠️'}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs font-semibold text-white leading-tight">{opp.title}</p>
                                        <div className="flex items-center gap-3 mt-2">
                                            <span className="text-[10px] text-slate-500 font-medium">
                                                {opp.mentions_estimate.toLocaleString()} mentions
                                            </span>
                                            <span className="text-[10px] text-slate-500">·</span>
                                            <span className="text-[10px] font-bold" style={{ color: '#6366f1' }}>{opp.demand_score}/10</span>
                                        </div>
                                    </button>
                                </StaggerItem>
                            )
                        })}
                    </StaggerContainer>
                </div>

                {/* Right: PRD Details */}
                <div className="flex-1 overflow-y-auto" style={{ background: 'rgba(0,0,0,0.2)' }}>
                    {opp ? (
                        <FadeIn key={opp.id} className="p-8 max-w-2xl mx-auto">
                            {/* Header */}
                            <div className="mb-8">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded"
                                        style={{ background: `${PRIORITY_COLORS[opp.priority]}18`, color: PRIORITY_COLORS[opp.priority] }}>
                                        {opp.priority}
                                    </span>
                                    <span className="text-xs font-bold px-2.5 py-1 rounded"
                                        style={{ background: 'rgba(99,102,241,0.1)', color: '#a5b4fc' }}>
                                        Demand {opp.demand_score}/10
                                    </span>
                                    <span className="text-xs font-bold px-2.5 py-1 rounded"
                                        style={{ background: 'rgba(255,255,255,0.04)', color: '#6b7280' }}>
                                        {opp.confidence}% confidence
                                    </span>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">{opp.title}</h2>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full" style={{ background: '#6366f1' }} />
                                    <p className="text-indigo-400 font-bold text-sm">
                                        Mentioned by {opp.mentions_estimate.toLocaleString()} users
                                    </p>
                                </div>
                            </div>

                            {/* PRD Sections */}
                            <div className="space-y-6">
                                <section>
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Problem</h3>
                                    <p className="text-slate-300 text-sm leading-relaxed">{opp.problem_summary}</p>
                                </section>

                                <section>
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Proposed Solution</h3>
                                    <p className="text-slate-300 text-sm leading-relaxed">{opp.proposed_solution}</p>
                                </section>

                                <section>
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Engineering Effort</h3>
                                    <p className="text-slate-300 text-sm">{opp.engineering_effort}</p>
                                </section>

                                {/* Verbatim Evidence Quotes */}
                                {opp.customer_quotes?.length > 0 && (
                                    <section>
                                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                                            Evidence ({opp.customer_quotes.length} verbatim quotes)
                                        </h3>
                                        <div className="space-y-3">
                                            {opp.customer_quotes.slice(0, 3).map((quote, i) => (
                                                <blockquote key={i} className="rounded-lg px-4 py-4 border-l-2 text-sm text-slate-300 italic"
                                                    style={{ background: 'rgba(255,255,255,0.02)', borderColor: '#6366f1' }}>
                                                    <Quote className="w-3.5 h-3.5 text-indigo-400 mb-2 opacity-60" />
                                                    &ldquo;{quote}&rdquo;
                                                </blockquote>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>
                        </FadeIn>
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-500 text-sm">
                            Select an opportunity to view details
                        </div>
                    )}
                </div>
            </div>
        </FadeIn >
    )
}
