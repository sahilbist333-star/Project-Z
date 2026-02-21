import Link from 'next/link'
import { BarChart3, ArrowRight, Zap } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { PLAN_LIMITS } from '@/lib/types'

interface Props {
    analysis: {
        id: string
        title: string | null
        created_at: string
        total_entries: number
    }
    used: number
    plan: string
}

export default function MonthlyInsightCard({ analysis, used, plan }: Props) {
    const limit = PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS] ?? 3
    const pct = Math.min(100, Math.round((used / limit) * 100))

    return (
        <div className="mb-6 rounded-2xl overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.05)] hover:-translate-y-0.5"
            style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="px-6 py-5 border-b flex items-center gap-3"
                style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(99,102,241,0.04)' }}>
                <BarChart3 className="w-4 h-4 text-indigo-400" />
                <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">This Month</p>
                <span className="ml-auto text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    {format(new Date(), 'MMMM yyyy')}
                </span>
            </div>
            <div className="p-6 grid md:grid-cols-3 gap-6 items-center">
                {/* Stats */}
                <div className="space-y-4">
                    <div>
                        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-1">Analyses Run</p>
                        <p className="font-display text-2xl font-bold text-white">{used} <span className="text-sm text-slate-600">/ {limit}</span></p>
                    </div>
                    <div className="h-1 rounded-full overflow-hidden" style={{ background: '#1e1e22' }}>
                        <div className="h-full rounded-full transition-all duration-700" style={{
                            width: `${pct}%`,
                            background: pct >= 100 ? '#ef4444' : pct >= 70 ? '#eab308' : '#6366f1',
                        }} />
                    </div>
                </div>

                {/* Latest Analysis */}
                <div className="md:col-span-2 rounded-lg p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-2">Latest Analysis</p>
                    <p className="text-sm font-semibold text-white mb-1 truncate">
                        {analysis.title || 'Feedback Analysis'}
                    </p>
                    <p className="text-xs text-slate-500 mb-3">
                        {format(parseISO(analysis.created_at), 'MMM d · h:mm a')}
                        {analysis.total_entries > 0 && ` · ${analysis.total_entries} entries`}
                    </p>
                    <div className="flex items-center gap-3">
                        <Link href={`/analysis/${analysis.id}`}
                            className="flex items-center gap-1.5 text-[9px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-widest transition-colors">
                            View Results <ArrowRight className="w-3 h-3" />
                        </Link>
                        {plan === 'free' && (
                            <Link href="/pricing"
                                className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 hover:text-indigo-400 uppercase tracking-widest transition-colors ml-auto">
                                <Zap className="w-3 h-3" /> Upgrade
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
