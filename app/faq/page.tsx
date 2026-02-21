'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import MarketingNav from '@/components/layout/MarketingNav'

const categories = [
    {
        title: 'Product & Analysis',
        items: [
            { q: 'How does the demand score work?', a: 'The Demand Score (0–10) is a weighted score combining feedback frequency, urgency signals (words like "urgent", "critical", "immediately"), and sentiment intensity. It is normalized across all opportunities identified in your analysis so you can compare them on a single scale.' },
            { q: 'How long does an analysis take?', a: 'Most analyses complete in under 60 seconds. Larger datasets (1,000+ entries) may take 90–120 seconds. If an analysis takes longer than 2 minutes, it will automatically fail and you can retry for free.' },
            { q: 'How do I upload feedback?', a: 'Two methods: (1) Paste text directly — one feedback entry per line, or (2) Upload a CSV file with a single column of feedback text. Zointly strips headers automatically. You can also load our sample dataset to try it without your own data.' },
            { q: 'Can I re-analyze updated feedback?', a: 'Yes. Each new analysis runs fresh. If you submit identical feedback to a previous run, Zointly will detect the duplicate (using a SHA-256 hash) and return your existing results instantly without consuming a credit.' },
            { q: 'How many feedback entries can I submit?', a: 'Free plan: up to 500 entries per analysis. Growth plan: up to 5,000 entries per analysis. Enterprise plans support unlimited entries.' },
            { q: 'What types of feedback work best?', a: 'Any plain-text feedback works — app store reviews, support tickets, survey responses, NPS comments, sales call notes. The more specific and varied the feedback, the better the opportunities identified.' },
        ],
    },
    {
        title: 'Reports & Sharing',
        items: [
            { q: 'Can I share reports with stakeholders?', a: 'Yes. Every completed analysis generates a unique, permanent public URL (e.g. zointly.com/reports/abc-xyz) that anyone can view without a Zointly account. Reports include opportunity rankings, demand scores, and verbatim customer quotes.' },
            { q: 'Do public reports expire?', a: 'No. Public report URLs are permanent. They remain accessible even if you downgrade your plan or cancel your subscription.' },
            { q: 'Can I export to PDF?', a: 'PDF export is available from the results page using the export button. The PDF includes all opportunities with their evidence quotes and scores.' },
            { q: 'Are reports branded?', a: 'Public reports include a small "Generated with Zointly" footer. Enterprise plans support white-label reports with your own branding.' },
        ],
    },
    {
        title: 'Billing & Plans',
        items: [
            { q: 'Is there a free trial of Growth?', a: 'The Starter plan is your free trial — it gives you 3 full analyses per month indefinitely. This lets you fully evaluate the product before committing.' },
            { q: 'Can I cancel anytime?', a: 'Yes. Cancel from your account page at any time. You keep Growth access until the end of your current billing period. No early termination fees.' },
            { q: 'When does my monthly count reset?', a: 'Free plan users: on the same date each month that you created your account. Growth plan users: on your billing renewal date.' },
            { q: 'Do unused analyses carry over?', a: 'No. Unused analyses expire at the end of each billing cycle. They do not accumulate.' },
        ],
    },
    {
        title: 'Security & Privacy',
        items: [
            { q: 'Is my feedback data secure?', a: 'Yes. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Your feedback data is stored in Supabase with Row Level Security — only you can access it.' },
            { q: 'Is my data used to train AI models?', a: 'No. Your feedback content is never used to train or fine-tune AI models, shared with third parties, or used for any purpose other than generating your analysis results.' },
            { q: 'Can I delete my data?', a: 'Yes. You can delete individual analyses from your dashboard, or delete your entire account and all associated data from the Account Settings page. Deletion is permanent and immediate.' },
            { q: 'Where is data stored?', a: 'Data is stored in Supabase (PostgreSQL) hosted on AWS. We use the ap-south-1 (Mumbai) region by default for India-based users.' },
        ],
    },
]

export default function FAQPage() {
    const [openQ, setOpenQ] = useState<string | null>(null)

    return (
        <div className="min-h-screen" style={{ background: '#080808' }}>
            <MarketingNav />

            <section className="pt-36 pb-14 text-center px-6 relative">
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.07) 0%, transparent 60%)' }} />
                <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-[0.3em] mb-4">Help Center</p>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
                <p className="text-slate-400 text-lg max-w-xl mx-auto">Everything you need to know about Zointly.</p>
            </section>

            <section className="max-w-3xl mx-auto px-6 md:px-12 pb-28">
                {categories.map(({ title, items }) => (
                    <div key={title} className="mb-14">
                        <h2 className="text-[9px] font-bold text-indigo-400 uppercase tracking-[0.3em] mb-5">{title}</h2>
                        <div className="space-y-2">
                            {items.map(({ q, a }) => (
                                <div key={q} className="rounded-lg overflow-hidden" style={{ background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.07)' }}>
                                    <button
                                        onClick={() => setOpenQ(openQ === q ? null : q)}
                                        className="w-full flex justify-between items-center p-5 cursor-pointer text-left"
                                    >
                                        <span className="text-sm font-semibold text-white pr-4">{q}</span>
                                        <div className="relative w-4 h-4 flex-shrink-0 flex items-center justify-center">
                                            <Plus className={`absolute w-4 h-4 text-slate-500 transition-transform duration-300 ${openQ === q ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
                                            <Minus className={`absolute w-4 h-4 text-slate-500 transition-transform duration-300 ${openQ === q ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} />
                                        </div>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {openQ === q && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            >
                                                <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">{a}</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="rounded-xl p-8 text-center" style={{ background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <p className="text-white font-semibold mb-2">Still have questions?</p>
                    <p className="text-slate-400 text-sm mb-5">Our team typically responds within 24 hours on business days.</p>
                    <Link href="/contact"
                        style={{ background: '#6366f1' }}
                        className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-sm font-bold text-[9px] uppercase tracking-widest hover:opacity-90 transition-all">
                        Contact Support →
                    </Link>
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
