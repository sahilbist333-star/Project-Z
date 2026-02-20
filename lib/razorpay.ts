import Razorpay from 'razorpay'
import crypto from 'crypto'

export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export const GROWTH_PLAN_AMOUNT = 4900 // ₹49.00 in paise
export const GROWTH_PLAN_CURRENCY = 'INR'

export function verifyWebhookSignature(
    body: string,
    signature: string
): boolean {
    const expected = crypto
        .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
        .update(body)
        .digest('hex')
    return expected === signature
}

export async function createSubscription(planId: string, totalCount: number = 12) {
    return await razorpay.subscriptions.create({
        plan_id: planId,
        total_count: totalCount,
        quantity: 1,
    })
}
