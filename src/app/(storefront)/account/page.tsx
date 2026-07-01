import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PersonalInfoCard } from "./PersonalInfoCard";

export const metadata: Metadata = { title: "Settings — Organica Living" };

/* ------------------------------------------------------------------ */
/* Account / Settings — faithful port of design-reference/Account.dc.html*/
/* settings section, wired to the real user + profile and signout.       */
/* ------------------------------------------------------------------ */

const cardStyle: React.CSSProperties = {
  border: "1px solid #e4e1d6",
  borderRadius: "8px",
  padding: "28px",
};
const cardTitle: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: 600,
  color: "#1a1a1a",
  marginBottom: "18px",
};

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/account");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", user.id)
    .maybeSingle();

  const email = profile?.email ?? user.email ?? "";
  const fullName = (profile?.full_name ?? "").trim();
  const [firstName, ...rest] = fullName.split(/\s+/).filter(Boolean);
  const lastName = rest.join(" ");

  return (
    <main>
      {/* Settings */}
      <section style={{ background: "#fcfcf7", padding: "40px 0 50px" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 40px" }}>
          <h1
            style={{
              fontSize: "clamp(28px,3vw,40px)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              color: "#1c3a13",
            }}
          >
            Settings
          </h1>

          <div
            style={{
              maxWidth: "720px",
              marginTop: "28px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* Account Details */}
            <div style={cardStyle}>
              <div style={cardTitle}>Account Details</div>
              <div>
                <label htmlFor="email" style={{ fontSize: "11px", color: "#6d6d6d" }}>
                  Email
                </label>
                <input
                  id="email"
                  value={email}
                  disabled
                  style={{
                    display: "block",
                    width: "100%",
                    marginTop: "4px",
                    border: "1px solid #e4e1d6",
                    borderRadius: "8px",
                    padding: "12px 14px",
                    fontSize: "14px",
                    fontFamily: "inherit",
                    color: "#6d6d6d",
                    background: "#f4f3ec",
                  }}
                />
              </div>
              <p style={{ fontSize: "13px", color: "#3a3a36", marginTop: "12px" }}>
                Contact{" "}
                <a
                  href="mailto:care@organicaliving.com"
                  style={{ color: "#1c3a13", textDecoration: "underline" }}
                >
                  care@organicaliving.com
                </a>{" "}
                to update email.
              </p>
            </div>

            {/* Personal Information */}
            <PersonalInfoCard initialFirstName={firstName ?? ""} initialLastName={lastName} />

            {/* Payment Methods */}
            <div style={cardStyle}>
              <div style={cardTitle}>Payment Methods</div>
              <div style={{ background: "#f4f3ec", borderRadius: "8px", padding: "16px 18px" }}>
                <p style={{ fontSize: "14px", color: "#1a1a1a" }}>
                  You can view and update the payment methods for your
                  subscription(s) in our payment management portal.
                </p>
              </div>
            </div>

            {/* Manage Subscriptions */}
            <div style={cardStyle}>
              <div style={cardTitle}>Manage Subscriptions</div>
              <p style={{ fontSize: "14px", color: "#3a3a36" }}>
                You do not have any active subscriptions.
              </p>
            </div>
          </div>

          <form action="/auth/signout" method="post">
            <button
              type="submit"
              style={{
                lineHeight: 1,
                display: "inline-block",
                padding: "19px 40px",
                marginTop: "28px",
                fontSize: "15px",
                fontWeight: 500,
                color: "#fcfcf7",
                background: "#1c3a13",
                border: "none",
                borderRadius: "40px",
                textDecoration: "none",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Sign Out
            </button>
          </form>
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
          <div />
        </div>
      </section>
    </main>
  );
}
