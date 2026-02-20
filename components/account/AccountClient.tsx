'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface Props {
    profile: any
    showSignOut?: boolean
}

export default function AccountClient({ profile, showSignOut }: Props) {
    const [fullName, setFullName] = useState(profile.full_name || '')
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const supabase = createClient()
    const router = useRouter()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/')
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        await supabase.from('users').update({ full_name: fullName }).eq('id', profile.id)
        setSaving(false)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
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
        </form>
    )
}
