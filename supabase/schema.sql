-- ============================================================
-- Zointly Database Schema
-- Run this in Supabase SQL Editor
-- ============================================================

-- ─── USERS ───────────────────────────────────────────────────
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'growth')),
  subscription_id TEXT,
  subscription_status TEXT DEFAULT 'inactive',
  plan_expiry TIMESTAMPTZ,
  analyses_used_this_month INTEGER DEFAULT 0,
  last_usage_reset_at TIMESTAMPTZ DEFAULT NOW(),
  last_alert_email_at TIMESTAMPTZ,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- ─── ANALYSES ────────────────────────────────────────────────
CREATE TABLE public.analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT,
  input_text TEXT,
  input_size INTEGER DEFAULT 0,
  status TEXT DEFAULT 'queued' CHECK (status IN ('queued', 'processing', 'completed', 'failed')),
  is_sample BOOLEAN DEFAULT FALSE,
  error_message TEXT,
  input_hash TEXT,
  analysis_period_start TIMESTAMPTZ,
  analysis_period_end TIMESTAMPTZ,
  total_entries INTEGER DEFAULT 0,
  change_summary JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own analyses" ON public.analyses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own analyses" ON public.analyses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own analyses" ON public.analyses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own analyses" ON public.analyses FOR DELETE USING (auth.uid() = user_id);

-- ─── OPPORTUNITIES ────────────────────────────────────────────
CREATE TABLE public.opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID REFERENCES public.analyses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  demand_score NUMERIC(3,1),
  confidence INTEGER,
  priority TEXT,
  mentions_estimate INTEGER,
  problem_summary TEXT,
  proposed_solution TEXT,
  engineering_effort TEXT,
  customer_quotes TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own opportunities" ON public.opportunities FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.analyses WHERE id = analysis_id AND user_id = auth.uid()));
CREATE POLICY "Service role can manage opportunities" ON public.opportunities FOR ALL
  USING (true) WITH CHECK (true);

-- ─── REPORTS ─────────────────────────────────────────────────
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID REFERENCES public.analyses(id) ON DELETE CASCADE NOT NULL,
  public_slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reports are readable by all" ON public.reports FOR SELECT USING (true);
CREATE POLICY "Users can insert own reports" ON public.reports FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.analyses WHERE id = analysis_id AND user_id = auth.uid()));

-- ─── OPPORTUNITY SNAPSHOTS ────────────────────────────────────
CREATE TABLE public.opportunity_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  analysis_id UUID REFERENCES public.analyses(id) ON DELETE CASCADE NOT NULL,
  opportunity_title TEXT NOT NULL,
  demand_score NUMERIC(3,1),
  confidence INTEGER,
  priority TEXT,
  mentions_estimate INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.opportunity_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own snapshots" ON public.opportunity_snapshots FOR SELECT USING (auth.uid() = user_id);

-- ─── INSIGHT ALERTS ──────────────────────────────────────────
CREATE TABLE public.insight_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  analysis_id UUID REFERENCES public.analyses(id) ON DELETE CASCADE NOT NULL,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('new_opportunity', 'demand_surge', 'priority_escalation', 'mentions_spike')),
  message TEXT NOT NULL,
  seen BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.insight_alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own alerts" ON public.insight_alerts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own alerts" ON public.insight_alerts FOR UPDATE USING (auth.uid() = user_id);

-- ─── PERFORMANCE INDEXES ─────────────────────────────────────
CREATE INDEX idx_analyses_user_id      ON public.analyses(user_id);
CREATE INDEX idx_analyses_created_at   ON public.analyses(created_at DESC);
CREATE INDEX idx_analyses_input_hash   ON public.analyses(user_id, input_hash);
CREATE INDEX idx_opportunities_aid     ON public.opportunities(analysis_id);
CREATE INDEX idx_snapshots_user_id     ON public.opportunity_snapshots(user_id);
CREATE INDEX idx_snapshots_analysis_id ON public.opportunity_snapshots(analysis_id);
CREATE INDEX idx_alerts_user_id        ON public.insight_alerts(user_id);
CREATE INDEX idx_alerts_user_seen      ON public.insight_alerts(user_id, seen);

-- ─── AUTO-CREATE USER PROFILE ON SIGNUP ──────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
