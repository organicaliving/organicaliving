import Image from "next/image";

export function TransformationsSection() {
  return (
    <section style={{ padding: "60px 0 100px", overflow: "hidden" }}>
      {/* Heading */}
      <div
        data-reveal
        style={{
          textAlign: "center",
          padding: "0 40px",
          maxWidth: 680,
          margin: "0 auto 50px",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(28px,3.6vw,46px)",
            fontWeight: 300,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
          }}
        >
          Over 1 million health transformations (and counting).
        </h2>
        <p style={{ marginTop: 16, fontSize: 15, color: "#5e5e5e" }}>
          See how real people are changing their health with Organica Living.
        </p>
      </div>

      {/* Media cards */}
      <div
        data-reveal
        style={{
          display: "flex",
          gap: 18,
          padding: "0 40px",
          justifyContent: "center",
          maxWidth: 1440,
          margin: "0 auto",
        }}
      >
        {/* Main wide card */}
        <div
          style={{
            position: "relative",
            flex: "0 0 auto",
            width: "min(72vw,760px)",
            aspectRatio: "16/10",
            borderRadius: 16,
            overflow: "hidden",
            background: "linear-gradient(120deg,#6b5e52,#3f352d)",
          }}
        >
          <Image
            src="/images/home/th-member-wide.webp"
            alt="Organica Living member enjoying a healthy, active life outdoors"
            fill
            sizes="(max-width:768px) 100vw, 760px"
            style={{ objectFit: "cover" }}
          />
          {/* legibility overlay for the white caption */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(20,20,16,0) 45%, rgba(20,20,16,.6) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 18,
              right: 18,
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "rgba(20,20,16,.35)",
              color: "#fcfcf7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
            }}
          >
            ⤢
          </div>
          <div
            style={{
              position: "absolute",
              left: 32,
              bottom: 32,
              color: "#fcfcf7",
              fontWeight: 500,
            }}
          >
            <div style={{ fontSize: 18 }}>Organica Living®</div>
            <div style={{ fontSize: 22, marginTop: 6 }}>
              Member Experiences
            </div>
          </div>
        </div>

        {/* Narrow portrait card */}
        <div
          style={{
            position: "relative",
            flex: "0 0 auto",
            width: "min(30vw,300px)",
            aspectRatio: "9/12",
            borderRadius: 16,
            overflow: "hidden",
            background: "linear-gradient(120deg,#cdbfae,#9c8a76)",
          }}
        >
          <Image
            src="/images/home/th-member-portrait.webp"
            alt="Organica Living member portrait in natural light"
            fill
            sizes="(max-width:768px) 100vw, 300px"
            style={{ objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(20,20,16,0) 55%, rgba(20,20,16,.6) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 20,
              bottom: 24,
              color: "#fcfcf7",
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            Organica Living®
          </div>
        </div>
      </div>

      {/* Playback controls (decorative) */}
      <div
        data-reveal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          marginTop: 26,
        }}
      >
        <button
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1.5px solid rgba(27,42,31,.3)",
            background: "transparent",
            cursor: "pointer",
            fontSize: 14,
          }}
          aria-label="Previous"
        >
          ←
        </button>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 12,
            color: "#5e5e5e",
            border: "1px solid rgba(27,42,31,.2)",
            borderRadius: 30,
            padding: "8px 14px",
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)" }}>7:14</span>
        </div>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "linear-gradient(160deg,#6b5e52,#3f352d)",
          }}
        />
      </div>
    </section>
  );
}
