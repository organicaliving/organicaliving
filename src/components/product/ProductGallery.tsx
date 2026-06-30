"use client";

import { useCallback, useEffect, useState } from "react";

type Props = {
  img: string; // /images/<slug>.webp
  thumb: string; // /images/<slug>-thumb.webp
  name: string;
  form: string;
  badge?: string;
};

export function ProductGallery({ img, thumb, name, form, badge }: Props) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const mainBg = `url('${img}') center 52%/82% no-repeat`;
  const thumbBg = `url('${thumb}') center/82% no-repeat`;

  return (
    <>
      <div style={{ position: "sticky", top: 90 }}>
        <button
          type="button"
          data-zoomable
          aria-label={`Zoom ${name}`}
          onClick={() => setOpen(true)}
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginTop: 12 }}>
          {[0, 1, 2, 3].map((i) => (
            <button
              key={i}
              type="button"
              data-zoomable
              aria-label={`Zoom ${name} photo ${i + 1}`}
              onClick={() => setOpen(true)}
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

      {/* lightbox */}
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
            width: "min(620px,92vw)",
            maxHeight: "90vh",
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
              zIndex: 2,
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
          <div
            style={{
              position: "relative",
              aspectRatio: "1 / 1",
              width: "100%",
              maxHeight: "62vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 14,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img}
              alt={name}
              style={{ display: "block", maxWidth: "100%", maxHeight: "62vh", width: "auto", height: "auto", objectFit: "contain" }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "0 4px 4px" }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 500, fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>
                {name}
              </div>
              <div style={{ fontSize: 11, color: "#8a8a80", marginTop: 2, fontFamily: "var(--font-mono)" }}>{form}</div>
            </div>
            <span style={{ fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: "#8a8a80", fontFamily: "var(--font-mono)" }}>
              Esc / tap outside to close
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
