import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { publicEnv } from "@/lib/env";
import type { Database } from "@/lib/supabase/database.types";

/**
 * Cookie-free anon client safe for use at build time (e.g. generateStaticParams).
 * Does not read or write cookies, so it works outside a request context.
 */
export function createStaticClient() {
  return createSupabaseClient<Database>(
    publicEnv.supabaseUrl,
    publicEnv.supabaseAnonKey,
  );
}

/**
 * Supabase client for Server Components, Route Handlers and Server Actions.
 * Reads/writes the auth session via cookies. Still bound by RLS (anon key).
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(publicEnv.supabaseUrl, publicEnv.supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Called from a Server Component — safe to ignore when middleware
          // is responsible for refreshing the session.
        }
      },
    },
  });
}
