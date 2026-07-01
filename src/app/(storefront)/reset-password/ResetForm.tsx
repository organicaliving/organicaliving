"use client";

import { useActionState } from "react";
import Link from "next/link";
import { updatePasswordAction } from "@/lib/auth/actions";
import { fieldError } from "@/lib/forms";

/* ------------------------------------------------------------------ */
/* Reset password — styled to match the Login / Signup account cards.   */
/* Wired to the real updatePasswordAction (redirects to /account on OK).*/
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

export function ResetForm() {
  const [state, action, pending] = useActionState(updatePasswordAction, null);

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
          Choose a new password
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
            Set A New Password
          </div>

          <div style={{ padding: "28px 32px 36px" }}>
            <form action={action}>
              {state && !state.ok && state.error ? (
                <p style={{ ...errStyle, marginTop: 0, marginBottom: "8px" }}>
                  {state.error}
                </p>
              ) : null}

              <div style={fieldWrap}>
                <label htmlFor="password" style={labelStyle}>
                  New password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  style={inputStyle}
                />
                {fieldError(state, "password") ? (
                  <p style={errStyle}>{fieldError(state, "password")}</p>
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
                  {pending ? "Updating…" : "Update password"}
                </button>
                <Link href="/login" style={helperLink}>
                  Back to sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
