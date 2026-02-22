'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { X, Menu, Bell, Sparkles, User, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import NotificationDropdown from '@/components/dashboard/NotificationDropdown'

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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [profile, setProfile] = useState<any>(null)
    const [unreadCount, setUnreadCount] = useState(0)
    const supabase = createClient()

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

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }

        const getAuth = async () => {
            const { data: { user: authUser } } = await supabase.auth.getUser()
            if (authUser) {
                setUser(authUser)
                const { data: prof } = await supabase.from('users').select('*').eq('id', authUser.id).single()
                setProfile(prof)

                const { count } = await supabase
                    .from('insight_alerts')
                    .select('*', { count: 'exact', head: true })
                    .eq('user_id', authUser.id)
                    .eq('seen', false)
                setUnreadCount(count || 0)
            }
        }
        getAuth()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
            if (!session) {
                setProfile(null)
                setUnreadCount(0)
            } else {
                getAuth()
            }
        })

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            subscription.unsubscribe()
        }
    }, [])

    const handleClose = () => {
        setIsAnnouncementVisible(false)
        localStorage.setItem('announcement_dismissed_at', Date.now().toString())
    }

    return (
        <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
            {/* Scroll Gradient Background */}
            <div
                className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#080808] to-transparent pointer-events-none transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Announcement bar - Full width, 0 margins, no rounded corners */}
            {isMounted && isAnnouncementVisible && (
                <div className="bg-[#FACC15] pointer-events-auto relative z-20 flex items-center justify-center">
                    <p className="text-center text-[9px] sm:text-[10px] py-2 sm:py-2.5 font-bold text-black tracking-widest uppercase px-8 flex-1 leading-snug">
                        🆕 <span className="hidden sm:inline">Generate shareable evidence reports for stakeholders in one click.</span>
                        <span className="sm:hidden">Share evidence reports in one click.</span>{' '}
                        <a href="/#public-reports" className="underline ml-1 whitespace-nowrap">See how →</a>
                    </p>
                    <button
                        onClick={handleClose}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-black/60 hover:text-black transition-colors"
                        aria-label="Dismiss announcement"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            <div className="px-6 pt-6 relative z-10 transition-all">
                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div
                        className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto transition-opacity"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                <nav className="max-w-7xl mx-auto rounded-full pointer-events-auto border relative z-10"
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

                        {/* Auth CTA & Mobile Toggle */}
                        <div className="flex items-center gap-3 md:gap-4 shrink-0">
                            {user ? (
                                <div className="flex items-center gap-3 md:gap-4">
                                    <div className="hidden md:block">
                                        <NotificationDropdown unreadCount={unreadCount} userId={user.id} />
                                    </div>
                                    <Link href="/dashboard" className="flex items-center gap-2 group p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                                        {user.user_metadata?.has_avatar ? (
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${user.id}.png?t=${user.user_metadata?.avatar_version || Date.now()}`}
                                                alt="Avatar"
                                                className="w-8 h-8 rounded-full border border-white/10"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                                                {(profile?.full_name || user.email || 'U')[0]}
                                            </div>
                                        )}
                                        <span className="hidden lg:block text-[10px] font-black text-white uppercase tracking-widest">
                                            Dashboard
                                        </span>
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    <Link href="/sign-in"
                                        className="hidden md:block text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors">
                                        Log In
                                    </Link>
                                    <Link href="/sign-up"
                                        className="text-white px-5 py-2 md:px-6 md:py-2.5 rounded-full font-bold text-[9px] md:text-[10px] uppercase tracking-widest hover:opacity-90 hover:scale-[1.05] transition-all whitespace-nowrap border-none bg-gradient-to-r from-indigo-400 to-purple-400 shadow-[0_0_24px_rgba(192,132,252,0.4)]">
                                        Get Started
                                    </Link>
                                </>
                            )}

                            {/* Mobile Menu Toggle button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 -mr-2 text-slate-400 hover:text-white transition-colors flex items-center justify-center relative w-10 h-10"
                                aria-label="Toggle mobile menu"
                            >
                                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}>
                                    <X className="w-6 h-6" />
                                </div>
                                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${!isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`}>
                                    <Menu className="w-6 h-6" />
                                </div>
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Mobile Dropdown Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="md:hidden max-w-7xl mx-auto mt-4 pointer-events-auto relative z-10"
                        >
                            <div className="px-6 py-6 border border-white/10 bg-black/90 backdrop-blur-3xl rounded-[2rem] shadow-2xl relative">
                                {/* Optional glow for mobile menu */}
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none rounded-[2rem]"></div>

                                <div className="flex flex-col gap-6 relative z-10">
                                    {links.map(({ label, href }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-sm font-bold text-slate-300 hover:text-white uppercase tracking-widest transition-colors block border-b border-white/5 pb-4"
                                        >
                                            {label}
                                        </a>
                                    ))}
                                    <div className="pt-2 flex flex-col gap-4">
                                        {user ? (
                                            <Link
                                                href="/dashboard"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="w-full text-center text-white px-6 py-3.5 rounded-full font-bold text-[11px] uppercase tracking-widest hover:opacity-90 transition-all border border-white/10 bg-white/5"
                                            >
                                                Go to Dashboard
                                            </Link>
                                        ) : (
                                            <>
                                                <Link
                                                    href="/sign-in"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="text-center text-sm font-bold text-slate-300 hover:text-white uppercase tracking-widest transition-colors py-3 px-6 rounded-full border border-white/10 w-full"
                                                >
                                                    Log In
                                                </Link>
                                                <Link
                                                    href="/sign-up"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="w-full text-center text-white px-6 py-3.5 rounded-full font-bold text-[11px] uppercase tracking-widest hover:opacity-90 transition-all border-none bg-gradient-to-r from-indigo-400 to-purple-400 shadow-[0_0_24px_rgba(192,132,252,0.4)]"
                                                >
                                                    Create account
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
