import Link from 'next/link'
import { BookOpen, ArrowRight } from 'lucide-react'
import MarketingNav from '@/components/layout/MarketingNav'

const posts = [
    {
        slug: 'demand-score-explained',
        category: 'Product Intelligence',
        date: 'Feb 12, 2025',
        readTime: '6 min read',
        title: 'How Zointly\'s Demand Score Works Under the Hood',
        excerpt: 'A transparent look at the weighted algorithm behind the 0–10 demand score — how we combine frequency, urgency, and sentiment to rank product opportunities.',
    },
    {
        slug: 'feedback-to-roadmap',
        category: 'Product Management',
        date: 'Feb 5, 2025',
        readTime: '8 min read',
        title: 'From 500 Support Tickets to a Quarterly Roadmap in 90 Seconds',
        excerpt: 'A step-by-step guide to using Zointly to process a full quarter of support feedback and turn it into a prioritized, evidence-backed product roadmap.',
    },
    {
        slug: 'stakeholder-report-strategy',
        category: 'Product Strategy',
        date: 'Jan 28, 2025',
        readTime: '5 min read',
        title: 'Why Verbatim Customer Quotes Beat Any Slide Deck',
        excerpt: 'Product leaders share how replacing summary slides with raw customer feedback in Zointly reports completely changed how engineering and design engaged with prioritization.',
    },
    {
        slug: 'insight-alerts-guide',
        category: 'Feature Guide',
        date: 'Jan 20, 2025',
        readTime: '4 min read',
        title: 'The Complete Guide to Zointly Insight Alerts',
        excerpt: 'Insight Alerts notify you when demand surges, new signals emerge, or priorities shift. Here\'s how to configure them and what each alert type means for your roadmap.',
    },
    {
        slug: 'csv-feedback-guide',
        category: 'How-to Guide',
        date: 'Jan 14, 2025',
        readTime: '3 min read',
        title: 'How to Format Your CSV for Perfect Zointly Analysis',
        excerpt: 'A practical guide covering the ideal CSV structure, common formatting mistakes, and how to clean up messy export files from popular tools like Intercom, Zendesk, and Typeform.',
    },
    {
        slug: 'sample-data-tour',
        category: 'Getting Started',
        date: 'Jan 7, 2025',
        readTime: '3 min read',
        title: 'Your First Analysis: A Complete Walkthrough with Sample Data',
        excerpt: 'New to Zointly? This step-by-step tutorial walks you through running your first analysis using our built-in sample dataset and reading every section of the results.',
    },
]

export default function BlogPage() {
    return (
        <div className="min-h-screen" style={{ background: '#080808' }}>
            <MarketingNav />

            <section className="pt-24 pb-14 text-center px-6 relative">
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.07) 0%, transparent 60%)' }} />
                <div className="inline-flex items-center gap-2 mb-4">
                    <BookOpen className="w-4 h-4 text-indigo-400" />
                    <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-[0.3em]">Zointly Blog</p>
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Product Intelligence Insights</h1>
                <p className="text-slate-400 text-lg max-w-xl mx-auto">Guides, case studies, and product updates for evidence-driven product teams.</p>
            </section>

            {/* Featured post */}
            <section className="max-w-5xl mx-auto px-6 md:px-12 mb-12">
                <div className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
                    style={{ background: '#0d0d0f', border: '1px solid rgba(99,102,241,0.15)' }}>
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(99,102,241,0.06) 0%, transparent 60%)' }} />
                    <div className="relative z-10">
                        <span className="inline-block text-[9px] font-bold text-indigo-400 uppercase tracking-widest border border-indigo-500/20 rounded-full px-3 py-1 mb-4"
                            style={{ background: 'rgba(99,102,241,0.08)' }}>
                            Featured · {posts[0].category}
                        </span>
                        <p className="text-slate-500 text-xs mb-3">{posts[0].date} · {posts[0].readTime}</p>
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">{posts[0].title}</h2>
                        <p className="text-slate-400 leading-relaxed mb-6 max-w-2xl">{posts[0].excerpt}</p>
                        <span className="inline-flex items-center gap-2 text-indigo-400 text-sm font-semibold cursor-default">
                            Read article <ArrowRight className="w-4 h-4" />
                        </span>
                    </div>
                </div>
            </section>

            {/* Post grid */}
            <section className="max-w-5xl mx-auto px-6 md:px-12 pb-28">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.slice(1).map((post) => (
                        <article key={post.slug} className="flex flex-col rounded-xl p-6 transition-all hover:-translate-y-1 cursor-default"
                            style={{ background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.07)' }}>
                            <span className="text-[8px] font-bold text-indigo-400 uppercase tracking-widest mb-3">{post.category}</span>
                            <h2 className="font-display text-sm font-bold text-white mb-3 leading-snug flex-grow">{post.title}</h2>
                            <p className="text-slate-500 text-xs leading-relaxed mb-4">{post.excerpt}</p>
                            <div className="flex items-center justify-between mt-auto pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                                <span className="text-[9px] text-slate-600">{post.date}</span>
                                <span className="text-[9px] text-slate-600">{post.readTime}</span>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-14 text-center">
                    <p className="text-slate-500 text-sm mb-2">More articles coming soon.</p>
                    <p className="text-slate-600 text-xs">Subscribe for updates →{' '}
                        <a href="mailto:hello@zointly.io?subject=Blog Updates" className="text-indigo-400 hover:underline">hello@zointly.io</a>
                    </p>
                </div>
            </section>

            <footer className="border-t py-10 text-center" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <p className="text-[9px] text-slate-700 font-bold uppercase tracking-widest">© {new Date().getFullYear()} Zointly Inc. ·{' '}
                    <Link href="/privacy" className="hover:text-slate-400">Privacy</Link> ·{' '}
                    <Link href="/terms" className="hover:text-slate-400">Terms</Link>
                </p>
            </footer>
        </div>
    )
}
