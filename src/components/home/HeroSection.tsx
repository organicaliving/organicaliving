import Link from "next/link";
import { ArrowRight } from "@/components/ui/ArrowRight";

export function HeroSection() {
  return (
    <section style={{ position: "relative", minHeight: "76vh", overflow: "hidden" }}>
      {/* Background video (seamless muted loop). A WebP poster paints instantly
          while the video streams; faststart lets the MP4 play before it's fully
          downloaded. WebM (VP9) is served first, MP4 (H.264) as the fallback. */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/videos/hero-poster.webp"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src="/videos/hero-loop.webm" type="video/webm" />
        <source src="/videos/hero-loop.mp4" type="video/mp4" />
      </video>
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.5,
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
      {/* Content */}
      <div
        data-reveal
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
            fontSize: 20,
            lineHeight: 1.5,
            color: "#5e5e5e",
            maxWidth: 420,
          }}
        >
          Transform your energy, immunity, and nutrition with daily vitamins &amp;
          supplements designed for real results.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 30 }}>
          <Link
            href="/quiz"
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
            Take the Quiz
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
            Shop Now&nbsp;{" "}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
