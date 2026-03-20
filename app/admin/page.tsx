import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminClient from './AdminClient'
import SidebarLayout from '@/components/layout/SidebarLayout'

export default async function AdminPage() {
    const supabase = await createClient()
    
    // 1. Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        redirect('/login')
    }

    // 2. Check if user is admin
    const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

    if (!profile?.is_admin) {
        redirect('/dashboard')
    }

    return (
        <SidebarLayout profile={profile}>
            <AdminClient />
        </SidebarLayout>
    )
}
