'use client'
import { Loader2 } from 'lucide-react'

export default function GlobalLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center anim-fade-in"
            style={{ background: '#080808' }}>
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: '#6366f1' }}>
                        <span className="text-white text-sm font-bold">Z</span>
                    </div>
                    <span className="font-display text-sm font-bold text-white uppercase tracking-[0.2em]">Zointly</span>
                </div>
                <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
            </div>
        </div>
    )
}
