import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const formData = await request.formData()
        const file = formData.get('file') as Blob | null

        if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

        const admin = createAdminClient()
        const filePath = `${user.id}.png`

        // Use service role to upload directly, bypassing Storage RLS
        const { error: uploadError } = await admin.storage
            .from('avatars')
            .upload(filePath, file, { upsert: true, contentType: file.type || 'image/png' })

        if (uploadError) {
            console.error('Storage upload error:', uploadError)
            return NextResponse.json({ error: uploadError.message }, { status: 500 })
        }

        // Update auth metadata to trigger UI refresh and break cache
        await admin.auth.admin.updateUserById(user.id, {
            user_metadata: { has_avatar: true, avatar_version: Date.now() }
        })

        return NextResponse.json({ success: true })
    } catch (err: any) {
        console.error('Avatar upload caught error:', err)
        return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
    }
}
