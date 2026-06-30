import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { CartLine } from "@/lib/cart/types";
import type { CheckoutAddress, CheckoutQuote } from "@/lib/checkout/types";

export async function createPendingOrder(args: {
  userId: string | null;
  email: string;
  lines: CartLine[];
  quote: CheckoutQuote;
  shippingAddress: CheckoutAddress;
  discountCode: string | null;
}): Promise<{ orderId: string }> {
  const admin = createAdminClient();
  const { data: order, error } = await admin
    .from("orders")
    .insert({
      user_id: args.userId,
      email: args.email,
      status: "pending",
      subtotal_cents: args.quote.subtotalCents,
      discount_cents: args.quote.discountCents,
      shipping_cents: args.quote.shippingCents,
      tax_cents: args.quote.taxCents,
      total_cents: args.quote.totalCents,
      currency: args.quote.currency,
      discount_code: args.discountCode,
      shipping_address: args.shippingAddress,
    })
    .select("id")
    .single();
  if (error || !order) throw new Error(error?.message ?? "Could not create order");

  const items = args.lines.map((l) => ({
    order_id: order.id,
    variant_id: l.variantId,
    product_name: l.productName,
    variant_title: l.variantTitle,
    unit_price_cents: l.unitCents,
    quantity: l.quantity,
    purchase_type: l.purchaseType,
  }));
  const { error: itemsError } = await admin.from("order_items").insert(items);
  if (itemsError) throw new Error(itemsError.message);

  return { orderId: order.id };
}

export async function finalizeOrderFromPaymentIntent(pi: {
  id: string;
  metadata: { order_id?: string };
}): Promise<{ finalized: boolean }> {
  const orderId = pi.metadata.order_id;
  if (!orderId) return { finalized: false };
  const admin = createAdminClient();

  const { data: order } = await admin
    .from("orders").select("id, status, user_id").eq("id", orderId).maybeSingle();
  if (!order || order.status === "paid") return { finalized: false };

  await admin.from("orders").update({ status: "paid", stripe_payment_intent_id: pi.id }).eq("id", orderId);
  if (order.user_id) {
    await admin.from("carts").update({ status: "converted" }).eq("user_id", order.user_id).eq("status", "active");
  }
  return { finalized: true };
}
