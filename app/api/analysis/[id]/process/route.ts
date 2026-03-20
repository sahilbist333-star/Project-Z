import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { analyzeWithGemini } from '@/lib/gemini'
import { generateAlerts, saveAlertsAndNotify } from '@/lib/alerts'

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    // Verify internal call
    const internalKey = request.headers.get('x-internal-key')
    if (internalKey !== process.env.SUPABASE_SERVICE_ROLE_KEY) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params
    const admin = createAdminClient()

    try {
        const body = await request.json()
        const { entries, user_id } = body

        if (!entries || !Array.isArray(entries)) {
            return NextResponse.json({ error: 'Invalid entries' }, { status: 400 })
        }

        // Set status to processing
        await admin.from('analyses').update({ status: 'processing' }).eq('id', id)

        // Run Gemini analysis
        const opportunities = await analyzeWithGemini(entries)

        // Save opportunities
        if (opportunities.length > 0) {
            await admin.from('opportunities').insert(
                opportunities.map((o) => ({ ...o, analysis_id: id }))
            )
        }

        // Fetch previous snapshots for change tracking
        const { data: prevSnapshots } = await admin
            .from('opportunity_snapshots')
            .select('*')
            .eq('user_id', user_id)
            .order('created_at', { ascending: false })
            .limit(50)

        // Save new snapshots
        const newSnapshots = opportunities.map((o) => ({
            user_id,
            analysis_id: id,
            opportunity_title: o.title,
            demand_score: o.demand_score,
            confidence: o.confidence,
            priority: o.priority,
            mentions_estimate: o.mentions_estimate,
        }))
        await admin.from('opportunity_snapshots').insert(newSnapshots)

        // Generate change summary and alerts
        let alerts = []
        if (prevSnapshots && prevSnapshots.length > 0) {
            alerts = generateAlerts(newSnapshots as any, prevSnapshots as any)
        } else {
            // First analysis: Generate initial insights from top opportunities
            alerts = opportunities.slice(0, 3).map(o => ({
                type: 'new_opportunity' as any,
                message: `🆕 Initial high-demand signal: ${o.title}`
            }))
        }

        // Build change summary for analyses table
        const summaryItems = alerts.map((a: any) => {
            let mappedType = 'other'
            if (a.type === 'new_opportunity') mappedType = 'new'
            else if (a.type === 'demand_surge' || a.type === 'mentions_spike') mappedType = 'surge'
            else if (a.type === 'priority_escalation') mappedType = 'escalation'

            const title = a.type.split('_').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

            return {
                type: mappedType,
                title,
                detail: a.message,
            }
        })

        let changeSummary = null
        if (summaryItems.length > 0) {
            changeSummary = { items: summaryItems }
        }

        // Fetch user profile for notification
        const { data: userProfile } = await admin
            .from('users')
            .select('email, last_alert_email_at, plan')
            .eq('id', user_id)
            .single()

        if (userProfile) {
            await saveAlertsAndNotify(
                user_id,
                id,
                alerts,
                userProfile.email,
                userProfile.last_alert_email_at,
                userProfile.plan
            )
        }

        // Mark completed and increment usage
        await admin.from('analyses').update({
            status: 'completed',
            completed_at: new Date().toISOString(),
            change_summary: changeSummary,
        }).eq('id', id)

        return NextResponse.json({ success: true })
    } catch (err: any) {
        console.error(`Analysis ${id} processing failed:`, err)
        await admin.from('analyses').update({
            status: 'failed',
            error_message: err?.message || 'Processing failed. Please retry.',
        }).eq('id', id)
        return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
    }
}
