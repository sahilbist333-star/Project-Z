'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Database, Upload, Zap, ChevronRight } from 'lucide-react'
import { SAMPLE_FEEDBACK } from '@/lib/sample-data'

type Step = 'welcome' | 'source' | 'discovery'

export default function OnboardingPage() {
    const [step, setStep] = useState<Step>('welcome')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const markOnboardingDone = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            await fetch('/api/user/complete-onboarding', { method: 'POST' })
        }
    }

    const handleSampleAnalysis = async () => {
        setLoading(true)
        await markOnboardingDone()
        const res = await fetch('/api/analysis/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input_text: SAMPLE_FEEDBACK.join('\n'), is_sample: true }),
        })
        const data = await res.json()
        setLoading(false)
        if (data.analysis_id) {
            router.push(`/analysis/${data.analysis_id}`)
        }
    }

    const handleUploadOwn = async () => {
        await markOnboardingDone()
        router.push('/analysis/new')
    }

    const handleSkip = async () => {
        await markOnboardingDone()
        router.push('/dashboard')
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-6"
            style={{ background: '#121214' }}>
            {/* Glow background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-40"
                    style={{ background: 'rgba(79,70,229,0.1)' }} />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-30"
                    style={{ background: 'rgba(99,102,241,0.08)' }} />
            </div>

            {step === 'welcome' && (
                <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl"
                    style={{ background: '#0a0a0b', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="absolute top-0 left-0 w-full h-px"
                        style={{ background: 'linear-gradient(to right, transparent, rgba(99,102,241,0.5), transparent)' }} />
                    <div className="px-8 py-14 md:px-16 flex flex-col items-center text-center">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-10"
                            style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
                            <Zap className="w-7 h-7 text-indigo-400" />
                        </div>
                        <p className="font-display text-[11px] font-bold tracking-[0.2em] mb-5 uppercase" style={{ color: '#6366f1' }}>
                            WELCOME TO ZOINTLY
                        </p>
                        <h1 className="font-display text-2xl md:text-4xl font-bold text-white tracking-tight mb-6 max-w-2xl leading-tight">
                            Let&apos;s generate your first product insight.
                        </h1>
                        <p className="text-slate-400 text-base md:text-lg max-w-xl mb-12 leading-relaxed font-light">
                            You can analyze your own feedback or explore how Zointly works using real sample data.
                        </p>

                        {/* Two options */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12">
                            {/* Sample */}
                            <div className="group flex flex-col p-8 rounded-2xl text-left transition-all cursor-pointer hover:border-indigo-500/50"
                                style={{ background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.3)' }}
                                onClick={!loading ? handleSampleAnalysis : undefined}>
                                <div className="flex justify-between items-start mb-8">
                                    <div className="p-3 rounded-xl text-white" style={{ background: '#6366f1' }}>
                                        <Database className="w-6 h-6" />
                                    </div>
                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                                        style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8' }}>
                                        Recommended
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">Try Sample Analysis</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-10 flex-grow">
                                    Quickly explore Zointly&apos;s powerful dashboards with a pre-loaded dataset from a real SaaS product.
                                </p>
                                <button disabled={loading}
                                    className="w-full py-3.5 px-6 text-white text-sm font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
                                    style={{ background: '#6366f1' }}>
                                    {loading ? 'Loading...' : 'Get Started'}
                                    {!loading && <ChevronRight className="w-4 h-4" />}
                                </button>
                            </div>

                            {/* Own data */}
                            <div className="group flex flex-col p-8 rounded-2xl text-left transition-all cursor-pointer hover:border-indigo-500/40"
                                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)' }}
                                onClick={handleUploadOwn}>
                                <div className="flex justify-between items-start mb-8">
                                    <div className="p-3 rounded-xl border" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: '#94a3b8' }}>
                                        <Upload className="w-6 h-6" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">Use My Feedback</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-10 flex-grow">
                                    Upload a CSV file or paste feedback to start analyzing your own customer data immediately.
                                </p>
                                <button className="w-full py-3.5 px-6 text-indigo-400 text-sm font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
                                    style={{ border: '2px solid #6366f1', background: 'transparent' }}>
                                    Upload Data
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <p className="text-slate-500 text-[11px] font-medium">
                            Sample analysis takes about 30 seconds.
                            <button onClick={handleSkip} className="ml-3 text-slate-400 hover:text-white underline">
                                Skip for now
                            </button>
                        </p>
                    </div>
                    <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)' }} />
                </div>
            )}
        </div>
    )
}
