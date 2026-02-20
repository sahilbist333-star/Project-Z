import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { razorpay, GROWTH_PLAN_AMOUNT, GROWTH_PLAN_CURRENCY } from '@/lib/razorpay'

export async function POST(request: NextRequest) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const admin = createAdminClient()

    // Get or create Razorpay plan
    // NOTE: In production, create the plan once in Razorpay dashboard and store the plan ID in env
    const planId = process.env.RAZORPAY_PLAN_ID

    if (!planId) {
        return NextResponse.json({
            error: 'RAZORPAY_PLAN_ID not configured. Create a plan in Razorpay dashboard first.'
        }, { status: 500 })
    }

    try {
        // Create subscription
        const subscription = await razorpay.subscriptions.create({
            plan_id: planId,
            total_count: 12, // 12 months
            quantity: 1,
        }) as any

        // Save subscription_id to user
        await admin.from('users')
            .update({ subscription_id: subscription.id })
            .eq('id', user.id)

        return NextResponse.json({
            subscription_id: subscription.id,
            key: process.env.RAZORPAY_KEY_ID,
        })
    } catch (err: any) {
        console.error('Razorpay subscription error:', err)
        return NextResponse.json({ error: err.message || 'Failed to create subscription' }, { status: 500 })
    }
}
