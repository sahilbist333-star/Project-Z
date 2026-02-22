'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { format, parseISO } from 'date-fns'
import { BarChart3, ChevronRight, Share2, Trash2, ExternalLink, Loader2, Search, Filter } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion'
import Link from 'next/link'
import ShareModal from '@/components/analysis/ShareModal'

export default function AllAnalysesPage() {
    const [analyses, setAnalyses] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [isShareModalOpen, setIsShareModalOpen] = useState(false)
    const [selectedAnalysis, setSelectedAnalysis] = useState<any>(null)
    const supabase = createClient()

    useEffect(() => {
        fetchAnalyses()
    }, [])

    const fetchAnalyses = async () => {
        setLoading(true)
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const threeMonthsAgo = new Date()
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)

        const { data, error } = await supabase
            .from('analyses')
            .select('*')
            .eq('user_id', user.id)
            .eq('is_sample', false)
            .gte('created_at', threeMonthsAgo.toISOString())
            .order('created_at', { ascending: false })

        if (!error && data) setAnalyses(data)
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this analysis? This action cannot be undone.')) return

        const { error } = await supabase.from('analyses').delete().eq('id', id)
        if (!error) {
            setAnalyses(analyses.filter(a => a.id !== id))
        } else {
            alert('Failed to delete analysis')
        }
    }

    const openShare = (analysis: any) => {
        setSelectedAnalysis(analysis)
        setIsShareModalOpen(true)
    }

    const filteredAnalyses = analyses.filter(a =>
        (a.title || 'Untitled Analysis').toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (loading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-4" />
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Loading your Roadmap...</p>
            </div>
        )
    }

    return (
        <FadeIn className="p-8 max-w-6xl mx-auto mb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Analysis Reports</h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium">Manage and review your product strategy history.</p>
                </div>

                <div className="relative group max-w-sm w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search analyses..."
                        className="w-full bg-white/2 border border-white/5 rounded-2xl pl-12 pr-6 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/30 transition-all placeholder:text-slate-700"
                    />
                </div>
            </div>

            {filteredAnalyses.length === 0 ? (
                <div className="p-20 rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center">
                    <BarChart3 className="w-12 h-12 text-slate-700 mb-6" />
                    <h3 className="text-white font-bold mb-2 uppercase tracking-tight">No intelligence nodes found</h3>
                    <p className="text-slate-500 text-sm max-w-xs mb-8">Start a new analysis to populate your roadmap with actionable data.</p>
                    <Link href="/analysis/new" className="px-8 py-3 rounded-full bg-indigo-500 text-white text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-indigo-500/20">
                        Run New Analysis
                    </Link>
                </div>
            ) : (
                <StaggerContainer className="grid gap-4">
                    {filteredAnalyses.map((analysis) => (
                        <StaggerItem key={analysis.id}>
                            <div className="group p-6 rounded-2xl bg-white/2 border border-white/5 hover:border-indigo-500/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${analysis.status === 'completed' ? 'bg-indigo-500/10 text-indigo-400' : analysis.status === 'failed' ? 'bg-red-400/10 text-red-400' : 'bg-slate-800 text-slate-500 animate-pulse'}`}>
                                        <BarChart3 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold uppercase tracking-tight group-hover:text-indigo-400 transition-colors">
                                            {analysis.title || 'Untitled Analysis'}
                                        </h3>
                                        <div className="flex items-center gap-3 mt-1 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                                            <span>{format(parseISO(analysis.created_at), 'MMM d, yyyy')}</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-800" />
                                            <span>{analysis.total_entries || 0} Nodes</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-800" />
                                            <span className={analysis.status === 'completed' ? 'text-green-400' : analysis.status === 'failed' ? 'text-red-400' : 'text-indigo-400'}>
                                                {analysis.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Link href={`/analysis/${analysis.id}`} className="p-3 rounded-xl bg-white/2 border border-white/5 text-slate-400 hover:text-white hover:bg-white/5 transition-all" title="View Report">
                                        <ExternalLink className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => openShare(analysis)}
                                        className="p-3 rounded-xl bg-white/2 border border-white/5 text-slate-400 hover:text-indigo-400 hover:bg-white/5 transition-all" title="Share Report">
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(analysis.id)}
                                        className="p-3 rounded-xl bg-white/2 border border-white/5 text-slate-400 hover:text-red-400 hover:bg-white/5 transition-all" title="Delete">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            )}

            {selectedAnalysis && (
                <ShareModal
                    isOpen={isShareModalOpen}
                    onClose={() => setIsShareModalOpen(false)}
                    reportUrl={`${process.env.NEXT_PUBLIC_APP_URL || 'https://app.zointly.com'}/reports/${selectedAnalysis.id}`}
                    title={selectedAnalysis.title}
                />
            )}
        </FadeIn>
    )
}
