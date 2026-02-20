import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SidebarLayout from '@/components/layout/SidebarLayout'

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/sign-in')

    const { data: profile } = await supabase.from('users').select('*').eq('id', user.id).single()
    if (!profile) redirect('/sign-in')

    const { count: unreadAlertCount } = await supabase
        .from('insight_alerts')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('seen', false)

    return <SidebarLayout profile={profile} unreadAlertCount={unreadAlertCount ?? 0}>{children}</SidebarLayout>
}
