'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { StaggerItem } from './motion'

interface FaqItem {
    q: string
    a: string
}

interface FaqAccordionProps {
    items: FaqItem[]
}

export function FaqAccordion({ items }: FaqAccordionProps) {
    const [openQ, setOpenQ] = useState<string | null>(null)

    return (
        <div className="space-y-4">
            {items.map(({ q, a }) => (
                <StaggerItem key={q} className="rounded-[1.5rem] overflow-hidden bg-black/40 border border-white/5 transition-colors hover:border-white/10">
                    <button
                        onClick={() => setOpenQ(openQ === q ? null : q)}
                        className="w-full flex justify-between items-center p-6 md:p-8 cursor-pointer text-left"
                    >
                        <span className="text-base font-semibold text-white pr-4">{q}</span>
                        <div className="relative w-5 h-5 flex-shrink-0 flex items-center justify-center ml-4">
                            <Plus className={`absolute w-5 h-5 text-slate-500 transition-transform duration-300 ${openQ === q ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
                            <Minus className={`absolute w-5 h-5 text-slate-500 transition-transform duration-300 ${openQ === q ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} />
                        </div>
                    </button>
                    <AnimatePresence initial={false}>
                        {openQ === q && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <div className="px-6 md:px-8 pb-8 text-base text-slate-400 leading-relaxed">{a}</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </StaggerItem>
            ))}
        </div>
    )
}
