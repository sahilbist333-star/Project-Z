'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Zap, Loader2 } from 'lucide-react'

interface Props {
    interval?: 'monthly' | 'annual'
    cta?: string
    className?: string
    style?: React.CSSProperties
    onSuccess?: () => void
}

export default function UpgradeButton({
    interval = 'monthly',
    cta = 'Upgrade Now',
    className = '',
    style,
    onSuccess
}: Props) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleUpgrade = async () => {
        setLoading(true)
        setError('')
        try {
            const res = await fetch('/api/razorpay/create-subscription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ interval })
            })
            const data = await res.json()

            if (!res.ok) {
                setError(data.error || 'Could not start upgrade process. Please try again.')
                setLoading(false)
                return
            }

            // Load Razorpay checkout script
            const script = document.createElement('script')
            script.src = 'https://checkout.razorpay.com/v1/checkout.js'
            document.body.appendChild(script)
            script.onload = () => {
                const rzp = new (window as any).Razorpay({
                    key: data.key,
                    subscription_id: data.subscription_id,
                    name: 'Zointly',
                    description: `Growth Plan — ${interval === 'monthly' ? '₹2,999/mo' : '₹29,999/yr'}`,
                    handler: () => {
                        if (onSuccess) {
                            onSuccess()
                        } else {
                            router.push('/dashboard?success=1')
                        }
                    },
                    prefill: {
                        name: '', // Optional: Add user name if available
                        email: '', // Optional: Add user email if available
                    },
                    theme: { color: '#6366f1' },
                })
                rzp.open()
                setLoading(false)
            }
        } catch {
            setError('Network error. Please try again.')
            setLoading(false)
        }
    }

    return (
        <div className="w-full">
            {error && <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider mb-2 text-center">{error}</p>}
            <button
                onClick={handleUpgrade}
                disabled={loading}
                className={`w-full py-3.5 rounded-xl text-white font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100 ${className}`}
                style={style || { background: '#6366f1', boxShadow: '0 0 20px rgba(99,102,241,0.3)' }}
            >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
                {loading ? 'Processing...' : cta}
            </button>
        </div>
    )
}
