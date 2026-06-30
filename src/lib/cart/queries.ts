import "server-only";
import { createClient } from "@/lib/supabase/server";
import { readGuestCart } from "@/lib/cart/guest";
import { computeTotals } from "@/lib/cart/totals";
import type { CartLine, CartView, DeliveryInterval, Discount, PurchaseType } from "@/lib/cart/types";

const CURRENCY = "usd";

/** Extra discount off the monthly subscription price for 3-month (quarterly) delivery. */
export const QUARTERLY_EXTRA_OFF = 0.1;

export function quarterlyUnitCents(subscriptionPriceCents: number): number {
  return Math.round(subscriptionPriceCents * (1 - QUARTERLY_EXTRA_OFF));
}

export async function validatePromoCode(code: string): Promise<Discount | null> {
  if (!code) return null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("discount_codes")
    .select("code, type, value, active, max_redemptions, times_redeemed, starts_at, ends_at")
    .eq("code", code)
    .eq("active", true)
    .maybeSingle();
  if (error || !data) return null;
  // Date-window check: return null if before starts_at or after ends_at.
  const now = new Date();
  if (data.starts_at != null && now < new Date(data.starts_at)) return null;
  if (data.ends_at != null && now > new Date(data.ends_at)) return null;
  // NOTE: times_redeemed is incremented at order time (Phase 3 checkout); this cap check is advisory until then.
  if (data.max_redemptions != null && data.times_redeemed >= data.max_redemptions) return null;
  return { code: data.code, type: data.type as Discount["type"], value: data.value };
}

type VariantRow = {
  id: string;
  price_cents: number;
  subscription_price_cents: number | null;
  currency: string;
  title: string;
  product: { slug: string; name: string; image_path: string | null } | null;
};

function lineFrom(
  v: VariantRow,
  quantity: number,
  purchaseType: PurchaseType,
  interval: DeliveryInterval,
): CartLine {
  let unitCents = v.price_cents;
  if (purchaseType === "subscription" && v.subscription_price_cents != null) {
    unitCents =
      interval === "quarterly"
        ? quarterlyUnitCents(v.subscription_price_cents)
        : v.subscription_price_cents;
  }
  return {
    variantId: v.id,
    productSlug: v.product?.slug ?? "",
    productName: v.product?.name ?? "",
    variantTitle: v.title,
    imagePath: v.product?.image_path ?? null,
    unitCents,
    regularUnitCents: v.price_cents,
    quantity,
    purchaseType,
    interval: purchaseType === "subscription" ? interval : "monthly",
    lineCents: unitCents * quantity,
  };
}

function toView(lines: CartLine[], discount: Discount | null): CartView {
  const t = computeTotals(lines, discount);
  return {
    lines,
    itemCount: t.itemCount,
    subtotalCents: t.subtotalCents,
    discountCents: t.discountCents,
    totalCents: t.totalCents,
    code: discount?.code ?? null,
    currency: CURRENCY,
  };
}

export async function getCart(): Promise<CartView> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Guest path: hydrate from cookie then look up variants via anon client.
    const cart = await readGuestCart();
    if (cart.items.length === 0) return toView([], null);
    const ids = cart.items.map((i) => i.variantId);
    const { data: variants } = await supabase
      .from("product_variants")
      .select(
        "id, price_cents, subscription_price_cents, currency, title, product:products(slug, name, image_path)",
      )
      .in("id", ids);
    const byId = new Map(
      (variants ?? []).map((v) => [v.id, v as unknown as VariantRow]),
    );
    const lines = cart.items
      .map((i) => {
        const v = byId.get(i.variantId);
        return v ? lineFrom(v, i.quantity, i.purchaseType, i.interval ?? "monthly") : null;
      })
      .filter((l): l is CartLine => l !== null);
    const discount = cart.code ? await validatePromoCode(cart.code) : null;
    return toView(lines, discount);
  }

  // Authenticated path: read the user's active cart from the DB.
  const { data: cartRow } = await supabase
    .from("carts")
    .select(
      "id, items:cart_items(variant_id, quantity, purchase_type, delivery_interval, variant:product_variants(id, price_cents, subscription_price_cents, currency, title, product:products(slug, name, image_path)))",
    )
    .eq("user_id", user.id)
    .eq("status", "active")
    .maybeSingle();
  const rows = (cartRow?.items ?? []) as Array<{
    quantity: number;
    purchase_type: PurchaseType;
    delivery_interval: DeliveryInterval;
    variant: VariantRow | null;
  }>;
  const lines = rows
    .map((r) =>
      r.variant ? lineFrom(r.variant, r.quantity, r.purchase_type, r.delivery_interval ?? "monthly") : null,
    )
    .filter((l): l is CartLine => l !== null);
  const { code } = await readGuestCart();
  const discount = code ? await validatePromoCode(code) : null;
  return toView(lines, discount);
}
