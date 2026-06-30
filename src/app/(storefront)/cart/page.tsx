import type { Metadata } from "next";
import Link from "next/link";
import { getCart } from "@/lib/cart/queries";
import { getActiveProducts } from "@/lib/catalog";
import { defaultVariant } from "@/lib/products";
import { formatPrice, imageUrl } from "@/lib/format";
import { CartQtyStepper } from "@/components/cart/CartQtyStepper";
import { CartPromo } from "@/components/cart/CartPromo";
import { CartRecommendationAdd } from "@/components/cart/CartRecommendationAdd";
import { CartDeliveryUpgrade } from "@/components/cart/CartDeliveryUpgrade";

export const metadata: Metadata = { title: "Cart — Organica Living" };
export const dynamic = "force-dynamic";

const COL = "1fr 160px 120px";

export default async function CartPage() {
  const cart = await getCart();
  const currency = cart.currency;

  // Recommendations: active products not already in the cart, priced live.
  const inCart = new Set(cart.lines.map((l) => l.productSlug));
  const recs = (await getActiveProducts())
    .filter((p) => !inCart.has(p.slug))
    .slice(0, 3)
    .map((p) => {
      const v = defaultVariant(p);
      return v
        ? {
            slug: p.slug,
            name: p.name,
            category: p.category,
            img: imageUrl(p.image_path) ?? `/images/${p.slug}.webp`,
            variantId: v.id,
            subCents: v.subscription_price_cents ?? v.price_cents,
            oneCents: v.price_cents,
          }
        : null;
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);

  return (
    <main style={{ background: "#fcfcf7" }}>
      <section style={{ background: "#fcfcf7", padding: "48px 0 90px", minHeight: "70vh" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px" }}>
          <h1 style={{ fontSize: "clamp(30px,3.4vw,44px)", fontWeight: 300, letterSpacing: "-0.02em", color: "#1c3a13" }}>
            Your Cart
          </h1>

          {cart.lines.length === 0 ? (
            <div style={{ marginTop: 32, background: "#f4f1e6", borderRadius: 18, padding: "60px 40px", textAlign: "center" }}>
              <p style={{ fontSize: 16, color: "#6d6d6d" }}>Your cart is empty.</p>
              <Link
                href="/products"
                style={{ display: "inline-block", marginTop: 18, fontSize: 14, fontWeight: 500, color: "#fcfcf7", background: "#1c3a13", padding: "13px 28px", borderRadius: 40, textDecoration: "none" }}
              >
                Shop products
              </Link>
            </div>
          ) : (
            <>
              {/* line items */}
              <div data-reveal style={{ marginTop: 32 }}>
                <div style={{ display: "grid", gridTemplateColumns: COL, gap: 24, paddingBottom: 14, borderBottom: "1px solid #d7d3c6", fontSize: 13, color: "#6d6d6d" }}>
                  <span>Product</span>
                  <span>Quantity</span>
                  <span style={{ textAlign: "right" }}>Price</span>
                </div>

                {cart.lines.map((line) => {
                  const isSub = line.purchaseType === "subscription";
                  const regularLine = line.regularUnitCents * line.quantity;
                  const savings = regularLine - line.lineCents;
                  const lineImg = imageUrl(line.imagePath) ?? `/images/${line.productSlug}.webp`;
                  return (
                    <div key={`${line.variantId}-${line.purchaseType}`} style={{ display: "grid", gridTemplateColumns: COL, gap: 24, alignItems: "center", padding: "28px 0", borderBottom: "1px solid #ece9de" }}>
                      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                        <Link
                          href={`/products/${line.productSlug}`}
                          aria-label={line.productName}
                          style={{ width: 96, height: 96, flex: "none", borderRadius: 12, background: `url('${lineImg}') center/contain no-repeat`, display: "block" }}
                        />
                        <div style={{ flex: 1 }}>
                          <Link href={`/products/${line.productSlug}`} style={{ fontSize: 16, fontWeight: 600, color: "#1a1a1a", textDecoration: "none" }}>
                            {line.productName}
                          </Link>
                          <div style={{ fontSize: 13, color: "#6d6d6d", marginTop: 3 }}>
                            {isSub
                              ? line.interval === "quarterly"
                                ? "Delivered every 3 months"
                                : "Delivered monthly"
                              : line.variantTitle}
                          </div>
                          {isSub && savings > 0 ? (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "#1c3a13", background: "#e7f0c8", padding: "4px 10px", borderRadius: 30, marginTop: 10 }}>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
                                <circle cx="7.5" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
                              </svg>
                              {formatPrice(savings, currency)} savings
                            </span>
                          ) : null}
                          {isSub ? (
                            <CartDeliveryUpgrade variantId={line.variantId} interval={line.interval} />
                          ) : null}
                        </div>
                      </div>
                      <div style={{ justifySelf: "start" }}>
                        <CartQtyStepper variantId={line.variantId} purchaseType={line.purchaseType} quantity={line.quantity} />
                      </div>
                      <div style={{ justifySelf: "end", textAlign: "right" }}>
                        <div style={{ fontSize: 15, fontWeight: 500 }}>{formatPrice(line.lineCents, currency)}</div>
                        {isSub && savings > 0 ? (
                          <div style={{ fontSize: 13, color: "#9a9a8e", textDecoration: "line-through" }}>{formatPrice(regularLine, currency)}</div>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* recommendations + summary */}
              <div data-reveal style={{ display: "grid", gridTemplateColumns: "1.5fr 0.9fr", gap: 56, marginTop: 48, alignItems: "start" }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 20 }}>You Might Also Like:</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
                    {recs.map((r) => (
                      <div key={r.slug} style={{ background: "#f4f1e6", borderRadius: 16, padding: 20, textAlign: "center" }}>
                        <Link
                          href={`/products/${r.slug}`}
                          aria-label={r.name}
                          style={{ display: "block", aspectRatio: "1 / 1", borderRadius: 12, background: `url('${r.img}') center/contain no-repeat`, marginBottom: 16 }}
                        />
                        <div style={{ fontSize: 12, color: "#6d6d6d", fontFamily: "var(--font-mono)" }}>{r.category}</div>
                        <div style={{ fontSize: 15, color: "#1a1a1a", marginTop: 4 }}>{r.name}</div>
                        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 6, marginTop: 10 }}>
                          <span style={{ fontSize: 14, fontWeight: 500 }}>{formatPrice(r.subCents, currency)}</span>
                          {r.subCents < r.oneCents ? (
                            <span style={{ fontSize: 12, color: "#9a9a8e", textDecoration: "line-through" }}>{formatPrice(r.oneCents, currency)}</span>
                          ) : null}
                        </div>
                        <CartRecommendationAdd variantId={r.variantId} />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <CartPromo code={cart.code} />
                  {cart.discountCents > 0 ? (
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 28, paddingBottom: 16, borderBottom: "1px solid #ece9de" }}>
                      <span style={{ fontSize: 14, color: "#1a1a1a" }}>Discounts</span>
                      <span style={{ fontSize: 13, color: "#1c3a13", background: "#e7f0c8", padding: "3px 10px", borderRadius: 6 }}>
                        −{formatPrice(cart.discountCents, currency)}
                      </span>
                    </div>
                  ) : null}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 16 }}>
                    <span style={{ fontSize: 18, fontWeight: 600 }}>Total</span>
                    <span style={{ fontSize: 18, fontWeight: 600 }}>{formatPrice(cart.totalCents, currency)}</span>
                  </div>
                  <Link
                    href="/checkout"
                    style={{ lineHeight: 1, display: "inline-block", textAlign: "center", width: "100%", padding: "21px 0", marginTop: 24, fontSize: 15, fontWeight: 500, color: "#fcfcf7", background: "#1c3a13", borderRadius: 40, textDecoration: "none" }}
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
