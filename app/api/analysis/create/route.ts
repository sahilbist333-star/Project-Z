import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { cleanInput, hashInput, minutesSince, daysSince } from '@/lib/utils'
import { PLAN_LIMITS, ENTRY_LIMITS } from '@/lib/types'

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        // Fetch user profile
        const admin = createAdminClient()
        const { data: profile } = await admin
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single()

        if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 })

        // ── Parse body ────────────────────────────────────────────────
        const body = await request.json()
        const { input_text, title, is_sample = false } = body

        if (!input_text || typeof input_text !== 'string') {
            return NextResponse.json({ error: 'Input text required' }, { status: 400 })
        }

        // ── Plan limit check ──────────────────────────────────────────
        if (profile.plan === 'growth' && profile.subscription_status !== 'active') {
            return NextResponse.json({ error: 'payment_required', message: 'Active subscription required' }, { status: 402 })
        }

        const limit = PLAN_LIMITS[profile.plan as 'free' | 'growth']
        if (!is_sample && profile.analyses_used_this_month >= limit) {
            return NextResponse.json({ error: 'limit_reached', message: 'Monthly analysis limit reached' }, { status: 429 })
        }

        // ── New account rate guard ────────────────────────────────────
        if (!is_sample && minutesSince(profile.created_at) < 10 && profile.analyses_used_this_month >= 1) {
            return NextResponse.json({ error: 'Please wait a few minutes before running another analysis.' }, { status: 429 })
        }

        // ── Rolling usage reset check (Free & Annual Growth) ──────────
        if (profile.plan === 'free' || (profile.plan === 'growth' && profile.billing_interval === 'annual')) {
            const daysSinceReset = daysSince(profile.last_usage_reset_at)
            const cycles = Math.floor(daysSinceReset / 30)

            if (cycles > 0) {
                const newResetDate = new Date(profile.last_usage_reset_at)
                newResetDate.setDate(newResetDate.getDate() + (cycles * 30))

                await admin.from('users')
                    .update({
                        analyses_used_this_month: 0,
                        last_usage_reset_at: newResetDate.toISOString()
                    })
                    .eq('id', user.id)
                profile.analyses_used_this_month = 0
            }
        }

        const cleaned = cleanInput(input_text)

        // ── Minimum entries check ─────────────────────────────────────
        if (!is_sample && cleaned.length < 30) {
            return NextResponse.json({ error: 'not_enough_data', count: cleaned.length }, { status: 422 })
        }

        // ── Plan-based entry limits ───────────────────────────────────
        const entryLimit = ENTRY_LIMITS[profile.plan as 'free' | 'growth']
        if (!is_sample && cleaned.length > entryLimit) {
            return NextResponse.json({
                error: 'upgrade_required',
                message: `Your plan supports up to ${entryLimit} entries. Upgrade for up to 5,000.`,
                count: cleaned.length,
                limit: entryLimit,
            }, { status: 422 })
        }

        // ── Character limit (hard cap) ────────────────────────────────
        if (input_text.length > 250000) {
            return NextResponse.json({ error: 'Input too large (max 250,000 characters)' }, { status: 413 })
        }

        // ── Deduplication check ───────────────────────────────────────
        const inputHash = hashInput(cleaned)
        const { data: existing } = await admin
            .from('analyses')
            .select('id, status')
            .eq('user_id', user.id)
            .eq('input_hash', inputHash)
            .eq('status', 'completed')
            .limit(1)
            .single()

        if (existing) {
            return NextResponse.json({
                id: existing.id,
                analysis_id: existing.id,
                deduplicated: true
            })
        }

        // ── Create analysis record ────────────────────────────────────
        const now = new Date()
        const periodStart = new Date(now)
        periodStart.setDate(periodStart.getDate() - 30)

        const { data: analysis, error: insertError } = await admin.from('analyses').insert({
            user_id: user.id,
            title: title || null,
            input_text: input_text.slice(0, 100000), // store truncated for reference
            input_size: input_text.length,
            status: 'queued',
            is_sample,
            input_hash: inputHash,
            total_entries: cleaned.length,
            analysis_period_start: periodStart.toISOString(),
            analysis_period_end: now.toISOString(),
        }).select().single()

        if (insertError || !analysis) {
            return NextResponse.json({ error: 'Failed to create analysis' }, { status: 500 })
        }

        // ── Increment usage ONLY if NOT sample ─────────────────────────
        if (!is_sample) {
            await admin.rpc('increment_analyses_used', { user_id_input: user.id })
        }

        // ── Fire-and-forget processing (no await) ─────────────────────
        const protocol = request.headers.get('x-forwarded-proto') || 'http'
        const host = request.headers.get('host')
        const appUrl = host ? `${protocol}://${host}` : (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000')

        console.log(`[Analysis] Triggering process for ${analysis.id} via ${appUrl}`)

        fetch(`${appUrl}/api/analysis/${analysis.id}/process`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-internal-key': process.env.SUPABASE_SERVICE_ROLE_KEY! },
            body: JSON.stringify({ entries: cleaned, user_id: user.id }),
        }).catch((err) => {
            console.error(`[Analysis] Failed to trigger process for ${analysis.id}:`, err)
        })

        return NextResponse.json({
            id: analysis.id,
            analysis_id: analysis.id
        })
    } catch (err) {
        console.error('Analysis create error:', err)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
