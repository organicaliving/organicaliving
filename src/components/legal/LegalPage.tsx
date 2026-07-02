import type { ReactNode } from "react";

const FOREST = "#1c3a13";
const CREAM = "#fcfcf7";
const INK = "#1a1a1a";
const MONO = "var(--font-mono)";

export type LegalSection = { id: string; heading: string; body: ReactNode };

/**
 * Shared layout for all legal pages (/terms, /privacy, /accessibility, /consent).
 * Server component — no client JS. Uses inline styles + data-* hooks consistent
 * with the rest of the site's brand pages.
 */
export function LegalPage({
  title,
  intro,
  sections,
  lastUpdated,
  draftNotice,
}: {
  title: string;
  intro: ReactNode;
  sections: LegalSection[];
  lastUpdated: string;
  draftNotice: string;
}) {
  return (
    <main style={{ background: CREAM, color: INK, minHeight: "100vh" }}>
      {/* Amber draft banner */}
      <div
        role="alert"
        style={{
          background: "#fef3c7",
          borderBottom: "1px solid #f59e0b",
          padding: "12px 24px",
          fontSize: 14,
          lineHeight: 1.5,
          color: "#78350f",
          textAlign: "center",
          fontFamily: MONO,
        }}
      >
        {draftNotice}
      </div>

      {/* Page body — max 820px measure, readable prose column */}
      <div
        style={{
          maxWidth: 820,
          margin: "0 auto",
          padding: "56px 24px 96px",
        }}
      >
        {/* Page heading */}
        <h1
          style={{
            fontSize: "clamp(28px, 3.5vw, 44px)",
            fontWeight: 300,
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
            color: INK,
            marginBottom: 12,
          }}
        >
          {title}
        </h1>

        {/* Last updated line */}
        <p
          style={{
            fontSize: 13,
            color: "#8a8a80",
            fontFamily: MONO,
            letterSpacing: 0.5,
            marginBottom: 32,
          }}
        >
          Last updated: {lastUpdated}
        </p>

        {/* Intro copy */}
        {intro ? (
          <div
            style={{
              fontSize: 18,
              lineHeight: 1.7,
              color: "#3a3a36",
              marginBottom: 48,
            }}
          >
            {intro}
          </div>
        ) : null}

        {/* Table of contents */}
        {sections.length > 0 ? (
          <nav
            aria-label="Page contents"
            style={{
              background: "#f4f1e6",
              border: "1px solid #d5d9c8",
              borderRadius: 12,
              padding: "24px 28px",
              marginBottom: 56,
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
                paddingLeft: 20,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {sections.map((section, index) => (
                <li key={section.id} style={{ fontSize: 15, lineHeight: 1.5 }}>
                  <a
                    href={`#${section.id}`}
                    style={{
                      color: FOREST,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "baseline",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: 11,
                        color: "#8a8a80",
                        minWidth: 22,
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        {/* Sections */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 56,
          }}
        >
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-heading`}
            >
              {/* Section number + heading */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 14,
                  marginBottom: 16,
                  paddingBottom: 12,
                  borderBottom: "1px solid #d5d9c8",
                }}
              >
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 12,
                    color: "#8a8a80",
                    flexShrink: 0,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2
                  id={`${section.id}-heading`}
                  style={{
                    fontSize: "clamp(20px, 2.2vw, 26px)",
                    fontWeight: 300,
                    lineHeight: 1.1,
                    letterSpacing: "-0.015em",
                    color: INK,
                    margin: 0,
                  }}
                >
                  {section.heading}
                </h2>
              </div>

              {/* Body copy */}
              <div
                style={{
                  fontSize: 18,
                  lineHeight: 1.7,
                  color: "#3a3a36",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
