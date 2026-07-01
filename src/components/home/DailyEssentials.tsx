import Link from "next/link";
import Image from "next/image";

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
          {/* Main large card — Multi Pro + Omega 1000 duo */}
          <div
            style={{
              position: "relative",
              height: 300,
              borderRadius: 16,
              background: "linear-gradient(135deg,#E7E1D2,#D5CcB6)",
              overflow: "hidden",
            }}
          >
            <Image
              src="/images/home/multi-pro-omega-1000-combo.webp"
              alt="Multi Pro multivitamin and Omega 1000 duo"
              fill
              sizes="(max-width:768px) 100vw, 640px"
              style={{ objectFit: "contain", padding: 20 }}
            />
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
                position: "relative",
                height: 120,
                borderRadius: 14,
                overflow: "hidden",
                background: "linear-gradient(160deg,#D5CcB6,#C2B69b)",
              }}
            >
              <Image
                src="/images/home/de-pill-in-hand.webp"
                alt="Unripe guavas on a tree branch"
                fill
                sizes="220px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div
              style={{
                position: "relative",
                height: 120,
                borderRadius: 14,
                overflow: "hidden",
                background: "linear-gradient(160deg,#3A4733,#2a3326)",
              }}
            >
              <Image
                src="/images/home/de-unboxing.webp"
                alt="Tamarillo fruit ripening on a tree branch"
                fill
                sizes="220px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div
              style={{
                position: "relative",
                height: 120,
                borderRadius: 14,
                overflow: "hidden",
                background: "linear-gradient(160deg,#cdd6c2,#aebd9d)",
              }}
            >
              <Image
                src="/images/home/de-jars-plant.webp"
                alt="Unripe pomegranate growing on a branch"
                fill
                sizes="220px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
