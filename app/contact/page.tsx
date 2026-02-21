'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Mail, MessageSquare, Zap, ArrowRight, Send } from 'lucide-react'
import MarketingNav from '@/components/layout/MarketingNav'
import MarketingFooter from '@/components/layout/MarketingFooter'
import { FadeIn, StaggerContainer, StaggerItem, HeroBackground3D } from '@/components/ui/motion'

export default function ContactPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('General')
    const [message, setMessage] = useState('')
    const [sent, setSent] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Build a mailto link
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
        const mailto = `mailto:hello@zointly.com?subject=${encodeURIComponent(`[Zointly] ${subject}`)}&body=${body}`
        window.location.href = mailto
        setSent(true)
    }

    return (
        <div className="min-h-screen" style={{ background: '#080808' }}>
            <MarketingNav />

            <section className="pt-48 pb-14 text-center px-6 relative overflow-hidden">
                <HeroBackground3D />
                <FadeIn className="relative z-10 flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 mb-6">
                        <Send className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">Get in Touch</span>
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
                    <p className="text-slate-400 text-lg max-w-md mx-auto">We reply within 24 hours on business days.</p>
                </FadeIn>
            </section>

            <section className="max-w-5xl mx-auto px-6 md:px-12 pb-28 relative z-10">
                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Info */}
                    <StaggerContainer className="space-y-5">
                        {[
                            { icon: Mail, title: 'Email', value: 'hello@zointly.com', href: 'mailto:hello@zointly.com' },
                            { icon: MessageSquare, title: 'Support', value: 'support@zointly.com', href: 'mailto:support@zointly.com' },
                            { icon: Zap, title: 'Enterprise Sales', value: 'sales@zointly.com', href: 'mailto:sales@zointly.com' },
                        ].map(({ icon: Icon, title, value, href }) => (
                            <StaggerItem key={title} className="p-5 rounded-[1.5rem] bg-black/40 border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-3 mb-2">
                                    <Icon className="w-4 h-4 text-indigo-400" />
                                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{title}</p>
                                </div>
                                <a href={href} className="text-sm text-white hover:text-indigo-300 transition-colors">{value}</a>
                            </StaggerItem>
                        ))}
                        <StaggerItem className="p-5 rounded-[1.5rem] bg-black/40 border border-white/5">
                            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3">Response Time</p>
                            <p className="text-sm text-slate-300">Business support: <strong className="text-white">24 hours</strong></p>
                            <p className="text-sm text-slate-300 mt-1">Enterprise / Sales: <strong className="text-white">4 hours</strong></p>
                        </StaggerItem>
                        <StaggerItem className="p-5 rounded-[1.5rem] bg-black/40 border border-white/5">
                            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3">Before You Write</p>
                            <p className="text-sm text-slate-400 mb-2">Check our <Link href="/faq" className="text-indigo-400 hover:underline">FAQ</Link> — most questions are answered there.</p>
                        </StaggerItem>
                    </StaggerContainer>

                    {/* Form */}
                    <div className="lg:col-span-2">
                        <div className="rounded-xl p-8" style={{ background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.07)' }}>
                            {sent ? (
                                <div className="text-center py-12">
                                    <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                                        style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
                                        <Mail className="w-7 h-7 text-green-400" />
                                    </div>
                                    <h3 className="font-display text-lg font-bold text-white mb-2">Message sent!</h3>
                                    <p className="text-slate-400 text-sm">Your email client should have opened. We&apos;ll get back to you within 24 hours.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Full Name</label>
                                            <input value={name} onChange={e => setName(e.target.value)} required
                                                className="field" placeholder="Alex Rivera" type="text" />
                                        </div>
                                        <div>
                                            <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Email</label>
                                            <input value={email} onChange={e => setEmail(e.target.value)} required
                                                className="field" placeholder="name@company.com" type="email" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Topic</label>
                                        <select value={subject} onChange={e => setSubject(e.target.value)}
                                            className="field" style={{ color: subject ? 'white' : '#525252' }}>
                                            {['General', 'Technical Support', 'Billing & Plans', 'Enterprise Sales', 'Partnership', 'Feature Request', 'Bug Report', 'Legal Inquiry'].map(s => (
                                                <option key={s} value={s} style={{ background: '#141414' }}>{s}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Message</label>
                                        <textarea value={message} onChange={e => setMessage(e.target.value)} required rows={5}
                                            className="field resize-none" placeholder="Tell us how we can help..." />
                                    </div>
                                    <button type="submit"
                                        className="w-full flex justify-center items-center gap-2 text-white px-8 py-4 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all mt-4 hover:scale-[1.02] shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                                        style={{ background: '#6366f1' }}>
                                        Send Message <ArrowRight className="w-4 h-4" />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <MarketingFooter />
        </div>
    )
}
