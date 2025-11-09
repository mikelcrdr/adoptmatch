import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// ✅ Cliente Supabase con Auth y compatibilidad Next.js
export const supabase = createPagesBrowserClient({
  supabaseUrl,
  supabaseKey: supabaseAnonKey,
});

