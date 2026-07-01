import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowRight } from "@/components/ui/ArrowRight";

/**
 * Shared section primitives for the brand pages (/science, /sustainability,
 * /labs). Layout language is modeled on seed.com/approach — full-bleed photo
 * heroes with overlay text, numbered process cards, alternating text/image
 * feature splits, methodology lists and a certification wall — rendered in the
 * Organica Living design system (forest/cream palette, inline styles + the
 * `data-*` responsive hooks defined in globals.css).
 */

const MONO = "var(--font-mono)";
const FOREST = "#1c3a13";
const CREAM = "#fcfcf7";
const INK = "#1a1a1a";

/** Inline external citation link for prose (opens in a new tab, styled forest). */
export function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#1c3a13", textDecoration: "underline", textUnderlineOffset: 2 }}
    >
      {children}
    </a>
  );
}

export function Eyebrow({
  children,
  color = "#2c4a35",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: 1,
        textTransform: "uppercase",
        color,
        fontFamily: MONO,
      }}
    >
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: color }} />
      {children}
    </div>
  );
}

/** Full-bleed photo hero with overlay copy — the top of every brand page. */
export function BrandHero({
  eyebrow,
  title,
  subtitle,
  image,
  alt,
  cta,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  cta?: { href: string; label: string };
}) {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "62vh",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
      }}
    >
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />
      {/* forest-tinted overlay keeps the light copy legible over any photo */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(18,32,14,.30) 0%, rgba(16,28,12,.42) 45%, rgba(12,22,10,.80) 100%)",
        }}
      />
      <div
        data-reveal
        style={{
          position: "relative",
          maxWidth: 1440,
          margin: "0 auto",
          padding: "0 40px 64px",
          width: "100%",
        }}
      >
        <Eyebrow color="#bfe6a3">{eyebrow}</Eyebrow>
        <h1
          style={{
            fontSize: "clamp(34px,4.4vw,60px)",
            fontWeight: 300,
            lineHeight: 1.03,
            letterSpacing: "-0.03em",
            color: CREAM,
            maxWidth: 720,
            marginTop: 18,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            marginTop: 18,
            fontSize: 19,
            lineHeight: 1.55,
            color: "rgba(243,240,232,.86)",
            maxWidth: 560,
          }}
        >
          {subtitle}
        </p>
        {cta ? (
          <Link
            href={cta.href}
            style={{
              lineHeight: 1,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 28,
              fontSize: 14,
              fontWeight: 500,
              color: INK,
              background: CREAM,
              padding: "14px 28px",
              borderRadius: 40,
              textDecoration: "none",
            }}
          >
            {cta.label}
            <ArrowRight size={16} />
          </Link>
        ) : null}
      </div>
    </section>
  );
}

/** Intro band: eyebrow + light headline + lede, centered or left. */
export function SectionIntro({
  eyebrow,
  title,
  lede,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      data-reveal
      style={{
        maxWidth: align === "center" ? 720 : 620,
        margin: align === "center" ? "0 auto" : undefined,
        textAlign: align,
      }}
    >
      <div style={{ display: "inline-flex" }}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h2
        style={{
          fontSize: "clamp(26px,3vw,42px)",
          fontWeight: 300,
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
          color: INK,
          marginTop: 16,
        }}
      >
        {title}
      </h2>
      {lede ? (
        <p
          style={{
            marginTop: 16,
            fontSize: 18,
            lineHeight: 1.6,
            color: "#5e5e5e",
            marginLeft: align === "center" ? "auto" : undefined,
            marginRight: align === "center" ? "auto" : undefined,
            maxWidth: 560,
          }}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

type Pillar = { k: string; t: string; d: string };

/** Numbered process cards on a forest field — seed's "01–05 overview". */
export function ProcessOverview({
  eyebrow,
  title,
  lede,
  steps,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  steps: Pillar[];
}) {
  return (
    <section style={{ background: FOREST, color: CREAM }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "84px 40px" }}>
        <div data-reveal style={{ maxWidth: 620 }}>
          <Eyebrow color="#8fd06a">{eyebrow}</Eyebrow>
          <h2
            style={{
              fontSize: "clamp(26px,3vw,42px)",
              fontWeight: 300,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: CREAM,
              marginTop: 16,
            }}
          >
            {title}
          </h2>
          {lede ? (
            <p style={{ marginTop: 16, fontSize: 18, lineHeight: 1.6, color: "#b9c7b5", maxWidth: 560 }}>
              {lede}
            </p>
          ) : null}
        </div>
        <div
          data-brand-cards
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${Math.min(steps.length, 5)},1fr)`,
            gap: 18,
            marginTop: 44,
          }}
        >
          {steps.map((s) => (
            <div key={s.k} style={{ background: "#22401a", borderRadius: 18, padding: "28px 24px" }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: "#62e104", marginBottom: 16 }}>{s.k}</div>
              <h3 style={{ fontSize: 18, fontWeight: 500, color: CREAM }}>{s.t}</h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.55, color: "#b9c7b5", marginTop: 10 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Alternating text/image split (seed's per-step detail layout). */
export function FeatureSplit({
  eyebrow,
  title,
  body,
  image,
  alt,
  items,
  flip = false,
  background = CREAM,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  image: string;
  alt: string;
  items?: { t: string; d: string }[];
  flip?: boolean;
  background?: string;
}) {
  const imageStyle: CSSProperties = flip ? { order: -1 } : {};
  return (
    <section style={{ background }}>
      <div
        data-rcol2
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "90px 40px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 56,
          alignItems: "center",
        }}
      >
        <div data-reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2
            style={{
              fontSize: "clamp(24px,2.8vw,38px)",
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: INK,
              marginTop: 16,
              maxWidth: 460,
            }}
          >
            {title}
          </h2>
          {body ? (
            <p style={{ marginTop: 16, fontSize: 18, lineHeight: 1.6, color: "#3a3a36", maxWidth: 520 }}>
              {body}
            </p>
          ) : null}
          {items ? (
            <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 18 }}>
              {items.map((it) => (
                <div key={it.t}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#62e104" }} />
                    <h3 style={{ fontSize: 17, fontWeight: 600, color: INK }}>{it.t}</h3>
                  </div>
                  <p style={{ fontSize: 16, lineHeight: 1.55, color: "#3a3a36", marginTop: 6, paddingLeft: 17 }}>
                    {it.d}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div
          data-reveal
          style={{
            ...imageStyle,
            position: "relative",
            aspectRatio: "4 / 3",
            borderRadius: 18,
            overflow: "hidden",
            background: "#e7e1d2",
          }}
        >
          <Image src={image} alt={alt} fill sizes="(max-width:768px) 100vw, 640px" style={{ objectFit: "cover" }} />
        </div>
      </div>
    </section>
  );
}

/** Stacked methodology entries (seed's "Validation" trio). */
export function MethodList({
  eyebrow,
  title,
  methods,
}: {
  eyebrow: string;
  title: string;
  methods: { t: string; d: string }[];
}) {
  return (
    <section style={{ background: "#eef0e6" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "84px 40px" }}>
        <div data-reveal style={{ maxWidth: 620 }}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2
            style={{
              fontSize: "clamp(26px,3vw,42px)",
              fontWeight: 300,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: INK,
              marginTop: 16,
            }}
          >
            {title}
          </h2>
        </div>
        <div style={{ marginTop: 40, display: "flex", flexDirection: "column" }}>
          {methods.map((m, i) => (
            <div
              key={m.t}
              data-rcol2
              style={{
                display: "grid",
                gridTemplateColumns: "0.4fr 1fr",
                gap: 28,
                alignItems: "start",
                padding: "26px 0",
                borderTop: "1px solid #d5d9c8",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                <span style={{ fontFamily: MONO, fontSize: 13, color: "#2c4a35" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 style={{ fontSize: 20, fontWeight: 500, color: INK }}>{m.t}</h3>
              </div>
              <p style={{ fontSize: 18, lineHeight: 1.6, color: "#3a3a36", maxWidth: 620 }}>{m.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Pillar card grid (seed's applications grid). */
export function PillarGrid({
  eyebrow,
  title,
  lede,
  pillars,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  pillars: Pillar[];
}) {
  return (
    <section style={{ background: CREAM }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "84px 40px" }}>
        <SectionIntro eyebrow={eyebrow} title={title} lede={lede} />
        <div
          data-brand-cards
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 18,
            marginTop: 44,
          }}
        >
          {pillars.map((p) => (
            <div
              key={p.k}
              style={{
                background: "#f4f1e6",
                borderRadius: 18,
                padding: "30px 26px",
              }}
            >
              <div style={{ fontFamily: MONO, fontSize: 12, color: "#2c4a35", marginBottom: 14 }}>{p.k}</div>
              <h3 style={{ fontSize: 19, fontWeight: 500, color: INK }}>{p.t}</h3>
              <p style={{ fontSize: 16, lineHeight: 1.55, color: "#5e5e5e", marginTop: 10 }}>{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Certification wall — chips with a hover-free note. */
export function CertWall({
  eyebrow,
  title,
  certs,
}: {
  eyebrow: string;
  title: string;
  certs: { name: string; note: string }[];
}) {
  return (
    <section style={{ background: "#eef0e6" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "84px 40px" }}>
        <SectionIntro eyebrow={eyebrow} title={title} />
        <div
          data-rgrid6
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 14,
            marginTop: 40,
          }}
        >
          {certs.map((c) => (
            <div
              key={c.name}
              style={{
                background: CREAM,
                border: "1px solid #d5d9c8",
                borderRadius: 14,
                padding: "20px 18px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1c3a13" strokeWidth="1.6">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M8.5 12l2.3 2.3L15.5 9.5" />
                </svg>
                <span style={{ fontSize: 14.5, fontWeight: 600, color: INK }}>{c.name}</span>
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.5, color: "#5e5e5e", marginTop: 8 }}>{c.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Prose section for the "101" learn pages — a readable measure of body copy with
 * inline citation links. `children` carries the rich text (including <a>/<Link>
 * citations); this component owns the eyebrow, heading and typographic rhythm.
 */
export function ProseSection({
  eyebrow,
  title,
  children,
  background = CREAM,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  background?: string;
}) {
  return (
    <section style={{ background }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "72px 40px" }}>
        <div data-reveal style={{ maxWidth: 760 }}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2
            style={{
              fontSize: "clamp(24px,2.8vw,38px)",
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: INK,
              marginTop: 16,
            }}
          >
            {title}
          </h2>
          <div
            style={{
              marginTop: 18,
              fontSize: 18,
              lineHeight: 1.7,
              color: "#3a3a36",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Cross-link card grid — used on /approach to route into the Science, Labs and
 * Sustainability deep-dives. Each card is a full Link.
 */
export function CrossLinks({
  eyebrow,
  title,
  links,
}: {
  eyebrow: string;
  title: string;
  links: { title: string; sub: string; href: string }[];
}) {
  return (
    <section style={{ background: "#eef0e6" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "84px 40px" }}>
        <SectionIntro eyebrow={eyebrow} title={title} />
        <div
          data-brand-cards
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${Math.min(links.length, 3)},1fr)`,
            gap: 18,
            marginTop: 44,
          }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                display: "block",
                background: CREAM,
                borderRadius: 18,
                padding: "30px 26px",
                textDecoration: "none",
                border: "1px solid #d5d9c8",
              }}
            >
              <h3 style={{ fontSize: 20, fontWeight: 500, color: INK }}>{l.title}</h3>
              <p style={{ fontSize: 16, lineHeight: 1.55, color: "#5e5e5e", marginTop: 10 }}>{l.sub}</p>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: 16, fontSize: 13, fontWeight: 500, color: "#1c3a13" }}>
                Explore <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Numbered references list for the learn pages (all links open in a new tab). */
export function ReferencesList({ refs }: { refs: { label: string; href: string }[] }) {
  return (
    <section style={{ background: "#fcfcf7" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "20px 40px 72px" }}>
        <div style={{ maxWidth: 760 }}>
          <div style={{ fontSize: 11, letterSpacing: 1.2, textTransform: "uppercase", color: "#8a8a80", fontFamily: MONO, marginBottom: 14 }}>
            References &amp; Further Reading
          </div>
          <ol style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
            {refs.map((r) => (
              <li key={r.href} style={{ fontSize: 14, lineHeight: 1.5, color: "#5e5e5e" }}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#1c3a13", textDecoration: "underline" }}
                >
                  {r.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/**
 * Closing band with the honest-wellness reminder + CTA. Rendered on the same cream
 * field as the "Our Commitments" pillar section (not forest) so it stays visually
 * distinct from the forest footer that follows it.
 */
export function ClosingBand({
  title,
  body,
  note,
  cta,
}: {
  title: string;
  body: string;
  note?: string;
  cta: { href: string; label: string };
}) {
  return (
    <section style={{ background: CREAM, color: INK }}>
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "84px 40px",
          textAlign: "center",
        }}
      >
        <h2
          data-reveal
          style={{
            fontSize: "clamp(26px,3vw,44px)",
            fontWeight: 300,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: INK,
            maxWidth: 640,
            margin: "0 auto",
          }}
        >
          {title}
        </h2>
        <p style={{ marginTop: 18, fontSize: 19, lineHeight: 1.6, color: "#4a4a44", maxWidth: 560, margin: "18px auto 0" }}>
          {body}
        </p>
        <Link
          href={cta.href}
          style={{
            lineHeight: 1,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginTop: 30,
            fontSize: 14,
            fontWeight: 500,
            color: CREAM,
            background: FOREST,
            padding: "14px 30px",
            borderRadius: 40,
            textDecoration: "none",
          }}
        >
          {cta.label}
          <ArrowRight size={16} />
        </Link>
        {note ? (
          <p style={{ marginTop: 26, fontSize: 12, lineHeight: 1.6, color: "#8a8478", maxWidth: 640, margin: "26px auto 0", fontFamily: MONO }}>
            {note}
          </p>
        ) : null}
      </div>
    </section>
  );
}
