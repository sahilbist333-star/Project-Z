'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function UpdatePasswordPage() {
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const supabase = createClient()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (password !== confirm) { setError('Passwords do not match'); return }
        if (password.length < 6) { setError('Password must be at least 6 characters'); return }
        setLoading(true)
        setError('')
        const { error } = await supabase.auth.updateUser({ password })
        setLoading(false)
        if (error) { setError(error.message); return }
        setSuccess(true)
        setTimeout(() => router.push('/dashboard'), 2000)
    }

    return (
        <div className="min-h-screen flex flex-col" style={{ background: '#0d0d0d' }}>
            <header className="px-16 py-8">
                <Link href="/" className="flex items-center gap-2">
                    <div style={{ background: '#4f46e5' }} className="w-6 h-6 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">Z</span>
                    </div>
                    <span className="font-display text-[10px] tracking-widest text-white uppercase">Zointly</span>
                </Link>
            </header>
            <main className="flex-1 flex items-center justify-center px-6">
                <div className="w-full max-w-[380px] space-y-6">
                    <div>
                        <h1 className="font-display text-[11px] uppercase tracking-[0.2em] text-white">Set New Password</h1>
                        <p className="text-neutral-500 text-sm mt-2">Choose a strong password for your account.</p>
                    </div>
                    {success ? (
                        <div className="rounded-lg p-4 border text-green-400 text-sm" style={{ background: 'rgba(34,197,94,0.05)', borderColor: 'rgba(34,197,94,0.2)' }}>
                            Password updated! Redirecting to dashboard...
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && <p className="text-red-400 text-sm">{error}</p>}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-display uppercase tracking-widest text-neutral-500">New Password</label>
                                <input value={password} onChange={e => setPassword(e.target.value)} required
                                    className="field" placeholder="••••••••" type="password" minLength={6} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-display uppercase tracking-widest text-neutral-500">Confirm Password</label>
                                <input value={confirm} onChange={e => setConfirm(e.target.value)} required
                                    className="field" placeholder="••••••••" type="password" />
                            </div>
                            <button type="submit" disabled={loading}
                                className="w-full text-white font-medium py-3 rounded-md text-sm"
                                style={{ background: '#4f46e5' }}>
                                {loading ? 'Updating...' : 'Update Password'}
                            </button>
                        </form>
                    )}
                </div>
            </main>
        </div>
    )
}
