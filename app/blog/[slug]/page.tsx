import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import MarketingNav from '@/components/layout/MarketingNav'
import MarketingFooter from '@/components/layout/MarketingFooter'

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    // Generate a simple title from the slug
    const resolvedParams = await params
    const title = resolvedParams.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

    return (
        <div className="min-h-screen" style={{ background: '#080808' }}>
            <MarketingNav />

            {/* Hero */}
            <section className="pt-48 pb-16 px-6 relative max-w-3xl mx-auto">
                <Link href="/blog" className="inline-flex items-center gap-2 text-indigo-400 text-sm font-semibold hover:text-indigo-300 transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back to Blog
                </Link>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    {title}
                </h1>
                <div className="flex items-center gap-4 text-slate-500 text-sm mb-12 border-b pb-8" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <span>By Zointly Team</span>
                    <span>·</span>
                    <span>February 21, 2025</span>
                    <span>·</span>
                    <span>5 min read</span>
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

                {/* CTA */}
                <div className="mt-20 p-8 rounded-2xl text-center" style={{ background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 className="font-display text-2xl font-bold text-white mb-3">Ready to transform your feedback?</h3>
                    <p className="text-slate-400 text-sm mb-6">Start using Zointly today and turn raw data into a prioritized roadmap.</p>
                    <Link href="/sign-up"
                        className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-full font-bold text-[10px] uppercase tracking-widest hover:scale-[1.05] transition-all border border-indigo-400/30"
                        style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', boxShadow: '0 0 24px rgba(99,102,241,0.6)' }}>
                        Get Started Free
                    </Link>
                </div>
            </section>

            <MarketingFooter />
        </div>
    )
}
