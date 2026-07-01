import type { Metadata } from "next";
import Link from "next/link";
import {
  BrandHero,
  ProseSection,
  FeatureSplit,
  ReferencesList,
  ClosingBand,
  ExtLink,
} from "@/components/brand/BrandSections";
import { HONEST_WELLNESS } from "@/lib/brand-content";

export const metadata: Metadata = {
  title: "Vitamins 101 — Organica Living",
  description:
    "How key vitamins and minerals shape your health — fat- vs water-soluble, what each nutrient does, food sources and when to supplement. Backed by cited NIH sources.",
};

const linkStyle = { color: "#1c3a13", textDecoration: "underline" } as const;

/** Nutrient rundown: role + a cited NIH source + the Organica product it anchors. */
const NUTRIENTS: {
  name: string;
  role: string;
  href: string; // NIH / authoritative source
  product?: { label: string; slug: string };
}[] = [
  { name: "Vitamin D3", role: "supports bones, immunity and calcium absorption; hard to get from food alone.", href: "https://ods.od.nih.gov/factsheets/VitaminD-Consumer/", product: { label: "Optimus D3", slug: "optimus-d3" } },
  { name: "Vitamin C", role: "an antioxidant that supports immunity and collagen formation.", href: "https://ods.od.nih.gov/factsheets/VitaminC-Consumer/", product: { label: "Vision Pro", slug: "vision-pro" } },
  { name: "Folate (B9) & B12", role: "vital for red blood cells and — during pregnancy — healthy neural development.", href: "https://ods.od.nih.gov/factsheets/Folate-Consumer/", product: { label: "Bloom", slug: "bloom" } },
  { name: "Magnesium", role: "involved in muscle and nerve function, energy and restful sleep.", href: "https://ods.od.nih.gov/factsheets/Magnesium-Consumer/", product: { label: "Sleep Pro+", slug: "sleep-pro" } },
  { name: "Zinc", role: "supports immune function, skin and normal metabolism.", href: "https://ods.od.nih.gov/factsheets/Zinc-Consumer/", product: { label: "Multi Pro", slug: "multi-pro" } },
  { name: "Biotin", role: "a B vitamin involved in keratin production for hair, skin and nails.", href: "https://ods.od.nih.gov/factsheets/Biotin-Consumer/", product: { label: "Glow Pro", slug: "glow-pro" } },
  { name: "Iron", role: "carries oxygen in the blood; needs rise notably during pregnancy.", href: "https://ods.od.nih.gov/factsheets/Iron-Consumer/", product: { label: "Bloom", slug: "bloom" } },
  { name: "Omega-3 (EPA & DHA)", role: "essential fats — not vitamins — that support heart, brain and eye health.", href: "https://ods.od.nih.gov/factsheets/Omega3FattyAcids-Consumer/", product: { label: "Omega 1000", slug: "omega-1000" } },
];

const REFS = [
  { label: "NIH Office of Dietary Supplements — Nutrient fact sheets (browse all)", href: "https://ods.od.nih.gov/factsheets/list-all/" },
  { label: "NIH ODS — Vitamin A (a fat-soluble vitamin)", href: "https://ods.od.nih.gov/factsheets/VitaminA-Consumer/" },
  { label: "NIH ODS — Vitamin C (a water-soluble vitamin)", href: "https://ods.od.nih.gov/factsheets/VitaminC-Consumer/" },
  { label: "NIH ODS — Vitamin D", href: "https://ods.od.nih.gov/factsheets/VitaminD-Consumer/" },
  { label: "NIH ODS — Vitamin B12", href: "https://ods.od.nih.gov/factsheets/VitaminB12-Consumer/" },
  { label: "NIH ODS — Multivitamin/Mineral Supplements", href: "https://ods.od.nih.gov/factsheets/MVMS-Consumer/" },
  { label: "National Eye Institute — AREDS/AREDS2 (lutein & zeaxanthin)", href: "https://www.nei.nih.gov/research/clinical-trials/age-related-eye-disease-studies-aredsareds2" },
  { label: "NIH NCCIH — Melatonin: What You Need To Know", href: "https://www.nccih.nih.gov/health/melatonin-what-you-need-to-know" },
];

export default function Vitamins101Page() {
  return (
    <main style={{ background: "#fcfcf7" }}>
      <BrandHero
        eyebrow="Vitamins 101"
        title="How key vitamins and minerals shape your health."
        subtitle="A friendly guide to what these micronutrients actually do, where to find them, and when a supplement makes sense."
        image="/images/vitamins-101/vitamins-hero.webp"
        alt="Sliced citrus fruit rich in vitamin C"
        cta={{ href: "/products", label: "Shop the range" }}
      />

      <ProseSection eyebrow="The Basics" title="Fat-soluble vs water-soluble.">
        <p>
          Vitamins fall into two families. <strong>Fat-soluble</strong> vitamins — A, D, E and K —
          are stored in the body&rsquo;s fat and absorbed best alongside a meal;{" "}
          <ExtLink href="https://ods.od.nih.gov/factsheets/VitaminD-Consumer/">vitamin D</ExtLink>{" "}
          is the classic example. <strong>Water-soluble</strong> vitamins — the B-complex and{" "}
          <ExtLink href="https://ods.od.nih.gov/factsheets/VitaminC-Consumer/">vitamin C</ExtLink>{" "}
          — are not stored in large amounts, so they are needed more regularly.
        </p>
        <p>
          Minerals such as magnesium, zinc, iron and calcium are a separate group, but they matter
          just as much. You can browse the full, evidence-based library of nutrient fact sheets at the{" "}
          <ExtLink href="https://ods.od.nih.gov/factsheets/list-all/">
            NIH Office of Dietary Supplements
          </ExtLink>
          .
        </p>
      </ProseSection>

      <ProseSection eyebrow="The Rundown" title="Key nutrients, and what they do." background="#eef0e6">
        <p>
          Here are some of the nutrients we build our formulas around — each with a trusted source
          to read further, and the Organica Living product where it takes centre stage.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 4 }}>
          {NUTRIENTS.map((n) => (
            <p key={n.name} style={{ margin: 0 }}>
              <strong style={{ color: "#1a1a1a" }}>{n.name}</strong> — {n.role}{" "}
              <ExtLink href={n.href}>Learn more</ExtLink>
              {n.product ? (
                <>
                  {" · "}
                  <Link href={`/products/${n.product.slug}`} style={linkStyle}>
                    {n.product.label}
                  </Link>
                </>
              ) : null}
            </p>
          ))}
        </div>
      </ProseSection>

      <FeatureSplit
        eyebrow="Food & Sunshine First"
        title="Where vitamins come from."
        body="A varied diet delivers most of what you need — citrus and peppers for vitamin C, leafy greens for folate, oily fish for Omega-3, nuts and seeds for magnesium. Vitamin D is the notable exception: your skin makes it from sunlight, which is why so many people fall short in darker months and choose to supplement."
        image="/images/vitamins-101/vitamins-foods.webp"
        alt="Leafy greens, nuts and seeds rich in vitamins and minerals"
      />

      <ProseSection eyebrow="When To Supplement" title="Helpful, in the right doses.">
        <p>
          Supplements shine when diet, lifestyle or life stage leaves a gap — vitamin D in winter,
          folate and iron in pregnancy, B12 on a plant-based diet. The{" "}
          <ExtLink href="https://ods.od.nih.gov/factsheets/MVMS-Consumer/">NIH Office of Dietary Supplements</ExtLink>{" "}
          notes that a daily multivitamin/mineral can help cover common shortfalls. What matters is the
          dose: we formulate to{" "}
          <Link href="/science" style={linkStyle}>
            clinically-meaningful amounts
          </Link>
          , third-party tested for accuracy.
        </p>
        <p style={{ fontStyle: "italic", color: "#1c3a13" }}>&ldquo;{HONEST_WELLNESS}&rdquo;</p>
        <p>
          New to all this? Start with our{" "}
          <Link href="/nutrition-101" style={linkStyle}>
            Nutrition 101
          </Link>{" "}
          guide for the bigger picture.
        </p>
      </ProseSection>

      <ReferencesList refs={REFS} />

      <ClosingBand
        title="Find your formula."
        body="Now you know what the nutrients do — see which Organica Living formula fits your day."
        note="These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease."
        cta={{ href: "/products", label: "Explore the range" }}
      />
    </main>
  );
}
