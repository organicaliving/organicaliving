"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/ArrowRight";

/**
 * Header "Account" hover trigger + glass dropdown panel — the logged-in
 * counterpart of <SignInMenu/>. Faithful port of the data-signin /
 * data-signin-panel block in design-reference/Account.dc.html, wired to real
 * routes and the real /auth/signout handler.
 */

/* Row hover highlight — mirrors NavMenus' NavRow helper. */
function Row({
  children,
  radius = "12px",
}: {
  children: React.ReactNode;
  radius?: string;
}) {
  return (
    <div
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.05)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "transparent";
      }}
      style={{ borderRadius: radius, transition: "background .2s ease" }}
    >
      {children}
    </div>
  );
}

export function AccountMenu() {
  const [open, setOpen] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setOpen(true);
  };
  const hide = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setOpen(false), 150);
  };

  const blockLink: React.CSSProperties = {
    display: "block",
    fontSize: "14px",
    color: "#1a1a1a",
    padding: "7px 8px",
    textDecoration: "none",
  };

  return (
    <>
      <span
        data-signin
        onMouseEnter={show}
        onMouseLeave={hide}
        style={{ fontSize: "14px", color: "#1a1a1a", fontWeight: 400, cursor: "pointer" }}
      >
        Account
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
        {/* Home */}
        <Row>
          <Link
            href="/account"
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "flex-start",
              padding: "8px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "10px",
                flex: "none",
                background:
                  "url(/images/nav/account-home.webp) center / cover no-repeat, linear-gradient(160deg,#9ab87f,#4d6b3e)",
              }}
            />
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a1a" }}>Home</div>
              <div style={{ fontSize: "12px", color: "#5e5e5e", lineHeight: 1.3 }}>
                Manage your membership and earn rewards.
              </div>
            </div>
          </Link>
        </Row>

        {/* Refer */}
        <Row>
          <Link
            href="/refer"
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "flex-start",
              padding: "8px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "10px",
                flex: "none",
                background:
                  "url(/images/nav/account-refer.webp) center / cover no-repeat, linear-gradient(160deg,#7a6a55,#3f352d)",
              }}
            />
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a1a" }}>Refer</div>
              <div style={{ fontSize: "12px", color: "#5e5e5e", lineHeight: 1.3 }}>
                Give $25 and get $25 for every referral.
              </div>
            </div>
          </Link>
        </Row>

        <div
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "10px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: "#8a8a80",
            padding: "12px 8px 6px",
          }}
        >
          Account
        </div>

        <Row radius="8px">
          <Link href="/subscriptions" style={blockLink}>
            Subscriptions
          </Link>
        </Row>
        <Row radius="8px">
          <Link href="/orders" style={blockLink}>
            Order History
          </Link>
        </Row>
        <Row radius="8px">
          <Link href="/account" style={blockLink}>
            Settings
          </Link>
        </Row>

        <form action="/auth/signout" method="post">
          <button
            type="submit"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-mono), monospace",
              fontSize: "11px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "#1c3a13",
              padding: "14px 8px 4px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            Sign Out <ArrowRight size={13} />
          </button>
        </form>
      </div>
    </>
  );
}
