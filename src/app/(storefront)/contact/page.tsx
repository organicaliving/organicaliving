import type { Metadata } from "next";
import { Eyebrow } from "@/components/brand/BrandSections";
import { PROVENANCE } from "@/lib/brand-content";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — Organica Living",
  description:
    "Get in touch with Organica Living — send us a message, or reach partnerships, practitioners, press and customer care from our home in Atlanta, GA.",
};

const CHANNELS: { t: string; d: string; email: string }[] = [
  { t: "Customer Care", d: "Questions about an order, a formula or a subscription.", email: "hello@organicaliving.com" },
  { t: "Partnerships", d: "Retail, wholesale and brand collaborations.", email: "partners@organicaliving.com" },
  { t: "Practitioners", d: "Clinical and healthcare professional enquiries.", email: "practitioners@organicaliving.com" },
  { t: "Press", d: "Media requests, assets and interviews.", email: "press@organicaliving.com" },
];

const INK = "#1a1a1a";
const MONO = "var(--font-mono)";
// Keyless Google Maps embed centered on our Atlanta, GA home (no API key needed).
const MAP_SRC = "https://www.google.com/maps?q=Atlanta,+GA,+United+States&z=11&output=embed";

export default function ContactPage() {
  return (
    <main style={{ background: "#fcfcf7" }}>
      {/* Intro */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "72px 40px 40px" }}>
        <div data-reveal style={{ maxWidth: 620 }}>
          <Eyebrow>Contact</Eyebrow>
          <h1
            style={{
              fontSize: "clamp(34px,4vw,52px)",
              fontWeight: 300,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              color: INK,
              marginTop: 16,
            }}
          >
            We would love to hear from you.
          </h1>
          <p style={{ marginTop: 16, fontSize: 19, lineHeight: 1.6, color: "#5e5e5e", maxWidth: 520 }}>
            Send us a message and the right team will get back to you — or reach out directly using the
            details below.
          </p>
        </div>
      </section>

      {/* Form + Map */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px 56px" }}>
        <div
          data-rcol2
          style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 40, alignItems: "stretch" }}
        >
          {/* Form card */}
          <div data-reveal style={{ background: "#f4f1e6", borderRadius: 20, padding: "34px 32px" }}>
            <h2 style={{ fontSize: "clamp(22px,2.4vw,30px)", fontWeight: 300, letterSpacing: "-0.02em", color: INK, marginBottom: 22 }}>
              Send us a message.
            </h2>
            <ContactForm />
          </div>

          {/* Map + location */}
          <div data-reveal style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                position: "relative",
                flex: 1,
                minHeight: 320,
                borderRadius: 20,
                overflow: "hidden",
                border: "1px solid #d5d9c8",
                background: "#e7e1d2",
              }}
            >
              <iframe
                title="Organica Living — Atlanta, GA"
                src={MAP_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
              />
            </div>
            <div style={{ background: "#1c3a13", color: "#fcfcf7", borderRadius: 20, padding: "24px 26px" }}>
              <Eyebrow color="#8fd06a">Head Office</Eyebrow>
              <div style={{ fontSize: 20, fontWeight: 400, marginTop: 12 }}>{PROVENANCE.company}</div>
              <p style={{ marginTop: 6, fontSize: 16, lineHeight: 1.6, color: "#b9c7b5" }}>
                {PROVENANCE.city}
                <br />
                {PROVENANCE.country}
                <br />
                <a href={`https://${PROVENANCE.url}`} style={{ color: "#cdd6c2", textDecoration: "underline" }}>
                  {PROVENANCE.url}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct email channels */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px 56px" }}>
        <h2 style={{ fontSize: "clamp(20px,2.2vw,28px)", fontWeight: 300, letterSpacing: "-0.02em", color: INK, marginBottom: 22 }}>
          Prefer to email a specific team?
        </h2>
        <div data-rgrid6 style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {CHANNELS.map((c) => (
            <div key={c.t} style={{ background: "#f4f1e6", borderRadius: 18, padding: "28px 24px" }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: INK }}>{c.t}</h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.55, color: "#5e5e5e", marginTop: 10 }}>{c.d}</p>
              <a
                href={`mailto:${c.email}`}
                style={{ display: "inline-block", marginTop: 14, fontSize: 14, fontWeight: 500, color: "#1c3a13", textDecoration: "underline", overflowWrap: "anywhere", wordBreak: "break-word" }}
              >
                {c.email}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Provenance band */}
      <section style={{ background: "#1c3a13", color: "#fcfcf7" }}>
        <div
          data-rcol2
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "56px 40px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            alignItems: "center",
          }}
        >
          <div data-reveal style={{ fontSize: 18, lineHeight: 1.6, color: "#b9c7b5", maxWidth: 460 }}>
            Pioneering nutritional science for human and planetary health, from our home in {PROVENANCE.city}.
          </div>
          <div data-reveal style={{ fontFamily: MONO, fontSize: 13, lineHeight: 1.8, color: "#9db38f" }}>
            <div>Proudly made in America</div>
            <div>{PROVENANCE.facility}</div>
            <div>Third-party tested, every batch</div>
          </div>
        </div>
      </section>
    </main>
  );
}
