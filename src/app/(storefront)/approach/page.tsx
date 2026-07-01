import type { Metadata } from "next";
import Link from "next/link";
import {
  BrandHero,
  ProseSection,
  ProcessOverview,
  CrossLinks,
  FeatureSplit,
  ClosingBand,
} from "@/components/brand/BrandSections";
import { APPROACH_JOURNEY, HONEST_WELLNESS } from "@/lib/brand-content";

export const metadata: Metadata = {
  title: "Our Approach — Organica Living",
  description:
    "From sourcing to your daily ritual — how Organica Living builds a supplement, end to end: need-first doses, synergy, format engineering and third-party testing.",
};

export default function ApproachPage() {
  return (
    <main style={{ background: "#fcfcf7" }}>
      <BrandHero
        eyebrow="Our Approach"
        title="From nature to your daily ritual."
        subtitle="A supplement is only as good as the thinking behind it. Here is how we build every Organica Living formula — from the first dose decision to the bottle on your shelf."
        image="/images/approach/approach-hero.webp"
        alt="Hands cradling soil and a young green seedling"
        cta={{ href: "/products", label: "Shop the range" }}
      />

      <ProseSection eyebrow="The Philosophy" title="Need first, never noise.">
        <p>
          Most supplements are built backwards — a long ingredient list designed to
          look impressive on a label, at doses too small to matter. We start from the
          opposite end: what does the body actually need, and how much does the
          research say it takes to make a difference?
        </p>
        <p>
          That principle runs through all nine formulas. It is why{" "}
          <Link href="/products/optimus-d3" style={{ color: "#1c3a13", textDecoration: "underline" }}>
            Optimus D3
          </Link>{" "}
          carries a clinical 5000 IU, why{" "}
          <Link href="/products/omega-1000" style={{ color: "#1c3a13", textDecoration: "underline" }}>
            Omega 1000
          </Link>{" "}
          delivers a full gram of Omega-3, and why we would rather include fewer
          nutrients done properly than a token sprinkle of many.
        </p>
      </ProseSection>

      <ProcessOverview
        eyebrow="End to End"
        title="Five steps, every single formula."
        lede="From the first dose decision to the doorstep, nothing skips a stage."
        steps={APPROACH_JOURNEY}
      />

      <FeatureSplit
        eyebrow="Formulated for Synergy"
        title="Nutrients that work together."
        body="Vitamins and minerals do not act alone. We pair calcium with the D3 and K2 that direct it to your bones, iron with the vitamin C that helps you absorb it, and blend actives in the ratios the science supports — so a formula is more than the sum of its ingredients."
        image="/images/approach/approach-journey.webp"
        alt="Natural whole-food ingredients arranged on a work surface"
      />

      <CrossLinks
        eyebrow="Go Deeper"
        title="The thinking behind the thinking."
        links={[
          { title: "Our Science", sub: "The standard, the validation and the certifications behind every batch.", href: "/science" },
          { title: "Organica Living Labs", sub: "How formulas are researched, prototyped and proven in R&D.", href: "/labs" },
          { title: "Sustainability", sub: "Plant-based, gelatin-free and ethically sourced, by default.", href: "/sustainability" },
        ]}
      />

      <ClosingBand
        title="A better supplement, by design."
        body="Every decision — dose, blend, format, test — is made in service of one thing: nutrition you can genuinely feel good about taking every day."
        note={`${HONEST_WELLNESS} These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.`}
        cta={{ href: "/products", label: "Explore the range" }}
      />
    </main>
  );
}
