"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signInAction, signInWithOAuth } from "@/lib/auth/actions";
import { fieldError } from "@/lib/forms";

/* ------------------------------------------------------------------ */
/* Login — faithful port of design-reference/Login.dc.html's login      */
/* section, wired to the real signInAction / OAuth flow.                */
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

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(signInAction, null);

  async function continueWith(provider: "google" | "facebook") {
    const res = await signInWithOAuth(provider);
    if (res.ok && res.redirect) window.location.assign(res.redirect);
  }

  const oauthBtnStyle: React.CSSProperties = {
    width: "100%",
    height: "50px",
    border: "1px solid #d3d3d3",
    borderRadius: "6px",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: "14px",
    fontWeight: 500,
    color: "#1a1a1a",
  };

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
          Hi, sign in.
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
            Your Account
          </div>

          <div style={{ padding: "28px 32px 36px" }}>
            <form action={action}>
              {next ? <input type="hidden" name="next" value={next} /> : null}

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <button
                  type="button"
                  onClick={() => continueWith("google")}
                  style={oauthBtnStyle}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
                    />
                  </svg>
                  Continue with Google
                </button>

                <button
                  type="button"
                  onClick={() => continueWith("facebook")}
                  style={oauthBtnStyle}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12a12 12 0 1 0-13.875 11.85v-8.38H7.08V12h3.045V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.68.235 2.68.235v2.95h-1.51c-1.49 0-1.955.925-1.955 1.875V12h3.328l-.532 3.47h-2.796v8.38A12 12 0 0 0 24 12z" />
                  </svg>
                  Continue with Facebook
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  margin: "24px 0",
                  color: "#6d6d6d",
                  fontSize: "13px",
                }}
              >
                <div style={{ flex: 1, height: "1px", background: "#e4e1d6" }} />
                or
                <div style={{ flex: 1, height: "1px", background: "#e4e1d6" }} />
              </div>

              {state && !state.ok && state.error ? (
                <p style={{ ...errStyle, marginTop: 0, marginBottom: "8px" }}>
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

              <div style={fieldWrap}>
                <label htmlFor="password" style={labelStyle}>
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
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
                  alignItems: "flex-start",
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
                    padding: "19px 36px",
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
                  {pending ? "Signing in…" : "Sign In"}
                </button>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    textAlign: "right",
                    fontSize: "14px",
                  }}
                >
                  <Link href="/forgot-password" style={helperLink}>
                    Forgot password?
                  </Link>
                  <Link href="/forgot-password" style={helperLink}>
                    Don&apos;t have a password?
                  </Link>
                  <Link href="/signup" style={helperLink}>
                    Want to create a new account?
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
