import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Refer — Organica Living" };

/* ------------------------------------------------------------------ */
/* Refer — faithful port of design-reference/Refer.dc.html. A member     */
/* page (logged-in chrome), so it is guarded like /account.              */
/* ------------------------------------------------------------------ */

const FAQ: Array<{ q: string; a: string }> = [
  {
    q: "What is Organica Living's referral program, and how can I get involved?",
    a: "Visit our help center for detailed steps, or contact care@organicaliving.com.",
  },
  {
    q: "Who is eligible for a referral?",
    a: "Visit our help center for detailed steps, or contact care@organicaliving.com.",
  },
  {
    q: "When will I receive my points?",
    a: "Visit our help center for detailed steps, or contact care@organicaliving.com.",
  },
  {
    q: "How do I use my points?",
    a: "Visit our help center for detailed steps, or contact care@organicaliving.com.",
  },
  {
    q: "Do my points expire?",
    a: "Visit our help center for detailed steps, or contact care@organicaliving.com.",
  },
];

export default async function ReferPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/refer");

  return (
    <main>
      {/* Refer */}
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
            Refer
          </h1>

          <div
            style={{
              marginTop: "28px",
              display: "flex",
              alignItems: "flex-start",
              gap: "14px",
              background: "#f6f8ee",
              border: "1px solid #dfe7c8",
              borderRadius: "10px",
              padding: "18px 22px",
            }}
          >
            <span style={{ flex: "none", color: "#1c3a13" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8h.01M11 12h1v4h1" />
              </svg>
            </span>
            <p style={{ fontSize: "14px", fontWeight: 500, lineHeight: 1.5, color: "#1a1a1a" }}>
              After placing your first order, you&apos;ll unlock access to Organica
              Living&apos;s referral program. This is part of InnerCircle, our Loyalty
              Program open to all Organica Living members. Questions? Please contact
              care@organicaliving.com
            </p>
          </div>
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
