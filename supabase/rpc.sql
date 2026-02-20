-- Add this to your Supabase SQL Editor AFTER running schema.sql
-- This function is called by the processing route to increment usage

CREATE OR REPLACE FUNCTION increment_analyses_used(user_id_input UUID)
RETURNS void
LANGUAGE sql SECURITY DEFINER
AS $$
  UPDATE public.users
  SET analyses_used_this_month = analyses_used_this_month + 1
  WHERE id = user_id_input;
$$;
