import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

export async function getOrderByPaymentIntent(
  piId: string,
): Promise<{ id: string; total_cents: number; email: string | null } | null> {
  const admin = createAdminClient();
  const { data } = await admin
    .from("orders").select("id, total_cents, email").eq("stripe_payment_intent_id", piId).maybeSingle();
  return data ?? null;
}
