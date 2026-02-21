'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface NavLink {
    label: string
    href: string
}

interface Props {
    /** Override the default nav links. Defaults to standard marketing nav. */
    links?: NavLink[]
}

const SHARED_LINKS: NavLink[] = [
    { label: 'Features', href: '/#features' },
    { label: 'Public Reports', href: '/#public-reports' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'FAQ', href: '/faq' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
]

export { SHARED_LINKS as HOME_LINKS, SHARED_LINKS as DEFAULT_LINKS }

export default function MarketingNav({ links = SHARED_LINKS }: Props) {
    const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        const dismissedAt = localStorage.getItem('announcement_dismissed_at')

        if (dismissedAt) {
            const timePassed = Date.now() - parseInt(dismissedAt, 10)
            const fiftySixMinutes = 56 * 60 * 1000

            if (timePassed > fiftySixMinutes) {
                setIsAnnouncementVisible(true)
                localStorage.removeItem('announcement_dismissed_at')
            }
        } else {
            // Also clean up the old boolean key if it exists
            localStorage.removeItem('announcement_dismissed')
            setIsAnnouncementVisible(true)
        }
    }, [])

    const handleClose = () => {
        setIsAnnouncementVisible(false)
        localStorage.setItem('announcement_dismissed_at', Date.now().toString())
    }

    return (
        <div className="fixed top-0 left-0 right-0 z-50 px-6 pt-6 pointer-events-none">
            {/* Announcement bar */}
            {isMounted && isAnnouncementVisible && (
                <div className="max-w-7xl mx-auto mb-2 rounded-full pointer-events-auto shadow-lg relative flex items-center justify-center" style={{ background: '#FACC15' }}>
                    <p className="text-center text-[9px] sm:text-[10px] py-2 sm:py-2.5 font-bold text-black tracking-widest uppercase px-8 flex-1 leading-snug">
                        🆕 <span className="hidden sm:inline">Generate shareable evidence reports for stakeholders in one click.</span>
                        <span className="sm:hidden">Share evidence reports in one click.</span>{' '}
                        <a href="/#public-reports" className="underline ml-1 whitespace-nowrap">See how →</a>
                    </p>
                    <button
                        onClick={handleClose}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-black/60 hover:text-black rounded-full transition-colors"
                        aria-label="Close announcement"
                    >
                        <X className="w-3.5 h-3.5" strokeWidth={3} />
                    </button>
                </div>
            )}

            <nav className="max-w-7xl mx-auto rounded-full pointer-events-auto border"
                style={{ background: 'rgba(8,8,8,0.7)', borderColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(24px)' }}>
                <div className="px-5 md:px-6 h-14 md:h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 md:gap-2.5 group shrink-0">
                        <div className="w-6 h-6 rounded flex items-center justify-center transition-transform group-hover:scale-110"
                            style={{ background: '#6366f1' }}>
                            <span className="text-white text-[10px] font-bold">Z</span>
                        </div>
                        <span className="font-display text-sm font-bold text-white uppercase tracking-tight">Zointly</span>
                    </Link>

                    {/* Links */}
                    <div className="hidden md:flex items-center gap-8 bg-black/20 px-6 h-10 rounded-full border border-white/5">
                        {links.map(({ label, href }) => (
                            <a key={label} href={href}
                                className="text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors">
                                {label}
                            </a>
                        ))}
                    </div>

                    {/* Auth CTA */}
                    <div className="flex items-center gap-3 md:gap-4 shrink-0">
                        <Link href="/sign-in"
                            className="hidden md:block text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors">
                            Log In
                        </Link>
                        <Link href="/sign-up"
                            className="text-white px-5 py-2 md:px-6 md:py-2.5 rounded-full font-bold text-[9px] md:text-[10px] uppercase tracking-widest hover:opacity-90 hover:scale-[1.05] transition-all whitespace-nowrap border-none bg-gradient-to-r from-indigo-400 to-purple-400 shadow-[0_0_24px_rgba(192,132,252,0.4)]">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

