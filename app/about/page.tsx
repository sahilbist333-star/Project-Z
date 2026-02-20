import Link from 'next/link'
import { Zap, Search, Share2, Bell, Shield, Globe } from 'lucide-react'
import MarketingNav from '@/components/layout/MarketingNav'

const values = [
    { icon: Search, title: 'Evidence over Intuition', desc: 'Every product decision at Zointly is backed by data. We build tools that demand the same rigour from our customers.' },
    { icon: Zap, title: 'Speed of Signal', desc: 'The fastest product teams win. We compress weeks of user research into under 60 seconds.' },
    { icon: Shield, title: 'Radical Transparency', desc: 'Verbatim quotes, not paraphrased summaries. Customers deserve to see the raw evidence behind every decision.' },
    { icon: Globe, title: 'Democratize Intelligence', desc: 'Fortune 500 teams shouldn\'t be the only ones with access to enterprise-grade product intelligence.' },
]

const team = [
    { name: 'Sahil', role: 'Founder & CEO', bio: 'Former product manager obsessed with turning fuzzy user feedback into clear decision signals.' },
    { name: 'Alex Rivera', role: 'Head of Engineering', bio: 'Built scalable data pipelines at DataScale. Believer in fast feedback loops between code and customers.' },
    { name: 'Priya Singh', role: 'Head of Product', bio: '10+ years shipping B2B SaaS. Passionate about tools that make product teams move faster and smarter.' },
]

export default function AboutPage() {
    return (
        <div className="min-h-screen" style={{ background: '#080808' }}>
            <MarketingNav />

            {/* Hero */}
            <section className="pt-24 pb-20 text-center px-6 relative">
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 60%)' }} />
                <div className="relative z-10 max-w-3xl mx-auto">
                    <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-[0.3em] mb-4">Our Story</p>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Built by PMs who were tired<br />of building the wrong things.
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        Zointly was born from a simple frustration: product teams spend more time arguing about what to build than actually building it. Customer feedback exists but it&apos;s buried in spreadsheets, Notion docs, and inboxes.
                        We built Zointly to change that.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="pb-24 px-6">
                <div className="max-w-4xl mx-auto rounded-2xl p-12 text-center"
                    style={{ background: '#0d0d0f', border: '1px solid rgba(99,102,241,0.15)' }}>
                    <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-[0.3em] mb-4">Our Mission</p>
                    <blockquote className="font-display text-2xl md:text-3xl font-bold text-white leading-snug">
                        &ldquo;Give every product team access to the same quality of decision intelligence that only the largest companies could afford.&rdquo;
                    </blockquote>
                </div>
            </section>

            {/* Values */}
            <section className="border-t pb-24 px-6" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <div className="max-w-5xl mx-auto pt-20">
                    <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-[0.3em] mb-4 text-center">What We Stand For</p>
                    <h2 className="font-display text-3xl font-bold text-white text-center mb-14">Our Core Values</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {values.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="flex gap-5 p-7 rounded-xl" style={{ background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.07)' }}>
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.15)' }}>
                                    <Icon className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div>
                                    <h3 className="font-display text-base font-bold text-white mb-2">{title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="border-t pb-24 px-6" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <div className="max-w-5xl mx-auto pt-20">
                    <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-[0.3em] mb-4 text-center">The Team</p>
                    <h2 className="font-display text-3xl font-bold text-white text-center mb-14">The Builders</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {team.map(({ name, role, bio }) => (
                            <div key={name} className="p-7 rounded-xl text-center" style={{ background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.07)' }}>
                                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4"
                                    style={{ background: '#6366f1' }}>{name[0]}</div>
                                <p className="font-display text-base font-bold text-white">{name}</p>
                                <p className="text-indigo-400 text-xs font-semibold mb-3">{role}</p>
                                <p className="text-slate-500 text-sm leading-relaxed">{bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="border-t pb-24 px-6" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <div className="max-w-5xl mx-auto pt-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { value: '10,000+', label: 'Analyses Run' },
                            { value: '500+', label: 'Product Teams' },
                            { value: '< 60s', label: 'Avg. Analysis Time' },
                            { value: '98%', label: 'Accuracy Rate' },
                        ].map(({ value, label }) => (
                            <div key={label} className="text-center p-6 rounded-xl" style={{ background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.07)' }}>
                                <p className="font-display text-3xl font-bold text-white mb-1">{value}</p>
                                <p className="text-slate-500 text-sm">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="border-t pb-24 px-6" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <div className="max-w-xl mx-auto pt-20 text-center">
                    <h2 className="font-display text-2xl font-bold text-white mb-4">Join us in building smarter product teams.</h2>
                    <p className="text-slate-400 mb-8">Start free. No credit card needed.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/sign-up" style={{ background: '#6366f1' }}
                            className="text-white px-8 py-3 rounded-sm font-bold text-[9px] uppercase tracking-widest hover:opacity-90 transition-all">
                            Get Started Free →
                        </Link>
                        <Link href="/contact"
                            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                            className="text-slate-300 px-8 py-3 rounded-sm font-bold text-[9px] uppercase tracking-widest hover:bg-white/5 transition-all">
                            Contact the Team
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="border-t py-10 text-center" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <p className="text-[9px] text-slate-700 font-bold uppercase tracking-widest">© {new Date().getFullYear()} Zointly Inc. ·{' '}
                    <Link href="/privacy" className="hover:text-slate-400">Privacy</Link> ·{' '}
                    <Link href="/terms" className="hover:text-slate-400">Terms</Link> ·{' '}
                    <Link href="/contact" className="hover:text-slate-400">Contact</Link>
                </p>
            </footer>
        </div>
    )
}
