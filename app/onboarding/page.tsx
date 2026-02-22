'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import UpgradeButton from '@/components/pricing/UpgradeButton'
import { createClient } from '@/lib/supabase/client'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion'
import { Check, Globe, Users, Brain, Building2, Newspaper, Mail, Mic, Instagram, Facebook, Youtube, Linkedin, Twitter, MessageSquare, HelpCircle, Monitor, Star, Crown, ArrowLeft, ChevronDown, Database, Upload, Zap, ChevronRight, CheckCircle2 } from 'lucide-react'
import { SAMPLE_FEEDBACK } from '@/lib/sample-data'
import Script from 'next/script'

type Step = 'personalize' | 'persona' | 'discovery' | 'pricing' | 'welcome'

const PERSONAS = [
    { id: 'personal', title: 'Personal use', icon: Star },
    { id: 'creator', title: 'Creator', icon: Globe },
    { id: 'content', title: 'Content business', icon: Mic },
    { id: 'voice', title: 'Voice actor', icon: Mic },
    { id: 'engineer', title: 'Engineer', icon: Brain },
    { id: 'marketer', title: 'Marketer', icon: Building2 },
    { id: 'education', title: 'Education', icon: Users },
    { id: 'other', title: 'Other', icon: HelpCircle },
]

const SOURCES = [
    { id: 'friends', title: 'Friends or School', icon: Users },
    { id: 'ai', title: 'ChatGPT, Claude, etc.', icon: Brain },
    { id: 'work', title: 'From work', icon: Building2 },
    { id: 'news', title: 'In the news', icon: Newspaper },
    { id: 'newsletter', title: 'Newsletter or Blog', icon: Mail },
    { id: 'podcast', title: 'Podcast', icon: Mic },
    { id: 'google', title: 'Google', icon: Globe },
    { id: 'instagram', title: 'Instagram', icon: Instagram },
    { id: 'facebook', title: 'Facebook', icon: Facebook },
    { id: 'youtube', title: 'YouTube', icon: Youtube },
    { id: 'linkedin', title: 'LinkedIn', icon: Linkedin },
    { id: 'tiktok', title: 'TikTok', icon: MessageSquare }, // Note: Tiktok icon not in lucide
    { id: 'x', title: 'X', icon: Twitter },
    { id: 'dont-remember', title: "Don't remember", icon: HelpCircle },
    { id: 'other', title: 'Other', icon: HelpCircle },
]

const PLANS = [
    { id: 'starter', name: 'Starter', price: '0', currency: '$', features: ['3 analyses / month', 'Up to 500 entries', 'Public reports', 'Basic opportunities'] },
    { id: 'growth', name: 'Growth', price_monthly: '2,999', price_annual: '29,999', currency: '₹', popular: true, promo: 'Save ₹6,000 yearly', features: ['50 analyses / month', 'Up to 5,000 entries', 'Insight alerts', 'Email notifications', 'Priority processing'] },
    { id: 'enterprise', name: 'Enterprise', price: 'Custom', currency: '', features: ['Unlimited analyses', 'Unlimited entries', 'White-label reports', 'Dedicated support', 'Custom API access'] },
]

export default function OnboardingPage() {
    const [step, setStep] = useState<Step>('personalize')
    const [name, setName] = useState('')
    const [lang, setLang] = useState('English')
    const [ageConfirmed, setAgeConfirmed] = useState(false)
    const [selectedPersona, setSelectedPersona] = useState('')
    const [selectedSource, setSelectedSource] = useState('')
    const [selectedPlan, setSelectedPlan] = useState('')
    const [billingInterval, setBillingInterval] = useState<'monthly' | 'annual'>('monthly')
    const [loading, setLoading] = useState(false)
    const [paymentLoading, setPaymentLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const checkOnboarding = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                router.push('/sign-up?redirect=/onboarding')
                return
            }

            const { data: profile } = await supabase
                .from('users')
                .select('onboarding_completed')
                .eq('id', user.id)
                .single()

            if (profile?.onboarding_completed) {
                router.push('/dashboard')
            }
        }
        checkOnboarding()
    }, [supabase, router])

    const stepIndex = ['personalize', 'persona', 'discovery', 'pricing', 'welcome'].indexOf(step)

    const completeOnboarding = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            await supabase.from('users').update({ onboarding_completed: true }).eq('id', user.id)
        }
    }

    const handleSampleAnalysis = async () => {
        setLoading(true)
        await completeOnboarding()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            router.push('/sign-up?redirect=/onboarding')
            return
        }

        try {
            const res = await fetch('/api/analysis/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: 'Sample Feedback Analysis',
                    feedback: SAMPLE_FEEDBACK,
                    is_sample: true
                })
            })
            const data = await res.json()
            if (data.id) router.push(`/analysis/${data.id}`)
        } catch (error) {
            console.error('Failed to start sample analysis:', error)
            setLoading(false)
        }
    }

    const handleUploadOwn = async () => {
        await completeOnboarding()
        router.push('/analysis/new')
    }

    const handleSkip = async () => {
        await completeOnboarding()
        router.push('/dashboard')
    }

    const selectPersona = (id: string) => {
        setSelectedPersona(id)
        setTimeout(() => setStep('discovery'), 300)
    }

    const selectSource = (id: string) => {
        setSelectedSource(id)
        setTimeout(() => setStep('pricing'), 300)
    }

    const handlePlanSelection = async (planId: string) => {
        if (planId === 'starter') {
            setSelectedPlan(planId)
            setTimeout(() => setStep('welcome'), 300)
            return
        }

        if (planId === 'enterprise') {
            window.location.href = 'mailto:hello@zointly.com'
            return
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-6 text-white"
            style={{ background: '#0a0a0b' }}>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            {/* Glow background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20"
                    style={{ background: 'rgba(79,70,229,0.15)' }} />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-15"
                    style={{ background: 'rgba(99,102,241,0.1)' }} />
            </div>

            {/* Dots Pagination */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-50">
                {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === stepIndex ? 'w-8 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'w-1.5 bg-white/10'}`} />
                ))}
            </div>

            <div className="w-full max-w-2xl relative z-10 flex flex-col items-center">
                {/* Step 1: Personalize */}
                {step === 'personalize' && (
                    <FadeIn className="w-full flex flex-col items-center">
                        <h1 className="font-display text-2xl md:text-4xl font-bold text-white mb-10 text-center tracking-tight leading-snug">Help us personalize your experience</h1>
                        <div className="w-full max-w-md space-y-8">
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">What&apos;s your name? <span className="text-slate-600 font-normal lowercase">(optional)</span></label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-5 py-3.5 rounded-xl border border-white/5 bg-white/5 text-white text-base focus:border-indigo-500/50 outline-none transition-all placeholder:text-slate-700"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">What&apos;s your preferred language?</label>
                                <div className="w-full px-5 py-3.5 rounded-xl border border-white/5 bg-white/5 text-white text-base flex items-center justify-between cursor-pointer hover:bg-white/[0.07] transition-colors">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl leading-none">🇺🇸</span>
                                        <span className="leading-none">{lang}</span>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-slate-600" />
                                </div>
                            </div>

                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded-lg border-2 flex-shrink-0 flex items-center justify-center transition-all ${ageConfirmed ? 'bg-indigo-600 border-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.4)]' : 'border-white/10 bg-white/5 group-hover:border-white/20'}`}
                                    onClick={() => setAgeConfirmed(!ageConfirmed)}>
                                    {ageConfirmed && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <span className="text-slate-500 text-xs leading-relaxed">
                                    I confirm I am 18+ years old (or the legal age of majority in my location).
                                </span>
                            </label>

                            <button
                                disabled={!ageConfirmed}
                                onClick={() => setStep('persona')}
                                className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-indigo-500 disabled:opacity-30 disabled:hover:scale-100 transition-all shadow-[0_0_30px_rgba(79,70,229,0.3)] active:scale-95"
                            >
                                Continue
                            </button>
                        </div>
                    </FadeIn>
                )}

                {/* Step 2: Persona */}
                {step === 'persona' && (
                    <FadeIn className="w-full flex flex-col items-center">
                        <h1 className="font-display text-2xl md:text-4xl font-bold text-white mb-10 text-center tracking-tight leading-snug">Which one describes you the best?</h1>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full mb-10">
                            {PERSONAS.map((p) => {
                                const Icon = p.icon
                                return (
                                    <button
                                        key={p.id}
                                        onClick={() => selectPersona(p.id)}
                                        className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all group ${selectedPersona === p.id ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_40px_rgba(79,70,229,0.2)] scale-105' : 'border-white/5 bg-white/2 hover:border-white/10 hover:bg-white/5 hover:scale-[1.02]'}`}
                                    >
                                        <Icon className={`w-7 h-7 mb-4 transition-colors ${selectedPersona === p.id ? 'text-indigo-400' : 'text-slate-700 group-hover:text-slate-400'}`} />
                                        <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${selectedPersona === p.id ? 'text-white' : 'text-slate-600'}`}>{p.title}</span>
                                    </button>
                                )
                            })}
                        </div>
                        <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest">
                            <button onClick={() => setStep('personalize')} className="text-slate-700 hover:text-white flex items-center gap-2 transition-colors">
                                <ArrowLeft className="w-4 h-4" /> Back
                            </button>
                            <button onClick={() => setStep('discovery')} className="text-slate-700 hover:text-white transition-colors">Skip</button>
                        </div>
                    </FadeIn>
                )}

                {/* Step 3: Discovery */}
                {step === 'discovery' && (
                    <FadeIn className="w-full flex flex-col items-center">
                        <h1 className="font-display text-2xl md:text-4xl font-bold text-white mb-10 text-center tracking-tight leading-snug">How did you hear about Zointly?</h1>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full mb-10">
                            {SOURCES.map((s) => {
                                const Icon = s.icon
                                return (
                                    <button
                                        key={s.id}
                                        onClick={() => selectSource(s.id)}
                                        className={`flex items-center gap-3 px-5 py-4 rounded-xl border transition-all group text-left ${selectedSource === s.id ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_30px_rgba(79,70,229,0.1)]' : 'border-white/5 bg-white/2 hover:border-white/10 hover:bg-white/5'}`}
                                    >
                                        <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${selectedSource === s.id ? 'text-indigo-400' : 'text-slate-700 group-hover:text-slate-400'}`} />
                                        <span className={`text-[9px] font-bold uppercase tracking-widest transition-colors ${selectedSource === s.id ? 'text-white' : 'text-slate-600'}`}>{s.title}</span>
                                    </button>
                                )
                            })}
                        </div>
                        <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest">
                            <button onClick={() => setStep('persona')} className="text-slate-700 hover:text-white flex items-center gap-2 transition-colors">
                                <ArrowLeft className="w-4 h-4" /> Back
                            </button>
                            <button onClick={() => setStep('pricing')} className="text-slate-700 hover:text-white transition-colors">Skip</button>
                        </div>
                    </FadeIn>
                )}

                {/* Step 4: Pricing */}
                {step === 'pricing' && (
                    <FadeIn className="w-full flex flex-col items-center max-w-3xl">
                        <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-10">
                            <div className="text-center md:text-left">
                                <h1 className="font-display text-2xl font-bold text-white mb-2">Start free. Scale later.</h1>
                                <p className="text-slate-500 text-xs">Plans scale with your analysis needs.</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
                                    <button
                                        onClick={() => setBillingInterval('monthly')}
                                        className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all ${billingInterval === 'monthly' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-300'}`}
                                    >
                                        Monthly
                                    </button>
                                    <button
                                        onClick={() => setBillingInterval('annual')}
                                        className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all ${billingInterval === 'annual' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-300'}`}
                                    >
                                        Yearly
                                    </button>
                                </div>
                                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                                    <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                                    <span className="text-green-400 text-[8px] font-black uppercase tracking-widest">2 months free</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mb-10 items-stretch">
                            {PLANS.map((p) => {
                                const displayPrice = billingInterval === 'monthly' ? (p.price_monthly || p.price) : (p.price_annual || p.price)
                                return (
                                    <div key={p.id} className={`relative flex flex-col p-6 rounded-[1.5rem] border transition-all overflow-hidden ${p.popular ? 'border-indigo-600 bg-indigo-500/5 shadow-[0_0_60px_rgba(79,70,229,0.15)] scale-[1.02] z-10' : 'border-white/5 bg-white/2 hover:border-white/10'}`}>
                                        {p.popular && (
                                            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[7px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-bl-lg">
                                                Popular
                                            </div>
                                        )}
                                        <div className="mb-6">
                                            <h3 className={`text-[9px] font-bold uppercase tracking-[0.3em] mb-4 ${p.popular ? 'text-indigo-400' : 'text-slate-600'}`}>{p.name}</h3>
                                            <div className="flex items-baseline gap-1">
                                                {p.currency && <span className="text-base font-bold text-slate-600">{p.currency}</span>}
                                                <span className="text-3xl font-bold text-white font-display tracking-tight">{displayPrice}</span>
                                                <span className="text-slate-700 text-[10px] font-medium">
                                                    {p.id === 'growth' ? (billingInterval === 'monthly' ? '/mo' : '/yr') : (p.id === 'starter' ? ' forever' : '')}
                                                </span>
                                            </div>
                                            {p.promo && billingInterval === 'annual' && <p className="mt-2 text-[8px] font-black text-green-400 uppercase tracking-widest">{p.promo}</p>}
                                        </div>
                                        <ul className="space-y-3 mb-8 flex-grow">
                                            {p.features.map((f, i) => (
                                                <li key={i} className="flex items-start gap-2.5 text-[10px] text-slate-500 leading-relaxed font-medium">
                                                    <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${p.popular ? 'text-indigo-400' : 'text-slate-700'}`} /> {f}
                                                </li>
                                            ))}
                                        </ul>
                                        {p.id === 'growth' ? (
                                            <UpgradeButton
                                                interval={billingInterval}
                                                cta="Select Plan"
                                                onSuccess={async () => {
                                                    await completeOnboarding()
                                                    setStep('welcome')
                                                }}
                                                className={selectedPlan === p.id || p.popular ? 'bg-indigo-600' : 'bg-white/5 border border-white/5 text-slate-500'}
                                                style={{
                                                    boxShadow: (selectedPlan === p.id || p.popular) ? '0 4px_15px_rgba(79,70,229,0.3)' : 'none'
                                                }}
                                            />
                                        ) : (
                                            <button
                                                disabled={paymentLoading}
                                                onClick={() => handlePlanSelection(p.id)}
                                                className={`w-full py-3.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${selectedPlan === p.id || p.popular ? 'bg-indigo-600 text-white shadow-[0_4px_15px_rgba(79,70,229,0.3)]' : 'bg-white/5 border border-white/5 text-slate-500 hover:bg-white/10'}`}
                                            >
                                                {paymentLoading && p.id === 'growth' ? 'Processing...' : (p.id === 'enterprise' ? 'Contact Sales' : 'Select Plan')}
                                            </button>
                                        )}
                                    </div>
                                )
                            })}
                        </div>

                        <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest">
                            <button onClick={() => setStep('discovery')} className="text-slate-700 hover:text-white flex items-center gap-2 transition-colors">
                                <ArrowLeft className="w-4 h-4" /> Back
                            </button>
                            <button onClick={() => setStep('welcome')} className="text-slate-700 hover:text-white transition-colors">Skip</button>
                        </div>
                    </FadeIn>
                )}

                {/* Step 5: Welcome (Polished Choices) */}
                {step === 'welcome' && (
                    <FadeIn className="w-full flex flex-col items-center max-w-2xl">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(79,70,229,0.4)]">
                            <Brain className="w-7 h-7 text-white" />
                        </div>
                        <h1 className="font-display text-2xl md:text-4xl font-bold text-white mb-4 text-center tracking-tight leading-tight">Let&apos;s generate your first insight</h1>
                        <p className="text-slate-500 text-sm mb-10 text-center max-w-md font-medium leading-relaxed">
                            Upload your feedback or explore with our real dataset.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-10">
                            <div className="group bg-indigo-600/5 p-8 rounded-[2rem] border border-indigo-500/20 flex flex-col items-center text-center transition-all hover:scale-[1.02] hover:bg-indigo-600/10 cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
                                onClick={!loading ? handleSampleAnalysis : undefined}>
                                <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                                    <Database className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Try Sample</h3>
                                <p className="text-slate-600 text-xs mb-8 leading-relaxed font-medium">Explore power using real data in seconds.</p>
                                <button className="w-full py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-white border-2 border-indigo-600 rounded-xl hover:bg-indigo-600 transition-all">
                                    {loading ? 'Processing...' : 'Start Sample'}
                                </button>
                            </div>

                            <div className="group bg-white/2 p-8 rounded-[2rem] border border-white/5 flex flex-col items-center text-center transition-all hover:border-white/10 hover:scale-[1.02] cursor-pointer"
                                onClick={handleUploadOwn}>
                                <div className="w-16 h-16 rounded-2xl bg-white/5 text-slate-700 flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                                    <Upload className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Upload Own</h3>
                                <p className="text-slate-600 text-xs mb-8 leading-relaxed font-medium">Upload CSV or paste text to analyze.</p>
                                <button className="w-full py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 border-2 border-white/5 rounded-xl hover:border-white hover:text-white transition-all">
                                    Upload Own
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            <button onClick={() => setStep('pricing')} className="text-slate-700 font-bold text-[10px] uppercase tracking-widest hover:text-white flex items-center gap-2 transition-colors">
                                <ArrowLeft className="w-4 h-4" /> Back
                            </button>
                            <button onClick={handleSkip} className="text-slate-700 font-bold text-[10px] uppercase tracking-widest hover:text-white underline transition-colors decoration-indigo-500/50">Skip all</button>
                        </div>
                    </FadeIn>
                )}
            </div>
        </div>
    )
}
