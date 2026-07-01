import Link from "next/link";
import Image from "next/image";
import { Disclaimer } from "@/components/site/Disclaimer";
import { ArrowRight } from "@/components/ui/ArrowRight";

/* ------------------------------------------------------------------ */
/* Footer column data — wired to real routes where available            */
/* ------------------------------------------------------------------ */
const FOOTER_COLS: Array<{
  title: string;
  links: Array<{ label: string; href: string }>;
}> = [
  {
    title: "Products",
    links: [
      { label: "Shop All", href: "/products" },
      { label: "Subscriptions", href: "/subscriptions" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Science", href: "/science" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Organica Living Labs", href: "/labs" },
    ],
  },
  {
    title: "Inquire",
    links: [
      { label: "Partner", href: "/contact" },
      { label: "Practitioners", href: "/contact" },
      { label: "Press", href: "/contact" },
      { label: "Join", href: "/contact" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Help", href: "/contact" },
      { label: "Contact", href: "/contact" },
      { label: "My Account", href: "/account" },
      { label: "International", href: "/contact" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Twitter", href: "https://twitter.com" },
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "Refer", href: "/refer" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms + Conditions", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Accessibility", href: "/legal/accessibility" },
      { label: "Consent Preferences", href: "/legal/consent" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Newsletter form — client interaction is minimal (placeholder swap)   */
/* We keep it as a regular form; success feedback is handled server-side*/
/* ------------------------------------------------------------------ */
function NewsletterForm() {
  return (
    <form
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        maxWidth: "400px",
        border: "1px solid rgba(243,240,232,.3)",
        borderRadius: "40px",
        padding: "5px 6px 5px 20px",
      }}
    >
      <input
        type="email"
        placeholder="Sign Up For Our Newsletter"
        required
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          color: "#fcfcf7",
          fontSize: "14px",
          fontFamily: "inherit",
          outline: "none",
        }}
      />
      <button
        type="submit"
        aria-label="Subscribe"
        style={{
          flexShrink: 0,
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          background: "#62e104",
          border: "none",
          color: "#1a1a1a",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ArrowRight size={16} strokeWidth={2.1} />
      </button>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                               */
/* ------------------------------------------------------------------ */
export function Footer() {
  return (
    <>
      <footer style={{ background: "#1c3a13", color: "#fcfcf7", padding: "64px 0 40px" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 40px" }}>
          {/* Top section: logo + tagline / newsletter */}
          <div
            data-rcol2
            style={{
              display: "grid",
              gridTemplateColumns: "1.5fr 1fr",
              gap: "48px",
              paddingBottom: "48px",
              borderBottom: "1px solid rgba(243,240,232,.15)",
              alignItems: "start",
            }}
          >
            <div>
              <Link
                href="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "24px",
                  fontWeight: 500,
                  color: "#fcfcf7",
                  textDecoration: "none",
                  width: "fit-content",
                }}
              >
                <Image
                  src="/organica-living-logo.webp"
                  alt="Organica Living"
                  width={220}
                  height={101}
                  quality={90}
                  style={{
                    height: "48px",
                    width: "auto",
                    display: "block",
                    filter: "brightness(0) invert(1)",
                  }}
                />
              </Link>
              <p
                style={{
                  marginTop: "20px",
                  fontSize: "clamp(18px,1.9vw,26px)",
                  fontWeight: 400,
                  lineHeight: 1.3,
                  maxWidth: "480px",
                  color: "#cdd6c2",
                  letterSpacing: "-0.01em",
                }}
              >
                Pioneering nutritional science{" "}
                <span style={{ color: "#62e104" }}>[R+D]</span> for human and
                planetary health since 2016.
              </p>
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 500, marginBottom: "14px" }}>
                Science with Organica Living—nerdy reads for your inbox.
              </div>
              <NewsletterForm />
              <p style={{ marginTop: "12px", fontSize: "12px", color: "#7d8c77" }}>
                By signing up you consent to receive Organica Living emails.
              </p>
            </div>
          </div>

          {/* Link columns */}
          <div
            data-rgrid6
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6,1fr)",
              gap: "24px",
              padding: "44px 0",
              fontSize: "13px",
            }}
          >
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <div
                  style={{
                    fontSize: "11px",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: "#7d8c77",
                    marginBottom: "14px",
                  }}
                >
                  {col.title}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {col.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      style={{ color: "#cdd6c2", textDecoration: "none" }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* FDA disclaimer */}
          <Disclaimer
            style={{
              fontSize: "11px",
              lineHeight: 1.6,
              color: "#5d7059",
              maxWidth: "860px",
              paddingTop: "20px",
            }}
          />
          <div style={{ marginTop: "20px", fontSize: "12px", color: "#7d8c77" }}>
            © 2026 Organica Living (Organica Living, Inc.)
          </div>
        </div>
      </footer>

      {/* "nature is our thing" signature SVG bar */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          background:
            "url(/images/nature-band-rice.webp) center/cover no-repeat, radial-gradient(70% 120% at 50% 0%,#4a6b3a,#2e4a25 60%,#1f3219 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "30px 20px",
        }}
      >
        {/* dark forest overlay keeps the shimmer text legible over the photo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(18,36,16,0.55), rgba(12,26,12,0.72))",
          }}
        />
        <svg
          viewBox="0 0 1000 122"
          width="100%"
          preserveAspectRatio="xMidYMid meet"
          style={{ position: "relative", display: "block" }}
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
    </>
  );
}
