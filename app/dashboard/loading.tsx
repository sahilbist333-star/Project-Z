'use client'
import { Loader2 } from 'lucide-react'
import Logo from '@/components/ui/Logo'

export default function DashboardLoading() {
    return (
        <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center gap-6 p-8">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-indigo-500/[0.03] blur-[100px] rounded-full" />
            </div>
            
            <div className="relative z-10 flex flex-col items-center gap-8 text-center">
                <Logo link={false} size="lg" className="opacity-50" />
                
                <div className="space-y-4">
                    <div className="flex items-center justify-center gap-3">
                        <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
                        <h2 className="text-sm font-black text-white uppercase tracking-[0.3em] animate-pulse">
                            Syncing Signals
                        </h2>
                    </div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest max-w-[200px] leading-relaxed">
                        Compiling intelligence layers and preparing your workspace...
                    </p>
                </div>

                {/* Skeleton UI Preview */}
                <div className="mt-12 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 opacity-20 pointer-events-none">
                    <div className="md:col-span-2 h-48 rounded-3xl bg-white/5 border border-white/10" />
                    <div className="h-48 rounded-3xl bg-white/5 border border-white/10" />
                    <div className="h-64 rounded-3xl bg-white/5 border border-white/10" />
                    <div className="h-64 rounded-3xl bg-white/5 border border-white/10" />
                    <div className="h-64 rounded-3xl bg-white/5 border border-white/10" />
                </div>
            </div>
        </div>
    )
}
