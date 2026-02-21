'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import { FadeIn, HeroBackground3D } from '@/components/ui/motion'

export default function SignInPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()
    const supabase = createClient()

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        setLoading(false)
        if (error) { setError(error.message); return }
        router.push('/dashboard')
    }

    const handleGoogle = async () => {
        setGoogleLoading(true)
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: `${location.origin}/api/auth/callback?next=/dashboard` },
        })
    }

    return (
        <div className="min-h-screen flex" style={{ background: '#080808' }}>
            {/* Left panel — form */}
            <div className="flex-1 flex flex-col min-h-screen">
                <header className="flex items-center justify-between px-6 sm:px-10 py-6 sm:py-7">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: '#6366f1' }}>
                            <span className="text-white text-xs font-bold">Z</span>
                        </div>
                        <span className="font-display text-[10px] font-bold tracking-[0.25em] text-white uppercase">Zointly</span>
                    </Link>
                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] hidden md:block">Feedback Decision System</p>
                </header>

                <main className="flex-1 flex items-center justify-center px-6 sm:px-10 py-8 sm:py-12 relative overflow-hidden z-10">
                    <FadeIn delay={0.1} className="w-full max-w-[400px]">
                        <div className="mb-10">
                            <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-[0.3em] mb-3">Welcome Back</p>
                            <h1 className="font-display text-2xl font-bold text-white tracking-tight mb-2">Sign In to Zointly</h1>
                            <p className="text-slate-500 text-sm">Continue your product intelligence journey.</p>
                        </div>

                        <button onClick={handleGoogle} disabled={googleLoading}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-md mb-6 transition-all hover:opacity-90"
                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            <span className="text-slate-300 text-sm font-medium">
                                {googleLoading ? 'Redirecting...' : 'Continue with Google'}
                            </span>
                        </button>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex-1 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }} />
                            <span className="text-slate-600 text-[9px] font-bold uppercase tracking-[0.3em]">or with email</span>
                            <div className="flex-1 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }} />
                        </div>

                        {error && (
                            <div className="mb-4 rounded-lg p-3 border" style={{ background: 'rgba(239,68,68,0.06)', borderColor: 'rgba(239,68,68,0.2)' }}>
                                <p className="text-red-400 text-sm">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSignIn} className="space-y-4">
                            <div>
                                <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Work Email</label>
                                <input value={email} onChange={e => setEmail(e.target.value)} required
                                    className="field" placeholder="name@company.com" type="email" />
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Password</label>
                                    <Link href="/forgot-password" className="text-[10px] text-indigo-400 hover:text-indigo-300">Forgot password?</Link>
                                </div>
                                <div className="relative">
                                    <input value={password} onChange={e => setPassword(e.target.value)} required
                                        className="field pr-10" placeholder="••••••••"
                                        type={showPassword ? 'text' : 'password'} />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" disabled={loading}
                                className="w-full flex items-center justify-center gap-2 text-white font-bold py-3 rounded-md transition-all mt-2 text-sm hover:opacity-90"
                                style={{ background: '#6366f1', boxShadow: '0 0 20px rgba(99,102,241,0.25)' }}>
                                {loading ? 'Signing in...' : (
                                    <><span>Sign In</span><ArrowRight className="w-4 h-4" /></>
                                )}
                            </button>
                        </form>

                        <p className="text-center text-slate-500 text-sm mt-6">
                            New to Zointly?{' '}
                            <Link href="/sign-up" className="text-indigo-400 hover:text-indigo-300 font-medium">Create free account</Link>
                        </p>
                    </FadeIn>
                </main>
            </div>

            {/* Right panel — testimonial */}
            <div className="hidden lg:flex w-[480px] flex-shrink-0 flex-col justify-between p-12 relative overflow-hidden"
                style={{ background: '#0a0a0b', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
                <HeroBackground3D />
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-20"
                        style={{ background: 'rgba(99,102,241,0.4)' }} />
                </div>

                <FadeIn delay={0.2} className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-16"
                            style={{ borderColor: 'rgba(99,102,241,0.2)', background: 'rgba(99,102,241,0.08)' }}>
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                            <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-[0.3em]">Product Teams Love Zointly</span>
                        </div>

                        <blockquote className="text-xl font-medium text-white leading-relaxed mb-8" style={{ lineHeight: 1.6 }}>
                            &ldquo;We cut our prioritization meetings from 3 hours to 20 minutes. Zointly gives us the evidence we need to make confident product bets.&rdquo;
                        </blockquote>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                style={{ background: '#6366f1' }}>M</div>
                            <div>
                                <p className="text-white font-semibold text-sm">Maria Chen</p>
                                <p className="text-slate-500 text-xs">VP of Product at NovaTech</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl p-6"
                        style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
                        <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-[0.2em] mb-4">What you get with Zointly</p>
                        <div className="space-y-3">
                            {[
                                'AI-powered demand scoring',
                                'Verbatim customer evidence quotes',
                                'Shareable stakeholder reports',
                                'Monthly insight alerts',
                            ].map(f => (
                                <div key={f} className="flex items-center gap-3 text-sm text-slate-300">
                                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                                        style={{ background: 'rgba(99,102,241,0.2)' }}>
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                    </div>
                                    {f}
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
    )
}
