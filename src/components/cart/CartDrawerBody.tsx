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

/** Scrollable content of the cart mini-panel (everything above the sticky footer). */
export async function CartDrawerBody({ cart }: { cart: CartView }) {
  const currency = cart.currency;

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
      {/* Free-shipping banner — truthful (free shipping on every order). */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          background: "#f4f1e6",
          borderRadius: 12,
          padding: "12px 18px",
          fontSize: 14,
          color: "#1a1a1a",
        }}
      >
        <span style={{ color: "#9a9a8e" }}>【</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1c3a13" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="M3.3 7 12 12l8.7-5" />
            <path d="M12 22V12" />
          </svg>
          You&rsquo;re getting free shipping
        </span>
        <span style={{ color: "#9a9a8e" }}>】</span>
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
