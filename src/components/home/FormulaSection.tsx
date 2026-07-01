import Link from "next/link";
import { ArrowRight } from "@/components/ui/ArrowRight";

// The three standards behind every Organica Living formula — grounded in real
// product facts (Optimus D3 5000 IU, Omega 1000 1000mg, sustained-release
// Multi Pro, enteric-coated softgels, vegan + third-party tested).
const PILLARS = [
  {
    k: "01",
    t: "Clinically studied doses",
    d: "Each nutrient is included at the amount the research actually used — 5000 IU in Optimus D3, 1000mg in Omega 1000. No under-dosed fillers.",
  },
  {
    k: "02",
    t: "Built to absorb",
    d: "Enteric-coated softgels and sustained-release granules release nutrients steadily, so your body takes up more of what's on the label.",
  },
  {
    k: "03",
    t: "Tested & vegan",
    d: "Independently third-party tested for purity and potency, and certified vegan — from Multi Pro to Meno Pro.",
  },
];

export function FormulaSection() {
  return (
    <section
      style={{
        position: "relative",
        padding: "88px 40px",
        overflow: "hidden",
        background: "#2f3f28",
      }}
    >
      {/* Natural green-leaf photo background (re-encoded WebP), dimmed to 75% */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/images/home/formula-leaf-bg.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.75,
        }}
      />

      {/* Glass card */}
      <div
        data-reveal
        style={{
          position: "relative",
          maxWidth: 1440,
          margin: "0 auto",
          background: "rgba(232,236,224,.55)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,.4)",
          borderRadius: 20,
          padding: "40px 44px",
        }}
      >
        {/* Label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "#2c4a35",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#2c4a35",
            }}
          />
          Clinically Formulated Nutrition
        </div>

        {/* Headline — Organica Living positioning */}
        <h2
          style={{
            fontSize: "clamp(24px,2.8vw,38px)",
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#1a1a1a",
            maxWidth: 560,
            marginTop: 18,
          }}
        >
          Every formula is grounded in clinical research — and dosed to make a
          real difference.
        </h2>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.55,
            color: "#5e5e5e",
            maxWidth: 480,
            marginTop: 16,
          }}
        >
          We start with the nutrients your body actually needs, then formulate
          them the way the science says they work best — nothing added to pad
          the label.
        </p>

        {/* Formulation pillars */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 32,
            marginTop: 40,
            paddingTop: 36,
            borderTop: "1px solid rgba(44,74,53,.18)",
          }}
        >
          {PILLARS.map((p) => (
            <div key={p.k}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: 1,
                  color: "#2c4a35",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {p.k}
              </div>
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  color: "#1a1a1a",
                  margin: "10px 0 8px",
                }}
              >
                {p.t}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: "#5e5e5e",
                }}
              >
                {p.d}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/products"
          style={{
            lineHeight: 1,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginTop: 36,
            fontSize: 14,
            fontWeight: 500,
            color: "#fcfcf7",
            background: "#1c3a13",
            padding: "14px 28px",
            borderRadius: 40,
            textDecoration: "none",
          }}
        >
          Explore the range
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
