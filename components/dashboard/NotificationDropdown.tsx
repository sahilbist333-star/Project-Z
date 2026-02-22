'use client'
import { useState, useRef, useEffect } from 'react'
import { Bell, X, Sparkles, ChevronRight, MessageSquare, TrendingUp, Users } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'

interface Props {
    unreadCount: number
    userId: string
}

export default function NotificationDropdown({ unreadCount, userId }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const [alerts, setAlerts] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const toggleDropdown = async () => {
        if (!isOpen) {
            setLoading(true)
            const { createClient } = await import('@/lib/supabase/client')
            const supabase = createClient()
            const { data } = await supabase
                .from('insight_alerts')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })
                .limit(5)

            if (data) setAlerts(data)
            setLoading(false)
        }
        setIsOpen(!isOpen)
    }

    const getIcon = (type: string) => {
        if (type === 'sentiment') return <TrendingUp className="w-3.5 h-3.5 text-red-400" />
        if (type === 'cohort') return <Users className="w-3.5 h-3.5 text-indigo-400" />
        return <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="relative p-2 rounded-lg hover:bg-white/5 transition-all group"
            >
                <div className={`w-5 h-5 transition-colors ${isOpen ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                    <Bell />
                </div>
                {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-4 w-80 rounded-3xl border border-white/10 bg-[#0c0c0d] shadow-2xl z-[100] overflow-hidden"
                    >
                        <div className="p-5 border-b border-white/5 flex items-center justify-between">
                            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Signal Alerts</h3>
                            <button onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-white transition-colors">
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        <div className="max-h-[400px] overflow-y-auto">
                            {loading ? (
                                <div className="p-12 flex flex-col items-center justify-center gap-3">
                                    <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse" />
                                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Syncing signals...</p>
                                </div>
                            ) : alerts.length > 0 ? (
                                <div className="divide-y divide-white/5">
                                    {alerts.map((alert) => (
                                        <Link
                                            key={alert.id}
                                            href={`/analysis/${alert.analysis_id}`}
                                            onClick={() => setIsOpen(false)}
                                            className="block p-5 hover:bg-white/[0.02] transition-colors relative group"
                                        >
                                            {!alert.seen && (
                                                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-full" />
                                            )}
                                            <div className="flex gap-4">
                                                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                                                    {getIcon(alert.alert_type)}
                                                </div>
                                                <div>
                                                    <p className="text-xs text-white font-medium leading-relaxed mb-1 pr-4">
                                                        {alert.message}
                                                    </p>
                                                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                                                        {format(parseISO(alert.created_at), 'MMM d, h:mm a')}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center">
                                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">All signals clear</p>
                                </div>
                            )}
                        </div>

                        <Link
                            href="/dashboard/reports"
                            onClick={() => setIsOpen(false)}
                            className="block p-4 bg-white/2 border-t border-white/5 text-center text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em] hover:text-white transition-colors"
                        >
                            View Intelligence History <ChevronRight className="inline w-3 h-3 ml-1" />
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
