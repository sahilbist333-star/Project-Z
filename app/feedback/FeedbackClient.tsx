'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function FeedbackPage() {
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace('/contact')
        }, 1500)
        return () => clearTimeout(timer)
    }, [router])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#080808]">
            <div className="relative">
                <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-6" />
                <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full animate-pulse" />
            </div>
            <h2 className="text-white font-bold text-lg mb-2">Feedback has moved</h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Redirecting to Support & Feedback...</p>
        </div>
    )
}
