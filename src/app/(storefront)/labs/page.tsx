import type { Metadata } from "next";
import {
  BrandHero,
  ProcessOverview,
  FeatureSplit,
  ClosingBand,
} from "@/components/brand/BrandSections";
import {
  RND_STEPS,
  FORMAT_INNOVATIONS,
  INGREDIENT_SCIENCE,
  HONEST_WELLNESS,
} from "@/lib/brand-content";

export const metadata: Metadata = {
  title: "Organica Living Labs — R+D",
  description:
    "Where every Organica Living formula begins — research, formulation, prototyping, validation and scale, all under one roof.",
};

export default function LabsPage() {
  return (
    <main style={{ background: "#fcfcf7" }}>
      <BrandHero
        eyebrow="Organica Living Labs [ R + D ]"
        title="Where every formula begins."
        subtitle="Pioneering nutritional science for human and planetary health — from the first research question to the last batch test."
        image="/images/labs/labs-hero.webp"
        alt="Researcher examining a sample under a laboratory microscope"
        cta={{ href: "/products", label: "See the results" }}
      />

      <ProcessOverview
        eyebrow="The Pipeline"
        title="Five steps from question to bottle."
        lede="Nothing reaches your shelf until it has run the full length of our R&D pipeline."
        steps={RND_STEPS}
      />

      <FeatureSplit
        eyebrow="Format Engineering"
        title="Making hard-to-take nutrients easy."
        body="Some of the most valuable nutrients are the hardest to swallow — literally. So we engineer the delivery, not just the dose."
        image="/images/labs/labs-formulate.webp"
        alt="Natural supplement powder and ingredients in a bowl"
        items={FORMAT_INNOVATIONS}
      />

      <FeatureSplit
        eyebrow="Ingredient Science"
        title="The actives that set a formula apart."
        body="We reach past commodity ingredients for the body-ready forms and botanical actives that make a measurable difference."
        image="/images/labs/labs-ingredients.webp"
        alt="Fresh berries and botanical ingredients arranged as a flatlay"
        items={INGREDIENT_SCIENCE}
        flip
        background="#eef0e6"
      />

      <ClosingBand
        title="Formulated with care — worldwide."
        body="Every innovation is validated by third-party testing and produced in our FDA-registered, cGMP-certified facility, so what we learn in the lab is exactly what lands in your hand."
        note={`${HONEST_WELLNESS} These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.`}
        cta={{ href: "/products", label: "Explore the range" }}
      />
    </main>
  );
}
