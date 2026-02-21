'use client'
import { useState } from 'react'
import Link from 'next/link'
import { BookOpen, ArrowRight, Zap } from 'lucide-react'
import MarketingNav from '@/components/layout/MarketingNav'
import MarketingFooter from '@/components/layout/MarketingFooter'
import { FadeIn, StaggerContainer, StaggerItem, HeroBackground3D } from '@/components/ui/motion'

const posts = [
    {
        slug: 'demand-score-explained',
        category: 'Product Intelligence',
        date: 'Feb 12, 2025',
        readTime: '6 min read',
        title: 'How Zointly\'s Demand Score Works Under the Hood',
        excerpt: 'A transparent look at the weighted algorithm behind the 0–10 demand score — how we combine frequency, urgency, and sentiment to rank product opportunities.',
        image: 'data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E',
    },
    {
        slug: 'feedback-to-roadmap',
        category: 'Product Management',
        date: 'Feb 5, 2025',
        readTime: '8 min read',
        title: 'From 500 Support Tickets to a Quarterly Roadmap in 90 Seconds',
        excerpt: 'A step-by-step guide to using Zointly to process a full quarter of support feedback and turn it into a prioritized, evidence-backed product roadmap.',
        image: 'data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E',
    },
    {
        slug: 'stakeholder-report-strategy',
        category: 'Product Strategy',
        date: 'Jan 28, 2025',
        readTime: '5 min read',
        title: 'Why Verbatim Customer Quotes Beat Any Slide Deck',
        excerpt: 'Product leaders share how replacing summary slides with raw customer feedback in Zointly reports completely changed how engineering and design engaged with prioritization.',
        image: 'data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E',
    },
    {
        slug: 'insight-alerts-guide',
        category: 'Feature Guide',
        date: 'Jan 20, 2025',
        readTime: '4 min read',
        title: 'The Complete Guide to Zointly Insight Alerts',
        excerpt: 'Insight Alerts notify you when demand surges, new signals emerge, or priorities shift. Here\'s how to configure them and what each alert type means for your roadmap.',
        image: 'data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E',
    },
    {
        slug: 'csv-feedback-guide',
        category: 'How-to Guide',
        date: 'Jan 14, 2025',
        readTime: '3 min read',
        title: 'How to Format Your CSV for Perfect Zointly Analysis',
        excerpt: 'A practical guide covering the ideal CSV structure, common formatting mistakes, and how to clean up messy export files from popular tools like Intercom, Zendesk, and Typeform.',
        image: 'data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E',
    },
    {
        slug: 'sample-data-tour',
        category: 'Getting Started',
        date: 'Jan 7, 2025',
        readTime: '3 min read',
        title: 'Your First Analysis: A Complete Walkthrough with Sample Data',
        excerpt: 'New to Zointly? This step-by-step tutorial walks you through running your first analysis using our built-in sample dataset and reading every section of the results.',
        image: 'data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E',
    },
]

export default function BlogPage() {
    const [visiblePosts, setVisiblePosts] = useState(4)

    return (
        <div className="min-h-screen" style={{ background: '#080808' }}>
            <MarketingNav />

            <section className="pt-48 pb-14 text-center px-6 relative overflow-hidden">
                <HeroBackground3D />
                <FadeIn className="relative z-10">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <BookOpen className="w-4 h-4 text-indigo-400" />
                        <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-[0.3em]">Zointly Blog</p>
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Product Intelligence Insights</h1>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto">Guides, case studies, and product updates for evidence-driven product teams.</p>
                </FadeIn>
            </section>

            {/* Featured post */}
            <section className="max-w-6xl mx-auto px-6 md:px-12 mb-16 relative z-10">
                <FadeIn delay={0.1}>
                    <div className="rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden bg-black/40 border border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.05)] group">
                        <div className="flex flex-col md:flex-row items-stretch">
                            {/* Featured Image */}
                            <div className="w-full md:w-5/12 h-56 md:h-auto bg-black/40 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 mix-blend-overlay opacity-30" style={{ backgroundImage: `url("${posts[0].image}")` }} />
                            </div>
                            <div className="w-full md:w-7/12 p-8 md:p-10 relative z-10 flex flex-col justify-center">
                                <span className="w-fit inline-block text-[9px] font-bold text-indigo-400 uppercase tracking-widest border border-indigo-500/20 rounded-full px-3 py-1 mb-4 bg-indigo-500/10">
                                    Featured · {posts[0].category}
                                </span>
                                <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-indigo-300 transition-colors">{posts[0].title}</h2>
                                <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-6 max-w-xl">{posts[0].excerpt}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <p className="text-slate-500 text-sm font-medium">{posts[0].date} · {posts[0].readTime}</p>
                                    <Link href={`/blog/${posts[0].slug}`} className="inline-flex items-center justify-center p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all hover:scale-110">
                                        <ArrowRight className="w-5 h-5 -rotate-45" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </section>

            {/* Content Layout */}
            <section className="max-w-6xl mx-auto px-6 md:px-12 pb-28 relative z-10 flex flex-col lg:flex-row gap-12">
                {/* Main Grid */}
                <div className="lg:w-2/3">
                    <h3 className="font-display text-2xl font-bold text-white mb-8 border-b pb-4" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>Latest Articles</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {posts.slice(1, visiblePosts + 1).map((post) => (
                            <Link href={`/blog/${post.slug}`} key={post.slug} className="flex flex-col rounded-[1.5rem] overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] cursor-pointer bg-black/40 border border-white/5 hover:border-indigo-500/20 group">
                                <div className="w-full aspect-video bg-black/40 relative overflow-hidden border-b border-white/5">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 mix-blend-overlay opacity-30" style={{ backgroundImage: `url("${post.image}")` }} />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <span className="text-[8px] font-bold text-indigo-400 uppercase tracking-widest mb-3">{post.category}</span>
                                    <h2 className="font-display text-lg font-bold text-white mb-3 leading-snug flex-grow group-hover:text-indigo-300 transition-colors">{post.title}</h2>
                                    <p className="text-slate-500 text-xs leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                                        <span className="text-[9px] font-medium text-slate-500">{post.date}</span>
                                        <span className="text-[9px] font-medium text-slate-500">{post.readTime}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination Options */}
                    {visiblePosts < posts.length - 1 && (
                        <div className="mt-16 text-center border-t pt-10" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                            <button
                                onClick={() => setVisiblePosts(prev => prev + 4)}
                                className="inline-flex text-white px-8 py-4 rounded-full font-bold text-[10px] uppercase tracking-widest hover:scale-[1.05] transition-all bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20">
                                Load More Articles
                            </button>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="lg:w-1/3 space-y-10">
                    <div className="rounded-[2rem] bg-black/40 border border-white/5 p-8 relative overflow-hidden">
                        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: 'radial-gradient(circle at top right, rgba(99,102,241,0.3) 0%, transparent 70%)' }} />
                        <h3 className="font-display text-xl font-bold text-white mb-8">Most Popular</h3>
                        <div className="space-y-6">
                            {[posts[1], posts[2], posts[4]].map((post, index) => (
                                <Link href={`/blog/${post.slug}`} key={post.slug} className="flex gap-4 group">
                                    <span className="text-2xl font-bold text-white/5 font-display mt-0.5 leading-none">{`0${index + 1}`}</span>
                                    <div>
                                        <h4 className="font-bold text-white text-sm leading-snug mb-2 group-hover:text-indigo-400 transition-colors">{post.title}</h4>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{post.category}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[2rem] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 p-8 text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 pointer-events-none" />
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(99,102,241,0.5)] group-hover:scale-110 transition-transform">
                                <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-display text-xl font-bold text-white mb-3">Never miss an insight.</h3>
                            <p className="text-slate-400 text-sm mb-6">Join 2,000+ product managers receiving our weekly newsletter.</p>
                            <Link href="/sign-up" className="w-full text-center py-3.5 rounded-xl font-bold text-[10px] uppercase tracking-widest bg-white text-black hover:bg-slate-200 transition-colors shadow-xl">
                                Subscribe Free
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-5xl mx-auto px-6 md:px-12 pb-16 relative z-10 text-center">
                <div className="p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden" style={{ background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: 'radial-gradient(circle at center, rgba(99,102,241,0.2) 0%, transparent 70%)' }} />
                    <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                        <Zap className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-4">Ready to transform your feedback?</h2>
                    <p className="text-slate-400 text-base md:text-lg mb-8 max-w-xl mx-auto">Stop guessing what to build next. Join Zointly today and turn raw customer data into a prioritized, evidence-backed product roadmap.</p>
                    <Link href="/sign-up"
                        className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-full font-bold text-[11px] uppercase tracking-widest hover:scale-[1.05] transition-all border-none bg-gradient-to-r from-indigo-400 to-purple-400 shadow-[0_0_24px_rgba(192,132,252,0.4)]">
                        Get Started Free <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>
            </section>

            <MarketingFooter />
        </div>
    )
}
