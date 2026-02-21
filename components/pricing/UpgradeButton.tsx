'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Zap } from 'lucide-react'

export default function UpgradeButton() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleUpgrade = async () => {
        setLoading(true)
        setError('')
        try {
            const res = await fetch('/api/razorpay/create-subscription', { method: 'POST' })
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
                    description: 'Growth Plan — ₹2,999/month',
                    handler: () => {
                        router.push('/pricing?success=1')
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
        <div>
            {error && <p className="text-red-400 text-xs mb-2">{error}</p>}
            <button onClick={handleUpgrade} disabled={loading}
                className="w-full py-3 rounded-lg text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
                style={{ background: '#6366f1', boxShadow: '0 0 20px rgba(99,102,241,0.3)' }}>
                <Zap className="w-4 h-4" />
                {loading ? 'Loading...' : 'Upgrade Now'}
            </button>
        </div>
    )
}
