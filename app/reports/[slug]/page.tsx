import { createAdminClient } from '@/lib/supabase/admin'
import { notFound } from 'next/navigation'
import { Quote } from 'lucide-react'

interface Props { params: Promise<{ slug: string }> }

const PRIORITY_COLORS: Record<string, string> = {
    P0: '#ef4444', P1: '#f97316', P2: '#eab308', P3: '#6b7280',
}

export default async function PublicReportPage({ params }: Props) {
    const { slug } = await params
    const admin = createAdminClient()

    const { data: report } = await admin
        .from('reports')
        .select('*, analyses(*, opportunities(*))')
        .eq('public_slug', slug)
        .single()

    if (!report) notFound()

    const analysis = (report as any).analyses
    const opportunities: any[] = analysis?.opportunities || []

    return (
        <div className="min-h-screen" style={{ background: '#080808', color: '#94a3b8' }}>
            {/* Header */}
            <header className="border-b py-6 px-8" style={{ borderColor: 'rgba(255,255,255,0.06)', background: '#0a0a0b' }}>
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: '#6366f1' }}>
                            <span className="text-white text-xs font-bold">Z</span>
                        </div>
                        <span className="font-display text-[10px] font-bold tracking-widest text-white uppercase">Zointly</span>
                    </div>
                    <div className="px-3 py-1 rounded text-[9px] font-bold uppercase tracking-widest"
                        style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#818cf8' }}>
                        Verified Report
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-8 py-12">
                {/* Report summary */}
                <div className="mb-12 text-center">
                    <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                        Product Opportunity Report
                    </h1>
                    {analysis?.total_entries > 0 && (
                        <p className="text-slate-500 text-sm">
                            Based on {analysis.total_entries.toLocaleString()} feedback entries
                            {analysis.analysis_period_start && ' · Last 30 days'}
                            {' · '}{opportunities.length} opportunities identified
                        </p>
                    )}
                </div>

                {/* Opportunities */}
                <div className="space-y-8">
                    {opportunities
                        .sort((a: any, b: any) => b.demand_score - a.demand_score)
                        .map((opp: any, i: number) => (
                            <div key={opp.id} className="rounded-xl p-8" style={{ background: '#0f0f11', border: '1px solid rgba(255,255,255,0.08)' }}>
                                {/* Metrics row */}
                                <div className="flex flex-wrap items-center gap-3 mb-5">
                                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded"
                                        style={{ background: `${PRIORITY_COLORS[opp.priority]}18`, color: PRIORITY_COLORS[opp.priority] }}>
                                        {opp.priority}
                                    </span>
                                    <span className="text-xs font-bold px-2.5 py-1 rounded"
                                        style={{ background: 'rgba(99,102,241,0.1)', color: '#a5b4fc' }}>
                                        Demand {opp.demand_score}/10
                                    </span>
                                    <span className="text-xs px-2.5 py-1 rounded"
                                        style={{ background: 'rgba(255,255,255,0.04)', color: '#6b7280' }}>
                                        {opp.confidence}% confidence
                                    </span>
                                </div>

                                <h2 className="text-xl font-bold text-white mb-2">{opp.title}</h2>

                                <div className="flex items-center gap-1.5 mb-6">
                                    <div className="w-2 h-2 rounded-full" style={{ background: '#6366f1' }} />
                                    <p className="text-indigo-400 font-bold text-sm">
                                        Mentioned by {opp.mentions_estimate?.toLocaleString() || '—'} users
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Problem</h3>
                                        <p className="text-slate-300 text-sm leading-relaxed">{opp.problem_summary}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Proposed Solution</h3>
                                        <a href="mailto:hello@zointly.com" className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-full font-medium transition-colors text-sm">
                                            Contact Support
                                        </a>    </div>
                                </div>

                                {/* Evidence quotes */}
                                {opp.customer_quotes?.length > 0 && (
                                    <div>
                                        <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3">Evidence</h3>
                                        <div className="space-y-2">
                                            {opp.customer_quotes.slice(0, 2).map((quote: string, qi: number) => (
                                                <blockquote key={qi} className="rounded-lg px-4 py-3 border-l-2 text-sm text-slate-400"
                                                    style={{ background: 'rgba(255,255,255,0.02)', borderColor: '#6366f1' }}>
                                                    &ldquo;{quote}&rdquo;
                                                </blockquote>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                </div>

                {/* CTA */}
                <div className="mt-16 text-center py-12 rounded-xl" style={{ background: '#0f0f11', border: '1px solid rgba(99,102,241,0.2)' }}>
                    <p className="text-slate-500 text-sm mb-4">Want evidence-based prioritization for your product?</p>
                    <a href="https://zointly.io"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-white font-semibold text-sm"
                        style={{ background: '#6366f1' }}>
                        Try Zointly Free →
                    </a>
                </div>
            </main>
        </div>
    )
}
