"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@/components/ui/ArrowRight";

/* ------------------------------------------------------------------ */
/* Shop products list                                                   */
/* ------------------------------------------------------------------ */
const SHOP_PRODUCTS = [
  { category: "Multivitamin",      name: "Multi Pro",        slug: "multi-pro",        img: "/images/multi-pro.webp",        bg: "linear-gradient(160deg,#7d8a52,#3f4f22)" },
  { category: "Vitamin D3",        name: "Optimus D3",       slug: "optimus-d3",       img: "/images/optimus-d3.webp",       bg: "linear-gradient(160deg,#d8c08a,#9c7d3e)" },
  { category: "Omega-3",           name: "Omega 1000",       slug: "omega-1000",       img: "/images/omega-1000.webp",       bg: "linear-gradient(160deg,#7d9fa0,#3f5f62)" },
  { category: "Eye Health",        name: "Vision Pro",       slug: "vision-pro",       img: "/images/vision-pro.webp",       bg: "linear-gradient(160deg,#8a93b6,#3f4a72)" },
  { category: "Sleep Support",     name: "Sleep Pro+",       slug: "sleep-pro",        img: "/images/sleep-pro.webp",        bg: "linear-gradient(160deg,#6f6a92,#322c4c)" },
  { category: "Hair, Skin & Nails",name: "Glow Pro",         slug: "glow-pro",         img: "/images/glow-pro.webp",        bg: "linear-gradient(160deg,#c4929f,#7a4f5e)" },
  { category: "Prenatal",          name: "Bloom",            slug: "bloom",            img: "/images/bloom.webp",            bg: "linear-gradient(160deg,#d2a3a6,#9c636b)" },
  { category: "Menopause Support", name: "Meno Pro",         slug: "meno-pro",         img: "/images/meno-pro.webp",        bg: "linear-gradient(160deg,#bf8d80,#754940)" },
  { category: "Kids Vitamin D3",   name: "Optimus D3 Mini",  slug: "optimus-d3-mini",  img: "/images/optimus-d3-mini.webp", bg: "linear-gradient(160deg,#e0a868,#b06e30)" },
];

type TabName = "shop" | "science" | "learn" | "account";

interface MobileMenuProps {
  /** Whether user is logged in — controls Sign In vs Account links */
  isLoggedIn?: boolean;
}

/* Logged-in account links — mirrors the desktop AccountMenu dropdown. */
const ACCOUNT_LINKS = [
  { label: "Subscriptions", href: "/subscriptions" },
  { label: "Order History", href: "/orders" },
  { label: "Settings", href: "/account" },
];

export function MobileMenu({ isLoggedIn }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabName>("shop");
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !(e.target as Element).closest("[data-burger]")
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [open]);

  const menuStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    maxHeight: "calc(100vh - 36px)",
    flexDirection: "column",
    background: "rgba(236,236,233,0.92)",
    backdropFilter: "blur(54px) saturate(150%)",
    WebkitBackdropFilter: "blur(54px) saturate(150%)",
    boxShadow: "0 30px 60px rgba(0,0,0,0.18)",
    opacity: open ? 1 : 0,
    transform: open ? "translateY(0)" : "translateY(-10px)",
    pointerEvents: open ? "auto" : "none",
    transition: "opacity .3s cubic-bezier(0.75,0,0.25,1), transform .3s cubic-bezier(0.75,0,0.25,1)",
    zIndex: 150,
  };

  const tabs: TabName[] = isLoggedIn
    ? ["shop", "science", "learn", "account"]
    : ["shop", "science", "learn"];
  const tabLabels: Record<TabName, string> = {
    shop: "Shop",
    science: "Science",
    learn: "Learn",
    account: "Account",
  };

  return (
    <>
      {/* Burger button — shown at ≤900px via CSS in globals */}
      <button
        data-burger
        aria-label="Open menu"
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "6px",
          width: "42px",
          height: "42px",
          border: "none",
          background: "transparent",
          cursor: "pointer",
        }}
      >
        <span style={{ display: "block", width: "22px", height: "2px", background: "#1a1a1a" }} />
        <span style={{ display: "block", width: "22px", height: "2px", background: "#1a1a1a" }} />
      </button>

      {/* Mobile menu overlay */}
      <div data-mobile-menu ref={menuRef} style={menuStyle}>
        {/* Top bar */}
        <div
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "11px 14px",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <Image
            src="/organica-living-icon.svg"
            alt="Organica Living"
            width={30}
            height={30}
            style={{ flexShrink: 0, display: "block", objectFit: "contain" }}
          />
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2px",
            }}
          >
            {tabs.map((tab) => {
              const active = tab === activeTab;
              return (
                <div
                  key={tab}
                  data-mtab={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    fontSize: "14px",
                    color: "#1a1a1a",
                    cursor: "pointer",
                    padding: "6px 15px",
                    borderRadius: "20px",
                    background: active ? "rgba(0,0,0,0.06)" : "transparent",
                    fontWeight: active ? 500 : 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  {tabLabels[tab]}
                </div>
              );
            })}
          </div>
          <button
            data-burger-close
            aria-label="Close menu"
            onClick={closeMenu}
            style={{
              flexShrink: 0,
              border: "none",
              background: "transparent",
              fontSize: "24px",
              lineHeight: 1,
              cursor: "pointer",
              color: "#1a1a1a",
              width: "40px",
              height: "40px",
            }}
          >
            &times;
          </button>
        </div>

        {/* Scrollable content */}
        <div style={{ overflowY: "auto", padding: "8px 24px 24px" }}>
          {/* SHOP pane */}
          <div data-mpane="shop" style={{ display: activeTab === "shop" ? undefined : "none" }}>
            {SHOP_PRODUCTS.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                data-mrow
                onClick={closeMenu}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "10px 6px",
                  borderRadius: "14px",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    width: "54px",
                    height: "54px",
                    borderRadius: "12px",
                    flexShrink: 0,
                    background: `url(${p.img}) center/contain no-repeat, ${p.bg}`,
                  }}
                />
                <div>
                  <div style={{ fontSize: "11px", color: "#8a8a80" }}>{p.category}</div>
                  <div style={{ fontSize: "16px", color: "#1a1a1a", fontWeight: 500 }}>{p.name}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* SCIENCE pane */}
          <div data-mpane="science" style={{ display: activeTab === "science" ? undefined : "none" }}>
            {[
              { title: "Approach", sub: "Nutritional science for everyday health.", href: "/approach", img: "/images/nav/science-approach.webp", bg: "linear-gradient(135deg,#9ab87f,#4d6b3e)" },
              { title: "Organica Living [ Labs ]", sub: "Frontier nutritional research.", href: "/labs", img: "/images/nav/science-labs.webp", bg: "linear-gradient(135deg,#7a6a55,#3f352d)" },
              { title: "Our Science", sub: "The standard behind every batch.", href: "/science", img: "/images/nav/science-scientists.webp", bg: "linear-gradient(135deg,#c8b89e,#9a8568)" },
              { title: "Sustainability", sub: "Human impact on planetary health.", href: "/sustainability", img: "/images/nav/science-sustainability.webp", bg: "linear-gradient(135deg,#6f9a6a,#3a5a35)" },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                data-mrow
                onClick={closeMenu}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "10px 6px",
                  borderRadius: "14px",
                  textDecoration: "none",
                }}
              >
                <div style={{ width: "54px", height: "54px", borderRadius: "12px", flexShrink: 0, background: `url(${item.img}) center/cover no-repeat, ${item.bg}` }} />
                <div>
                  <div style={{ fontSize: "16px", color: "#1a1a1a", fontWeight: 500 }}>{item.title}</div>
                  <div style={{ fontSize: "12px", color: "#5e5e5e", lineHeight: 1.3 }}>{item.sub}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* LEARN pane */}
          <div data-mpane="learn" style={{ display: activeTab === "learn" ? undefined : "none" }}>
            {[
              { title: "Nutrition 101", sub: "The essential nutrients powering your health.", href: "/nutrition-101", img: "/images/nav/learn-nutrition-101.webp", bg: "linear-gradient(135deg,#a9d6c0,#4d8a72)" },
              { title: "Vitamins 101", sub: "How key vitamins and minerals shape your health.", href: "/vitamins-101", img: "/images/nav/learn-vitamins-101.webp", bg: "linear-gradient(135deg,#7fa56a,#3f5a30)" },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                data-mrow
                onClick={closeMenu}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "10px 6px",
                  borderRadius: "14px",
                  textDecoration: "none",
                }}
              >
                <div style={{ width: "54px", height: "54px", borderRadius: "12px", flexShrink: 0, background: `url(${item.img}) center/cover no-repeat, ${item.bg}` }} />
                <div>
                  <div style={{ fontSize: "16px", color: "#1a1a1a", fontWeight: 500 }}>{item.title}</div>
                  <div style={{ fontSize: "12px", color: "#5e5e5e", lineHeight: 1.3 }}>{item.sub}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* ACCOUNT pane — logged-in only (mirrors desktop AccountMenu) */}
          {isLoggedIn ? (
            <div data-mpane="account" style={{ display: activeTab === "account" ? undefined : "none" }}>
              {[
                { title: "Home", sub: "Manage your membership and earn rewards.", href: "/account", img: "/images/nav/account-home.webp", bg: "linear-gradient(160deg,#9ab87f,#4d6b3e)" },
                { title: "Refer", sub: "Give $25 and get $25 for every referral.", href: "/refer", img: "/images/nav/account-refer.webp", bg: "linear-gradient(160deg,#7a6a55,#3f352d)" },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  data-mrow
                  onClick={closeMenu}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "10px 6px",
                    borderRadius: "14px",
                    textDecoration: "none",
                  }}
                >
                  <div style={{ width: "54px", height: "54px", borderRadius: "12px", flexShrink: 0, background: `url(${item.img}) center/cover no-repeat, ${item.bg}` }} />
                  <div>
                    <div style={{ fontSize: "16px", color: "#1a1a1a", fontWeight: 500 }}>{item.title}</div>
                    <div style={{ fontSize: "12px", color: "#5e5e5e", lineHeight: 1.3 }}>{item.sub}</div>
                  </div>
                </Link>
              ))}
              <div
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "10px",
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                  color: "#8a8a80",
                  padding: "12px 6px 6px",
                }}
              >
                Account
              </div>
              {ACCOUNT_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  data-mrow
                  onClick={closeMenu}
                  style={{ display: "block", fontSize: "14px", color: "#1a1a1a", padding: "9px 6px", textDecoration: "none" }}
                >
                  {item.label}
                </Link>
              ))}
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "6px",
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "11px",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: "#1c3a13",
                    padding: "14px 6px 4px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Sign Out <ArrowRight size={13} />
                </button>
              </form>
            </div>
          ) : null}

          {/* Auth CTA — logged-out only (logged-in actions live in the Account tab) */}
          {!isLoggedIn ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                paddingTop: "22px",
                marginTop: "12px",
                borderTop: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              <Link
                href="/login"
                data-mrow
                onClick={closeMenu}
                style={{
                  lineHeight: 1,
                  display: "inline-block",
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#1a1a1a",
                  border: "1.5px solid #1a1a1a",
                  padding: "13px",
                  borderRadius: "40px",
                  textDecoration: "none",
                }}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                data-mrow
                onClick={closeMenu}
                style={{
                  lineHeight: 1,
                  display: "inline-block",
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#1a1a1a",
                  background: "#62e104",
                  padding: "13px",
                  borderRadius: "40px",
                  textDecoration: "none",
                }}
              >
                Get Started
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
