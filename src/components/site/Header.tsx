import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { getCart } from "@/lib/cart/queries";
import { CartCountBadge } from "@/components/cart/CartCountBadge";
import { CartIcon } from "@/components/ui/CartIcon";
import { CartDrawerProvider } from "@/components/cart/CartDrawerProvider";
import { CartTrigger } from "@/components/cart/CartTrigger";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartDrawerBody } from "@/components/cart/CartDrawerBody";
import { CartDrawerFooter } from "@/components/cart/CartDrawerFooter";
import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { NavMenus } from "@/components/site/nav/NavMenus";
import { MobileMenu } from "@/components/site/nav/MobileMenu";
import { SignInMenu } from "@/components/site/nav/SignInMenu";
import { AccountMenu } from "@/components/site/nav/AccountMenu";

export async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const cart = await getCart();
  const itemCount = cart.itemCount;

  return (
    <CartDrawerProvider>
      <AnnouncementBar loggedIn={!!user} />
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
              style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "22px", fontWeight: 500, letterSpacing: "-0.5px", color: "#1a1a1a", textDecoration: "none" }}
            >
              <Image
                src="/organica-living-logo.webp"
                alt="Organica Living"
                width={200}
                height={92}
                quality={90}
                style={{ height: "42px", width: "auto", display: "block" }}
                priority
              />
            </Link>
            <NavMenus />
          </div>

          {/* Right: auth + cart — desktop only */}
          <div data-desktop-actions style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {user ? (
              <>
                <AccountMenu />
                <Link href="/refer" style={{ fontSize: "14px", color: "#1a1a1a", fontWeight: 400, textDecoration: "none" }}>
                  Refer
                </Link>
                {itemCount > 0 ? (
                  <CartTrigger aria-label="Open cart" style={{ textDecoration: "none" }}>
                    <CartCountBadge itemCount={itemCount} />
                  </CartTrigger>
                ) : null}
              </>
            ) : (
              <>
                {itemCount > 0 ? (
                  <CartTrigger aria-label="Open cart" style={{ textDecoration: "none" }}>
                    <CartCountBadge itemCount={itemCount} />
                  </CartTrigger>
                ) : null}
                <SignInMenu />
                <Link
                  href="/signup"
                  style={{ lineHeight: 1, display: "inline-block", fontSize: "14px", fontWeight: 500, color: "#1a1a1a", background: "#62e104", padding: "10px 22px", borderRadius: "40px", textDecoration: "none" }}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile: cart icon (≤900px) + burger */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {itemCount > 0 ? (
              <CartTrigger
                data-mobile-cart
                aria-label="Open cart"
                style={{ position: "relative", alignItems: "center", justifyContent: "center", width: "42px", height: "42px", color: "#1a1a1a", textDecoration: "none" }}
              >
                <span className="og-cart-pop" style={{ display: "inline-flex" }}>
                  <CartIcon size={24} />
                </span>
                <span
                  key={itemCount}
                  className="og-cart-bump"
                  style={{ position: "absolute", top: "2px", right: "0px", minWidth: "17px", height: "17px", padding: "0 4px", borderRadius: "9px", background: "#1c3a13", color: "#fcfcf7", fontSize: "10px", lineHeight: "17px", textAlign: "center", fontWeight: 600 }}
                >
                  {itemCount}
                </span>
              </CartTrigger>
            ) : null}
            <MobileMenu isLoggedIn={!!user} itemCount={itemCount} />
          </div>
        </div>
      </header>

      <CartDrawer footer={itemCount > 0 ? <CartDrawerFooter cart={cart} /> : null}>
        <CartDrawerBody cart={cart} />
      </CartDrawer>
    </CartDrawerProvider>
  );
}
