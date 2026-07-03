import type { Metadata } from "next";
import Link from "next/link";
import {
  BrandHero,
  ProseSection,
  PillarGrid,
  ClosingBand,
} from "@/components/brand/BrandSections";
import { HONEST_WELLNESS } from "@/lib/brand-content";

export const metadata: Metadata = {
  title: "For Practitioners — Organica Living",
  description:
    "Organica Living's professional program for healthcare and wellness practitioners. Third-party tested, clinically-dosed vitamins and supplements — Halal, Vegan, Non-GMO, Made in USA cGMP.",
};

const PROGRAM_PILLARS = [
  {
    k: "01",
    t: "Professional pricing",
    d: "[[DEFAULT: wholesale/pro discount percentage and minimum order terms to be confirmed.]] Qualified practitioners receive preferred pricing on the full Organica Living range.",
  },
  {
    k: "02",
    t: "Referral support",
    d: "[[DEFAULT: referral tracking and client-link terms to be confirmed.]] Share a personal practitioner link with clients so they always find the right formula — and we handle fulfillment.",
  },
  {
    k: "03",
    t: "Clinical education",
    d: "Access our ingredient-science library, dosing rationale documents and Supplement Facts breakdowns for every SKU — the detail your clients ask for and your protocols demand.",
  },
  {
    k: "04",
    t: "Dedicated support",
    d: "A direct line to our practitioner team for formulation questions, batch-testing documentation requests and anything else that helps you recommend with confidence.",
  },
  {
    k: "05",
    t: "Transparent documentation",
    d: "Certificate of Analysis reports and third-party testing results are available on request for every active batch — so you can stand behind what you recommend.",
  },
  {
    k: "06",
    t: "Simple application",
    d: "[[DEFAULT: application review timeline and credential requirements to be confirmed.]] Email practitioners@organicaliving.com with your credentials to get started.",
  },
];

const PRACTITIONER_FAQ: Array<{ q: string; a: string }> = [
  {
    q: "Who qualifies for the practitioner program?",
    a: "The program is open to licensed healthcare and wellness professionals, including physicians, registered dietitians, naturopathic doctors, pharmacists, and certified health coaches. Email practitioners@organicaliving.com with your credentials to apply.",
  },
  {
    q: "Are batch-testing records and Certificates of Analysis available?",
    a: "Yes. We manufacture in an FDA-registered, cGMP-certified facility and third-party test every batch for purity, potency and label accuracy. Certificates of Analysis are available on request through your practitioner account.",
  },
  {
    q: "Are your products suitable for clients with dietary restrictions?",
    a: "Our full range is Halal Certified, 100% Vegan, Non-GMO Verified and Gluten-Free — making them appropriate for a wide range of dietary and cultural requirements. Individual Supplement Facts panels are listed on each product page.",
  },
  {
    q: "What doses are used in your formulas?",
    a: "We formulate at clinically-relevant doses — for example, 5000 IU of Vitamin D3 in Optimus D3 and a full 1000mg of Omega-3 in Omega 1000. Detailed Supplement Facts for every SKU are available on our product pages and in our practitioner documentation library.",
  },
  {
    q: "How long does the application review take?",
    a: "[[DEFAULT: application review timeline to be confirmed.]] Once we receive your email with credentials, our practitioner team will respond with next steps.",
  },
];

export default function PractitionersPage() {
  return (
    <main style={{ background: "#fcfcf7" }}>
      <BrandHero
        eyebrow="For Practitioners"
        title="Partner with a supplement line you can trust by name."
        subtitle="Clinically-dosed, third-party tested and certified to meet the standards your clients deserve. Join the Organica Living practitioner program."
        image="/images/science/science-hero.webp"
        alt="Laboratory setting with natural light — a clinical science workspace"
        cta={{ href: "mailto:practitioners@organicaliving.com", label: "Apply to the program" }}
      />

      <ProseSection eyebrow="Why Practitioners Choose Us" title="Standards your clients can count on.">
        <p>
          When you recommend a supplement, your name goes with it. That is why the
          practitioners who partner with Organica Living care about the same things we
          do: exact doses, honest labels and independent proof that what is printed on
          the panel is what is in the bottle.
        </p>
        <p>
          Every formula in our{" "}
          <Link href="/products" style={{ color: "#1c3a13", textDecoration: "underline" }}>
            range
          </Link>{" "}
          is manufactured in an FDA-registered, cGMP-certified facility in the USA and
          third-party tested for purity, potency and label accuracy — every batch, not
          just at launch. Our certifications cover{" "}
          <Link href="/science" style={{ color: "#1c3a13", textDecoration: "underline" }}>
            Halal, 100% Vegan, Non-GMO and Gluten-Free
          </Link>
          , so the formulas you recommend travel comfortably across dietary,
          cultural and lifestyle requirements.
        </p>
        <p>
          We dose at clinically-relevant levels — 5000 IU of Vitamin D3, a full
          1000mg of Omega-3 — because sub-threshold amounts do not serve your clients
          and they do not serve our reputation either. You will find the same
          transparency on every label that you would want to see in a peer-reviewed
          formulation brief.
        </p>
      </ProseSection>

      <PillarGrid
        eyebrow="The Practitioner Program"
        title="Built around how you actually work."
        lede="From preferred pricing to documentation on demand — the program is designed to make recommending Organica Living straightforward for your practice."
        pillars={PROGRAM_PILLARS}
      />

      {/* FAQ */}
      <section style={{ background: "#eef0e6" }}>
        <div
          data-rcol2
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "84px 40px",
            display: "grid",
            gridTemplateColumns: "0.85fr 1.15fr",
            gap: "48px",
            alignItems: "start",
          }}
        >
          <div>
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
                fontFamily: "var(--font-mono)",
                marginBottom: 16,
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2c4a35" }} />
              Practitioner FAQ
            </div>
            <h2
              style={{
                fontSize: "clamp(26px,3vw,38px)",
                fontWeight: 300,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: "#1a1a1a",
              }}
            >
              Questions we hear from clinicians.
            </h2>
            <p style={{ marginTop: 14, fontSize: 15, lineHeight: 1.6, color: "#3a3a36" }}>
              Still have questions? Email{" "}
              <a
                href="mailto:practitioners@organicaliving.com"
                style={{ color: "#1c3a13", textDecoration: "underline" }}
              >
                practitioners@organicaliving.com
              </a>{" "}
              and our team will respond directly.
            </p>
          </div>

          <div data-faq>
            {PRACTITIONER_FAQ.map((item) => (
              <details key={item.q} style={{ borderBottom: "1px solid #d5d9c8" }}>
                <summary
                  style={{
                    listStyle: "none",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "16px",
                    alignItems: "center",
                    padding: "20px 0",
                    fontSize: "15px",
                    color: "#1a1a1a",
                  }}
                >
                  {item.q}
                  <span style={{ color: "#6d6d6d", fontSize: "18px", flexShrink: 0 }}>+</span>
                </summary>
                <div
                  style={{
                    padding: "0 0 20px",
                    fontSize: "14px",
                    lineHeight: 1.6,
                    color: "#3a3a36",
                  }}
                >
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ClosingBand
        title="Ready to partner with Organica Living?"
        body="Apply to the practitioner program and get access to preferred pricing, documentation and a team that takes your clinical questions seriously."
        note={`These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. ${HONEST_WELLNESS}`}
        cta={{ href: "mailto:practitioners@organicaliving.com", label: "Apply now" }}
      />
    </main>
  );
}
