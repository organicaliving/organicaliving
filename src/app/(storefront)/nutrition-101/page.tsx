import type { Metadata } from "next";
import Link from "next/link";
import {
  BrandHero,
  ProseSection,
  PillarGrid,
  FeatureSplit,
  ReferencesList,
  ClosingBand,
  ExtLink,
} from "@/components/brand/BrandSections";
import { HONEST_WELLNESS } from "@/lib/brand-content";

export const metadata: Metadata = {
  title: "Nutrition 101 — Organica Living",
  description:
    "The building blocks of everyday health — macronutrients, micronutrients, the nutrient gap and how supplements fit a balanced diet. Backed by cited sources.",
};

const linkStyle = { color: "#1c3a13", textDecoration: "underline" } as const;

const MACROS = [
  {
    k: "01",
    t: "Protein",
    d: "Builds and repairs muscle, skin and enzymes. Found in beans, lentils, soy, eggs, fish and lean meats.",
  },
  {
    k: "02",
    t: "Carbohydrates",
    d: "Your body's main energy source. Whole grains, fruit, vegetables and legumes deliver carbs with fibre.",
  },
  {
    k: "03",
    t: "Fats",
    d: "Essential for hormones, brain health and absorbing fat-soluble vitamins — especially Omega-3 fatty acids.",
  },
];

const REFS = [
  { label: "World Health Organization — Healthy diet (fact sheet)", href: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet" },
  { label: "NIH Office of Dietary Supplements — Multivitamin/Mineral Supplements", href: "https://ods.od.nih.gov/factsheets/MVMS-Consumer/" },
  { label: "NIH Office of Dietary Supplements — Omega-3 Fatty Acids", href: "https://ods.od.nih.gov/factsheets/Omega3FattyAcids-Consumer/" },
  { label: "American Heart Association — Fish and Omega-3 Fatty Acids", href: "https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/fats/fish-and-omega-3-fatty-acids" },
  { label: "NIH Office of Dietary Supplements — Nutrient fact sheets (browse all)", href: "https://ods.od.nih.gov/factsheets/list-all/" },
];

export default function Nutrition101Page() {
  return (
    <main style={{ background: "#fcfcf7" }}>
      <BrandHero
        eyebrow="Nutrition 101"
        title="The building blocks of everyday health."
        subtitle="A plain-language guide to what your body needs to run well — and where a considered supplement can help fill the gaps."
        image="/images/nutrition-101/nutrition-hero.webp"
        alt="A colourful spread of fresh fruit and vegetables"
        cta={{ href: "/products", label: "Shop the range" }}
      />

      <ProseSection eyebrow="The Basics" title="Macronutrients and micronutrients.">
        <p>
          Everything you eat breaks down into two groups. <strong>Macronutrients</strong> —
          protein, carbohydrates and fats — provide energy and structure, and you need them
          in relatively large amounts. <strong>Micronutrients</strong> — vitamins and minerals —
          are needed in far smaller amounts, but they are just as essential: they power the
          thousands of reactions that keep you healthy.
        </p>
        <p>
          A varied, mostly-plant diet is the best foundation for both. The{" "}
          <ExtLink href="https://www.who.int/news-room/fact-sheets/detail/healthy-diet">
            World Health Organization
          </ExtLink>{" "}
          recommends plenty of vegetables, fruit, legumes and whole grains, with limited added
          sugar, salt and saturated fat. Supplements are exactly that — supplemental —{" "}
          <Link href="/approach" style={linkStyle}>
            they support a good diet
          </Link>
          , they do not replace it.
        </p>
      </ProseSection>

      <PillarGrid
        eyebrow="Macronutrients"
        title="The three that fuel you."
        lede="Each plays a distinct role — the goal is balance, not cutting any one out."
        pillars={MACROS}
      />

      <ProseSection eyebrow="The Nutrient Gap" title="Why even good diets fall short." background="#eef0e6">
        <p>
          Modern diets, busy schedules and depleted soils mean many people miss the mark on
          certain nutrients even when they eat well. According to the{" "}
          <ExtLink href="https://ods.od.nih.gov/factsheets/MVMS-Consumer/">
            NIH Office of Dietary Supplements
          </ExtLink>
          , multivitamin/mineral products are among the most common ways people bridge that gap
          — helping cover shortfalls in nutrients like vitamin D, and certain B vitamins and minerals.
        </p>
        <p>
          That is the thinking behind{" "}
          <Link href="/products/multi-pro" style={linkStyle}>
            Multi Pro
          </Link>
          , our 31-nutrient daily multivitamin, and why we dose to{" "}
          <Link href="/science" style={linkStyle}>
            clinically-meaningful amounts
          </Link>{" "}
          rather than token ones. For a nutrient-by-nutrient breakdown, see our{" "}
          <Link href="/vitamins-101" style={linkStyle}>
            Vitamins 101
          </Link>{" "}
          guide.
        </p>
      </ProseSection>

      <FeatureSplit
        eyebrow="Healthy Fats"
        title="Not all fat is created equal."
        body="Omega-3 fatty acids (EPA and DHA) are essential fats your body cannot make on its own. The American Heart Association recommends eating fish rich in them regularly to support heart and brain health — and when diet falls short, a high-purity fish-oil supplement can help top up the difference."
        image="/images/nutrition-101/nutrition-plate.webp"
        alt="A balanced meal bowl with fish, grains and greens"
      />

      <ProseSection eyebrow="The Whole Picture" title="Food first, then fill the gaps.">
        <p>
          Hydration, sleep and movement matter as much as what is on your plate. No pill
          replaces the fibre, phytonutrients and satisfaction of real food — which is why every
          Organica Living label carries the same honest reminder:
        </p>
        <p style={{ fontStyle: "italic", color: "#1c3a13" }}>&ldquo;{HONEST_WELLNESS}&rdquo;</p>
        <p>
          Used well, a supplement is a small, reliable daily habit that closes the gaps a busy
          life leaves open. Curious how we make ours?{" "}
          <Link href="/approach" style={linkStyle}>
            See our approach
          </Link>
          .
        </p>
      </ProseSection>

      <ReferencesList refs={REFS} />

      <ClosingBand
        title="Nutrition made simple."
        body="Start with a balanced plate, then let a clinically-dosed daily supplement do the topping-up."
        note="These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease."
        cta={{ href: "/products", label: "Explore the range" }}
      />
    </main>
  );
}
