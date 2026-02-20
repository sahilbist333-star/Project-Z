import { createAdminClient } from './supabase/admin'
import { Resend } from 'resend'
import { InsightAlert, OpportunitySnapshot } from './types'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface AlertTrigger {
    type: InsightAlert['alert_type']
    message: string
}

export function generateAlerts(
    current: OpportunitySnapshot[],
    previous: OpportunitySnapshot[]
): AlertTrigger[] {
    const alerts: AlertTrigger[] = []
    const prevMap = new Map(previous.map((s) => [s.opportunity_title.toLowerCase(), s]))

    for (const snap of current) {
        const key = snap.opportunity_title.toLowerCase()
        const prev = prevMap.get(key)

        if (!prev) {
            alerts.push({
                type: 'new_opportunity',
                message: `🆕 New high-demand request detected: ${snap.opportunity_title}`,
            })
            continue
        }

        // Demand surge ≥ 20%
        if (prev.demand_score && snap.demand_score) {
            const change = ((snap.demand_score - prev.demand_score) / prev.demand_score) * 100
            if (change >= 20) {
                alerts.push({
                    type: 'demand_surge',
                    message: `🔺 ${snap.opportunity_title} demand increased +${Math.round(change)}%`,
                })
            }
        }

        // Priority escalation
        const priorityRank: Record<string, number> = { P0: 0, P1: 1, P2: 2, P3: 3 }
        const prevRank = priorityRank[prev.priority] ?? 3
        const currRank = priorityRank[snap.priority] ?? 3
        if (currRank < prevRank) {
            alerts.push({
                type: 'priority_escalation',
                message: `⚠️ ${snap.opportunity_title} escalated to ${snap.priority} priority`,
            })
        }

        // Mentions spike ≥ 25%
        if (prev.mentions_estimate && snap.mentions_estimate) {
            const mentionsChange = ((snap.mentions_estimate - prev.mentions_estimate) / prev.mentions_estimate) * 100
            if (mentionsChange >= 25) {
                alerts.push({
                    type: 'mentions_spike',
                    message: `📈 ${snap.opportunity_title} mentions up +${Math.round(mentionsChange)}%`,
                })
            }
        }
    }

    return alerts
}

export async function saveAlertsAndNotify(
    userId: string,
    analysisId: string,
    alerts: AlertTrigger[],
    userEmail: string,
    lastAlertEmailAt: string | null
): Promise<void> {
    if (alerts.length === 0) return

    const admin = createAdminClient()

    // Save alerts to DB
    await admin.from('insight_alerts').insert(
        alerts.map((a) => ({
            user_id: userId,
            analysis_id: analysisId,
            alert_type: a.type,
            message: a.message,
            seen: false,
        }))
    )

    // Email guard: only send if no email in last 60 minutes
    const shouldEmail = !lastAlertEmailAt ||
        (Date.now() - new Date(lastAlertEmailAt).getTime()) > 60 * 60 * 1000

    if (!shouldEmail) return

    const topAlerts = alerts.slice(0, 3)
    const alertsHtml = topAlerts
        .map((a) => `<li style="margin-bottom:8px">${a.message}</li>`)
        .join('')

    try {
        await resend.emails.send({
            from: 'Zointly <alerts@zointly.io>',
            to: userEmail,
            subject: 'New product signal detected in your customer feedback',
            html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;padding:32px">
          <div style="margin-bottom:24px">
            <span style="font-weight:700;font-size:18px;color:#6366f1">ZOINTLY</span>
          </div>
          <h2 style="font-size:22px;font-weight:700;color:#111;margin-bottom:12px">
            New signals in your feedback
          </h2>
          <p style="color:#666;margin-bottom:20px">Your latest analysis revealed changes worth reviewing:</p>
          <ul style="padding-left:20px;color:#333">
            ${alertsHtml}
          </ul>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
             style="display:inline-block;margin-top:28px;background:#6366f1;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600">
            View Insights →
          </a>
          <p style="color:#aaa;font-size:12px;margin-top:32px">
            You're receiving this because you ran an analysis on Zointly.
          </p>
        </div>
      `,
        })

        // Update last_alert_email_at
        await admin
            .from('users')
            .update({ last_alert_email_at: new Date().toISOString() })
            .eq('id', userId)
    } catch (err) {
        console.error('Resend email failed (non-fatal):', err)
    }
}
