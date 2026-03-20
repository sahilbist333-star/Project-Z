'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

export default function NewsletterForm() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setStatus('loading')
        try {
            const { error } = await supabase
                .from('newsletter_subscriptions')
                .insert([{ email }])

            if (error) {
                if (error.code === '23505') { // Unique violation
                    setStatus('success')
                    setMessage('You are already subscribed!')
                } else {
                    throw error
                }
            } else {
                setStatus('success')
                setMessage('Thanks for subscribing!')
                setEmail('')
            }
        } catch (err: any) {
            console.error('Newsletter error:', err)
            setStatus('error')
            setMessage('Something went wrong. Please try again.')
        }
    }

    if (status === 'success') {
        return (
            <div className="w-full p-6 rounded-xl bg-green-500/10 border border-green-500/20 text-center animate-in fade-in zoom-in duration-300">
                <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <p className="text-xs font-bold text-white uppercase tracking-widest leading-relaxed">
                    {message}
                </p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
                <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-[11px] text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
                />
            </div>
            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full text-center py-3.5 rounded-xl font-bold text-[10px] uppercase tracking-widest bg-white text-black hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl flex items-center justify-center gap-2"
            >
                {status === 'loading' ? (
                    <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Subscribing...
                    </>
                ) : (
                    'Subscribe Free'
                )}
            </button>
            {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-[10px] font-bold uppercase tracking-wider mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {message}
                </div>
            )}
        </form>
    )
}
