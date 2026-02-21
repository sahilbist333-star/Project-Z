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

    const avatarTimestamp = user.user_metadata?.avatar_version
    const avatarUrl = user.user_metadata?.has_avatar
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${user.id}.png?t=${avatarTimestamp}`
        : null

    return <SidebarLayout profile={profile} unreadAlertCount={unreadAlertCount ?? 0} avatarUrl={avatarUrl}>{children}</SidebarLayout>
}
