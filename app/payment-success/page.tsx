'use client'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export default function PaymentSuccessPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6"
            style={{ background: '#0a0a0b' }}>
            {/* Glow */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20"
                    style={{ background: 'rgba(99,102,241,0.3)' }} />
            </div>

            <div className="relative z-10 max-w-md">
                <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-8"
                    style={{ background: 'rgba(34,197,94,0.1)', border: '2px solid rgba(34,197,94,0.3)' }}>
                    <CheckCircle2 className="w-10 h-10 text-green-400" />
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6"
                    style={{ borderColor: 'rgba(99,102,241,0.2)', background: 'rgba(99,102,241,0.08)', color: '#818cf8' }}>
                    <span className="text-[9px] font-bold uppercase tracking-widest">Growth Plan Activated</span>
                </div>

                <h1 className="font-display text-3xl font-bold text-white mb-4">
                    You&apos;re on Growth!
                </h1>
                <p className="text-slate-400 leading-relaxed mb-8">
                    Your subscription is now active. You have access to 50 analyses per month and up to 5,000 entries per analysis.
                </p>

                <div className="rounded-xl p-6 mb-8 text-left space-y-3"
                    style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.2)' }}>
                    {[
                        '50 analyses per month',
                        '5,000 feedback entries per analysis',
                        'Insight alerts & email notifications',
                        'Public shareable reports',
                    ].map(f => (
                        <div key={f} className="flex items-center gap-3 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                            <span className="text-slate-200">{f}</span>
                        </div>
                    ))}
                </div>

                <Link href="/analysis/new"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-white font-bold text-sm transition-all hover:opacity-90"
                    style={{ background: '#6366f1' }}>
                    Run Your First Analysis
                    <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="mt-4">
                    <Link href="/dashboard" className="text-slate-500 text-sm hover:text-slate-300">
                        Go to Dashboard
                    </Link>
                </p>
            </div>
        </div>
    )
}
