import type { Metadata } from 'next'
import Link from 'next/link'
import { Zap, Search, Share2, Bell, Shield, Globe, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'Built by PMs for PMs. Learn how Zointly is bridging the product discovery gap with the first AI Copilot for Product Intelligence.',
}
import MarketingNav from '@/components/layout/MarketingNav'
import MarketingFooter from '@/components/layout/MarketingFooter'
import { FadeIn, StaggerContainer, StaggerItem, HeroBackground3D } from '@/components/ui/motion'

const values = [
    { icon: Search, title: 'Evidence over Intuition', desc: 'Every product decision at Zointly is backed by data. We build tools that demand the same rigour from our customers.' },
    { icon: Zap, title: 'Speed of Signal', desc: 'The fastest product teams win. We compress weeks of user research into under 60 seconds.' },
    { icon: Shield, title: 'Radical Transparency', desc: 'Verbatim quotes, not paraphrased summaries. Customers deserve to see the raw evidence behind every decision.' },
    { icon: Globe, title: 'Democratize Intelligence', desc: 'Fortune 500 teams shouldn\'t be the only ones with access to enterprise-grade product intelligence.' },
]

const team = [
    { name: 'S. Maykott', role: 'Founder & CEO', bio: 'Former product manager obsessed with turning fuzzy user feedback into clear decision signals.' },
    { name: 'S. Maykott', role: 'Head of Engineering', bio: 'Built scalable data pipelines at DataScale. Believer in fast feedback loops between code and customers.' },
    { name: 'S. Maykott', role: 'Head of Product', bio: '10+ years shipping B2B SaaS. Passionate about tools that make product teams move faster and smarter.' },
]

export default function AboutPage() {
    return (
        <div className="min-h-screen" style={{ background: '#080808' }}>
            <MarketingNav />

            {/* Hero */}
            <section className="pt-48 pb-20 text-center px-6 relative overflow-hidden">
                <HeroBackground3D />
                <FadeIn className="relative z-10 max-w-3xl mx-auto">
                    <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-[0.3em] mb-4">Our Story</p>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Built by PMs who were tired<br />of building the wrong things.
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        Zointly was born from a simple frustration: product teams spend more time arguing about what to build than actually building it. Customer feedback exists but it&apos;s buried in spreadsheets, Notion docs, and inboxes.
                        We built Zointly to change that.
                    </p>
                </FadeIn>
            </section>

            {/* Mission */}
            <section className="pb-24 px-6 relative z-10">
                <FadeIn className="max-w-4xl mx-auto rounded-[2rem] p-8 md:p-14 text-center bg-black/40 backdrop-blur-xl border border-white/5 shadow-2xl transition-all duration-500">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 mb-8">
                        <Target className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300">Our Mission</span>
                    </div>
                    <blockquote className="font-display text-2xl md:text-4xl font-bold text-white leading-tight mb-10">
                        &ldquo;To bridge the distance between what users say and what product teams build, making data-driven discovery the default for every company on earth.&rdquo;
                    </blockquote>
                    <div className="grid md:grid-cols-2 gap-8 text-left border-t border-white/5 pt-10 mt-10">
                        <div>
                            <h4 className="text-indigo-400 font-bold text-xs uppercase tracking-widest mb-3">The Problem</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Most product teams are flying blind. They have mountains of data but zero signal. Decisions are made by the Loudest Person In The Room (HiPPO), while real user needs get buried in support tickets and slack channels.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-purple-400 font-bold text-xs uppercase tracking-widest mb-3">The Solution</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                We built Zointly to act as a tireless researcher. By using AI to score demand based on frequency, urgency, and intensity, we turn fuzzy qualitative feedback into hard, undeniable evidence for your roadmap.
                            </p>
                        </div>
                    </div>
                </FadeIn>
            </section>

            {/* Values */}
            <section className="border-t pb-24 px-6" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <FadeIn className="max-w-5xl mx-auto pt-20">
                    <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-[0.3em] mb-4 text-center">What We Stand For</p>
                    <h2 className="font-display text-3xl font-bold text-white text-center mb-14">Our Core Values</h2>
                    <StaggerContainer className="grid md:grid-cols-2 gap-6">
                        {values.map(({ icon: Icon, title, desc }) => (
                            <StaggerItem key={title} className="flex gap-5 p-7 rounded-[1.5rem] bg-black/40 border border-white/5 hover:border-white/10 transition-colors">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.15)' }}>
                                    <Icon className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div>
                                    <h3 className="font-display text-base font-bold text-white mb-2">{title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </FadeIn>
            </section>

            {/* Team */}
            <section className="border-t pb-24 px-6" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <FadeIn className="max-w-5xl mx-auto pt-20">
                    <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-[0.3em] mb-4 text-center">The Team</p>
                    <h2 className="font-display text-3xl font-bold text-white text-center mb-14">The Builders</h2>
                    <StaggerContainer className="grid md:grid-cols-3 gap-6">
                        {team.map(({ name, role, bio }) => (
                            <StaggerItem key={name} className="p-7 rounded-[1.5rem] text-center bg-black/40 border border-white/5 hover:-translate-y-2 transition-transform">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4"
                                    style={{ background: '#6366f1' }}>{name[0]}</div>
                                <p className="font-display text-base font-bold text-white">{name}</p>
                                <p className="text-indigo-400 text-xs font-semibold mb-3">{role}</p>
                                <p className="text-slate-500 text-sm leading-relaxed">{bio}</p>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </FadeIn>
            </section>

            {/* Stats */}
            <section className="border-t pb-24 px-6" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <FadeIn className="max-w-5xl mx-auto pt-20">
                    <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { value: '10,000+', label: 'Analyses Run' },
                            { value: '500+', label: 'Product Teams' },
                            { value: '< 60s', label: 'Avg. Analysis Time' },
                            { value: '98%', label: 'Accuracy Rate' },
                        ].map(({ value, label }) => (
                            <StaggerItem key={label} className="text-center p-4 sm:p-6 rounded-[1.5rem] bg-black/40 border border-white/5">
                                <p className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">{value}</p>
                                <p className="text-slate-500 text-[10px] sm:text-sm">{label}</p>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </FadeIn>
            </section>

            {/* CTA */}
            <section className="border-t pb-24 px-6" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <FadeIn className="max-w-xl mx-auto pt-20 text-center">
                    <h2 className="font-display text-2xl font-bold text-white mb-4">Join us in building smarter product teams.</h2>
                    <p className="text-slate-400 mb-8">Start free. No credit card needed.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/sign-up"
                            className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-full font-bold text-[10px] uppercase tracking-widest hover:scale-[1.05] transition-all border-none bg-gradient-to-r from-indigo-400 to-purple-400 shadow-[0_0_24px_rgba(192,132,252,0.4)]">
                            Get Started Free
                            <span className="w-4 h-4 transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                        <Link href="/contact"
                            className="text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-bold text-[10px] uppercase tracking-widest bg-black/40 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all flex items-center justify-center">
                            Contact the Team
                        </Link>
                    </div>
                </FadeIn>
            </section>

            <MarketingFooter />
        </div>
    )
}
