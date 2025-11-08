import { createClient } from "@supabase/supabase-js";

const globalForSupabase = global;
const supabase = globalForSupabase.supabase || createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

if (process.env.NODE_ENV !== "production") {
    global.supabase = supabase;
}

export default supabase;