"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { signUpAction, signInWithOAuth } from "@/lib/auth/actions";
import { fieldError } from "@/lib/forms";

/* ------------------------------------------------------------------ */
/* Signup — faithful port of design-reference/Signup.dc.html's signup   */
/* section, wired to the real signUpAction / OAuth flow.                */
/*                                                                      */
/* The mockup shows separate First/Last name fields; the server action  */
/* expects a single `fullName`, so we keep the two visible fields and    */
/* feed a combined hidden `fullName` input (matches existing wiring).    */
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

export function SignupForm({ refCode }: { refCode?: string }) {
  const [state, action, pending] = useActionState(signUpAction, null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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
          Create your account
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
            New Organica Living Account
          </div>

          <div style={{ padding: "28px 32px 36px" }}>
            {state?.ok ? (
              <p style={{ fontSize: "15px", color: "#1c3a13", lineHeight: 1.5 }}>
                Check your email to confirm your account — the link will sign you
                in and bring you straight here.
              </p>
            ) : (
              <form action={action}>
                {refCode ? <input type="hidden" name="ref" value={refCode} /> : null}
                {/* Combined name for the existing signUpAction contract */}
                <input
                  type="hidden"
                  name="fullName"
                  value={`${firstName} ${lastName}`.trim()}
                />

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path
                        fill="#1877F2"
                        d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z"
                      />
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
                  <label htmlFor="firstName" style={labelStyle}>
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div style={fieldWrap}>
                  <label htmlFor="lastName" style={labelStyle}>
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={inputStyle}
                  />
                  {fieldError(state, "fullName") ? (
                    <p style={errStyle}>{fieldError(state, "fullName")}</p>
                  ) : null}
                </div>

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
                    autoComplete="new-password"
                    required
                    style={inputStyle}
                  />
                  {fieldError(state, "password") ? (
                    <p style={errStyle}>{fieldError(state, "password")}</p>
                  ) : null}
                </div>

                {/* reCAPTCHA visual (decorative — matches the mockup) */}
                <div
                  style={{
                    marginTop: "24px",
                    border: "1px solid #d3d3d3",
                    borderRadius: "3px",
                    padding: "11px 12px",
                    width: "300px",
                    maxWidth: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    background: "#f9f9f9",
                  }}
                >
                  <input
                    type="checkbox"
                    aria-label="I'm not a robot"
                    style={{ width: "24px", height: "24px", accentColor: "#1c3a13" }}
                  />
                  <span style={{ fontSize: "14px", color: "#1a1a1a" }}>I&apos;m not a robot</span>
                  <div
                    style={{
                      marginLeft: "auto",
                      textAlign: "center",
                      fontSize: "8px",
                      color: "#9a9a9a",
                      lineHeight: 1.3,
                    }}
                  >
                    <div style={{ fontSize: "10px" }}>reCAPTCHA</div>
                    Privacy - Terms
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "28px",
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
                    {pending ? "Creating…" : "Create Account"}
                  </button>
                  <Link
                    href="/login"
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#1c3a13",
                      textDecoration: "none",
                    }}
                  >
                    Sign In
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
