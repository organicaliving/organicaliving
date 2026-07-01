import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Account confirmed — Organica Living" };

/* ------------------------------------------------------------------ */
/* Email-confirmation success page. The PKCE confirmation link signs    */
/* the user in (handled in /auth/callback), then redirects here. Styled  */
/* to match the Login / Signup account cards.                           */
/* ------------------------------------------------------------------ */

export default function ConfirmedPage() {
  return (
    <section
      style={{
        background: "#fcfcf7",
        padding: "48px 0 100px",
        minHeight: "60vh",
      }}
    >
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 40px" }}>
        <h1
          style={{
            fontSize: "clamp(28px,3vw,38px)",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            color: "#1c3a13",
          }}
        >
          You&apos;re all set.
        </h1>

        <div
          style={{
            maxWidth: "510px",
            margin: "36px auto 0",
            border: "1px solid #e4e1d6",
            borderRadius: "4px",
            background: "#fff",
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontSize: "14px",
              fontWeight: 600,
              color: "#1c3a13",
              padding: "18px",
              borderBottom: "1px solid #e4e1d6",
            }}
          >
            Account Confirmed
          </div>

          <div style={{ padding: "36px 32px 40px", textAlign: "center" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "#1c3a13",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
              }}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fcfcf7"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>

            <p
              style={{
                marginTop: "22px",
                fontSize: "16px",
                color: "#1a1a1a",
                lineHeight: 1.5,
              }}
            >
              Your email is confirmed and you&apos;re signed in.
            </p>
            <p
              style={{
                marginTop: "8px",
                fontSize: "14px",
                color: "#6d6d6d",
                lineHeight: 1.5,
              }}
            >
              Welcome to Organica Living.
            </p>

            <Link
              href="/account"
              style={{
                lineHeight: 1,
                display: "inline-block",
                marginTop: "28px",
                padding: "19px 34px",
                fontSize: "14px",
                fontWeight: 500,
                color: "#fcfcf7",
                background: "#1c3a13",
                borderRadius: "40px",
                textDecoration: "none",
              }}
            >
              Continue to your account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
