'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const [error, setError] = useState('')
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${location.origin}/account/update-password`,
        })
        setLoading(false)
        if (error) { setError(error.message); return }
        setSent(true)
    }

    return (
        <div className="min-h-screen flex" style={{ background: '#080808' }}>
            <div className="flex-1 flex flex-col min-h-screen">
                <header className="flex items-center justify-between px-10 py-7">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: '#6366f1' }}>
                            <span className="text-white text-xs font-bold">Z</span>
                        </div>
                        <span className="font-display text-[10px] font-bold tracking-[0.25em] text-white uppercase">Zointly</span>
                    </Link>
                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] hidden md:block">Feedback Decision System</p>
                </header>

                <main className="flex-1 flex items-center justify-center px-10 py-12">
                    <div className="w-full max-w-[400px]">
                        {sent ? (
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                                    style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
                                    <Mail className="w-8 h-8 text-indigo-400" />
                                </div>
                                <h1 className="font-display text-2xl font-bold text-white mb-3">Check your email</h1>
                                <p className="text-slate-400 text-sm mb-8">
                                    We sent a password reset link to <strong className="text-white">{email}</strong>.
                                    It expires in 24 hours.
                                </p>
                                <Link href="/sign-in"
                                    className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium">
                                    ← Back to sign in
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <div className="mb-10">
                                    <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-[0.3em] mb-3">Password Recovery</p>
                                    <h1 className="font-display text-2xl font-bold text-white tracking-tight mb-2">Reset Your Password</h1>
                                    <p className="text-slate-500 text-sm">Enter your account email and we&apos;ll send you a reset link.</p>
                                </div>

                                {error && (
                                    <div className="mb-4 rounded-lg p-3 border" style={{ background: 'rgba(239,68,68,0.06)', borderColor: 'rgba(239,68,68,0.2)' }}>
                                        <p className="text-red-400 text-sm">{error}</p>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Work Email</label>
                                        <input value={email} onChange={e => setEmail(e.target.value)} required
                                            className="field" placeholder="name@company.com" type="email" />
                                    </div>
                                    <button type="submit" disabled={loading}
                                        className="w-full flex items-center justify-center gap-2 text-white font-bold py-3 rounded-md transition-all text-sm hover:opacity-90"
                                        style={{ background: '#6366f1', boxShadow: '0 0 20px rgba(99,102,241,0.25)' }}>
                                        {loading ? 'Sending...' : (
                                            <><span>Send Reset Link</span><ArrowRight className="w-4 h-4" /></>
                                        )}
                                    </button>
                                </form>

                                <p className="text-center text-slate-500 text-sm mt-6">
                                    <Link href="/sign-in" className="text-indigo-400 hover:text-indigo-300 font-medium">← Back to sign in</Link>
                                </p>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Right panel */}
            <div className="hidden lg:flex w-[480px] flex-shrink-0 flex-col items-center justify-center p-12 relative overflow-hidden"
                style={{ background: '#0a0a0b', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-15"
                        style={{ background: 'rgba(99,102,241,0.4)' }} />
                </div>
                <div className="relative z-10 text-center max-w-xs">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                        style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
                        <span className="text-indigo-400 text-2xl">🔐</span>
                    </div>
                    <h2 className="font-display text-lg font-bold text-white mb-3">Secure Account Recovery</h2>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Reset links expire after 24 hours and can only be used once. Your account security is our priority.
                    </p>
                </div>
            </div>
        </div>
    )
}
