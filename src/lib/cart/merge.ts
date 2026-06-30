import "server-only";
import { createClient } from "@/lib/supabase/server";
import { readGuestCart, clearGuestCart, MAX_QTY_PER_LINE } from "@/lib/cart/guest";

export async function mergeGuestCartIntoUser(): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const guest = await readGuestCart();
  if (guest.items.length === 0) { await clearGuestCart(); return; }

  // Ensure active cart.
  let cartId: string;
  const { data: existing } = await supabase
    .from("carts").select("id").eq("user_id", user.id).eq("status", "active").maybeSingle();
  if (existing?.id) cartId = existing.id;
  else {
    const { data: created } = await supabase.from("carts").insert({ user_id: user.id }).select("id").single();
    if (!created) { await clearGuestCart(); return; }
    cartId = created.id;
  }

  for (const item of guest.items) {
    const { data: row } = await supabase
      .from("cart_items").select("id, quantity")
      .eq("cart_id", cartId).eq("variant_id", item.variantId).eq("purchase_type", item.purchaseType).maybeSingle();
    if (row) await supabase.from("cart_items").update({ quantity: Math.min(row.quantity + item.quantity, MAX_QTY_PER_LINE) }).eq("id", row.id);
    else await supabase.from("cart_items").insert({ cart_id: cartId, variant_id: item.variantId, quantity: Math.min(item.quantity, MAX_QTY_PER_LINE), purchase_type: item.purchaseType });
  }
  await clearGuestCart();
}
