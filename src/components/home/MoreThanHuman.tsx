import Link from "next/link";

export function MoreThanHuman() {
  return (
    <section style={{ padding: "96px 0" }}>
      <div
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
        <div>
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
            You are more than human.
          </h2>
          <p
            style={{
              marginTop: 20,
              fontSize: 15,
              lineHeight: 1.55,
              color: "#5e5e5e",
              maxWidth: 400,
            }}
          >
            Your body is a complex ecosystem. Every Organica Living
            formulation is built to support your whole system — from cellular
            energy to immune defence — so you can feel and perform your best,
            every day.
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

        {/* Right: visual placeholder */}
        <div
          style={{
            position: "relative",
            aspectRatio: "1/1",
            borderRadius: 16,
            overflow: "hidden",
            background:
              "radial-gradient(70% 80% at 50% 40%,#7fa169,#4d6b3e 60%,#33502b 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "46%",
              height: "80%",
              borderRadius: "50% 50% 45% 45%",
              background:
                "linear-gradient(160deg,rgba(160,190,130,.6),rgba(70,100,55,.7))",
              filter: "blur(1px)",
            }}
          />
          <span
            style={{
              position: "absolute",
              bottom: 16,
              left: 16,
              fontSize: 10,
              color: "rgba(243,240,232,.6)",
              fontFamily: "var(--font-mono)",
            }}
          >
            lifestyle photography
          </span>
        </div>
      </div>
    </section>
  );
}
