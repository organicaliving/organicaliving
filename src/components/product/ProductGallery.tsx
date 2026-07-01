"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";

type Props = {
  img: string; // /images/<slug>.webp
  thumb: string; // /images/<slug>-thumb.webp
  name: string;
  form: string;
  badge?: string;
};

// The catalog currently ships a single photo per product; the gallery presents
// it as a 4-shot set (main + thumbnail strip). `photos`/`thumbs` are arrays so
// this becomes a true multi-image carousel the moment distinct files are added.
const SHOT_COUNT = 4;

export function ProductGallery({ img, thumb, name, form, badge }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const photos = Array.from({ length: SHOT_COUNT }, () => img);
  const thumbs = Array.from({ length: SHOT_COUNT }, () => thumb);

  const close = useCallback(() => setOpen(false), []);
  const openAt = useCallback((i: number) => {
    setActive(i);
    setOpen(true);
  }, []);
  const go = useCallback(
    (dir: number) => setActive((i) => (i + dir + SHOT_COUNT) % SHOT_COUNT),
    []
  );

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, go]);

  const mainBg = `url('${img}') center 52%/125% no-repeat`;
  const thumbBg = `url('${thumb}') center/125% no-repeat`;

  return (
    <>
      <div data-pdp-gallery style={{ position: "sticky", top: 90 }}>
        <button
          type="button"
          data-zoomable
          aria-label={`Zoom ${name}`}
          onClick={() => openAt(0)}
          style={{
            position: "relative",
            aspectRatio: "1 / 1",
            width: "100%",
            borderRadius: 22,
            overflow: "hidden",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: 22,
            cursor: "zoom-in",
            border: "none",
            background: mainBg,
          }}
        >
          {badge ? (
            <span
              style={{
                display: "inline-block",
                lineHeight: 1,
                position: "absolute",
                top: 18,
                left: 18,
                fontSize: 11,
                fontWeight: 600,
                color: "#1a1a1a",
                background: "#62e104",
                padding: "5px 13px",
                borderRadius: 30,
                zIndex: 2,
              }}
            >
              {badge}
            </span>
          ) : null}
        </button>
        <div data-pdp-thumbs style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginTop: 12 }}>
          {thumbs.map((_, i) => (
            <button
              key={i}
              type="button"
              data-zoomable
              aria-label={`Zoom ${name} photo ${i + 1}`}
              onClick={() => openAt(i)}
              style={{
                aspectRatio: "1 / 1",
                borderRadius: 13,
                cursor: "zoom-in",
                border: "none",
                background: thumbBg,
              }}
            />
          ))}
        </div>
      </div>

      {/* lightbox — carousel: magnified active photo + thumbnail strip */}
      <div
        data-lightbox
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1000,
          display: open ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          padding: 32,
          background: "rgba(16,29,15,0.82)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          opacity: open ? 1 : 0,
          transition: "opacity .3s cubic-bezier(0.75,0,0.25,1)",
        }}
      >
        <div
          style={{
            position: "relative",
            background: "#fcfcf7",
            borderRadius: 22,
            boxShadow: "0 30px 70px rgba(0,0,0,0.22)",
            padding: 20,
            width: "min(640px,94vw)",
            maxHeight: "92vh",
            transform: open ? "scale(1)" : "scale(0.95)",
            transition: "transform .3s cubic-bezier(0.75,0,0.25,1)",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 3,
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "#1c3a13",
              color: "#fcfcf7",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {/* magnified stage with prev/next arrows */}
          <div
            style={{
              position: "relative",
              aspectRatio: "1 / 1",
              width: "100%",
              maxHeight: "60vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 14,
              background: "#f4f1e6",
              overflow: "hidden",
            }}
          >
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => go(-1)}
              style={arrowStyle("left")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos[active]}
              alt={`${name} photo ${active + 1}`}
              style={{ display: "block", maxWidth: "88%", maxHeight: "58vh", width: "auto", height: "auto", objectFit: "contain" }}
            />
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => go(1)}
              style={arrowStyle("right")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </div>

          {/* thumbnail carousel */}
          <div
            data-lightbox-strip
            style={{
              display: "flex",
              gap: 10,
              overflowX: "auto",
              padding: "2px 4px 6px",
              scrollbarWidth: "thin",
            }}
          >
            {thumbs.map((t, i) => (
              <button
                key={i}
                type="button"
                aria-label={`View ${name} photo ${i + 1}`}
                aria-current={i === active}
                onClick={() => setActive(i)}
                style={{
                  flex: "0 0 auto",
                  width: 66,
                  height: 66,
                  borderRadius: 12,
                  cursor: "pointer",
                  background: `url('${t}') center/125% no-repeat`,
                  border: i === active ? "2px solid #1c3a13" : "2px solid transparent",
                  outline: i === active ? "none" : "1px solid #e4e1d6",
                  opacity: i === active ? 1 : 0.72,
                  transition: "opacity .2s ease, border-color .2s ease",
                }}
              />
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "0 4px 4px" }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 500, fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>
                {name}
              </div>
              <div style={{ fontSize: 11, color: "#8a8a80", marginTop: 2, fontFamily: "var(--font-mono)" }}>{form}</div>
            </div>
            <span style={{ fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: "#8a8a80", fontFamily: "var(--font-mono)" }}>
              {active + 1} / {SHOT_COUNT}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function arrowStyle(side: "left" | "right"): CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    [side]: 10,
    transform: "translateY(-50%)",
    zIndex: 2,
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "rgba(252,252,247,0.9)",
    color: "#1c3a13",
    border: "1px solid #d8dbcb",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
  };
}
