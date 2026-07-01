import Link from "next/link";
import Image from "next/image";

export function ClosingCta() {
  return (
    <section style={{ padding: "0 0 100px" }}>
      <div
        data-rcol2
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          maxWidth: 1440,
          margin: "0 auto",
          padding: "0 40px",
        }}
      >
        {/* Organica Living Labs card */}
        <div
          data-reveal
          style={{
            position: "relative",
            minHeight: 420,
            borderRadius: 18,
            overflow: "hidden",
            background: "linear-gradient(160deg,#8a7d63,#4a4334)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: 40,
          }}
        >
          <Image
            src="/images/home/cta-labs.webp"
            alt="Aerial view of a lush green forest canopy"
            fill
            sizes="(max-width:768px) 100vw, 700px"
            style={{ objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(160deg, rgba(30,36,24,.45), rgba(20,26,16,.68))",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 24,
              left: 24,
              fontSize: 10,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: "rgba(243,240,232,.7)",
              fontFamily: "var(--font-mono)",
              writingMode: "vertical-rl",
            }}
          >
            Formulated with care — worldwide
          </div>
          <div
            style={{
              position: "relative",
              zIndex: 1,
              fontSize: 22,
              fontWeight: 500,
              color: "#fcfcf7",
            }}
          >
            Organica Living &nbsp;[ Labs ]
          </div>
          <p
            style={{
              position: "relative",
              zIndex: 1,
              fontSize: 15,
              color: "rgba(243,240,232,.85)",
              marginTop: 10,
            }}
          >
            Because health is not just human.
          </p>
          <Link
            href="/products"
            style={{
              position: "relative",
              zIndex: 1,
              lineHeight: 1,
              display: "inline-block",
              marginTop: 24,
              fontSize: 13,
              fontWeight: 500,
              color: "#1a1a1a",
              background: "#fcfcf7",
              padding: "12px 26px",
              borderRadius: 40,
              textDecoration: "none",
            }}
          >
            Read More
          </Link>
        </div>

        {/* "Change your health" CTA card */}
        <div
          data-reveal
          style={{
            position: "relative",
            minHeight: 420,
            borderRadius: 18,
            overflow: "hidden",
            background:
              "radial-gradient(80% 80% at 50% 40%,#5a7a4a,#34502b 70%,#23381e 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: 40,
          }}
        >
          <Image
            src="/images/home/cta-transform.webp"
            alt="Sunlight streaming through a peaceful green forest path"
            fill
            sizes="(max-width:768px) 100vw, 700px"
            style={{ objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(80% 80% at 50% 40%, rgba(40,70,35,.4), rgba(20,40,20,.7) 100%)",
            }}
          />
          <h2
            style={{
              position: "relative",
              zIndex: 1,
              fontSize: "clamp(24px,2.6vw,36px)",
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#fcfcf7",
              maxWidth: 360,
            }}
          >
            Transform your health for good.*
          </h2>
          <p
            style={{
              position: "relative",
              zIndex: 1,
              fontSize: 15,
              color: "rgba(243,240,232,.85)",
              marginTop: 12,
            }}
          >
            Feel the difference with clinically formulated daily supplements.*
          </p>
          <Link
            href="/products"
            style={{
              position: "relative",
              zIndex: 1,
              lineHeight: 1,
              display: "inline-block",
              marginTop: 24,
              fontSize: 13,
              fontWeight: 500,
              color: "#1a1a1a",
              background: "#fcfcf7",
              padding: "12px 26px",
              borderRadius: 40,
              textDecoration: "none",
            }}
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
