export type Plan = 'free' | 'growth'
export type AnalysisStatus = 'queued' | 'processing' | 'completed' | 'failed'
export type AlertType = 'new_opportunity' | 'demand_surge' | 'priority_escalation' | 'mentions_spike'

export const PLAN_LIMITS: Record<Plan, number> = {
  free: 3,
  growth: 50,
}

export interface User {
  id: string
  email: string
  full_name: string | null
  plan: Plan
  subscription_id: string | null
  subscription_status: string
  plan_expiry: string | null
  analyses_used_this_month: number
  last_usage_reset_at: string
  last_alert_email_at: string | null
  onboarding_completed: boolean
  created_at: string
}

export interface Analysis {
  id: string
  user_id: string
  title: string | null
  input_text: string | null
  input_size: number
  status: AnalysisStatus
  is_sample: boolean
  error_message: string | null
  input_hash: string | null
  analysis_period_start: string | null
  analysis_period_end: string | null
  total_entries: number
  change_summary: ChangeSummary | null
  created_at: string
  completed_at: string | null
}

export interface Opportunity {
  id: string
  analysis_id: string
  title: string
  demand_score: number
  confidence: number
  priority: string
  mentions_estimate: number
  problem_summary: string
  proposed_solution: string
  engineering_effort: string
  customer_quotes: string[]
  created_at: string
}

export interface Report {
  id: string
  analysis_id: string
  public_slug: string
  created_at: string
}

export interface OpportunitySnapshot {
  id: string
  user_id: string
  analysis_id: string
  opportunity_title: string
  demand_score: number
  confidence: number
  priority: string
  mentions_estimate: number
  created_at: string
}

export interface InsightAlert {
  id: string
  user_id: string
  analysis_id: string
  alert_type: AlertType
  message: string
  seen: boolean
  created_at: string
}

export interface ChangeSummaryItem {
  title: string
  type: AlertType  // matches alert_type for change badges
  detail: string
}

export interface ChangeSummary {
  items: ChangeSummaryItem[]
}



export const ENTRY_LIMITS: Record<Plan, number> = {
  free: 500,
  growth: 5000,
}
