import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { razorpay } from '@/lib/razorpay'

export async function POST(request: NextRequest) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const admin = createAdminClient()

    try {
        const body = await request.json()
        const { interval = 'monthly' } = body

        if (!['monthly', 'annual'].includes(interval)) {
            return NextResponse.json({ error: 'Invalid interval specified' }, { status: 400 })
        }

        const planId = interval === 'annual'
            ? process.env.RAZORPAY_PLAN_ANNUAL
            : process.env.RAZORPAY_PLAN_MONTHLY

        if (!planId) {
            return NextResponse.json({
                error: 'Razorpay plan ID not configured for the selected interval.'
            }, { status: 500 })
        }

        // Create subscription - Intentionally setting total_count to 0 so Razorpay dictates cycles perfectly
        try {
            const subscription = await razorpay.subscriptions.create({
                plan_id: planId,
                customer_notify: 1,
                quantity: 1,
                total_count: 12, // Number of billing cycles (e.g., 12 months or 12 years)
            }) as any

            // Save subscription_id and billing_interval to user
            await admin.from('users')
                .update({
                    subscription_id: subscription.id,
                    billing_interval: interval
                })
                .eq('id', user.id)

            return NextResponse.json({
                subscription_id: subscription.id,
                key: process.env.RAZORPAY_KEY_ID,
            })
        } catch (razorpayErr: any) {
            console.error('Razorpay API error details:', {
                error: razorpayErr,
                planId,
                interval,
                userId: user.id
            })
            throw razorpayErr
        }
    } catch (err: any) {
        console.error('Outer subscription route error:', err)
        return NextResponse.json({
            error: err.message || 'Failed to create subscription',
            details: process.env.NODE_ENV === 'development' ? err : undefined
        }, { status: 500 })
    }
}
