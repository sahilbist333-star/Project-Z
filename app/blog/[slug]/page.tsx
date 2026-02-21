import Link from 'next/link'
import { ArrowLeft, CalendarDays, Clock } from 'lucide-react'
import MarketingNav from '@/components/layout/MarketingNav'
import MarketingFooter from '@/components/layout/MarketingFooter'
import { ShareButtons } from '@/components/blog/ShareButtons'
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    // Generate a simple title from the slug
    const resolvedParams = await params
    const title = resolvedParams.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    const shareUrl = `https://zointly.com/blog/${resolvedParams.slug}`

    return (
        <div className="min-h-screen" style={{ background: '#080808' }}>
            <MarketingNav />

            {/* Hero */}
            <section className="pt-48 pb-16 px-6 relative max-w-5xl mx-auto">
                <Link href="/blog" className="inline-flex items-center gap-2 text-indigo-400 text-sm font-semibold hover:text-indigo-300 transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back to Blog
                </Link>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    {title}
                </h1>
                <div className="flex items-center gap-4 text-slate-500 text-sm mb-12 border-b pb-8" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <span>By Zointly Team</span>
                    <span>·</span>
                    <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" /> February 21, 2025</span>
                    <span>·</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 5 min read</span>
                </div>

                {/* Hero Image */}
                <div className="w-full aspect-[21/9] bg-black/40 border border-white/5 rounded-[2rem] mb-16 overflow-hidden relative group shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 mix-blend-overlay opacity-30" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
                </div>

                {/* Content */}
                <article className="prose prose-invert prose-indigo max-w-none">
                    <p className="text-slate-300 text-lg leading-relaxed mb-6">
                        This is a placeholder for the <strong>{title}</strong> blog post. The content management system (CMS) is currently being integrated. In the meantime, you can experience the layout and design of our blog articles.
                    </p>
                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">Understanding the Core Concepts</h2>
                    <p className="text-slate-400 leading-relaxed mb-6">
                        Product intelligence is no longer just about gathering feedback; it's about making sense of it at a scale that humans simply cannot process efficiently without AI assistance.
                        By analyzing thousands of data points across multiple channels, teams can identify recurring themes faster.
                    </p>
                    <blockquote className="border-l-2 border-indigo-500 pl-6 my-8 italic text-slate-300 text-lg">
                        "The best product teams don't just listen to their customers—they build systems that surface the most critical voices automatically."
                    </blockquote>
                    <p className="text-slate-400 leading-relaxed mb-6">
                        As we continue building out the Zointly platform, we'll be sharing detailed case studies, technical deep-dives into our AI processing engine, and practical guides on how to align your product roadmap with actual user demand.
                    </p>
                </article>

                {/* Share Options */}
                <div className="mt-16 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-6" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <span className="text-slate-400 font-semibold text-sm">Share this article:</span>
                    <ShareButtons title={title} url={shareUrl} />
                </div>

                {/* Related Articles */}
                <div className="mt-24">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-display text-2xl font-bold text-white">Recommended Articles</h3>
                        <Link href="/blog" className="text-xs font-bold text-indigo-400 uppercase tracking-widest hover:text-indigo-300">View All →</Link>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {[
                            { title: 'How to build a feedback loop that actually works', category: 'Best Practices', date: 'Feb 15, 2025', readTime: '4 min read', slug: 'feedback-loop-guide', image: 'data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E' },
                            { title: 'The hidden cost of ignoring user complaints', category: 'Industry Insights', date: 'Feb 10, 2025', readTime: '6 min read', slug: 'cost-of-ignoring-users', image: 'data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E' }
                        ].map((post) => (
                            <Link href={`/blog/${post.slug}`} key={post.slug} className="flex flex-col rounded-[1.5rem] overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] cursor-pointer bg-black/40 border border-white/5 hover:border-indigo-500/20 group">
                                <div className="w-full aspect-video bg-black/40 relative overflow-hidden border-b border-white/5">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 mix-blend-overlay opacity-30" style={{ backgroundImage: `url("${post.image}")` }} />
                                </div>
                                <div className="p-6 md:p-8 flex flex-col flex-grow">
                                    <span className="text-[8px] font-bold text-indigo-400 uppercase tracking-widest mb-4">{post.category}</span>
                                    <h4 className="font-display text-xl font-bold text-white mb-4 leading-snug flex-grow group-hover:text-indigo-300 transition-colors">{post.title}</h4>
                                    <div className="mt-auto flex items-center gap-4 pt-4 border-t border-white/5">
                                        <span className="flex items-center gap-1.5 text-[10px] text-slate-500"><CalendarDays className="w-3 h-3" /> {post.date}</span>
                                        <span className="flex items-center gap-1.5 text-[10px] text-slate-500"><Clock className="w-3 h-3" /> {post.readTime}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-20 p-8 rounded-2xl text-center" style={{ background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 className="font-display text-2xl font-bold text-white mb-3">Ready to transform your feedback?</h3>
                    <p className="text-slate-400 text-sm mb-6">Start using Zointly today and turn raw data into a prioritized roadmap.</p>
                    <Link href="/sign-up"
                        className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-full font-bold text-[10px] uppercase tracking-widest hover:scale-[1.05] transition-all border-none bg-gradient-to-r from-indigo-400 to-purple-400 shadow-[0_0_24px_rgba(192,132,252,0.4)]">
                        Get Started Free
                    </Link>
                </div>
            </section>

            <MarketingFooter />
        </div>
    )
}
