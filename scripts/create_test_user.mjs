import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://mynaonjaknwznssqrzas.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15bmFvbmpha253em5zc3FyemFzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTUzMTYyNywiZXhwIjoyMDg3MTA3NjI3fQ.VBpRTAwZHF3Lnv4hOAhOIuPUcMck6K_ix5AY-7Xcjqw',
  { auth: { autoRefreshToken: false, persistSession: false } }
);

async function main() {
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'integration_test@zointly.com',
    password: 'password123',
    email_confirm: true
  });
  console.log('Result:', data, error);
}

main();
