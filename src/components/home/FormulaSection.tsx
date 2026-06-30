"use client";

import { useEffect, useRef } from "react";

export function FormulaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const capsuleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const sec = sectionRef.current;
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      let p = 1 - Math.max(0, Math.min(1, (rect.top + rect.height * 0.2) / vh));
      p = Math.max(0, Math.min(1, p));
      if (counterRef.current)
        counterRef.current.textContent = String(Math.max(1, Math.round(p * 100)));
      if (capsuleRef.current)
        capsuleRef.current.style.transform = `rotate(${(p * 12 - 6).toFixed(1)}deg)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        padding: "88px 40px",
        overflow: "hidden",
        background:
          "radial-gradient(60% 80% at 20% 30%,#8aa86f,#6e8a57 40%,#46603a 100%)",
      }}
    >
      {/* Layered overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(40% 60% at 80% 70%, rgba(180,205,150,.5), transparent 60%), radial-gradient(30% 40% at 10% 80%, rgba(120,150,90,.6), transparent 60%)",
        }}
      />
      {/* Dot pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.4,
          background:
            "radial-gradient(circle at 15% 40%, rgba(255,255,255,.25) 0 6px, transparent 7px), radial-gradient(circle at 32% 65%, rgba(255,255,255,.2) 0 5px, transparent 6px), radial-gradient(circle at 88% 30%, rgba(255,255,255,.22) 0 7px, transparent 8px)",
          backgroundSize: "120px 120px",
        }}
      />

      {/* Glass card */}
      <div
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
          minHeight: 240,
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

        {/* Headline — Organica Living positioning (no DS-01® / Seed / ↑11x) */}
        <h2
          style={{
            fontSize: "clamp(24px,2.8vw,38px)",
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#1a1a1a",
            maxWidth: 480,
            marginTop: 18,
          }}
        >
          Every formula starts with the science your body actually needs.
        </h2>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 32,
            marginTop: 32,
            flexWrap: "wrap",
          }}
        >
          {/* Count-up stat */}
          <div>
            <div
              style={{ display: "flex", alignItems: "baseline", gap: 10 }}
            >
              <span
                style={{ fontSize: 14, color: "#5e5e5e", maxWidth: 120 }}
              >
                Clinically studied ingredients
              </span>
              <span
                style={{
                  fontSize: "clamp(40px,5vw,64px)",
                  fontWeight: 500,
                  color: "#1a1a1a",
                  letterSpacing: "-0.03em",
                }}
              >
                <span ref={counterRef}>1</span>%
              </span>
            </div>
            <div style={{ fontSize: 11, color: "#5a6753", marginTop: 6 }}>
              bioavailability-optimised delivery
            </div>
          </div>

          {/* Capsule illustration */}
          <div
            ref={capsuleRef}
            style={{
              width: 64,
              height: 170,
              position: "relative",
              willChange: "transform",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "50%",
                borderRadius: "32px 32px 6px 6px",
                background: "linear-gradient(135deg,#3f5a3f,#2a3a26)",
                border: "1px solid rgba(255,255,255,.25)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "50%",
                borderRadius: "6px 6px 32px 32px",
                background: "linear-gradient(135deg,#2a3a26,#1a2618)",
                border: "1px solid rgba(255,255,255,.18)",
              }}
            />
          </div>

          {/* Right copy */}
          <div style={{ maxWidth: 200, textAlign: "left" }}>
            <h3
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: "#2c4a35",
                marginBottom: 8,
              }}
            >
              Every Capsule
            </h3>
            <p style={{ fontSize: 13, lineHeight: 1.5, color: "#5e5e5e" }}>
              Delivers precisely dosed vitamins and minerals to where your
              body absorbs them best.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
