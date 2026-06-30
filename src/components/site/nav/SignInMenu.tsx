"use client";

import { useActionState, useRef, useState } from "react";
import { signInAction } from "@/lib/auth/actions";

/**
 * Header "Sign In" hover trigger + glass dropdown panel (matches the mockup's
 * data-signin / data-signin-panel). The mini login is wired to the real
 * signInAction (redirects on success; shows the error inline otherwise).
 */
export function SignInMenu() {
  const [open, setOpen] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [state, action] = useActionState(signInAction, null);

  const show = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setOpen(true);
  };
  const hide = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setOpen(false), 150);
  };

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    border: "1px solid rgba(0,0,0,0.15)",
    borderRadius: "10px",
    padding: "13px 14px",
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
    background: "rgba(255,255,255,0.7)",
    color: "#1a1a1a",
  };

  return (
    <>
      <span
        data-signin
        onMouseEnter={show}
        onMouseLeave={hide}
        style={{ fontSize: "14px", color: "#1a1a1a", fontWeight: 400, cursor: "pointer" }}
      >
        Sign In
      </span>

      <div
        data-signin-panel
        onMouseEnter={show}
        onMouseLeave={hide}
        style={{
          position: "absolute",
          top: "calc(100% + 2px)",
          right: "40px",
          width: "300px",
          padding: "20px",
          borderRadius: "22px",
          background: "rgba(236,236,233,1)",
          backdropFilter: "blur(54px) saturate(150%)",
          WebkitBackdropFilter: "blur(54px) saturate(150%)",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 30px 70px rgba(0,0,0,0.22)",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-8px)",
          pointerEvents: open ? "auto" : "none",
          transition:
            "opacity .28s cubic-bezier(0.75,0,0.25,1), transform .28s cubic-bezier(0.75,0,0.25,1)",
          zIndex: 200,
        }}
      >
        <div style={{ fontSize: "13px", fontWeight: 600, color: "#1a1a1a", marginBottom: "14px" }}>
          Sign in to your account
        </div>
        <form action={action}>
          <input type="hidden" name="next" value="/account" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            required
            style={{ ...fieldStyle, marginBottom: "10px" }}
          />
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              required
              style={{ ...fieldStyle, flex: 1, minWidth: 0 }}
            />
            <button
              type="submit"
              aria-label="Log in"
              style={{
                flex: "none",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "#1c3a13",
                color: "#fcfcf7",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
          {state && !state.ok ? (
            <p style={{ marginTop: "10px", fontSize: "12px", color: "#b3261e" }}>{state.error}</p>
          ) : null}
        </form>
      </div>
    </>
  );
}
