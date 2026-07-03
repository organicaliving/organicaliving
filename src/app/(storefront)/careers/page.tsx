import type { Metadata } from "next";
import Link from "next/link";
import {
  BrandHero,
  ProseSection,
  PillarGrid,
  ClosingBand,
} from "@/components/brand/BrandSections";
import { PROVENANCE, HONEST_WELLNESS } from "@/lib/brand-content";

export const metadata: Metadata = {
  title: "Careers — Organica Living",
  description:
    "Join the team at Organica Living. We build honest, clinically-dosed vitamins and supplements — Made in USA, third-party tested, and rooted in the belief that nature is our thing.",
};

const CULTURE_PILLARS = [
  {
    k: "01",
    t: "Honest work",
    d: "We put what we say we put in every bottle. The same standard applies to how we operate as a team — clear expectations, candid feedback and credit where it is due.",
  },
  {
    k: "02",
    t: "Nature-first thinking",
    d: "Our formulation philosophy starts with what the body needs. We bring that same evidence-first, back-to-basics mindset to every business decision we make.",
  },
  {
    k: "03",
    t: "Quality over volume",
    d: "Nine well-made, clinically-dosed formulas, not a catalogue of compromises. We move deliberately, build carefully and would rather do fewer things well.",
  },
  {
    k: "04",
    t: "Craft at every level",
    d: "From the enteric coating on a softgel to the copy on a label, the people here care about the details — and they are given the space to get them right.",
  },
  {
    k: "05",
    t: "Wellness that includes you",
    d: "We believe the people who make wellness products should be well — and our benefits are designed with that in mind: comprehensive health, dental and vision coverage, paid parental leave, generous paid time off, and a remote/flexible-work and wellness stipend.",
  },
  {
    k: "06",
    t: "Room to grow",
    d: "Organica Living is still building, and the people who join now help shape what it becomes. We support your growth with an annual learning-and-development budget and clear, merit-based advancement.",
  },
];

export default function CareersPage() {
  return (
    <main style={{ background: "#fcfcf7" }}>
      <BrandHero
        eyebrow="Join Us"
        title="Build something you can actually believe in."
        subtitle={`Work alongside a team that takes vitamins seriously — based in ${PROVENANCE.city}, making supplements that are clinically-dosed, third-party tested and honestly labeled.`}
        image="/images/sustainability/sustainability-hero.webp"
        alt="Sunlit green landscape representing natural, plant-based origins"
        cta={{ href: "mailto:careers@organicaliving.com", label: "Introduce yourself" }}
      />

      <ProseSection eyebrow="Our Culture" title="The kind of place we are trying to build.">
        <p>
          Organica Living started with a simple conviction: people deserve supplements that
          do what the label says. Every formula we make is clinically-dosed, independently
          tested and manufactured in our{" "}
          <Link href="/science" style={{ color: "#1c3a13", textDecoration: "underline" }}>
            FDA-registered, cGMP-certified facility
          </Link>{" "}
          in the USA — because the bar for &ldquo;good enough&rdquo; in nutrition should be high.
        </p>
        <p>
          Working here means caring about those standards. It means writing honest copy,
          asking whether a dose actually matters and noticing when something could be
          better. The team is small enough that each person&apos;s contribution is visible,
          and deliberate enough that quality does not get traded for speed.
        </p>
        <p>
          We are rooted in{" "}
          <Link href="/approach" style={{ color: "#1c3a13", textDecoration: "underline" }}>
            {PROVENANCE.city}
          </Link>{" "}
          and proud of it. If you believe in what we believe in — that nature is our
          thing, that honesty is a feature and that a great supplement starts long before
          the bottle — we would like to hear from you.
        </p>
      </ProseSection>

      <PillarGrid
        eyebrow="Culture & Benefits"
        title="What working here looks like."
        lede="The values we put on our labels are the same ones we try to live by as a team — here is what that means in practice."
        pillars={CULTURE_PILLARS}
      />

      {/* Open Roles — honest empty-state */}
      <section style={{ background: "#eef0e6" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "84px 40px" }}>
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
            Open Roles
          </div>
          <h2
            style={{
              fontSize: "clamp(26px,3vw,38px)",
              fontWeight: 300,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "#1a1a1a",
              maxWidth: 600,
            }}
          >
            No open roles right now.
          </h2>
          <p
            style={{
              marginTop: 18,
              fontSize: 18,
              lineHeight: 1.65,
              color: "#3a3a36",
              maxWidth: 560,
            }}
          >
            We do not have any listed positions at the moment, but we are always
            interested in people who care about what we care about. Introduce yourself at{" "}
            <a
              href="mailto:careers@organicaliving.com"
              style={{ color: "#1c3a13", textDecoration: "underline" }}
            >
              careers@organicaliving.com
            </a>{" "}
            — tell us who you are, what you do and why Organica Living. We will keep
            you in mind when something opens up.
          </p>
        </div>
      </section>

      {/* Recruitment-fraud notice */}
      <section style={{ background: "#fcfcf7" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "40px 40px 64px" }}>
          <div
            style={{
              maxWidth: 720,
              background: "#f4f1e6",
              borderRadius: 14,
              padding: "24px 28px",
              border: "1px solid #d5d9c8",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: "#2c4a35",
                fontFamily: "var(--font-mono)",
                marginBottom: 10,
              }}
            >
              A note on recruitment fraud
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: "#3a3a36", margin: 0 }}>
              Organica Living will never ask candidates for payment, bank details or
              personal financial information at any stage of the hiring process. All
              official communication comes from an <strong>@organicaliving.com</strong>{" "}
              email address. If you receive a message that does not match this, please
              do not respond — report it to{" "}
              <a
                href="mailto:careers@organicaliving.com"
                style={{ color: "#1c3a13", textDecoration: "underline" }}
              >
                careers@organicaliving.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <ClosingBand
        title="Nature is our thing — and people are too."
        body="If you want to build something honest, effective and genuinely good for the people who use it, we would love to hear from you."
        note={HONEST_WELLNESS}
        cta={{ href: "mailto:careers@organicaliving.com", label: "Get in touch" }}
      />
    </main>
  );
}
