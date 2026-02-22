'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface Props {
    profile: any
    showSignOut?: boolean
    defaultAvatarUrl?: string | null
}

export default function AccountClient({ profile, showSignOut, defaultAvatarUrl }: Props) {
    const [fullName, setFullName] = useState(profile.full_name || '')
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [uploadingAvatar, setUploadingAvatar] = useState(false)
    const supabase = createClient()
    const router = useRouter()
    const [cancelling, setCancelling] = useState(false)

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/')
    }

    const handleCancelSubscription = async () => {
        if (!confirm('Are you sure you want to cancel your Growth plan? You will lose access to premium insights and high intelligence quotas at the end of your billing cycle.')) return
        setCancelling(true)
        alert('Subscription cancellation is initiated. Our support team will process this shortly.')
        setCancelling(false)
    }

    const handleManageSubscription = () => {
        // In a real app, this would redirect to Razorpay Portal or a custom billing page
        alert('Redirecting to secure billing portal...')
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        await supabase.from('users').update({ full_name: fullName }).eq('id', profile.id)
        setSaving(false)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // 2MB size limit
        if (file.size > 2 * 1024 * 1024) {
            alert('File is too large. Maximum size is 2MB.')
            return
        }

        setUploadingAvatar(true)

        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await fetch('/api/user/avatar', {
                method: 'POST',
                body: formData,
            })
            const data = await res.json()

            if (!res.ok) {
                alert('Error uploading avatar: ' + (data.error || 'Server error'))
            } else {
                // Refresh the server component to get the new avatarUrl
                router.refresh()
            }
        } catch (err: any) {
            alert('Error uploading avatar: ' + err.message)
        }

        setUploadingAvatar(false)
    }

    if (showSignOut) {
        return (
            <button onClick={handleSignOut}
                className="px-4 py-2 rounded-md text-sm font-semibold transition-all"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>
                Sign Out
            </button>
        )
    }

    return (
        <form onSubmit={handleSave} className="space-y-4">
            <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Profile Picture</label>
                <div className="flex items-center gap-4">
                    <label className="cursor-pointer px-4 py-2 rounded-md text-sm font-semibold transition-all border"
                        style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', color: '#fff' }}>
                        {uploadingAvatar ? 'Uploading...' : 'Upload Image'}
                        <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} disabled={uploadingAvatar} />
                    </label>
                </div>
            </div>
            <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Full Name</label>
                <input value={fullName} onChange={e => setFullName(e.target.value)}
                    className="field max-w-sm" placeholder="Your name" />
            </div>
            <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Email</label>
                <input value={profile.email} disabled className="field max-w-sm opacity-50 cursor-not-allowed" />
            </div>
            <button type="submit" disabled={saving}
                className="px-4 py-2 rounded-md text-sm font-semibold text-white transition-all"
                style={{ background: '#6366f1' }}>
                {saved ? 'Saved ✓' : saving ? 'Saving...' : 'Save Changes'}
            </button>

            {profile.plan === 'growth' && (
                <div className="pt-8 border-t border-white/5 space-y-4">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Subscription Management</h3>
                    <div className="flex gap-4">
                        <button type="button" onClick={handleManageSubscription}
                            className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
                            Manage Billing
                        </button>
                        <button type="button" onClick={handleCancelSubscription} disabled={cancelling}
                            className="px-6 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold text-[10px] uppercase tracking-widest hover:bg-red-500/20 transition-all">
                            {cancelling ? 'Processing...' : 'Cancel Subscription'}
                        </button>
                    </div>
                </div>
            )}
        </form>
    )
}
