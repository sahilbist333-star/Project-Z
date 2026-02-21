'use client'
import { useState } from 'react'
import { X, Zap, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

interface Props {
    onClose: () => void
    currentPlan: 'free' | 'growth'
    used: number
    limit: number
}

export default function UpgradeModal({ onClose, used, limit }: Props) {
    const pct = Math.min(100, Math.round((used / limit) * 100))

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
            onClick={e => { if (e.target === e.currentTarget) onClose() }}>
            <div className="w-full max-w-md rounded-2xl overflow-hidden modal-content"
                style={{ background: '#0f0f12', border: '1px solid rgba(99,102,241,0.25)' }}>

                {/* Header */}
                <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b"
                    style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: '#6366f1' }}>
                            <Zap className="w-3.5 h-3.5 text-white" />
                        </div>
                        <h2 className="font-display text-base font-bold text-white">Upgrade to Growth</h2>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors p-1 rounded">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Usage bar */}
                <div className="px-7 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Current Usage</p>
                        <p className="text-[9px] font-bold text-white">{used} / {limit} analyses</p>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#1e1e22' }}>
                        <div className="h-full rounded-full transition-all" style={{
                            width: `${pct}%`,
                            background: pct >= 100 ? '#ef4444' : pct >= 70 ? '#eab308' : '#6366f1',
                        }} />
                    </div>
                </div>

                {/* Features */}
                <div className="px-7 py-5">
                    <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest mb-4">What you get</p>
                    <div className="grid grid-cols-2 gap-2.5 mb-6">
                        {[
                            '50 analyses / month',
                            '5,000 entries per analysis',
                            'Insight alerts',
                            'Email notifications',
                            'Priority processing',
                            'Analysis history',
                        ].map(f => (
                            <div key={f} className="flex items-center gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                                <span className="text-xs text-slate-300">{f}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-baseline gap-1.5 mb-5">
                        <span className="font-display text-3xl font-bold text-white">₹2,999</span>
                        <span className="text-slate-500 text-sm">/month · cancel anytime</span>
                    </div>
                    <Link href="/pricing" onClick={onClose}
                        className="w-full block text-center text-white font-bold py-3 rounded-md text-sm transition-all hover:opacity-90 pulse-glow"
                        style={{ background: '#6366f1', boxShadow: '0 0 20px rgba(99,102,241,0.3)' }}>
                        Upgrade Now →
                    </Link>
                    <button onClick={onClose} className="w-full text-center text-slate-600 text-xs mt-3 hover:text-slate-400 transition-colors">
                        Maybe later
                    </button>
                </div>
            </div>
        </div>
    )
}
