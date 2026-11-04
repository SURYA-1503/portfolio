import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Guard: surface a helpful error in dev if env vars are missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[Supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not set. " +
    "Portfolio will fall back to local static data. " +
    "Add these variables to .env.local to enable database integration."
  );
}

// Create a no-op stub if credentials are missing so the app never crashes
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false },
        db: { schema: "public" },
        global: {
          headers: { "x-client-info": "surya-portfolio/1.0" }
        }
      })
    : null;

export const isSupabaseConfigured = Boolean(supabase);

