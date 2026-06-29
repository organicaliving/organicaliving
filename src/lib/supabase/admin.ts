import "server-only";
import { createClient } from "@supabase/supabase-js";
import { publicEnv, serverEnv } from "@/lib/env";
import type { Database } from "@/lib/supabase/database.types";

/**
 * Privileged Supabase client that BYPASSES Row Level Security.
 * Use ONLY in trusted server contexts (e.g. Stripe webhooks writing orders).
 * Never expose the service-role key to the browser.
 */
export function createAdminClient() {
  return createClient<Database>(publicEnv.supabaseUrl, serverEnv.supabaseServiceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
