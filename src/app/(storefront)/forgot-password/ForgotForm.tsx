"use client";

import { useActionState } from "react";
import Link from "next/link";
import { requestPasswordResetAction } from "@/lib/auth/actions";
import { fieldError } from "@/lib/forms";

/* ------------------------------------------------------------------ */
/* Forgot password — styled to match the Login / Signup account cards.  */
/* Wired to the real requestPasswordResetAction.                        */
/* ------------------------------------------------------------------ */

const fieldWrap: React.CSSProperties = { marginTop: "20px" };
const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  color: "#6d6d6d",
  marginBottom: "2px",
};
const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderBottom: "1px solid #2c4a35",
  padding: "8px 0",
  fontSize: "15px",
  outline: "none",
  background: "transparent",
  fontFamily: "inherit",
  color: "#1a1a1a",
};
const errStyle: React.CSSProperties = {
  marginTop: "4px",
  fontSize: "12px",
  color: "#b3261e",
};
const helperLink: React.CSSProperties = {
  color: "#1c3a13",
  textDecoration: "underline",
};

export function ForgotForm() {
  const [state, action, pending] = useActionState(requestPasswordResetAction, null);

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
          Reset your password
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
            Reset Password
          </div>

          <div style={{ padding: "28px 32px 36px" }}>
            {state?.ok ? (
              <p style={{ fontSize: "15px", color: "#1c3a13", lineHeight: 1.5 }}>
                If that email exists, a reset link is on its way. Then{" "}
                <Link
                  href="/login"
                  style={{ color: "#1c3a13", fontWeight: 500, textDecoration: "underline" }}
                >
                  sign in
                </Link>
                .
              </p>
            ) : (
              <form action={action}>
                <p style={{ fontSize: "14px", color: "#6d6d6d", lineHeight: 1.5 }}>
                  Enter your email and we&apos;ll send you a link to reset your password.
                </p>

                {state && !state.ok && state.error ? (
                  <p style={{ ...errStyle, marginTop: "12px", marginBottom: 0 }}>
                    {state.error}
                  </p>
                ) : null}

                <div style={fieldWrap}>
                  <label htmlFor="email" style={labelStyle}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    style={inputStyle}
                  />
                  {fieldError(state, "email") ? (
                    <p style={errStyle}>{fieldError(state, "email")}</p>
                  ) : null}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "20px",
                    marginTop: "32px",
                  }}
                >
                  <button
                    type="submit"
                    disabled={pending}
                    style={{
                      lineHeight: 1,
                      display: "inline-block",
                      padding: "19px 30px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#fcfcf7",
                      background: "#1c3a13",
                      border: "none",
                      borderRadius: "40px",
                      textDecoration: "none",
                      cursor: pending ? "default" : "pointer",
                      fontFamily: "inherit",
                      opacity: pending ? 0.7 : 1,
                    }}
                  >
                    {pending ? "Sending…" : "Send reset link"}
                  </button>
                  <Link href="/login" style={helperLink}>
                    Back to sign in
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
