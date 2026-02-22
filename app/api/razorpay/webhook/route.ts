import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { verifyWebhookSignature } from '@/lib/razorpay'
import { addDays } from 'date-fns'

export async function POST(request: NextRequest) {
    const body = await request.text()
    const signature = request.headers.get('x-razorpay-signature') || ''

    // Verify HMAC-SHA256 signature
    if (!verifyWebhookSignature(body, signature)) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const event = JSON.parse(body)
    const admin = createAdminClient()

    console.log(`[Razorpay Webhook] Received event: ${event.event}`)

    try {
        const payload = event.payload

        switch (event.event) {
            case 'subscription.activated': {
                const subscriptionId = payload?.subscription?.entity?.id
                console.log(`[Razorpay Webhook] Activating subscription: ${subscriptionId}`)
                if (!subscriptionId) break
                const { error } = await admin.from('users')
                    .update({ subscription_status: 'active' })
                    .eq('subscription_id', subscriptionId)

                if (error) console.error(`[Razorpay Webhook] Error updating status:`, error)
                break
            }

            case 'payment.captured': {
                // Fires on initial payment AND every monthly renewal
                const subscriptionId = payload?.payment?.entity?.subscription_id
                console.log(`[Razorpay Webhook] Payment captured for subscription: ${subscriptionId}`)
                if (!subscriptionId) break

                // Use Razorpay timestamp from payload
                const endAtTimestamp = payload?.payment?.entity?.end_at || payload?.subscription?.entity?.current_end;
                const newExpiry = endAtTimestamp
                    ? new Date(endAtTimestamp * 1000).toISOString()
                    : addDays(new Date(), 30).toISOString();

                console.log(`[Razorpay Webhook] Setting new expiry: ${newExpiry}`)

                const { error } = await admin.from('users')
                    .update({
                        plan: 'growth',
                        subscription_status: 'active',
                        plan_expiry: newExpiry,
                        analyses_used_this_month: 0,  // Reset quota on every payment
                        last_usage_reset_at: new Date().toISOString(),
                    })
                    .eq('subscription_id', subscriptionId)

                if (error) console.error(`[Razorpay Webhook] Error updating user:`, error)
                break
            }

            case 'payment.failed': {
                const subscriptionId = payload?.payment?.entity?.subscription_id
                if (!subscriptionId) break
                await admin.from('users')
                    .update({ subscription_status: 'past_due' })
                    .eq('subscription_id', subscriptionId)
                break
            }

            case 'subscription.cancelled': {
                const subscriptionId = payload?.subscription?.entity?.id
                if (!subscriptionId) break
                await admin.from('users')
                    .update({
                        subscription_status: 'cancelled',
                        plan: 'free',
                        billing_interval: 'monthly',
                        plan_expiry: null
                    })
                    .eq('subscription_id', subscriptionId)
                break
            }
        }

        return NextResponse.json({ received: true })
    } catch (err) {
        console.error('Webhook error:', err)
        return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
    }
}
