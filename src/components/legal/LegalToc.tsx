"use client";

import { useEffect, useState } from "react";

const FOREST = "#1c3a13";
const GRAY = "#8a8a80";
const MONO = "var(--font-mono)";

/**
 * Scroll-spy table of contents for the legal pages. Renders the "Contents"
 * card and highlights the section currently in view (forest green) while the
 * rest stay gray, updating as the user scrolls. Clicking a link anchors to that
 * section's `id`; the section carries a scroll-margin-top so it lands at the
 * heading, clear of the sticky site header. Client component (IntersectionObserver).
 */
export function LegalToc({
  sections,
}: {
  sections: { id: string; heading: string }[];
}) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    if (sections.length === 0) return;

    // Track each section's intersection state; the active section is the first
    // (topmost, in document order) currently crossing the trigger band. The band
    // is inset from the top (past the ~78px sticky header) and from the bottom so
    // a section only becomes active once its heading nears the top of the viewport.
    const intersecting = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          intersecting.set(entry.target.id, entry.isIntersecting);
        }
        const firstActive = sections.find((s) => intersecting.get(s.id));
        if (firstActive) setActiveId(firstActive.id);
      },
      { rootMargin: "-96px 0px -55% 0px", threshold: 0 },
    );

    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Page contents"
      style={{
        background: "#f4f1e6",
        border: "1px solid #d5d9c8",
        borderRadius: 12,
        padding: "22px 24px",
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: 1,
          textTransform: "uppercase",
          color: "#2c4a35",
          fontFamily: MONO,
          marginBottom: 14,
        }}
      >
        Contents
      </div>
      <ol
        style={{
          margin: 0,
          paddingLeft: 0,
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {sections.map((section, index) => {
          const isActive = section.id === activeId;
          return (
            <li key={section.id} style={{ fontSize: 14, lineHeight: 1.4 }}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => setActiveId(section.id)}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 8,
                  padding: "3px 0",
                  textDecoration: "none",
                  color: isActive ? FOREST : GRAY,
                  fontWeight: isActive ? 600 : 400,
                  transition: "color .18s ease",
                }}
              >
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    color: isActive ? FOREST : "#a9a9a0",
                    minWidth: 22,
                    flexShrink: 0,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {section.heading}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
