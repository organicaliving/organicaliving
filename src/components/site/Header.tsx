import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { CartCountBadge } from "@/components/cart/CartCountBadge";
import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { NavMenus } from "@/components/site/nav/NavMenus";
import { MobileMenu } from "@/components/site/nav/MobileMenu";
import { SignInMenu } from "@/components/site/nav/SignInMenu";

export async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <>
      <AnnouncementBar />
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(243,240,232,.82)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "15px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {/* Left: Logo + Desktop Nav */}
          <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "22px",
                fontWeight: 500,
                letterSpacing: "-0.5px",
                color: "#1a1a1a",
                textDecoration: "none",
              }}
            >
              <Image
                src="/organica-living-logo.png"
                alt="Organica Living"
                width={120}
                height={42}
                style={{ height: "42px", width: "auto", display: "block" }}
                priority
              />
            </Link>

            {/* Desktop nav — NavMenus is a client component that renders the
                <nav> tabs + the absolute glass panels */}
            <NavMenus />
          </div>

          {/* Right: auth + cart — desktop only */}
          <div
            data-desktop-actions
            style={{ display: "flex", alignItems: "center", gap: "20px" }}
          >
            {user ? (
              <>
                <CartCountBadge />
                <Link
                  href="/account"
                  style={{ fontSize: "14px", color: "#1a1a1a", fontWeight: 400, textDecoration: "none" }}
                >
                  Account
                </Link>
                <form action="/auth/signout" method="post">
                  <button
                    type="submit"
                    style={{
                      fontSize: "14px",
                      color: "#1a1a1a",
                      fontWeight: 400,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    Sign out
                  </button>
                </form>
              </>
            ) : (
              <>
                <CartCountBadge />
                <SignInMenu />
                <Link
                  href="/signup"
                  style={{
                    lineHeight: 1,
                    display: "inline-block",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#1a1a1a",
                    background: "#62e104",
                    padding: "10px 22px",
                    borderRadius: "40px",
                    textDecoration: "none",
                  }}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile burger + slide-down menu */}
          <MobileMenu isLoggedIn={!!user} />
        </div>
      </header>
    </>
  );
}
