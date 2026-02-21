const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const dotenv = require('dotenv');

async function run() {
    const envConfig = dotenv.parse(fs.readFileSync('.env.local'));
    const supabase = createClient(envConfig.NEXT_PUBLIC_SUPABASE_URL, envConfig.SUPABASE_SERVICE_ROLE_KEY);

    console.log('Creating avatars bucket...');
    const { data: bData, error: bErr } = await supabase.storage.createBucket('avatars', { public: true });
    if (bErr) console.log('Bucket err (might exist):', bErr.message);
    else console.log('Bucket created!');

    console.log('Executing SQL to add avatar_url column...');
    // We cannot execute raw SQL directly from JS without pg, but maybe we can query the REST API directly or try RPC
    // Let's check if the column exists by selecting it
    const { error: selErr } = await supabase.from('users').select('avatar_url').limit(1);
    if (selErr && selErr.code === 'PGRST204') {
        console.log("Column avatar_url does not exist. Please use SQL Editor in Supabase to run: ALTER TABLE users ADD COLUMN avatar_url text;");
        // Because we don't have direct PG access, we will just save the avatar URL to the user_metadata of auth.users instead!
        console.log("We will use auth.users user_metadata instead!");
    } else {
        console.log("Column avatar_url check:", selErr ? selErr.message : "Exists!");
    }
}
run();
