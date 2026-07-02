import type { Metadata } from "next";
import {
  BrandHero,
  SectionIntro,
  ClosingBand,
} from "@/components/brand/BrandSections";
import { PROVENANCE, TRUST_SIGNALS, CERTIFICATIONS } from "@/lib/brand-content";

export const metadata: Metadata = {
  title: "Press & Media — Organica Living",
  description:
    "Media contacts, brand boilerplate, and downloadable assets for journalists and content creators covering Organica Living vitamins and supplements.",
};

const FOREST = "#1c3a13";
const CREAM = "#fcfcf7";
const INK = "#1a1a1a";
const MONO = "var(--font-mono)";

export default function PressPage() {
  return (
    <main style={{ background: CREAM }}>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <BrandHero
        eyebrow="Press & Media"
        title="Everything you need to cover Organica Living."
        subtitle="Brand boilerplate, downloadable assets, and a direct line to our team — all in one place."
        image="/images/labs/labs-hero.webp"
        alt="Close-up of botanical ingredients laid on a clean surface in natural light"
      />

      {/* ── Media Contact ─────────────────────────────────────────── */}
      <section style={{ background: CREAM }}>
        <div
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "80px 40px 64px",
          }}
        >
          <SectionIntro
            eyebrow="Get in Touch"
            title="Media inquiries"
            lede="For interview requests, fact-checking, product samples, or anything else press-related, reach us directly."
          />

          <div
            style={{
              marginTop: 40,
              display: "inline-block",
              background: "#f4f1e6",
              border: "1px solid #d5d9c8",
              borderRadius: 18,
              padding: "32px 36px",
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
              Press Contact
            </div>
            <a
              href="mailto:press@organicaliving.com"
              style={{
                fontSize: 22,
                fontWeight: 500,
                color: FOREST,
                textDecoration: "none",
                display: "block",
              }}
            >
              press@organicaliving.com
            </a>
            <p
              style={{
                marginTop: 10,
                fontSize: 15,
                lineHeight: 1.55,
                color: "#5e5e5e",
                maxWidth: 360,
              }}
            >
              We aim to respond within two business days. For urgent deadlines,
              please note your publication date in the subject line.
            </p>
          </div>

          <p
            style={{
              marginTop: 24,
              fontSize: 14,
              lineHeight: 1.6,
              color: "#8a8478",
              fontFamily: MONO,
            }}
          >
            We do not maintain a dedicated PR agency at this time. All inquiries
            go directly to our team.
          </p>
        </div>
      </section>

      {/* ── Brand in Brief ────────────────────────────────────────── */}
      <section style={{ background: "#eef0e6" }}>
        <div
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "80px 40px",
          }}
        >
          <SectionIntro
            eyebrow="Brand in Brief"
            title="Company boilerplate"
            lede="The following copy is approved for use in editorial coverage. Please contact us before altering any factual claims."
          />

          {/* Approved boilerplate block */}
          <div
            style={{
              marginTop: 40,
              background: CREAM,
              border: "1px solid #d5d9c8",
              borderRadius: 18,
              padding: "36px 40px",
              maxWidth: 800,
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
                marginBottom: 16,
              }}
            >
              Approved Boilerplate — Short Form
            </div>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.7,
                color: "#3a3a36",
                fontStyle: "italic",
              }}
            >
              &ldquo;Organica Living is a vitamin and dietary supplement brand
              founded in {PROVENANCE.since} and based in {PROVENANCE.city}. The
              company formulates clinically-dosed vitamins, minerals, and
              specialty supplements manufactured in an {PROVENANCE.facility} in
              the United States. Every product is third-party tested for purity,
              potency, and label accuracy, and is certified Non-GMO, 100% Vegan,
              Halal, and Gluten-Free. {PROVENANCE.company}&rsquo;s approach is
              grounded in one principle: that nature is our thing.&rdquo;
            </p>
          </div>

          {/* Key facts grid */}
          <div
            style={{
              marginTop: 28,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 14,
              maxWidth: 800,
            }}
            data-brand-cards
          >
            {[
              { k: "Founded", v: String(PROVENANCE.since) },
              { k: "Headquarters", v: `${PROVENANCE.city}, ${PROVENANCE.country}` },
              { k: "Manufacturing", v: "USA — FDA-registered, cGMP-certified" },
              { k: "Certifications", v: TRUST_SIGNALS.join(" · ") },
              { k: "Product Range", v: "Vitamins, minerals & specialty supplements" },
              { k: "Website", v: PROVENANCE.url },
            ].map((item) => (
              <div
                key={item.k}
                style={{
                  background: CREAM,
                  border: "1px solid #d5d9c8",
                  borderRadius: 14,
                  padding: "20px 18px",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: 0.8,
                    textTransform: "uppercase",
                    color: "#2c4a35",
                    fontFamily: MONO,
                    marginBottom: 6,
                  }}
                >
                  {item.k}
                </div>
                <div style={{ fontSize: 15, color: INK, lineHeight: 1.4 }}>
                  {item.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ────────────────────────────────────────── */}
      <section style={{ background: CREAM }}>
        <div
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "80px 40px",
          }}
        >
          <SectionIntro
            eyebrow="Certifications"
            title="Quality marks on every product"
          />
          <div
            data-rgrid6
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 14,
              marginTop: 40,
              maxWidth: 1000,
            }}
          >
            {CERTIFICATIONS.map((c) => (
              <div
                key={c.name}
                style={{
                  background: "#f4f1e6",
                  border: "1px solid #d5d9c8",
                  borderRadius: 14,
                  padding: "20px 18px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={FOREST}
                    strokeWidth="1.8"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8.5 12l2.3 2.3L15.5 9.5" />
                  </svg>
                  <span style={{ fontSize: 13.5, fontWeight: 600, color: INK }}>
                    {c.name}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 12.5,
                    lineHeight: 1.5,
                    color: "#5e5e5e",
                    marginTop: 8,
                  }}
                >
                  {c.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Coverage Note ─────────────────────────────────────────── */}
      <section style={{ background: "#eef0e6" }}>
        <div
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "80px 40px",
          }}
        >
          <SectionIntro
            eyebrow="Recent Coverage"
            title="Interviews & media features"
            lede="We are a growing brand and are actively building our media presence. For recent coverage, interviews, or to arrange a review sample, contact us directly."
          />
          <div
            style={{
              marginTop: 36,
              background: CREAM,
              border: "1px solid #d5d9c8",
              borderRadius: 18,
              padding: "32px 36px",
              maxWidth: 620,
            }}
          >
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "#3a3a36" }}>
              We do not list fabricated or unverified coverage here. If you are a
              journalist, podcaster, or content creator interested in covering
              Organica Living, reach us at{" "}
              <a
                href="mailto:press@organicaliving.com"
                style={{ color: FOREST, textDecoration: "underline" }}
              >
                press@organicaliving.com
              </a>{" "}
              — we are happy to provide background, spokespeople, or product
              samples for editorial use.
            </p>
          </div>
        </div>
      </section>

      {/* ── Brand Asset Kit ───────────────────────────────────────── */}
      <section style={{ background: CREAM }}>
        <div
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "80px 40px",
          }}
        >
          <SectionIntro
            eyebrow="Brand Assets"
            title="Logos & imagery"
            lede="Download our official assets for editorial use. Please do not alter colors, proportions, or add effects to the logo."
          />

          <div
            style={{
              marginTop: 40,
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 18,
              maxWidth: 720,
            }}
            data-rcol2
          >
            {/* Logo download */}
            <div
              style={{
                background: "#f4f1e6",
                border: "1px solid #d5d9c8",
                borderRadius: 18,
                padding: "28px 26px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 0.8,
                  textTransform: "uppercase",
                  color: "#2c4a35",
                  fontFamily: MONO,
                  marginBottom: 10,
                }}
              >
                Primary Logo
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.55, color: "#3a3a36", marginBottom: 20 }}>
                Organica Living wordmark · WebP · transparent background ·
                lossless
              </div>
              <a
                href="/organica-living-logo.webp"
                download="organica-living-logo.webp"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  color: CREAM,
                  background: FOREST,
                  padding: "11px 22px",
                  borderRadius: 40,
                  textDecoration: "none",
                }}
              >
                Download logo
              </a>
            </div>

            {/* OG image download */}
            <div
              style={{
                background: "#f4f1e6",
                border: "1px solid #d5d9c8",
                borderRadius: 18,
                padding: "28px 26px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 0.8,
                  textTransform: "uppercase",
                  color: "#2c4a35",
                  fontFamily: MONO,
                  marginBottom: 10,
                }}
              >
                Social / OG Image
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.55, color: "#3a3a36", marginBottom: 20 }}>
                Brand open-graph image · PNG · 1200 × 630 px · suitable for
                social embeds
              </div>
              <a
                href="/og-image.png"
                download="organica-living-og-image.png"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  color: CREAM,
                  background: FOREST,
                  padding: "11px 22px",
                  borderRadius: 40,
                  textDecoration: "none",
                }}
              >
                Download OG image
              </a>
            </div>
          </div>

          <p
            style={{
              marginTop: 22,
              fontSize: 13,
              lineHeight: 1.6,
              color: "#8a8478",
              fontFamily: MONO,
              maxWidth: 580,
            }}
          >
            Assets provided for editorial use only. For high-resolution product
            photography or custom brand-kit requests, contact{" "}
            <a
              href="mailto:press@organicaliving.com"
              style={{ color: FOREST }}
            >
              press@organicaliving.com
            </a>
            .
          </p>
        </div>
      </section>

      {/* ── Closing Band ──────────────────────────────────────────── */}
      <ClosingBand
        title="Let&apos;s tell the story together."
        body="Whether you are writing about wellness, nutrition, or natural living, we are ready to help you get it right."
        cta={{ href: "mailto:press@organicaliving.com", label: "Email the press team" }}
      />
    </main>
  );
}
