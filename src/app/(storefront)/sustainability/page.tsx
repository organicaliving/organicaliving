import type { Metadata } from "next";
import {
  BrandHero,
  FeatureSplit,
  PillarGrid,
  ClosingBand,
} from "@/components/brand/BrandSections";
import { SOURCING_PILLARS, HONEST_WELLNESS, PROVENANCE } from "@/lib/brand-content";

export const metadata: Metadata = {
  title: "Sustainability — Organica Living",
  description:
    "Plant-based, gelatin-free, non-GMO and ethically sourced — how Organica Living formulates for human and planetary health.",
};

export default function SustainabilityPage() {
  return (
    <main style={{ background: "#fcfcf7" }}>
      <BrandHero
        eyebrow="Sustainability"
        title="Nature is our thing."
        subtitle="We pioneer nutritional science for human and planetary health — clean, plant-based formulas made with respect for where their ingredients come from."
        image="/images/sustainability/sustainability-hero.webp"
        alt="Aerial view of a dense green forest canopy"
        cta={{ href: "/products", label: "Shop the range" }}
      />

      <FeatureSplit
        eyebrow={`Since ${PROVENANCE.since}`}
        title="Good for you, and for the planet."
        body="From our home in Atlanta, Georgia, we have spent years formulating supplements that are good for you and gentler on the planet — vegan by default, gelatin-free across every format, and coloured with real fruit and vegetable concentrates instead of synthetic dyes."
        image="/images/sustainability/sustainability-plants.webp"
        alt="Fresh green botanical leaves"
      />

      <PillarGrid
        eyebrow="Our Commitments"
        title="Six ways we keep formulas clean."
        lede="The same values run through every capsule, softgel and gummy we make."
        pillars={SOURCING_PILLARS}
      />

      <FeatureSplit
        eyebrow="Ethical Sourcing"
        title="Marine Omega-3, sourced responsibly."
        body="Our Omega 1000 uses only Halal-permitted fish with scales — salmon, sardines, anchovies and mackerel — strictly excluding shellfish and bottom-feeders. It is a cleaner catch and a cleaner conscience, lemon-infused so a daily dose never tastes like a compromise."
        image="/images/sustainability/sustainability-ocean.webp"
        alt="Clear ocean water lit by sunlight"
        flip
        background="#eef0e6"
      />

      <ClosingBand
        title="Small habits, lasting good."
        body="One considered daily supplement, made in a facility held to FDA, cGMP, ISO and HACCP standards — because doing right by you and the planet is the same job."
        note={`${HONEST_WELLNESS} These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.`}
        cta={{ href: "/products", label: "Explore the range" }}
      />
    </main>
  );
}
