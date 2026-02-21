'use client'
import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, ChevronDown, CheckCircle } from 'lucide-react'
import MarketingNav from '@/components/layout/MarketingNav'
import MarketingFooter from '@/components/layout/MarketingFooter'
import { FadeIn, StaggerContainer, StaggerItem, HeroBackground3D } from '@/components/ui/motion'

const faqs = [
    { q: 'Can I switch plans at any time?', a: 'Yes. Upgrade or cancel anytime from your account page. When you upgrade, you are immediately moved to the Growth plan. Downgrading takes effect at the end of your current billing cycle.' },
    { q: 'What happens to my data if I downgrade?', a: 'All your analyses and public reports remain accessible regardless of plan. Only new analysis creation is limited by your plan.' },
    { q: 'Is there a free trial of Growth?', a: 'The Starter plan is essentially a perpetual free tier. You can run 3 full analyses per month for free, indefinitely, to evaluate the product before upgrading.' },
    { q: 'How does billing work?', a: 'Growth is billed monthly via Razorpay. You will be charged ₹2,999 on the same date each month (or ₹29,999 once a year for annual billing). Enterprise plans are invoiced annually or quarterly.' },
]

export default function PricingPage() {
    const [interval, setInterval] = useState<'monthly' | 'annual'>('monthly')

    const plans = [
        {
            name: 'Starter',
            price: '$0',
            period: 'Forever free',
            description: 'Perfect for solo PMs and indie founders exploring demand-driven roadmapping.',
            features: ['3 analyses per month', '500 feedback entries per analysis', 'AI demand scoring', 'Verbatim customer quotes', 'Public shareable reports', 'Basic opportunity cards'],
            cta: 'Get Started Free',
            href: '/sign-up',
            highlight: false,
            anchorText: null,
        },
        {
            name: 'Growth',
            price: interval === 'monthly' ? '₹2,999' : '₹29,999',
            period: interval === 'monthly' ? '/month' : '/year',
            description: 'For product teams running regular analyses with higher volume and insight needs.',
            features: ['50 analyses per month', '5,000 feedback entries per analysis', 'Everything in Starter', 'Insight alerts — demand changes', 'Email notifications for new signals', 'Priority processing queue', 'Analysis history & comparison'],
            cta: interval === 'monthly' ? 'Get Growth Monthly' : 'Get Growth Annually',
            href: `/sign-up`, // Typically passing ?plan=growth via state, but sticking to standard flow
            highlight: true,
            anchorText: interval === 'annual' ? '₹2,499/month billed annually. Save ₹6,000.' : null,
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            period: '',
            description: 'For large organizations with compliance, SSO, and unlimited usage requirements.',
            features: ['Unlimited analyses', 'Unlimited entries per analysis', 'Everything in Growth', 'White-label public reports', 'SSO / SAML integration', 'Custom API access', 'Dedicated Slack support', 'Custom data retention policy'],
            cta: 'Talk to Sales',
            href: 'mailto:sales@zointly.com',
            highlight: false,
            anchorText: null,
        },
    ]

    return (
        <div className="min-h-screen" style={{ background: '#080808' }}>
            <MarketingNav />

            {/* Hero */}
            <section className="pt-48 pb-16 px-6 relative overflow-hidden">
                <HeroBackground3D />
                <FadeIn className="relative z-10 text-center flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 mb-6">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">Simple Pricing</span>
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Start free. Scale when you&apos;re ready.</h1>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10">Plans are scaled by analysis volume. No hidden fees, no seat licenses.</p>
                </FadeIn>

                {/* Billing Toggle */}
                <div className="flex items-center justify-center gap-4 text-sm">
                    <button
                        onClick={() => setInterval('monthly')}
                        className={`font-semibold transition-colors ${interval === 'monthly' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        Monthly
                    </button>
                    <button
                        className="w-12 h-6 rounded-full p-1 transition-colors outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#080808]"
                        style={{ background: interval === 'annual' ? '#6366f1' : '#1e293b' }}
                        onClick={(e) => {
                            e.preventDefault();
                            setInterval(prev => prev === 'monthly' ? 'annual' : 'monthly')
                        }}
                    >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${interval === 'annual' ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                    <button
                        onClick={() => setInterval('annual')}
                        className={`font-semibold flex items-center gap-2 transition-colors ${interval === 'annual' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        Yearly
                        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(34,197,94,0.25)', color: '#4ade80' }}>
                            Save ₹6,000
                        </span>
                    </button>
                </div>
            </section>

            {/* Plans */}
            <section className="max-w-6xl mx-auto px-6 md:px-12 pb-24 relative z-10">
                <StaggerContainer className="grid md:grid-cols-3 gap-6 items-stretch">
                    {plans.map((plan) => (
                        <StaggerItem key={plan.name} className={`flex flex-col p-8 rounded-[2rem] relative bg-black/40 backdrop-blur-xl ${plan.highlight ? 'border-2 border-indigo-500 shadow-[0_0_40px_rgba(99,102,241,0.15)]' : 'border border-white/5 hover:border-white/10 transition-colors'}`}>
                            {plan.highlight && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[8px] font-bold text-white uppercase tracking-widest"
                                    style={{ background: '#6366f1' }}>Most Popular</div>
                            )}
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: plan.highlight ? '#818cf8' : '#6b7280' }}>{plan.name}</p>
                            <div className="flex flex-col items-start mb-1 min-h-[4rem]">
                                <div className="flex items-baseline gap-1">
                                    <span className="font-display text-3xl font-bold text-white">{plan.price}</span>
                                    {plan.period && <span className="text-slate-500 text-sm">{plan.period}</span>}
                                </div>
                                {plan.anchorText && (
                                    <p className="text-indigo-400 text-xs mt-1 font-medium">{plan.anchorText}</p>
                                )}
                            </div>
                            <p className="text-slate-500 text-sm mb-6 leading-relaxed">{plan.description}</p>
                            <ul className="space-y-3 flex-grow mb-8">
                                {plan.features.map(f => (
                                    <li key={f} className="flex items-start gap-3 text-sm" style={{ color: plan.highlight ? '#e2e8f0' : '#94a3b8' }}>
                                        <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-indigo-400' : 'text-slate-600'}`} />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Link href={plan.href}
                                className={`w-full text-center py-4 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all block hover:scale-105 ${plan.highlight ? 'text-white' : 'text-slate-300 hover:text-white'}`}
                                style={plan.highlight
                                    ? { background: '#6366f1', boxShadow: '0 0 20px rgba(99,102,241,0.3)' }
                                    : { background: 'transparent', border: '1px solid rgba(255,255,255,0.1)' }}>
                                {plan.cta}
                            </Link>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* Comparison note */}
                <p className="text-center text-slate-500 font-medium text-sm mt-10">
                    All plans include permanent report URLs and verbatim customer quotes. Free plan limited to 3 analyses per month.
                </p>
            </section>

            {/* FAQ */}
            <section className="border-t pb-28 pt-20" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <FadeIn className="max-w-3xl mx-auto px-6">
                    <h2 className="font-display text-2xl font-bold text-white text-center mb-10">Pricing FAQs</h2>
                    <StaggerContainer className="space-y-3 mb-10">
                        {faqs.map(({ q, a }) => (
                            <StaggerItem key={q}>
                                <details className="group rounded-[1.5rem] bg-black/40 border border-white/5 transition-colors hover:border-white/10">
                                    <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                                        <span className="text-sm font-semibold text-white">{q}</span>
                                        <span className="text-indigo-400 group-open:rotate-45 transition-transform inline-block text-xl ml-4 flex-shrink-0">+</span>
                                    </summary>
                                    <div className="px-6 pb-6 text-sm text-slate-400 leading-relaxed">{a}</div>
                                </details>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                    <div className="text-center">
                        <p className="text-slate-500 text-sm mb-4">Still have questions?</p>
                        <Link href="/contact" className="text-indigo-400 hover:text-indigo-300 font-medium text-sm">Contact us →</Link>
                    </div>
                </FadeIn>
            </section>

            <MarketingFooter />
        </div>
    )
}
