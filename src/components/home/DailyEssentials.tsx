import Link from "next/link";

export function DailyEssentials() {
  return (
    <section style={{ padding: "96px 0" }}>
      <div
        data-rcol2
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.15fr",
          gap: 64,
          alignItems: "center",
          maxWidth: 1440,
          margin: "0 auto",
          padding: "0 40px",
        }}
      >
        {/* Left: copy */}
        <div data-reveal>
          <span
            style={{
              display: "inline-block",
              lineHeight: 1,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: ".5px",
              textTransform: "uppercase",
              color: "#1a1a1a",
              background: "#62e104",
              padding: "6px 12px",
              borderRadius: 30,
            }}
          >
            Bundle · Save 25%
          </span>
          <h2
            style={{
              fontSize: "clamp(26px,3vw,40px)",
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginTop: 22,
              maxWidth: 380,
            }}
          >
            Daily essentials for whole-body nutrition.
          </h2>
          <p
            style={{
              marginTop: 18,
              fontSize: 15,
              lineHeight: 1.55,
              color: "#5e5e5e",
              maxWidth: 380,
            }}
          >
            Our Multi Pro multivitamin paired with Omega 1000 covers your daily
            nutrient gap — supporting immunity, energy, and heart, brain and eye
            health.*
          </p>
          <Link
            href="/products"
            style={{
              lineHeight: 1,
              display: "inline-block",
              marginTop: 28,
              fontSize: 14,
              fontWeight: 500,
              color: "#fcfcf7",
              background: "#1c3a13",
              padding: "14px 28px",
              borderRadius: 40,
              textDecoration: "none",
            }}
          >
            Shop Daily Essentials
          </Link>
        </div>

        {/* Right: imagery placeholders */}
        <div data-reveal style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Main large card */}
          <div
            style={{
              position: "relative",
              height: 300,
              borderRadius: 16,
              background: "linear-gradient(135deg,#E7E1D2,#D5CcB6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                width: 88,
                height: 150,
                borderRadius: 8,
                background: "linear-gradient(160deg,#3A4733,#222b1f)",
              }}
            />
            <div
              style={{
                width: 88,
                height: 150,
                borderRadius: 8,
                background: "linear-gradient(160deg,#5d6b4e,#3c4733)",
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: 14,
                right: 16,
                fontSize: 10,
                color: "#7d7560",
                fontFamily: "var(--font-mono)",
              }}
            >
              duo jars
            </span>
          </div>

          {/* Three small cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 14,
            }}
          >
            <div
              style={{
                height: 120,
                borderRadius: 14,
                background: "linear-gradient(160deg,#D5CcB6,#C2B69b)",
                display: "flex",
                alignItems: "flex-end",
                padding: 10,
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  color: "#6f6650",
                  fontFamily: "var(--font-mono)",
                }}
              >
                pill in hand
              </span>
            </div>
            <div
              style={{
                height: 120,
                borderRadius: 14,
                background: "linear-gradient(160deg,#3A4733,#2a3326)",
                display: "flex",
                alignItems: "flex-end",
                padding: 10,
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  color: "rgba(243,240,232,.5)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                unboxing
              </span>
            </div>
            <div
              style={{
                height: 120,
                borderRadius: 14,
                background: "linear-gradient(160deg,#cdd6c2,#aebd9d)",
                display: "flex",
                alignItems: "flex-end",
                padding: 10,
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  color: "#566048",
                  fontFamily: "var(--font-mono)",
                }}
              >
                jars + plant
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
