import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getActiveProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/catalog/ProductCard";

export const metadata: Metadata = { title: "Subscriptions — Organica Living" };

/* ------------------------------------------------------------------ */
/* Subscriptions — faithful port of design-reference/Subscriptions.dc   */
/* .html. A member page (logged-in chrome), guarded like /account.      */
/* The "You Might Also Like" recommendations use our existing            */
/* <ProductCard/> (per request), wired to real catalog data.            */
/* ------------------------------------------------------------------ */

// Mirror the mockup's curated recommendation set.
const RECOMMENDED_SLUGS = ["multi-pro", "sleep-pro", "optimus-d3-mini"];

const FAQ: Array<{ q: string; a: string }> = [
  {
    q: "How do I edit my next shipment date?",
    a: "Visit our help center for detailed steps, or contact care@organicaliving.com.",
  },
  {
    q: "How do I update my shipping and billing information?",
    a: "Visit our help center for detailed steps, or contact care@organicaliving.com.",
  },
  {
    q: "How do I switch between different refill plans?",
    a: "Visit our help center for detailed steps, or contact care@organicaliving.com.",
  },
];

export default async function SubscriptionsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/subscriptions");

  const products = await getActiveProducts();
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  const recommended = RECOMMENDED_SLUGS.map((s) => bySlug.get(s)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  return (
    <main>
      {/* Subscriptions */}
      <section style={{ background: "#fcfcf7", padding: "40px 0 40px" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 40px" }}>
          <h1
            style={{
              fontSize: "clamp(28px,3vw,40px)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              color: "#1c3a13",
            }}
          >
            Subscriptions
          </h1>
          <p style={{ marginTop: "20px", fontSize: "15px", color: "#3a3a36" }}>
            You don&apos;t have any active subscriptions.
          </p>

          {recommended.length > 0 && (
            <div style={{ marginTop: "40px" }}>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 300,
                  color: "#1a1a1a",
                  marginBottom: "20px",
                }}
              >
                You Might Also Like:
              </div>
              <div
                data-rgrid3
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: "20px",
                }}
              >
                {recommended.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Need Help */}
      <section style={{ background: "#fcfcf7", padding: "50px 0 90px" }}>
        <div
          data-rcol2
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 40px",
            display: "grid",
            gridTemplateColumns: "0.85fr 1.15fr",
            gap: "48px",
            alignItems: "start",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "clamp(28px,3.2vw,40px)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
              }}
            >
              Need Help?
            </h2>
            <p style={{ marginTop: "14px", fontSize: "14px", color: "#3a3a36" }}>
              Have more questions? Visit our{" "}
              <a href="/contact" style={{ color: "#1c3a13", textDecoration: "underline" }}>
                FAQ
              </a>
              .
            </p>
          </div>

          <div data-faq>
            {FAQ.map((item) => (
              <details key={item.q} style={{ borderBottom: "1px solid #e4e1d6" }}>
                <summary
                  style={{
                    listStyle: "none",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "16px",
                    alignItems: "center",
                    padding: "20px 0",
                    fontSize: "15px",
                    color: "#1a1a1a",
                  }}
                >
                  {item.q}
                  <span style={{ color: "#6d6d6d", fontSize: "18px" }}>+</span>
                </summary>
                <div
                  style={{
                    padding: "0 0 20px",
                    fontSize: "13px",
                    lineHeight: 1.6,
                    color: "#3a3a36",
                  }}
                >
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
