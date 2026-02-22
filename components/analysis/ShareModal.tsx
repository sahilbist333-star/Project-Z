'use client'
import { useState } from 'react'
import { X, Copy, Check, Twitter, Linkedin, MessageSquare, Mail, Link as LinkIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn } from '@/components/ui/motion'

interface Props {
    isOpen: boolean
    onClose: () => void
    reportUrl: string
    title: string
}

export default function ShareModal({ isOpen, onClose, reportUrl, title }: Props) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(reportUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const socialLinks = [
        {
            name: 'X (Twitter)',
            icon: Twitter,
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(reportUrl)}`,
            color: 'hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2]',
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(reportUrl)}`,
            color: 'hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]',
        },
        {
            name: 'WhatsApp',
            icon: MessageSquare,
            href: `https://wa.me/?text=${encodeURIComponent(title + ' ' + reportUrl)}`,
            color: 'hover:bg-[#25D366]/10 hover:text-[#25D366]',
        },
        {
            name: 'Email',
            icon: Mail,
            href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(reportUrl)}`,
            color: 'hover:bg-white/10 hover:text-white',
        },
    ]

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="relative w-full max-w-sm overflow-hidden"
                    >
                        <div className="rounded-[2.5rem] border border-white/10 bg-[#080808] p-8 shadow-2xl relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-xl font-black text-white uppercase tracking-tight">Share Report</h2>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 italic">Spread the intelligence</p>
                                </div>
                                <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-all">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* URL Bar */}
                            <div className="relative group mb-8">
                                <div className="flex items-center gap-3 w-full bg-white/2 border border-white/5 rounded-2xl px-5 py-4 transition-all group-hover:border-white/10">
                                    <LinkIcon className="w-4 h-4 text-slate-600 shrink-0" />
                                    <input
                                        type="text"
                                        readOnly
                                        value={reportUrl}
                                        className="bg-transparent text-[11px] text-slate-400 font-medium tracking-wide w-full focus:outline-none"
                                    />
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all"
                                >
                                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>

                            {/* Social Grid */}
                            <div className="grid grid-cols-4 gap-4">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex flex-col items-center gap-2 group transition-all`}
                                    >
                                        <div className={`w-14 h-14 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center transition-all ${social.color} group-hover:border-transparent group-hover:shadow-xl`}>
                                            <social.icon className="w-6 h-6" />
                                        </div>
                                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-white transition-colors">{social.name.split(' ')[0]}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
