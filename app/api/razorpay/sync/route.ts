import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { razorpay } from '@/lib/razorpay'

export async function POST(request: NextRequest) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const { subscriptionId } = await request.json()
        if (!subscriptionId) {
            return NextResponse.json({ error: 'Subscription ID is required' }, { status: 400 })
        }

        console.log(`[Manual Sync] Syncing subscription ${subscriptionId} for user ${user.id}`)

        // Fetch subscription details from Razorpay
        const rzpSubscription = await (razorpay as any).subscriptions.fetch(subscriptionId)
        console.log(`[Manual Sync] Razorpay status: ${rzpSubscription.status}`)

        if (rzpSubscription.status === 'active' || rzpSubscription.status === 'authenticated') {
            const admin = createAdminClient()
            const expiry = rzpSubscription.current_end
                ? new Date(rzpSubscription.current_end * 1000).toISOString()
                : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

            const { error: updateError } = await admin.from('users')
                .update({
                    plan: 'growth',
                    subscription_id: subscriptionId,
                    subscription_status: 'active',
                    plan_expiry: expiry,
                    analyses_used_this_month: 0,
                    last_usage_reset_at: new Date().toISOString(),
                })
                .eq('id', user.id)

            if (updateError) {
                console.error('[Manual Sync] DB Update Error:', updateError)
                throw updateError
            }

            console.log(`[Manual Sync] Successfully updated user ${user.id} to Growth plan`)
            return NextResponse.json({ success: true, plan: 'growth' })
        }

        return NextResponse.json({
            success: false,
            message: `Subscription status is ${rzpSubscription.status}. Please wait or contact support.`
        })

    } catch (error: any) {
        console.error('[Manual Sync] Error:', error)
        return NextResponse.json({ error: 'Sync failed. Please try again later.' }, { status: 500 })
    }
}
