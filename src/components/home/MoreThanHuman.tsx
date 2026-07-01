import Link from "next/link";
import Image from "next/image";

export function MoreThanHuman() {
  return (
    <section style={{ padding: "96px 0" }}>
      <div
        data-rcol2
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 56,
          alignItems: "center",
          maxWidth: 1440,
          margin: "0 auto",
          padding: "0 40px",
        }}
      >
        {/* Left: copy */}
        <div data-reveal>
          <div
            style={{ fontSize: 15, color: "#1a1a1a", letterSpacing: 1 }}
          >
            Organica Living &nbsp;[{" "}
            <span
              style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}
            >
              ▦
            </span>{" "}
            ]
          </div>
          <h2
            style={{
              fontSize: "clamp(28px,3.4vw,48px)",
              fontWeight: 300,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              marginTop: 24,
            }}
          >
            More than a vitamin.
          </h2>
          <p
            style={{
              marginTop: 20,
              fontSize: 19,
              lineHeight: 1.55,
              color: "#5e5e5e",
              maxWidth: 440,
            }}
          >
            Every Organica Living formula is precision-blended and clinically
            dosed, then made in an FDA-registered facility and third-party
            tested. Real nutrients, at doses that make a difference, in a form
            your body can actually absorb.
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
              padding: "13px 26px",
              borderRadius: 40,
              textDecoration: "none",
            }}
          >
            Discover{" "}
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#62e104",
                verticalAlign: "middle",
                marginLeft: 6,
              }}
            />
          </Link>
          <div
            style={{
              marginTop: 64,
              fontSize: 11,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: "#6b7563",
              fontFamily: "var(--font-mono)",
            }}
          >
            Science &nbsp;/ &nbsp;Daily Nutrition
          </div>
        </div>

        {/* Right: organic lifestyle imagery */}
        <div
          data-reveal
          style={{
            position: "relative",
            aspectRatio: "1/1",
            borderRadius: 16,
            overflow: "hidden",
            background:
              "radial-gradient(70% 80% at 50% 40%,#7fa169,#4d6b3e 60%,#33502b 100%)",
          }}
        >
          <Image
            src="/images/home/mth-lifestyle-run.webp"
            alt="A person on a peaceful forest path surrounded by greenery"
            fill
            sizes="(max-width:768px) 100vw, 640px"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}
