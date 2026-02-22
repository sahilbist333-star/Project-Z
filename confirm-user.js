const { createClient } = require('@supabase/supabase-js')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.resolve(__dirname, '.env.local') })

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function confirmUser(email) {
    const { data: users, error: listError } = await supabase.auth.admin.listUsers()
    if (listError) {
        console.error('Error listing users:', listError)
        return
    }

    const user = users.users.find(u => u.email === email)
    if (!user) {
        console.error(`User ${email} not found`)
        return
    }

    const { data, error } = await supabase.auth.admin.updateUserById(
        user.id,
        { email_confirm: true }
    )

    if (error) {
        console.error('Error confirming user:', error)
    } else {
        console.log(`User ${email} confirmed successfully`)
    }
}

confirmUser('nonip21132@bitonc.com')
