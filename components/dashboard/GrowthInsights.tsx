import { useState } from 'react'
import { TrendingUp, Users, MessageSquare, Zap, BarChart3, ChevronRight, X } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion'
import Link from 'next/link'

export default function GrowthInsights() {
    const [selectedInsight, setSelectedInsight] = useState<any>(null)

    const insights = [
        {
            id: 'sentiment',
            title: 'Sentiment Surge',
            desc: 'Negative sentiment in "Search" increased by 14% this week.',
            icon: TrendingUp,
            color: 'text-red-400',
            bg: 'bg-red-400/10',
            stats: {
                label: 'Negative Swing',
                value: '+14%',
                subtext: 'vs previous 7 days',
                confidence: '92%'
            }
        },
        {
            id: 'users',
            title: 'Power Users',
            desc: 'Users from "Enterprise" cohort are requesting "CSV Export" 3x more.',
            icon: Users,
            color: 'text-indigo-400',
            bg: 'bg-indigo-400/10',
            stats: {
                label: 'Mention Frequency',
                value: '3.2x',
                subtext: 'High urgency detected',
                confidence: '88%'
            }
        },
        {
            id: 'signal',
            title: 'Emerging Signal',
            desc: '"Dark Mode" mentioned by 12 new independent users today.',
            icon: MessageSquare,
            color: 'text-purple-400',
            bg: 'bg-purple-400/10',
            stats: {
                label: 'New Unique Users',
                value: '12',
                subtext: 'Velocity: 2.1 nodes/hr',
                confidence: '96%'
            }
        }
    ]

    return (
        <div className="space-y-6 relative">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                    <h2 className="text-lg font-bold text-white tracking-tight">Growth Insights</h2>
                </div>
                <Link href="/dashboard/insights" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-indigo-400 transition-colors flex items-center gap-1">
                    View All <ChevronRight className="w-3 h-3" />
                </Link>
            </div>

            <StaggerContainer className="grid md:grid-cols-3 gap-4">
                {insights.map((insight, i) => (
                    <StaggerItem key={i}>
                        <div
                            onClick={() => setSelectedInsight(insight)}
                            className="p-5 rounded-2xl border transition-all hover:border-indigo-500/30 group cursor-pointer relative overflow-hidden"
                            style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)' }}
                        >
                            <div className={`w-10 h-10 rounded-xl ${insight.bg} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                                <insight.icon className={`w-5 h-5 ${insight.color}`} />
                            </div>
                            <h3 className="text-sm font-bold text-white mb-2">{insight.title}</h3>
                            <p className="text-xs text-slate-400 leading-relaxed font-medium">{insight.desc}</p>

                            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Real-time stats</span>
                                <ChevronRight className="w-3 h-3 text-slate-600" />
                            </div>
                        </div>
                    </StaggerItem>
                ))}
            </StaggerContainer>

            {/* Insight Overlay */}
            {selectedInsight && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
                    <FadeIn className="w-full max-w-sm rounded-[2.5rem] bg-[#0c0c0d] border border-white/10 p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />

                        <button onClick={() => setSelectedInsight(null)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors">
                            <X className="w-4 h-4 text-slate-500" />
                        </button>

                        <div className={`w-14 h-14 rounded-2xl ${selectedInsight.bg} flex items-center justify-center mb-6`}>
                            <selectedInsight.icon className={`w-7 h-7 ${selectedInsight.color}`} />
                        </div>

                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-2">{selectedInsight.title}</h3>
                        <p className="text-sm text-slate-400 font-medium mb-8 pr-6">{selectedInsight.desc}</p>

                        <div className="space-y-4">
                            <div className="p-4 rounded-2xl bg-white/2 border border-white/5">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{selectedInsight.stats.label}</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-black text-white">{selectedInsight.stats.value}</span>
                                    <span className="text-[10px] text-slate-500 font-medium">{selectedInsight.stats.subtext}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                                <span className="text-[9px] font-black text-indigo-300 uppercase tracking-widest">Signal Confidence</span>
                                <span className="text-sm font-black text-white">{selectedInsight.stats.confidence}</span>
                            </div>
                        </div>

                        <button onClick={() => setSelectedInsight(null)} className="w-full mt-8 py-4 rounded-2xl bg-white text-black font-black text-[11px] uppercase tracking-widest hover:scale-[1.02] transition-all">
                            Done
                        </button>
                    </FadeIn>
                </div>
            )}
        </div>
    )
}
