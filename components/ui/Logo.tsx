'use client'
import Link from 'next/link'

interface LogoProps {
    className?: string
    showText?: boolean
    link?: boolean
    size?: 'sm' | 'md' | 'lg'
}

export default function Logo({ className = '', showText = true, link = true, size = 'md' }: LogoProps) {
    const iconSize = size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-10 h-10' : 'w-8 h-8'
    const fontSize = size === 'sm' ? 'text-[10px]' : size === 'lg' ? 'text-sm' : 'text-xs'
    const textFontSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-2xl' : 'text-base'

    const content = (
        <div className={`flex items-center gap-2.5 group ${className}`}>
            <div
                className={`${iconSize} rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 shadow-[0_0_15px_rgba(99,102,241,0.4)]`}
                style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' }}
            >
                <span className={`text-white ${fontSize} font-black tracking-tighter`}>Z</span>
            </div>
            {showText && (
                <span className={`font-display ${textFontSize} font-black text-white uppercase tracking-tight`}>
                    Zointly
                </span>
            )}
        </div>
    )

    if (link) {
        return <Link href="/">{content}</Link>
    }

    return content
}
