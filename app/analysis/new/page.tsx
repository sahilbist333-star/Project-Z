'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, ChevronRight, FileText, AlertTriangle, Zap } from 'lucide-react'
import Papa from 'papaparse'
import Link from 'next/link'

type LimitError = 'upgrade_required' | 'limit_reached' | 'not_enough_data' | null

export default function NewAnalysisPage() {
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [limitError, setLimitError] = useState<LimitError>(null)
    const [tab, setTab] = useState<'paste' | 'sample'>('paste')
    const fileRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        Papa.parse(file, {
            complete: (results) => {
                const lines = results.data
                    .map((row: any) => (Array.isArray(row) ? row[0] : Object.values(row)[0]))
                    .filter(Boolean)
                    .join('\n')
                setInput(lines as string)
            },
            header: true,
            skipEmptyLines: true,
        })
    }

    const submit = async (text: string, is_sample: boolean = false) => {
        setLoading(true)
        setError('')
        setLimitError(null)
        try {
            const res = await fetch('/api/analysis/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ input_text: text, is_sample }),
            })
            const data = await res.json()
            if (!res.ok) {
                if (data.error === 'upgrade_required') {
                    setLimitError('upgrade_required')
                    setError(`Your plan supports up to ${data.limit} entries. You provided ${data.count}. Upgrade to Growth for up to 5,000.`)
                } else if (data.error === 'limit_reached') {
                    setLimitError('limit_reached')
                } else if (data.error === 'not_enough_data') {
                    setLimitError('not_enough_data')
                    setError(`At least 30 feedback entries required (you provided ${data.count}).`)
                } else {
                    setError(data.error || 'Something went wrong. Please try again.')
                }
                setLoading(false)
                return
            }
            router.push(`/analysis/${data.analysis_id}`)
        } catch {
            setError('Network error. Please try again.')
            setLoading(false)
        }
    }

    const handleSample = async () => {
        const { SAMPLE_FEEDBACK } = await import('@/lib/sample-data')
        await submit(SAMPLE_FEEDBACK.join('\n'), true)
    }

    const lineCount = input.split('\n').filter(l => l.trim().length > 0).length

    // Full-page limit reached screen
    if (limitError === 'limit_reached') {
        return (
            <div className="p-8 max-w-xl anim-scale-in">
                <div className="rounded-2xl overflow-hidden" style={{ background: '#0f0f12', border: '1px solid rgba(239,68,68,0.2)' }}>
                    <div className="p-8 text-center">
                        <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-5"
                            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                            <AlertTriangle className="w-7 h-7 text-red-400" />
                        </div>
                        <h2 className="font-display text-xl font-bold text-white mb-2">Monthly Limit Reached</h2>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            You&apos;ve used all of your monthly analyses on the Free plan.
                            Upgrade to Growth to run up to <strong className="text-white">50 analyses/month</strong>.
                        </p>
                        <div className="rounded-xl p-5 mb-6 text-left" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
                            <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest mb-3">Growth Plan includes</p>
                            <div className="space-y-2">
                                {['50 analyses per month', '5,000 entries per analysis', 'Insight alerts + email notifications', 'Priority processing'].map(f => (
                                    <p key={f} className="text-xs text-slate-300 flex items-center gap-2">
                                        <span className="text-indigo-400">→</span> {f}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <Link href="/pricing"
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-md text-white font-bold text-sm mb-3 hover:opacity-90 transition-all pulse-glow"
                            style={{ background: '#6366f1' }}>
                            <Zap className="w-4 h-4" />
                            Upgrade to Growth — ₹49/month
                        </Link>
                        <button onClick={() => setLimitError(null)}
                            className="text-slate-600 text-xs hover:text-slate-400 transition-colors">
                            ← Go back
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="p-8 max-w-3xl anim-fade-in">
            <div className="mb-8 anim-slide-down">
                <h1 className="font-display text-2xl font-bold text-white">New Analysis</h1>
                <p className="text-slate-500 text-sm mt-1">Paste feedback or upload a CSV file. Min 30 entries.</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
                {(['paste', 'sample'] as const).map((t) => (
                    <button key={t} onClick={() => setTab(t)}
                        className="px-4 py-2 rounded-md text-xs font-bold uppercase tracking-widest transition-all hover:scale-[1.02]"
                        style={{
                            background: tab === t ? '#6366f1' : 'rgba(255,255,255,0.04)',
                            color: tab === t ? 'white' : '#6b7280',
                            border: '1px solid',
                            borderColor: tab === t ? '#6366f1' : 'rgba(255,255,255,0.06)',
                        }}>
                        {t === 'paste' ? 'Paste / Upload' : 'Try Sample Data'}
                    </button>
                ))}
            </div>

            {tab === 'sample' ? (
                <div className="rounded-xl p-8 text-center anim-scale-in"
                    style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <FileText className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
                    <h3 className="text-white font-bold text-lg mb-2">Try with sample feedback</h3>
                    <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
                        See how Zointly works using 60 realistic SaaS product feedback entries across several categories.
                    </p>
                    <button onClick={handleSample} disabled={loading} className="btn-primary hover:scale-[1.02] transition-transform">
                        {loading ? 'Analyzing...' : 'Run Sample Analysis →'}
                    </button>
                </div>
            ) : (
                <div className="space-y-4 anim-slide-up">
                    {error && (
                        <div className="rounded-lg p-4 border anim-scale-in"
                            style={{ background: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.2)' }}>
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    {/* CSV Upload */}
                    <div>
                        <input ref={fileRef} type="file" accept=".csv" onChange={handleFile} className="hidden" />
                        <button onClick={() => fileRef.current?.click()}
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-md border transition-all text-sm font-medium text-slate-400 hover:text-white hover:border-indigo-500/30"
                            style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                            <Upload className="w-4 h-4" />
                            Upload CSV (one feedback per row)
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex-1 border-t" style={{ borderColor: '#1f1f23' }} />
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">or paste text</span>
                        <div className="flex-1 border-t" style={{ borderColor: '#1f1f23' }} />
                    </div>

                    <div>
                        <textarea value={input} onChange={e => setInput(e.target.value)}
                            className="field resize-none transition-all focus:border-indigo-500/40"
                            rows={14}
                            placeholder={"Paste customer feedback here — one entry per line.\n\nExamples:\nThe search doesn't find related tickets even with different words.\nBulk export would save my team hours every week.\nIntegration with Slack would be a game changer..."} />
                        <p className="text-[11px] mt-2 font-medium transition-colors"
                            style={{ color: lineCount < 30 ? '#6b7280' : '#6366f1' }}>
                            {lineCount} entries {lineCount < 30 && `(need at least 30)`}
                        </p>
                    </div>

                    <button onClick={() => submit(input)} disabled={loading || lineCount < 30}
                        className="btn-primary w-full hover:scale-[1.01] transition-transform disabled:hover:scale-100">
                        {loading ? 'Sending to analysis...' : (
                            <><span>Analyze Feedback</span><ChevronRight className="w-4 h-4" /></>
                        )}
                    </button>
                </div>
            )}
        </div>
    )
}
