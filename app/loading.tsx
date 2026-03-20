'use client'
import { Loader2 } from 'lucide-react'
import Logo from '@/components/ui/Logo'

export default function GlobalLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center anim-fade-in"
            style={{ background: '#080808' }}>
            <div className="flex flex-col items-center gap-4">
                <Logo link={false} size="lg" />
                <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
            </div>
        </div>
    )
}
