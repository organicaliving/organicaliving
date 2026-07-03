// src/components/cart/CartDrawerBody.tsx
import Link from "next/link";
import { getActiveProducts } from "@/lib/catalog";
import { defaultVariant } from "@/lib/products";
import { formatPrice, imageUrl } from "@/lib/format";
import { CartQtyStepper } from "@/components/cart/CartQtyStepper";
import { CartDeliveryUpgrade } from "@/components/cart/CartDeliveryUpgrade";
import { CartPromo } from "@/components/cart/CartPromo";
import { CartRecommendationAdd } from "@/components/cart/CartRecommendationAdd";
import type { CartView } from "@/lib/cart/types";

/** Lucide `tags` (lucide.dev, ISC), inline — inherits colour via currentColor. */
function TagsIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19" />
      <path d="M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="6.5" cy="9.5" r=".5" fill="currentColor" />
    </svg>
  );
}

/** Scrollable content of the cart mini-panel (everything above the sticky footer). */
export async function CartDrawerBody({ cart }: { cart: CartView }) {
  const currency = cart.currency;
  // Total the customer saves by subscribing/bundling vs. regular pricing.
  const bundleSavings = cart.lines.reduce(
    (sum, l) => sum + (l.regularUnitCents * l.quantity - l.lineCents),
    0,
  );

  if (cart.lines.length === 0) {
    return (
      <div style={{ padding: "40px 0", textAlign: "center" }}>
        <p style={{ fontSize: 16, color: "#6d6d6d" }}>Your cart is empty.</p>
        <Link
          href="/products"
          style={{ display: "inline-block", marginTop: 16, fontSize: 14, fontWeight: 500, color: "#fcfcf7", background: "#1c3a13", padding: "12px 26px", borderRadius: 40, textDecoration: "none" }}
        >
          Shop products
        </Link>
      </div>
    );
  }

  // One recommendation: first active product not already in the cart.
  const inCart = new Set(cart.lines.map((l) => l.productSlug));
  const recProduct = (await getActiveProducts()).find((p) => !inCart.has(p.slug));
  const recVariant = recProduct ? defaultVariant(recProduct) : null;
  const rec =
    recProduct && recVariant
      ? {
          slug: recProduct.slug,
          name: recProduct.name,
          img: imageUrl(recProduct.image_path) ?? `/images/${recProduct.slug}.webp`,
          variantId: recVariant.id,
          subCents: recVariant.subscription_price_cents ?? recVariant.price_cents,
          oneCents: recVariant.price_cents,
        }
      : null;
  const recPct = rec && rec.oneCents > rec.subCents ? Math.round((1 - rec.subCents / rec.oneCents) * 100) : 0;

  return (
    <div>
      {/* Savings banner — total saved by subscribing/bundling, else a subscribe nudge. */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          background: bundleSavings > 0 ? "#e7f0c8" : "#f4f1e6",
          borderRadius: 12,
          padding: "12px 18px",
          fontSize: 14,
          fontWeight: bundleSavings > 0 ? 600 : 500,
          color: bundleSavings > 0 ? "#1c3a13" : "#1a1a1a",
        }}
      >
        <TagsIcon />
        {bundleSavings > 0
          ? `You're saving ${formatPrice(bundleSavings, currency)} in total`
          : "Subscribe & save on every order"}
      </div>

      {/* Line items */}
      <div style={{ marginTop: 8 }}>
        {cart.lines.map((line) => {
          const isSub = line.purchaseType === "subscription";
          const regularLine = line.regularUnitCents * line.quantity;
          const savings = regularLine - line.lineCents;
          const lineImg = imageUrl(line.imagePath) ?? `/images/${line.productSlug}.webp`;
          return (
            <div
              key={`${line.variantId}-${line.purchaseType}`}
              style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "20px 0", borderBottom: "1px solid #ece9de" }}
            >
              <Link
                href={`/products/${line.productSlug}`}
                aria-label={line.productName}
                style={{ width: 72, height: 72, flex: "none", borderRadius: 12, background: `url('${lineImg}') center/125% no-repeat`, display: "block" }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <Link href={`/products/${line.productSlug}`} style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a", textDecoration: "none" }}>
                  {line.productName}
                </Link>
                <div style={{ fontSize: 13, color: "#6d6d6d", marginTop: 2 }}>
                  {isSub
                    ? line.interval === "quarterly"
                      ? "Delivered every 3 months"
                      : "Delivered monthly"
                    : line.variantTitle}
                </div>
                {savings > 0 ? (
                  <div style={{ display: "inline-block", fontSize: 12, fontWeight: 600, color: "#1c3a13", background: "#e7f0c8", padding: "3px 8px", borderRadius: 6, marginTop: 8 }}>
                    {formatPrice(savings, currency)} off today
                  </div>
                ) : null}
                <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 14 }}>
                  <CartQtyStepper variantId={line.variantId} purchaseType={line.purchaseType} quantity={line.quantity} />
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: 15, fontWeight: 500 }}>{formatPrice(line.lineCents, currency)}</span>
                    {savings > 0 ? (
                      <span style={{ fontSize: 13, color: "#9a9a8e", textDecoration: "line-through", marginLeft: 6 }}>{formatPrice(regularLine, currency)}</span>
                    ) : null}
                  </div>
                </div>
                {isSub ? <CartDeliveryUpgrade variantId={line.variantId} interval={line.interval} /> : null}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bundle + Save recommendation (single) */}
      {rec ? (
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 10 }}>
            {recPct > 0 ? `Bundle + Save ${recPct}%` : "You might also like"}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, background: "#f4f1e6", borderRadius: 14, padding: 14 }}>
            <div aria-hidden style={{ width: 60, height: 60, flex: "none", borderRadius: 10, background: `url('${rec.img}') center/125% no-repeat` }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a" }}>{rec.name}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{formatPrice(rec.subCents, currency)}</span>
                {rec.subCents < rec.oneCents ? (
                  <span style={{ fontSize: 12, color: "#9a9a8e", textDecoration: "line-through" }}>{formatPrice(rec.oneCents, currency)}</span>
                ) : null}
              </div>
            </div>
            <div style={{ flex: "none", marginTop: -14 }}>
              <CartRecommendationAdd variantId={rec.variantId} />
            </div>
          </div>
        </div>
      ) : null}

      {/* Promo code */}
      <div style={{ marginTop: 22, paddingBottom: 8 }}>
        <CartPromo code={cart.code} />
      </div>
    </div>
  );
}
