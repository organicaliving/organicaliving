import Link from "next/link";

export function HeroSection() {
  return (
    <section style={{ position: "relative", minHeight: "76vh", overflow: "hidden" }}>
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(115deg,#E7E1D2 0%,#D4D8C4 22%,#AcC196 52%,#8BAA6E 78%,#C7BBA0 100%)",
        }}
      />
      {/* Radial light overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(70% 90% at 72% 38%, rgba(255,255,255,.42), transparent 55%)",
        }}
      />
      {/* Bottom vignette */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40%",
          background: "linear-gradient(180deg, transparent, rgba(110,90,60,.3))",
        }}
      />
      {/* Image placeholder label */}
      <span
        style={{
          display: "inline-block",
          lineHeight: 1,
          position: "absolute",
          bottom: 22,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 11,
          color: "#43503a",
          background: "rgba(243,240,232,.7)",
          padding: "7px 14px",
          borderRadius: 30,
          whiteSpace: "nowrap",
          fontFamily: "var(--font-mono)",
        }}
      >
        product lifestyle — jars on table
      </span>
      {/* Content */}
      <div
        style={{
          position: "relative",
          maxWidth: 1440,
          margin: "0 auto",
          padding: "64px 40px",
          minHeight: "76vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(34px,4.2vw,58px)",
            fontWeight: 300,
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
            color: "#1a1a1a",
            maxWidth: 460,
          }}
        >
          Clinically formulated supplements, built for daily wellness.
        </h1>
        <p
          style={{
            marginTop: 22,
            fontSize: 16,
            lineHeight: 1.5,
            color: "#5e5e5e",
            maxWidth: 360,
          }}
        >
          Transform your energy, immunity, and nutrition with daily vitamins &amp;
          supplements designed for real results.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 30 }}>
          <Link
            href="/products"
            style={{
              lineHeight: 1,
              display: "inline-block",
              fontSize: 14,
              fontWeight: 500,
              color: "#fcfcf7",
              background: "#1c3a13",
              padding: "14px 28px",
              borderRadius: 40,
              textDecoration: "none",
            }}
          >
            Shop Now
          </Link>
          <Link
            href="/products"
            style={{
              lineHeight: 1,
              display: "inline-block",
              fontSize: 14,
              fontWeight: 500,
              color: "#1a1a1a",
              background: "transparent",
              border: "1.5px solid rgba(27,42,31,.35)",
              padding: "14px 28px",
              borderRadius: 40,
              textDecoration: "none",
            }}
          >
            Take the Quiz &nbsp;→
          </Link>
        </div>
      </div>
    </section>
  );
}
