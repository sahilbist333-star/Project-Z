'use client'
import { MessageSquarePlus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'

import { usePathname } from 'next/navigation'

export default function FeedbackButton() {
    const [isVisible, setIsVisible] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 2000)
        return () => clearTimeout(timer)
    }, [])

    // Hide on contact/feedback pages
    if (pathname === '/contact' || pathname === '/feedback') return null

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    className="fixed bottom-8 right-8 z-[100] pointer-events-auto"
                >
                    <Link
                        href="/contact"
                        className="flex items-center gap-3 px-6 py-4 rounded-full bg-indigo-500 text-white shadow-[0_20px_40px_rgba(99,102,241,0.4)] hover:bg-indigo-400 hover:scale-105 transition-all group border border-white/20"
                    >
                        <MessageSquarePlus className="w-5 h-5 transition-transform group-hover:rotate-12" />
                        <span className="text-[11px] font-black uppercase tracking-widest">Help & Feedback</span>
                        
                        {/* Pulse effect */}
                        <div className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-20 pointer-events-none" />
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
