import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Order History — Organica Living" };

/* ------------------------------------------------------------------ */
/* Order History — faithful port of design-reference/Order History.dc   */
/* .html. A member page (logged-in chrome), guarded like /account.      */
/* Rows are wired to the user's real orders (RLS: "read own orders").   */
/* The mockup shows the header with no rows — that is the empty state.   */
/* TRACKING / INVOICE have no backing columns yet, so they render "—".  */
/* ------------------------------------------------------------------ */

type OrderRow = {
  id: string;
  created_at: string;
  total_cents: number;
  currency: string;
};

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

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const GRID = "1fr 1fr 1fr 1fr 1fr";

export default async function OrdersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/orders");

  const { data: orders } = await supabase
    .from("orders")
    .select("id, created_at, total_cents, currency")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const rows: OrderRow[] = orders ?? [];

  return (
    <main>
      {/* Order History */}
      <section style={{ background: "#fcfcf7", padding: "40px 0 40px", minHeight: "34vh" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 40px" }}>
          <h1
            style={{
              fontSize: "clamp(28px,3vw,40px)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              color: "#1c3a13",
            }}
          >
            Order History
          </h1>

          {/* Header pill */}
          <div
            style={{
              marginTop: "28px",
              border: "1px solid #d7d3c6",
              borderRadius: "30px",
              padding: "16px 32px",
              display: "grid",
              gridTemplateColumns: GRID,
              gap: "16px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#1a1a1a",
            }}
          >
            <span>DATE</span>
            <span>ORDER</span>
            <span style={{ textAlign: "center" }}>TRACKING</span>
            <span style={{ textAlign: "right" }}>CHARGE</span>
            <span style={{ textAlign: "right" }}>INVOICE</span>
          </div>

          {/* Empty state — no orders yet */}
          {rows.length === 0 && (
            <p style={{ marginTop: "20px", fontSize: "15px", color: "#3a3a36" }}>
              You haven&apos;t placed any orders yet.
            </p>
          )}

          {/* Order rows — wired to real orders */}
          {rows.map((order) => (
            <div
              key={order.id}
              style={{
                padding: "18px 32px",
                display: "grid",
                gridTemplateColumns: GRID,
                gap: "16px",
                fontSize: "14px",
                color: "#1a1a1a",
                borderBottom: "1px solid #e4e1d6",
                alignItems: "center",
              }}
            >
              <span>{dateFmt.format(new Date(order.created_at))}</span>
              <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "13px" }}>
                #{order.id.slice(0, 8).toUpperCase()}
              </span>
              <span style={{ textAlign: "center", color: "#6d6d6d" }}>—</span>
              <span style={{ textAlign: "right" }}>
                {formatPrice(order.total_cents, order.currency)}
              </span>
              <span style={{ textAlign: "right", color: "#6d6d6d" }}>—</span>
            </div>
          ))}
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
