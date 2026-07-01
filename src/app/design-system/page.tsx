/**
 * /design-system — Living design system reference page.
 * Own layout (no storefront header/footer).
 * Server component — hover motion is all CSS via globals.css.
 * Reproduces Design System.dc.html section-for-section.
 */

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/ArrowRight";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { ActionInput } from "@/components/ui/ActionInput";
import { SiteInteractions } from "@/components/site/SiteInteractions";

// ─── Data ────────────────────────────────────────────────────────────────────

const coreColors = [
  { name: "Cream", hex: "#fcfcf7", token: "--bg-base", onColor: "#8a8a80" },
  {
    name: "Forest",
    hex: "#1c3a13",
    token: "--green-900",
    onColor: "rgba(252,252,247,.7)",
  },
  {
    name: "Electric Lime",
    hex: "#62e104",
    token: "--accent",
    onColor: "rgba(26,26,26,.6)",
  },
  {
    name: "Ink",
    hex: "#1a1a1a",
    token: "--text",
    onColor: "rgba(252,252,247,.6)",
  },
];

const scaleColors = [
  { name: "Panel", hex: "#ecece9" },
  { name: "Header", hex: "#f3f0e8" },
  { name: "Sage", hex: "#cdd6c2" },
  { name: "Moss", hex: "#b9c7b5" },
  { name: "Olive", hex: "#92a48e" },
  { name: "Pine", hex: "#2c4a35" },
  { name: "Text Mute", hex: "#5e5e5e" },
  { name: "Text Soft", hex: "#8a8a80" },
  { name: "Line", hex: "#e3e1d8" },
  { name: "Sand", hex: "#e7e1d2" },
];

const typeScale = [
  {
    spec: "SORA 300 · 58/clamp",
    family: "var(--font-display)",
    size: "46px",
    weight: "300",
    tracking: "-0.03em",
    sample: "A daily routine for your wellness",
  },
  {
    spec: "SORA 300 · 40",
    family: "var(--font-display)",
    size: "32px",
    weight: "300",
    tracking: "-0.02em",
    sample: "Whole body health starts with the right nutrients",
  },
  {
    spec: "SORA 500 · 22",
    family: "var(--font-display)",
    size: "22px",
    weight: "500",
    tracking: "-0.01em",
    sample: "Multi Pro Multivitamin",
  },
  {
    spec: "SPARTAN 400 · 16",
    family: "var(--font-sans)",
    size: "16px",
    weight: "400",
    tracking: "-0.01em",
    sample: "Transform your energy, sleep, and nutrition with real results.",
  },
  {
    spec: "SPARTAN 400 · 14",
    family: "var(--font-sans)",
    size: "14px",
    weight: "400",
    tracking: "-0.01em",
    sample: "Formulations with clinically studied ingredients.",
  },
  {
    spec: "MONO 400 · 11",
    family: "var(--font-mono)",
    size: "12px",
    weight: "400",
    tracking: "0.12em",
    sample: "VIACAP® TECHNOLOGY",
  },
];

const radii = [
  { name: "sm", val: "8px" },
  { name: "md", val: "14px" },
  { name: "lg", val: "22px" },
  { name: "pill", val: "40px" },
  { name: "full", val: "50%" },
];

const navRows = [
  {
    code: "Multivitamin",
    name: "Multi Pro",
    swatch:
      "url(/images/multi-pro.webp) center/contain no-repeat, linear-gradient(160deg,#7d8a52,#3f4f22)",
  },
  {
    code: "Vitamin D3",
    name: "Optimus D3",
    swatch:
      "url(/images/optimus-d3.webp) center/contain no-repeat, linear-gradient(160deg,#d8c08a,#9c7d3e)",
  },
  {
    code: "Omega-3",
    name: "Omega 1000",
    swatch:
      "url(/images/omega-1000.webp) center/contain no-repeat, linear-gradient(160deg,#7d9fa0,#3f5f62)",
  },
];

const navItems = [
  { label: "Color", href: "#color" },
  { label: "Typography", href: "#type" },
  { label: "Radius", href: "#shape" },
  { label: "Buttons", href: "#buttons" },
  { label: "Badges", href: "#badges" },
  { label: "Forms", href: "#forms" },
  { label: "Components", href: "#components" },
  { label: "Signature", href: "#voice" },
];

// ─── Section header helper ────────────────────────────────────────────────────

function SectionHeader({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc: React.ReactNode;
}) {
  return (
    <>
      <div className="flex items-baseline gap-[14px] mb-[6px]">
        <span className="font-mono text-[11px] text-lime font-bold">{num}</span>
        <h2 className="text-[24px] font-[400] tracking-[-0.02em]">{title}</h2>
      </div>
      <p className="text-[14px] text-muted max-w-[520px] mb-[26px]">{desc}</p>
    </>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DesignSystemPage() {
  return (
    <div className="bg-cream min-h-screen">
      <SiteInteractions />
      {/* ── HEADER ── */}
      <header style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "34px 40px 30px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 30,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Image
              src="/organica-living-icon.svg"
              alt="Organica Living"
              width={46}
              height={46}
              style={{ flex: "none", display: "block" }}
            />
            <div>
              <div
                className="font-mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "1.6px",
                  textTransform: "uppercase",
                  color: "#8a8a80",
                }}
              >
                Organica Living — Design System
              </div>
              <h1
                style={{
                  fontSize: 34,
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  marginTop: 6,
                }}
              >
                Tokens &amp; Components
              </h1>
            </div>
          </div>
          <div
            className="font-mono"
            style={{
              fontSize: 11,
              letterSpacing: "1px",
              color: "#8a8a80",
              textAlign: "right",
              lineHeight: 1.8,
            }}
          >
            <div>VERSION&nbsp;&nbsp;1.0</div>
            <div>UPDATED&nbsp;&nbsp;JUN 2026</div>
          </div>
        </div>
      </header>

      {/* ── SHELL ── */}
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 40px",
          display: "grid",
          gridTemplateColumns: "180px 1fr",
          gap: 48,
          alignItems: "start",
        }}
      >
        {/* ── NAV RAIL ── */}
        <nav
          style={{
            position: "sticky",
            top: 30,
            paddingTop: 56,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {navItems.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-[13px] text-muted no-underline px-3 py-[7px] rounded-[8px] transition-[background,color] duration-200 hover:bg-black/5 hover:text-ink"
            >
              {n.label}
            </a>
          ))}
          <div
            style={{
              marginTop: 22,
              padding: 14,
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: 14,
            }}
          >
            <div
              className="font-mono"
              style={{
                fontSize: 9.5,
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                color: "#8a8a80",
              }}
            >
              Foundation
            </div>
            <div
              style={{ fontSize: 13, color: "#1a1a1a", marginTop: 6, lineHeight: 1.4 }}
            >
              Calm, clinical, rooted in nature.
            </div>
          </div>
        </nav>

        {/* ── MAIN ── */}
        <main style={{ padding: "56px 0 120px", minWidth: 0 }}>

          {/* ══════════════ 01 COLOR ══════════════ */}
          <section id="color" style={{ scrollMarginTop: 30 }}>
            <SectionHeader
              num="01"
              title="Color"
              desc="A grounded, earthy palette. Forest green carries authority; the electric lime is reserved for moments of emphasis."
            />

            <div
              className="font-mono"
              style={{
                fontSize: 10,
                letterSpacing: "1.4px",
                textTransform: "uppercase",
                color: "#8a8a80",
                marginBottom: 14,
              }}
            >
              Core
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))",
                gap: 14,
                marginBottom: 38,
              }}
            >
              {coreColors.map((c) => (
                <div
                  key={c.hex}
                  style={{
                    borderRadius: 14,
                    overflow: "hidden",
                    border: "1px solid rgba(0,0,0,0.08)",
                    transition: "transform .2s ease, box-shadow .2s ease",
                  }}
                  className="group cursor-pointer hover:-translate-y-[3px] hover:shadow-[0_14px_30px_rgba(28,58,19,0.14)]"
                >
                  <div
                    style={{ height: 96, background: c.hex, position: "relative" }}
                  >
                    <span
                      className="font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-[9px] right-[10px]"
                      style={{
                        fontSize: 9,
                        letterSpacing: ".5px",
                        color: c.onColor,
                      }}
                    >
                      COPY
                    </span>
                  </div>
                  <div style={{ padding: "11px 12px 13px", background: "#fff" }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#1a1a1a" }}>
                      {c.name}
                    </div>
                    <div
                      className="font-mono"
                      style={{ fontSize: 11, color: "#8a8a80", marginTop: 3 }}
                    >
                      {c.hex}
                    </div>
                    <div
                      className="font-mono"
                      style={{
                        fontSize: 9.5,
                        color: "#b3b3a8",
                        marginTop: 5,
                        letterSpacing: ".3px",
                      }}
                    >
                      {c.token}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="font-mono"
              style={{
                fontSize: 10,
                letterSpacing: "1.4px",
                textTransform: "uppercase",
                color: "#8a8a80",
                marginBottom: 14,
              }}
            >
              Greens &amp; Neutrals
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(96px,1fr))",
                gap: 12,
              }}
            >
              {scaleColors.map((c) => (
                <div key={c.hex}>
                  <div
                    style={{
                      height: 62,
                      borderRadius: 11,
                      background: c.hex,
                      border: "1px solid rgba(0,0,0,0.07)",
                    }}
                  />
                  <div style={{ marginTop: 8 }}>
                    <div style={{ fontSize: 12, color: "#1a1a1a" }}>{c.name}</div>
                    <div
                      className="font-mono"
                      style={{ fontSize: 10, color: "#8a8a80", marginTop: 2 }}
                    >
                      {c.hex}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════════ 02 TYPOGRAPHY ══════════════ */}
          <section id="type" style={{ scrollMarginTop: 30, marginTop: 72 }}>
            <SectionHeader
              num="02"
              title="Typography"
              desc={
                <>
                  Three families with distinct jobs:{" "}
                  <strong className="font-semibold">Sora</strong> for display,{" "}
                  <strong className="font-semibold">League Spartan</strong> for
                  reading, and{" "}
                  <strong className="font-semibold">Space Mono</strong> for
                  technical labels. Caveat appears only as a signature flourish.
                </>
              }
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
                gap: 14,
                marginBottom: 34,
              }}
            >
              {/* Sora */}
              <div
                style={{
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: 14,
                  padding: 20,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 40,
                    fontWeight: 300,
                    lineHeight: 1,
                  }}
                >
                  Aa
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, marginTop: 14 }}>
                  Sora
                </div>
                <div
                  className="font-mono"
                  style={{ fontSize: 10.5, color: "#8a8a80", marginTop: 4 }}
                >
                  Display · 300–700
                </div>
              </div>

              {/* League Spartan */}
              <div
                style={{
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: 14,
                  padding: 20,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 40,
                    fontWeight: 400,
                    lineHeight: 1,
                  }}
                >
                  Aa
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, marginTop: 14 }}>
                  League Spartan
                </div>
                <div
                  className="font-mono"
                  style={{ fontSize: 10.5, color: "#8a8a80", marginTop: 4 }}
                >
                  Body · 300–700
                </div>
              </div>

              {/* Space Mono */}
              <div
                style={{
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: 14,
                  padding: 20,
                }}
              >
                <div
                  className="font-mono"
                  style={{ fontSize: 40, fontWeight: 400, lineHeight: 1 }}
                >
                  Aa
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, marginTop: 14 }}>
                  Space Mono
                </div>
                <div
                  className="font-mono"
                  style={{ fontSize: 10.5, color: "#8a8a80", marginTop: 4 }}
                >
                  Labels · 400/700
                </div>
              </div>
            </div>

            {/* Type scale */}
            <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
              {typeScale.map((t) => (
                <div
                  key={t.spec}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 24,
                    padding: "18px 0",
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    className="font-mono"
                    style={{
                      flex: "0 0 130px",
                      fontSize: 10,
                      letterSpacing: ".5px",
                      color: "#8a8a80",
                      lineHeight: 1.7,
                    }}
                  >
                    {t.spec}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      minWidth: 0,
                      fontFamily: t.family,
                      fontSize: t.size,
                      fontWeight: t.weight,
                      lineHeight: 1.15,
                      letterSpacing: t.tracking,
                      color: "#1a1a1a",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t.sample}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════════ 03 RADIUS & ELEVATION ══════════════ */}
          <section id="shape" style={{ scrollMarginTop: 30, marginTop: 72 }}>
            <SectionHeader
              num="03"
              title="Radius & Elevation"
              desc="Soft, generous corners throughout. Pills for actions, rounded rectangles for surfaces. Shadows stay low and warm-tinted."
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.3fr 1fr",
                gap: 18,
              }}
            >
              {/* Corner radius */}
              <div
                style={{
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: 16,
                  padding: 24,
                }}
              >
                <div
                  className="font-mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "1.4px",
                    textTransform: "uppercase",
                    color: "#8a8a80",
                    marginBottom: 18,
                  }}
                >
                  Corner Radius
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 18,
                    flexWrap: "wrap",
                  }}
                >
                  {radii.map((r) => (
                    <div key={r.name} style={{ textAlign: "center" }}>
                      <div
                        style={{
                          width: 62,
                          height: 62,
                          background: "#e6e9dd",
                          border: "1.5px solid #1c3a13",
                          borderBottom: "none",
                          borderRight: "none",
                          borderTopLeftRadius: r.val,
                        }}
                      />
                      <div
                        style={{ fontSize: 12, color: "#1a1a1a", marginTop: 8 }}
                      >
                        {r.name}
                      </div>
                      <div
                        className="font-mono"
                        style={{ fontSize: 10, color: "#8a8a80" }}
                      >
                        {r.val}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Elevation */}
              <div
                style={{
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: 16,
                  padding: 24,
                }}
              >
                <div
                  className="font-mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "1.4px",
                    textTransform: "uppercase",
                    color: "#8a8a80",
                    marginBottom: 18,
                  }}
                >
                  Elevation
                </div>
                <div style={{ display: "flex", gap: 18 }}>
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: 74,
                        height: 74,
                        borderRadius: 14,
                        background: "#fff",
                        boxShadow: "0 18px 40px rgba(28,58,19,0.16)",
                      }}
                    />
                    <div
                      className="font-mono"
                      style={{ fontSize: 10, color: "#8a8a80", marginTop: 10 }}
                    >
                      card
                    </div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: 74,
                        height: 74,
                        borderRadius: 14,
                        background: "#fff",
                        boxShadow: "0 30px 70px rgba(0,0,0,0.22)",
                      }}
                    />
                    <div
                      className="font-mono"
                      style={{ fontSize: 10, color: "#8a8a80", marginTop: 10 }}
                    >
                      overlay
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════ 04 BUTTONS ══════════════ */}
          <section id="buttons" style={{ scrollMarginTop: 30, marginTop: 72 }}>
            <SectionHeader
              num="04"
              title="Buttons"
              desc="Fully-rounded pills. Solid and outline buttons lift and brighten on hover; any button or link carrying an arrow instead slides the arrow forward — no lift. Live components, identical to the real interactions across the site."
            />

            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}
            >
              {/* Light panel */}
              <div
                style={{
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: 16,
                  padding: 28,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 14,
                  alignItems: "center",
                }}
              >
                <Button variant="forest">Take the Quiz</Button>
                <Button variant="lime">Get Started</Button>
                <Button variant="outline" arrow>
                  Shop Now
                </Button>
                <Button variant="forest">
                  Discover{" "}
                  <span
                    style={{
                      display: "inline-block",
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#62e104",
                      marginLeft: 8,
                    }}
                  />
                </Button>
              </div>

              {/* Dark panel */}
              <div
                style={{
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: 16,
                  padding: 28,
                  background: "#1c3a13",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 14,
                  alignItems: "center",
                }}
              >
                <Button variant="cream">Read More</Button>
                <Button variant="ghost-light">Shop Now</Button>
                <a
                  href="#"
                  className="inline-flex items-center whitespace-nowrap text-[14px] font-[500] text-cream no-underline"
                  style={{
                    borderBottom: "1px solid rgba(243,240,232,.4)",
                    paddingBottom: 3,
                  }}
                >
                  Shop All&nbsp;{" "}
                  <ArrowRight size={14} />
                </a>
                {/* Circle ghost button */}
                <button
                  type="button"
                  aria-label="Continue"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "#1c3a13",
                    border: "1.5px solid rgba(243,240,232,.5)",
                    color: "#fcfcf7",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span data-arrow style={{ display: "flex" }}>
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h13M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </button>
                {/* Lime submit circle */}
                <button
                  type="button"
                  aria-label="Submit"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "#62e104",
                    border: "none",
                    color: "#1a1a1a",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span data-arrow style={{ display: "flex" }}>
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.1}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h13M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </section>

          {/* ══════════════ 05 BADGES ══════════════ */}
          <section id="badges" style={{ scrollMarginTop: 30, marginTop: 72 }}>
            <SectionHeader
              num="05"
              title="Badges & Labels"
              desc="Small pills for status and product codes. Uppercase mono for system labels."
            />

            <div
              style={{
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: 16,
                padding: 28,
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
                alignItems: "center",
              }}
            >
              <Badge label="Bestseller" variant="bestseller" />
              <Badge label="Save 25%" variant="save" />
              <Badge label="New" variant="new" />
              <Badge label="DS-01®" variant="label" />
              {/* ViaCap tech label */}
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 7,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: "#2c4a35",
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#2c4a35",
                    flexShrink: 0,
                  }}
                />
                ViaCap® Technology
              </span>
              {/* Mono section label */}
              <span
                className="font-mono"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontSize: 10,
                  letterSpacing: "1.4px",
                  textTransform: "uppercase",
                  color: "#8a8a80",
                  whiteSpace: "nowrap",
                }}
              >
                Featured Articles
              </span>
            </div>
          </section>

          {/* ══════════════ 06 FORMS ══════════════ */}
          <section id="forms" style={{ scrollMarginTop: 30, marginTop: 72 }}>
            <SectionHeader
              num="06"
              title="Form Inputs"
              desc="Rounded fields with soft borders. Newsletter and login patterns embed a circular action button."
            />

            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}
            >
              {/* Text field */}
              <div
                style={{
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: 16,
                  padding: 24,
                }}
              >
                <div
                  className="font-mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "1.4px",
                    textTransform: "uppercase",
                    color: "#8a8a80",
                    marginBottom: 16,
                  }}
                >
                  Text Field
                </div>
                <Input
                  type="email"
                  placeholder="Email"
                  className="mb-3"
                />
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="flex-1"
                  />
                  <button
                    type="button"
                    aria-label="Log in"
                    style={{
                      flexShrink: 0,
                      width: 44,
                      height: 44,
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
                    <span data-arrow style={{ display: "flex" }}>
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12h13M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>

              {/* Dark / newsletter */}
              <div
                style={{
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: 16,
                  padding: 24,
                  background: "#1c3a13",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  className="font-mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "1.4px",
                    textTransform: "uppercase",
                    color: "#7d8c77",
                    marginBottom: 16,
                  }}
                >
                  Inline / Newsletter
                </div>
                <ActionInput
                  name="newsletter"
                  type="email"
                  placeholder="Sign Up For Our Newsletter"
                  ariaLabel="Subscribe"
                  dark
                />
              </div>
            </div>
          </section>

          {/* ══════════════ 07 COMPONENTS ══════════════ */}
          <section id="components" style={{ scrollMarginTop: 30, marginTop: 72 }}>
            <SectionHeader
              num="07"
              title="Components"
              desc="Composed from the tokens above. Hover the product card and nav rows for live motion."
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "300px 1fr",
                gap: 18,
                alignItems: "start",
              }}
            >
              {/* Product card */}
              <div
                className="group"
                style={{
                  background: "#1c3a13",
                  borderRadius: 14,
                  padding: "18px 18px 22px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  transition:
                    "transform .3s cubic-bezier(0.75,0,0.25,1), box-shadow .3s ease",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: ".5px",
                      textTransform: "uppercase",
                      color: "#1a1a1a",
                      background: "#62e104",
                      padding: "5px 9px",
                      borderRadius: 30,
                    }}
                  >
                    Bestseller
                  </span>
                  <span
                    className="font-mono"
                    style={{
                      display: "inline-block",
                      fontSize: 10,
                      fontWeight: 500,
                      color: "#B9C7B5",
                      border: "1px solid rgba(185,199,181,.4)",
                      padding: "5px 9px",
                      borderRadius: 30,
                    }}
                  >
                    DS-01®
                  </span>
                </div>
                {/* Jar placeholder */}
                <div
                  style={{
                    width: "78%",
                    aspectRatio: "3/4",
                    borderRadius: 8,
                    background: "linear-gradient(160deg,#2f3f2a,#14201a)",
                    margin: "6px 0 16px",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    paddingBottom: 10,
                    transition: "transform .3s cubic-bezier(0.75,0,0.25,1)",
                  }}
                >
                  <span
                    className="font-mono"
                    style={{ fontSize: 9, color: "rgba(243,240,232,.55)" }}
                  >
                    multi-pro jar
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    color: "#fcfcf7",
                  }}
                >
                  Multi Pro
                </div>
                <Button
                  variant="ghost-light"
                  className="w-full mt-4 text-[13px]"
                >
                  Shop Now
                </Button>
                <div
                  style={{ fontSize: 12, color: "#92A48E", marginTop: 12 }}
                >
                  Starting at $35.99 per month
                </div>
              </div>

              {/* Right column */}
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {/* Glass nav panel */}
                <div
                  style={{
                    background: "rgba(236,236,233,1)",
                    border: "1px solid rgba(0,0,0,0.08)",
                    boxShadow: "0 30px 70px rgba(0,0,0,0.12)",
                    borderRadius: 22,
                    padding: 12,
                  }}
                >
                  <div
                    className="font-mono"
                    style={{
                      fontSize: 9.5,
                      letterSpacing: "1.2px",
                      textTransform: "uppercase",
                      color: "#8a8a80",
                      padding: "6px 11px 8px",
                    }}
                  >
                    Menu Panel
                  </div>
                  {navRows.map((r) => (
                    <a
                      key={r.name}
                      href="#"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 13,
                        padding: "9px 11px",
                        borderRadius: 14,
                        textDecoration: "none",
                        transition: "background .2s ease",
                      }}
                      className="hover:bg-black/5"
                    >
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 12,
                          flexShrink: 0,
                          background: r.swatch,
                        }}
                      />
                      <div>
                        <div style={{ fontSize: 11, color: "#8a8a80" }}>
                          {r.code}
                        </div>
                        <div
                          style={{
                            fontSize: 15,
                            color: "#1a1a1a",
                            fontWeight: 500,
                          }}
                        >
                          {r.name}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Nav pills + announcement */}
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <a
                    href="#"
                    style={{
                      display: "block",
                      background: "#62e104",
                      color: "#1a1a1a",
                      textAlign: "center",
                      fontSize: 13,
                      fontWeight: 500,
                      padding: "9px 16px",
                      borderRadius: 10,
                      textDecoration: "none",
                    }}
                  >
                    Find the right products for you&nbsp;{" "}
                    <ArrowRight size={14} />
                  </a>
                  <div
                    style={{
                      display: "flex",
                      gap: 4,
                      background: "rgba(243,240,232,.82)",
                      border: "1px solid rgba(0,0,0,0.06)",
                      padding: 8,
                      borderRadius: 30,
                      width: "fit-content",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 14,
                        color: "#1a1a1a",
                        padding: "6px 13px",
                        borderRadius: 20,
                        background: "rgba(0,0,0,0.06)",
                      }}
                    >
                      Shop
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        color: "#1a1a1a",
                        padding: "6px 13px",
                        borderRadius: 20,
                      }}
                    >
                      Science
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        color: "#1a1a1a",
                        padding: "6px 13px",
                        borderRadius: 20,
                      }}
                    >
                      Learn
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════ 08 SIGNATURE ══════════════ */}
          <section id="voice" style={{ scrollMarginTop: 30, marginTop: 72 }}>
            <SectionHeader
              num="08"
              title="Signature"
              desc="A full-width lowercase wordmark in League Spartan Bold, set as a low-opacity watermark with a slow light sweep — used sparingly to close key moments."
            />

            <div
              style={{
                position: "relative",
                padding: "28px 36px",
                borderRadius: 18,
                overflow: "hidden",
                background:
                  "radial-gradient(70% 120% at 50% 0%,#4a6b3a,#2e4a25 60%,#1f3219 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                viewBox="0 0 1000 122"
                width="100%"
                preserveAspectRatio="xMidYMid meet"
                style={{ display: "block" }}
                aria-label="nature is our thing"
              >
                <defs>
                  <linearGradient id="natureShine" x1="0" y1="0" x2="0.35" y2="0">
                    <stop offset="0" stopColor="#fcfcf7" stopOpacity="0.26" />
                    <stop offset="0.5" stopColor="#fcfcf7" stopOpacity="0.62" />
                    <stop offset="1" stopColor="#fcfcf7" stopOpacity="0.26" />
                    <animateTransform
                      attributeName="gradientTransform"
                      type="translate"
                      values="-0.6 0;1 0;-0.6 0"
                      keyTimes="0;0.5;1"
                      calcMode="spline"
                      keySplines="0.45 0 0.2 1;0.45 0 0.2 1"
                      dur="7s"
                      repeatCount="indefinite"
                    />
                  </linearGradient>
                </defs>
                <text
                  x="500"
                  y="91"
                  textAnchor="middle"
                  textLength="980"
                  lengthAdjust="spacingAndGlyphs"
                  fontFamily="'League Spartan',sans-serif"
                  fontWeight="700"
                  fontSize="128"
                  letterSpacing="-3"
                  fill="url(#natureShine)"
                >
                  nature is our thing
                </text>
              </svg>
            </div>
          </section>
        </main>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "24px 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <div
            className="font-mono"
            style={{
              fontSize: 11,
              color: "#8a8a80",
              letterSpacing: ".5px",
            }}
          >
            ORGANICA LIVING — DESIGN SYSTEM v1.0
          </div>
          <div style={{ fontSize: 12, color: "#8a8a80" }}>
            © 2026 Organica Living, Inc.
          </div>
        </div>
      </footer>
    </div>
  );
}
