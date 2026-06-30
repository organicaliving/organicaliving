"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/* Product rows in the Shop dropdown                                    */
/* ------------------------------------------------------------------ */
const SHOP_PRODUCTS = [
  { category: "Multivitamin",   name: "Multi Pro",       slug: "multi-pro",       img: "/images/multi-pro.webp" },
  { category: "Vitamin D3",     name: "Optimus D3",      slug: "optimus-d3",      img: "/images/optimus-d3.webp" },
  { category: "Omega-3",        name: "Omega 1000",      slug: "omega-1000",      img: "/images/omega-1000.webp" },
  { category: "Eye Health",     name: "Vision Pro",      slug: "vision-pro",      img: "/images/vision-pro.webp" },
  { category: "Sleep Support",  name: "Sleep Pro+",      slug: "sleep-pro",       img: "/images/sleep-pro.webp" },
  { category: "Hair, Skin & Nails", name: "Glow Pro",   slug: "glow-pro",        img: "/images/glow-pro.webp" },
];

/* ------------------------------------------------------------------ */
/* Shared panel style (glass)                                           */
/* ------------------------------------------------------------------ */
const PANEL_BASE: React.CSSProperties = {
  position: "absolute",
  top: "calc(100% + 2px)",
  left: 0,
  padding: "12px",
  borderRadius: "22px",
  background: "rgba(236,236,233,1)",
  backdropFilter: "blur(54px) saturate(150%)",
  WebkitBackdropFilter: "blur(54px) saturate(150%)",
  border: "1px solid rgba(0,0,0,0.08)",
  boxShadow: "0 30px 70px rgba(0,0,0,0.22)",
  opacity: 0,
  transform: "translateY(-8px)",
  pointerEvents: "none" as const,
  transition: "opacity .28s cubic-bezier(0.75,0,0.25,1), transform .28s cubic-bezier(0.75,0,0.25,1)",
  zIndex: 200,
  overflow: "hidden",
};

/* ------------------------------------------------------------------ */
/* NavRow hover helper — applied via onMouseEnter/Leave                 */
/* ------------------------------------------------------------------ */
function NavRow({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={className}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.05)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
      onClick={onClick}
      style={{ borderRadius: "14px", transition: "background .2s ease" }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                       */
/* ------------------------------------------------------------------ */
export function NavMenus() {
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Refs for each panel
  const shopRef = useRef<HTMLDivElement>(null);
  const scienceRef = useRef<HTMLDivElement>(null);
  const learnRef = useRef<HTMLDivElement>(null);

  // Refs for each tab (for background highlight)
  const shopTabRef = useRef<HTMLSpanElement>(null);
  const scienceTabRef = useRef<HTMLSpanElement>(null);
  const learnTabRef = useRef<HTMLSpanElement>(null);

  const panelRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    shop: shopRef,
    science: scienceRef,
    learn: learnRef,
  };
  const tabRefs: Record<string, React.RefObject<HTMLSpanElement | null>> = {
    shop: shopTabRef,
    science: scienceTabRef,
    learn: learnTabRef,
  };

  const showPanel = useCallback((name: string) => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    Object.entries(panelRefs).forEach(([k, ref]) => {
      if (!ref.current) return;
      const on = k === name;
      ref.current.style.opacity = on ? "1" : "0";
      ref.current.style.transform = on ? "translateY(0)" : "translateY(-8px)";
      ref.current.style.pointerEvents = on ? "auto" : "none";
    });
    Object.entries(tabRefs).forEach(([k, ref]) => {
      if (!ref.current) return;
      ref.current.style.background = k === name ? "rgba(0,0,0,0.06)" : "transparent";
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const hideAll = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      Object.values(panelRefs).forEach((ref) => {
        if (!ref.current) return;
        ref.current.style.opacity = "0";
        ref.current.style.transform = "translateY(-8px)";
        ref.current.style.pointerEvents = "none";
      });
      Object.values(tabRefs).forEach((ref) => {
        if (ref.current) ref.current.style.background = "transparent";
      });
    }, 130);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const keepOpen = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
  }, []);

  const tabStyle: React.CSSProperties = {
    fontSize: "14px",
    color: "#1a1a1a",
    fontWeight: 400,
    cursor: "pointer",
    padding: "6px 13px",
    borderRadius: "20px",
    transition: "background .2s ease",
    background: "transparent",
  };

  return (
    <>
      {/* Desktop nav tabs */}
      <nav data-desktop-nav style={{ display: "flex", gap: "4px" }}>
        <span
          ref={shopTabRef}
          data-menu="shop"
          style={tabStyle}
          onMouseEnter={() => showPanel("shop")}
          onMouseLeave={hideAll}
        >
          Shop
        </span>
        <span
          ref={scienceTabRef}
          data-menu="science"
          style={tabStyle}
          onMouseEnter={() => showPanel("science")}
          onMouseLeave={hideAll}
        >
          Science
        </span>
        <span
          ref={learnTabRef}
          data-menu="learn"
          style={tabStyle}
          onMouseEnter={() => showPanel("learn")}
          onMouseLeave={hideAll}
        >
          Learn
        </span>
      </nav>

      {/* SHOP panel */}
      <div
        ref={shopRef}
        data-panel="shop"
        style={{ ...PANEL_BASE, width: "368px" }}
        onMouseEnter={keepOpen}
        onMouseLeave={hideAll}
      >
        <div style={{ position: "relative" }}>
          {SHOP_PRODUCTS.map((p) => (
            <NavRow key={p.slug}>
              <Link
                href={`/products/${p.slug}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "13px",
                  padding: "9px 11px",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "12px",
                    flexShrink: 0,
                    background: `url(${p.img}) center/74% no-repeat, rgba(128,128,128,0.5)`,
                  }}
                />
                <div>
                  <div style={{ fontSize: "11px", color: "#8a8a80" }}>{p.category}</div>
                  <div style={{ fontSize: "15px", color: "#1a1a1a", fontWeight: 500 }}>{p.name}</div>
                </div>
              </Link>
            </NavRow>
          ))}
          <Link
            href="/products"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "14px 12px 6px",
              fontSize: "13px",
              fontWeight: 500,
              color: "#1a1a1a",
              textDecoration: "none",
            }}
          >
            Shop All Products <span style={{ display: "inline-block" }}>→</span>
          </Link>
        </div>
      </div>

      {/* SCIENCE panel */}
      <div
        ref={scienceRef}
        data-panel="science"
        style={{ ...PANEL_BASE, width: "364px" }}
        onMouseEnter={keepOpen}
        onMouseLeave={hideAll}
      >
        <div style={{ position: "relative" }}>
          {[
            { title: "Approach", sub: "Microbiome science for human health.", bg: "linear-gradient(135deg,#9ab87f,#4d6b3e)" },
            { title: "Organica Living [ Labs ]", sub: "Frontier microbial science.", bg: "linear-gradient(135deg,#7a6a55,#3f352d)" },
            { title: "Scientists", sub: "Leading microbiome experts.", bg: "linear-gradient(135deg,#c8b89e,#9a8568)" },
            { title: "Sustainability", sub: "Human impact on planetary health.", bg: "linear-gradient(135deg,#6f9a6a,#3a5a35)" },
          ].map((item) => (
            <NavRow key={item.title}>
              <Link
                href="/science"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "13px",
                  padding: "9px 11px",
                  textDecoration: "none",
                }}
              >
                <div style={{ width: "52px", height: "52px", borderRadius: "12px", flexShrink: 0, background: item.bg }} />
                <div>
                  <div style={{ fontSize: "15px", color: "#1a1a1a", fontWeight: 500 }}>{item.title}</div>
                  <div style={{ fontSize: "12px", color: "#5e5e5e", lineHeight: 1.3 }}>{item.sub}</div>
                </div>
              </Link>
            </NavRow>
          ))}
          <div
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: "10px",
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              color: "#8a8a80",
              padding: "12px 12px 4px",
            }}
          >
            Reference
          </div>
          {[
            { label: "Multi Pro · Multivitamin + Minerals", slug: "multi-pro" },
            { label: "Optimus D3 · Vitamin D3 5000 IU", slug: "optimus-d3" },
            { label: "Omega 1000 · Omega-3", slug: "omega-1000" },
            { label: "Vision Pro · Eye Health", slug: "vision-pro" },
            { label: "Meno Pro · Menopause Support", slug: "meno-pro" },
            { label: "Bloom · Pregnancy Support", slug: "bloom" },
          ].map((item) => (
            <NavRow key={item.slug}>
              <Link
                href={`/products/${item.slug}`}
                style={{
                  display: "block",
                  fontSize: "13px",
                  color: "#3a3a36",
                  padding: "6px 12px",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            </NavRow>
          ))}
        </div>
      </div>

      {/* LEARN panel */}
      <div
        ref={learnRef}
        data-panel="learn"
        style={{ ...PANEL_BASE, width: "364px" }}
        onMouseEnter={keepOpen}
        onMouseLeave={hideAll}
      >
        <div style={{ position: "relative" }}>
          {[
            { title: "Microbiome 101", sub: "The hidden ecosystem powering your health.", bg: "linear-gradient(135deg,#a9d6c0,#4d8a72)" },
            { title: "Probiotics 101", sub: "How these mighty bacteria shape your health.", bg: "linear-gradient(135deg,#7fa56a,#3f5a30)" },
          ].map((item) => (
            <NavRow key={item.title}>
              <Link
                href="/blog"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "13px",
                  padding: "9px 11px",
                  textDecoration: "none",
                }}
              >
                <div style={{ width: "52px", height: "52px", borderRadius: "12px", flexShrink: 0, background: item.bg }} />
                <div>
                  <div style={{ fontSize: "15px", color: "#1a1a1a", fontWeight: 500 }}>{item.title}</div>
                  <div style={{ fontSize: "12px", color: "#5e5e5e", lineHeight: 1.3 }}>{item.sub}</div>
                </div>
              </Link>
            </NavRow>
          ))}
          <div
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: "10px",
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              color: "#8a8a80",
              padding: "14px 12px 6px",
            }}
          >
            Featured Articles
          </div>
          {[
            {
              title: "How Organica Living Is Setting A New Standard For Probiotic Health",
              read: "7 min read",
              bg: "linear-gradient(135deg,#3a4733,#1d2618)",
            },
            {
              title: "Seeking Carbon-Capturing Bacteria off a Remote Japanese Island",
              read: "8 min read",
              bg: "linear-gradient(135deg,#5a6b7a,#2f3f47)",
            },
          ].map((item) => (
            <NavRow key={item.title}>
              <Link
                href="/blog"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "13px",
                  padding: "9px 11px",
                  textDecoration: "none",
                }}
              >
                <div style={{ width: "52px", height: "52px", borderRadius: "12px", flexShrink: 0, background: item.bg }} />
                <div>
                  <div style={{ fontSize: "13px", color: "#1a1a1a", fontWeight: 500, lineHeight: 1.25 }}>{item.title}</div>
                  <div style={{ fontSize: "11px", color: "#8a8a80", marginTop: "2px" }}>{item.read}</div>
                </div>
              </Link>
            </NavRow>
          ))}
          <Link
            href="/blog"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "14px 12px 6px",
              fontFamily: "'Space Mono',monospace",
              fontSize: "11px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "#1a1a1a",
              textDecoration: "none",
            }}
          >
            All Cultured Articles <span style={{ display: "inline-block" }}>→</span>
          </Link>
        </div>
      </div>
    </>
  );
}
