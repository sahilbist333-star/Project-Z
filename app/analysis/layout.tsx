import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AnalysisLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/sign-in')

    return (
        <div className="flex h-screen overflow-hidden" style={{ background: '#0a0a0b' }}>
            <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
    )
}
