"use client";

import { useRef } from "react";

type StoryTile = {
  w: string;
  h: string;
  radius: string;
  bg: string;
  isQuote?: boolean;
  isVideo?: boolean;
  fg?: string;
  quote?: string;
  source?: string;
};

const BASE_TILES: StoryTile[] = [
  { w: "200px", h: "200px", radius: "50%", bg: "linear-gradient(160deg,#cdc3b0,#b0a48b)" },
  { w: "260px", h: "320px", radius: "14px", bg: "linear-gradient(160deg,#3a4733,#222b1f)", isVideo: true },
  { w: "240px", h: "300px", radius: "14px", bg: "linear-gradient(160deg,#d5ccb6,#bcb094)" },
  {
    w: "300px",
    h: "300px",
    radius: "14px",
    bg: "#E8ECE0",
    isQuote: true,
    fg: "#1a1a1a",
    quote:
      '"Setting a new standard in clinically-backed daily nutrition for real, lasting results."',
    source: "Fast Company",
  },
  { w: "220px", h: "300px", radius: "14px", bg: "linear-gradient(160deg,#5a6b4e,#3a4733)" },
  { w: "260px", h: "300px", radius: "14px", bg: "linear-gradient(160deg,#2a3326,#161f14)", isVideo: true },
  {
    w: "300px",
    h: "300px",
    radius: "14px",
    bg: "#1c3a13",
    isQuote: true,
    fg: "#fcfcf7",
    quote:
      '"Organica Living is pioneering premium supplement formulations that help people feel their best every day."',
    source: "Forbes",
  },
  { w: "200px", h: "200px", radius: "50%", bg: "linear-gradient(160deg,#7fa169,#4d6b3e)" },
];

// Double the tiles for seamless loop
const TILES = [...BASE_TILES, ...BASE_TILES];

export function StoryMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section style={{ padding: "88px 0 100px", overflow: "hidden" }}>
      {/* Heading */}
      <div
        data-reveal
        style={{
          padding: "0 40px",
          maxWidth: 1440,
          margin: "0 auto 52px",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(26px,3.2vw,42px)",
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: 520,
          }}
        >
          Stories from scientists, innovators, and members like you.
        </h2>
      </div>

      {/* Marquee track */}
      <div style={{ position: "relative" }}>
        <div
          ref={trackRef}
          onMouseEnter={() => {
            if (trackRef.current)
              trackRef.current.style.animationPlayState = "paused";
          }}
          onMouseLeave={() => {
            if (trackRef.current)
              trackRef.current.style.animationPlayState = "running";
          }}
          style={{
            display: "flex",
            gap: 18,
            width: "max-content",
            alignItems: "center",
            animation: "seedMarquee 55s linear infinite",
            padding: "0 18px",
          }}
        >
          {TILES.map((tile, i) => (
            <div
              key={i}
              style={{
                flex: "0 0 auto",
                width: tile.w,
                height: tile.h,
                borderRadius: tile.radius,
                overflow: "hidden",
                position: "relative",
                background: tile.bg,
                transition: "transform 0.6s cubic-bezier(0.75,0,0.25,1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              }}
            >
              {tile.isQuote && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    padding: 24,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontSize: 15,
                      lineHeight: 1.35,
                      fontWeight: 500,
                      color: tile.fg,
                    }}
                  >
                    {tile.quote}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      color: tile.fg,
                      opacity: 0.7,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {tile.source}
                  </span>
                </div>
              )}
              {tile.isVideo && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 46,
                      height: 46,
                      borderRadius: "50%",
                      background: "rgba(243,240,232,.9)",
                      color: "#1a1a1a",
                      fontSize: 14,
                    }}
                  >
                    ▶
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
