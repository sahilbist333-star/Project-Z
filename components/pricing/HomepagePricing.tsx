'use client'
import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export default function HomepagePricing() {
    const [interval, setInterval] = useState<'monthly' | 'annual'>('monthly')

    return (
        <section className="py-20 md:py-28 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }} id="pricing">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
                <div className="text-center mb-14 hover:cursor-default">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 mb-6">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">Simple Pricing</span>
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Start free. Scale when you&apos;re ready.</h2>
                    <p className="text-slate-500 max-w-md mx-auto mb-10">Plans scale with your analysis needs. No hidden fees.</p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4 text-sm mt-8">
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
                            <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(34,197,94,0.1)', color: '#4ade80' }}>
                                Save ₹6,000
                            </span>
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
                    {/* Free */}
                    <div className="flex flex-col p-6 md:p-8 rounded-xl" style={{ background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <h3 className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Starter</h3>
                        <div className="text-3xl font-bold text-white font-display mb-2">$0</div>
                        <p className="text-slate-500 text-xs mb-6">Forever free</p>
                        <ul className="space-y-3 mb-8 flex-grow">
                            {['3 analyses / month', 'Up to 500 entries', 'Public reports', 'Basic opportunities'].map(f => (
                                <li key={f} className="flex items-start gap-3 text-sm text-slate-400">
                                    <CheckCircle2 className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <Link href="/sign-up"
                            className="w-full text-center py-3 rounded-sm border font-bold text-[9px] uppercase tracking-widest transition-all text-slate-300 hover:bg-white/5"
                            style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                            Get Started Free
                        </Link>
                    </div>

                    {/* Growth */}
                    <div className="flex flex-col p-6 md:p-8 rounded-xl relative overflow-hidden ring-2 ring-indigo-500/30"
                        style={{ background: '#0f1020', border: '2px solid #6366f1' }}>
                        <div className="absolute top-0 right-0 text-white px-3 py-1 text-[8px] font-bold uppercase tracking-widest rounded-bl-lg"
                            style={{ background: '#6366f1' }}>Most Popular</div>
                        <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: '#818cf8' }}>Growth</h3>

                        <div className="flex flex-col items-start mb-1 min-h-[4rem]">
                            <div className="flex items-baseline gap-1">
                                <span className="font-display text-3xl font-bold text-white">
                                    {interval === 'monthly' ? '₹2,999' : '₹29,999'}
                                </span>
                                <span className="text-slate-500 text-xs">
                                    {interval === 'monthly' ? '/month' : '/year'}
                                </span>
                            </div>
                            {interval === 'annual' && (
                                <p className="text-indigo-400 text-xs mt-1 font-medium">₹2,499/month billed annually. Save ₹6,000.</p>
                            )}
                        </div>

                        <p className="text-slate-500 text-xs mb-6">Billed {interval}, cancel anytime</p>
                        <ul className="space-y-3 mb-8 flex-grow">
                            {['50 analyses / month', 'Up to 5,000 entries', 'Public reports', 'Insight alerts', 'Email notifications', 'Priority processing'].map(f => (
                                <li key={f} className="flex items-start gap-3 text-sm text-white">
                                    <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <Link href="/sign-up"
                            className="w-full text-center py-3 rounded-sm text-white font-bold text-[9px] uppercase tracking-widest transition-all hover:-translate-y-1 border-none bg-gradient-to-r from-indigo-400 to-purple-400 shadow-[0_0_20px_rgba(192,132,252,0.4)]">
                            {interval === 'monthly' ? 'Get Growth Monthly' : 'Get Growth Annually'}
                        </Link>
                    </div>

                    {/* Enterprise */}
                    <div className="flex flex-col p-6 md:p-8 rounded-xl" style={{ background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <h3 className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Enterprise</h3>
                        <div className="text-3xl font-bold text-white font-display mb-2">Custom</div>
                        <p className="text-slate-500 text-xs mb-6">For large teams</p>
                        <ul className="space-y-3 mb-8 flex-grow">
                            {['Unlimited analyses', 'Unlimited entries', 'White-label reports', 'Dedicated support', 'SSO & Enhanced Security', 'Custom API access'].map(f => (
                                <li key={f} className="flex items-start gap-3 text-sm text-slate-400">
                                    <CheckCircle2 className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <a href="mailto:hello@zointly.com"
                            className="w-full text-center py-3 rounded-sm border font-bold text-[9px] uppercase tracking-widest transition-all text-slate-300 hover:bg-white/5"
                            style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                            Contact Sales
                        </a>
                    </div>
                </div>
                <p className="text-center text-slate-600 text-[11px] mt-10">
                    Free plan limited to 3 analyses per month.
                </p>
            </div>
        </section>
    )
}
