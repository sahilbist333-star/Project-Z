'use client'
import { useState, useTransition } from 'react'
import { Bell, X } from 'lucide-react'

interface Alert {
    id: string
    message: string
    analysis_id: string | null
    seen: boolean
}

export default function AlertPanel({ alerts }: { alerts: Alert[] }) {
    const [visible, setVisible] = useState<Alert[]>(alerts)
    const [, startTransition] = useTransition()

    const dismiss = async (alertId: string) => {
        // Optimistically remove from UI
        setVisible(v => v.filter(a => a.id !== alertId))
        startTransition(async () => {
            await fetch('/api/analysis/alert-seen', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ alert_id: alertId }),
            })
        })
    }

    if (visible.length === 0) return null

    return (
        <div className="mb-6 rounded-xl p-5 anim-slide-down"
            style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <div className="flex items-center gap-2 mb-4">
                <Bell className="w-4 h-4 text-indigo-400" />
                <h2 className="text-sm font-bold text-white">New Signals</h2>
                <span className="ml-auto text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                    {visible.length} unread
                </span>
            </div>
            <div className="space-y-2 anim-stagger">
                {visible.map(alert => (
                    <div key={alert.id}
                        className="flex items-start gap-3 py-2 pr-2 rounded-lg group transition-all hover:bg-white/5 px-2 anim-slide-up">
                        <div className="text-base flex-shrink-0 mt-0.5">{alert.message.split(' ')[0]}</div>
                        <p className="text-sm text-slate-300 flex-1">
                            {alert.message.substring(alert.message.indexOf(' ') + 1)}
                        </p>
                        <button
                            onClick={() => dismiss(alert.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-600 hover:text-white flex-shrink-0 mt-0.5">
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
