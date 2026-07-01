import type { Metadata } from "next";
import {
  BrandHero,
  ProcessOverview,
  FeatureSplit,
  MethodList,
  CertWall,
  ClosingBand,
} from "@/components/brand/BrandSections";
import {
  STANDARD_PILLARS,
  VALIDATION_METHODS,
  CERTIFICATIONS,
  FORMAT_INNOVATIONS,
  HONEST_WELLNESS,
} from "@/lib/brand-content";

export const metadata: Metadata = {
  title: "Our Science — Organica Living",
  description:
    "Clinically-dosed, precision-blended, built to absorb and third-party tested — the science behind every Organica Living serving.",
};

export default function SciencePage() {
  return (
    <main style={{ background: "#fcfcf7" }}>
      <BrandHero
        eyebrow="Our Science"
        title="The science behind every serving."
        subtitle="We start with the nutrients your body actually needs, then formulate them the way the research says they work best — nothing added to pad the label."
        image="/images/science/science-hero.webp"
        alt="Green plant cuttings propagating in laboratory glass vials"
        cta={{ href: "/products", label: "Shop the range" }}
      />

      <ProcessOverview
        eyebrow="Our Standard"
        title="Four principles behind every formula."
        lede="From dose to delivery to the final third-party test, the same standard runs through all nine formulas."
        steps={STANDARD_PILLARS}
      />

      <FeatureSplit
        eyebrow="Formulation"
        title="Precision-blended, not padded."
        body="Multi Pro alone carries 31 essential nutrients, and every formula is enhanced with the extras most brands leave out — Omega-3, CoQ10, Lutein and Lycopene. We blend actives with the co-factors that help them work, so each nutrient supports the others rather than competing with them."
        image="/images/science/science-formulation.webp"
        alt="Macro view of vitamin capsules and supplement actives"
        items={FORMAT_INNOVATIONS.slice(0, 3)}
      />

      <MethodList
        eyebrow="Validation"
        title="Tested three ways, every batch."
        methods={VALIDATION_METHODS}
      />

      <CertWall
        eyebrow="Quality & Compliance"
        title="Certified at every step."
        certs={CERTIFICATIONS}
      />

      <ClosingBand
        title="Nutrition you can take on trust."
        body="Made in an FDA-registered, cGMP-certified facility in the USA, then third-party tested for purity, potency and label accuracy before it reaches you."
        note={`${HONEST_WELLNESS} These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.`}
        cta={{ href: "/products", label: "Explore the range" }}
      />
    </main>
  );
}
