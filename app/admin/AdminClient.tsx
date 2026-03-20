'use client'
import { useEffect, useState } from 'react'
import { 
    Users, 
    Zap, 
    BarChart3, 
    MessageSquare, 
    ArrowRight, 
    Loader2, 
    Shield, 
    Clock, 
    TrendingUp,
    ExternalLink,
    Mail
} from 'lucide-react'
import { 
    FadeIn, 
    StaggerContainer, 
    StaggerItem 
} from '@/components/ui/motion'
import { format, parseISO } from 'date-fns'

export default function AdminClient() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/admin/stats')
                if (!res.ok) {
                    if (res.status === 403) throw new Error('Access Denied: Superadmin only')
                    throw new Error('Failed to fetch admin stats')
                }
                const json = await res.json()
                setData(json)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    if (loading) {
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Gathering intelligence...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center gap-4 text-center px-6">
                <div className="w-16 h-16 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                    <Shield className="w-8 h-8 text-red-500" />
                </div>
                <h1 className="text-xl font-black text-white uppercase tracking-tight">{error}</h1>
                <p className="text-slate-500 text-sm max-w-xs">This area is highly restricted. Return to your dashboard.</p>
            </div>
        )
    }

    const { stats, recentAnalyses, recentFeedback } = data

    const metricCards = [
        { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'indigo' },
        { label: 'Growth Subs', value: stats.activeSubscriptions, icon: Zap, color: 'purple' },
        { label: 'Total Analyses', value: stats.totalAnalyses, icon: BarChart3, color: 'blue' },
        { label: 'Feedback', value: stats.totalFeedback, icon: MessageSquare, color: 'green' },
        { label: 'Subscribers', value: stats.totalSubscribers, icon: Mail, color: 'orange' }
    ]

    return (
        <div className="p-8 max-w-6xl mx-auto relative z-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                            <Shield className="w-5 h-5 text-indigo-400" />
                        </div>
                        <h1 className="font-display text-4xl font-black text-white tracking-tight uppercase">
                            Superadmin
                        </h1>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">
                        Platform-wide performance and system health overview.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-5 py-2.5 rounded-full bg-green-500/5 border border-green-500/10 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Systems Nominal</span>
                    </div>
                </div>
            </div>

            {/* Metrics Grid */}
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
                {metricCards.map((card, idx) => (
                    <StaggerItem key={card.label}>
                        <div className="p-6 rounded-[2rem] bg-white/2 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all">
                            <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/5 blur-3xl rounded-full group-hover:bg-white/10 transition-colors" />
                            <card.icon className="w-5 h-5 text-slate-500 mb-4" />
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{card.label}</h3>
                            <p className="text-2xl font-black text-white tracking-tight">{card.value}</p>
                        </div>
                    </StaggerItem>
                ))}
            </StaggerContainer>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Analyses feed */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                            <Clock className="w-5 h-5 text-indigo-400" />
                            Recent Analyses
                        </h2>
                        <TrendingUp className="w-4 h-4 text-slate-600" />
                    </div>
                    
                    <div className="space-y-3">
                        {recentAnalyses?.map((analysis: any) => (
                            <div key={analysis.id} className="p-5 rounded-3xl bg-white/2 border border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                        <BarChart3 className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-sm font-bold text-white truncate uppercase tracking-tight">
                                            {analysis.title || 'Untitled Analysis'}
                                        </h3>
                                        <p className="text-[10px] text-slate-500 font-medium truncate">
                                            User: <span className="text-slate-300">{analysis.users?.email || 'Unknown'}</span> · {format(parseISO(analysis.created_at), 'MMM d, h:mm a')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${
                                        analysis.status === 'completed' ? 'bg-green-500/10 text-green-400' :
                                        analysis.status === 'failed' ? 'bg-red-500/10 text-red-400' : 'bg-white/5 text-slate-400'
                                    }`}>
                                        {analysis.status}
                                    </span>
                                    <a href={`/analysis/${analysis.id}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-500 hover:text-white transition-all">
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Feedback feed */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-green-400" />
                            User Feedback
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {recentFeedback?.map((item: any) => (
                            <div key={item.id} className="p-6 rounded-[2rem] bg-white/2 border border-white/5 relative group">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-green-500/10 text-green-400 tracking-[0.1em]">
                                        {item.feedback_type}
                                    </span>
                                    <span className="text-[9px] text-slate-600 font-bold uppercase">
                                        {format(parseISO(item.created_at), 'MMM d')}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-300 leading-relaxed font-medium line-clamp-3 mb-4">
                                    &quot;{item.message}&quot;
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                        <Users className="w-2.5 h-2.5 text-slate-500" />
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-bold truncate">{item.user_email || 'Anonymous'}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
