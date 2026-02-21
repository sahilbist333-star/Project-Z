import Link from 'next/link'
import { Zap, Search, Share2, Bell, Shield, Globe } from 'lucide-react'
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
    { name: 'Sahil Maykott', role: 'Founder & CEO', bio: 'Former product manager obsessed with turning fuzzy user feedback into clear decision signals.' },
    { name: 'Alex Rivera', role: 'Head of Engineering', bio: 'Built scalable data pipelines at DataScale. Believer in fast feedback loops between code and customers.' },
    { name: 'Priya Singh', role: 'Head of Product', bio: '10+ years shipping B2B SaaS. Passionate about tools that make product teams move faster and smarter.' },
]

export default function AboutPage() {
    return (
        <div className="min-h-screen" style={{ background: '#080808' }}>
            <MarketingNav />

            {/* Hero */}
            <section className="pt-36 pb-20 text-center px-6 relative overflow-hidden">
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
                <FadeIn className="max-w-4xl mx-auto rounded-[2rem] p-12 text-center bg-black/40 backdrop-blur-xl border border-white/5 shadow-2xl skew-y-1 hover:skew-y-0 transition-transform duration-500">
                    <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-[0.3em] mb-4">Our Mission</p>
                    <blockquote className="font-display text-2xl md:text-3xl font-bold text-white leading-snug">
                        &ldquo;Give every product team access to the same quality of decision intelligence that only the largest companies could afford.&rdquo;
                    </blockquote>
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
                            className="inline-flex text-white px-8 py-4 rounded-full font-bold text-[10px] uppercase tracking-widest hover:scale-[1.05] transition-all border border-indigo-400/30"
                            style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', boxShadow: '0 0 24px rgba(99,102,241,0.6)' }}>
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
