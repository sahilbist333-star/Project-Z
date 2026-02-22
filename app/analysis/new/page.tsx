'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Zap, Loader2, Sparkles, MessageSquare, Clipboard, Upload, FileText, FileSpreadsheet, X, Info, Database, AlertTriangle, Plus, ArrowRight } from 'lucide-react'
import { SAMPLE_FEEDBACK } from '@/lib/sample-data'
import Papa from 'papaparse'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'

export default function NewAnalysisPage() {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [usage, setUsage] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const fetchUsage = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return
            const { data } = await supabase.from('users').select('plan, analyses_used_this_month').eq('id', user.id).single()
            setUsage(data)
            setLoading(false)
        }
        fetchUsage()
    }, [])

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        Papa.parse(file, {
            complete: (results) => {
                const csvText = results.data
                    .map((row: any) => Object.values(row).join(' '))
                    .join('\n')
                setText(csvText)
            },
            header: true
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!text.trim()) return
        setIsSubmitting(true)
        setError('')

        try {
            const res = await fetch('/api/analysis/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ input_text: text, title })
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Failed to start analysis')
            router.push(`/analysis/${data.id}`)
        } catch (err: any) {
            setError(err.message)
            setIsSubmitting(false)
        }
    }

    const useSampleData = () => {
        setTitle('Sample Customer Feedback')
        setText(SAMPLE_FEEDBACK.join('\n'))
    }

    if (loading) {
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Preparing analysis engine...</p>
            </div>
        )
    }

    const limit = usage?.plan === 'growth' ? 100 : 3
    const used = usage?.analyses_used_this_month || 0
    const isLimitReached = used >= limit

    if (isLimitReached) {
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 rounded-[2.5rem] bg-indigo-500/10 flex items-center justify-center mb-8 relative">
                    <Zap className="w-8 h-8 text-indigo-400" />
                    <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full" />
                </div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-4">Monthly Limit Reached</h2>
                <p className="text-slate-400 max-w-sm mb-12 font-medium">
                    You've used all <span className="text-white">{limit} analyses</span> for this month. Upgrade to Growth for unlimited intelligence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/pricing" className="px-10 py-4 rounded-full bg-white text-black font-black text-[11px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                        View Growth Plans
                    </Link>
                    <Link href="/dashboard" className="px-10 py-4 rounded-full bg-white/5 text-white font-black text-[11px] uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all">
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <FadeIn className="max-w-4xl mx-auto p-8 mb-20 relative min-h-screen">
            {/* Background elements to match homepage */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
                style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.025) 1px, transparent 0)',
                    backgroundSize: '32px 32px'
                }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[100px] rounded-full translate-y-1/3 translate-x-1/3" />
            </div>

            {/* Top Logo Bar */}
            <div className="flex justify-center mb-12 relative z-10">
                <Logo size="lg" />
            </div>

            {/* Header */}
            <div className="text-center mb-16 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[9px] font-black uppercase tracking-widest mb-6 backdrop-blur-md">
                    <Sparkles className="w-3 h-3" /> New Intelligence Task
                </div>
                <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-2xl">
                    Fuel Your Strategy
                </h1>
                <p className="text-slate-500 font-medium text-sm max-w-md mx-auto">
                    Paste raw feedback or upload a dataset to extract actionable product opportunities.
                </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
                {/* Sidebar Info */}
                <div className="md:col-span-1 space-y-6">
                    <div className="p-6 rounded-3xl bg-white/2 border border-white/5 backdrop-blur-xl">
                        <div className="flex items-center gap-2 mb-4">
                            <Database className="w-4 h-4 text-indigo-400" />
                            <h3 className="text-[10px] font-black text-white uppercase tracking-widest">Usage Quota</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                                <span>Used</span>
                                <span className="text-white">{used} / {limit}</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all duration-1000"
                                    style={{ width: `${(used / limit) * 100}%` }} />
                            </div>
                            <p className="text-[9px] text-slate-600 font-medium leading-relaxed">
                                {limit - used} remaining this period.
                            </p>
                        </div>
                    </div>

                    <div className="p-6 rounded-3xl bg-indigo-500/5 border border-indigo-500/10">
                        <h3 className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-3">Tips</h3>
                        <ul className="space-y-3">
                            {[
                                'Include customer segments',
                                'Mix positive and negative',
                                'Min. 5 independent entries'
                            ].map((tip, i) => (
                                <li key={i} className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                                    <div className="w-1 h-1 rounded-full bg-indigo-500" />
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Main Content */}
                <div className="md:col-span-3">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <FadeIn className="p-4 rounded-2xl bg-red-400/10 border border-red-400/20 flex items-center gap-3 text-red-400 text-xs font-bold uppercase tracking-wide">
                                <AlertTriangle className="w-4 h-4 shrink-0" />
                                {error}
                            </FadeIn>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Analysis Name</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Q4 Mobile App Feedback"
                                className="w-full bg-white/2 border border-white/5 rounded-3xl px-6 py-4 text-white text-sm font-medium focus:outline-none focus:border-indigo-500/30 transition-all placeholder:text-slate-700"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Feedback Data</label>
                            <div className="relative group">
                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Paste customer feedback here, one entry per line..."
                                    rows={12}
                                    className="w-full bg-white/2 border border-white/5 rounded-[2rem] px-8 py-8 pb-20 text-white text-sm font-medium focus:outline-none focus:border-indigo-500/30 transition-all placeholder:text-slate-700 resize-none"
                                />
                                <div className="absolute bottom-6 right-6 flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={useSampleData}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                                    >
                                        <Plus className="w-3 h-3" /> Try Sample Data
                                    </button>
                                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400 hover:bg-indigo-500/20 transition-all">
                                        <FileSpreadsheet className="w-3 h-3" /> Upload CSV
                                        <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || !text.trim()}
                            className="w-full h-16 rounded-[2rem] bg-indigo-500 text-white font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] disabled:opacity-50 disabled:grayscale disabled:hover:scale-100 flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Synchronizing Intelligence...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Execute Analysis
                                    <ArrowRight className="w-4 h-4 ml-1 opacity-50" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </FadeIn>
    )
}
