/**
 * Brand voice canon — the single source of truth for Organica Living's brand
 * story, distilled verbatim from the nine product-label transcriptions in
 * `design-reference/uploads/product-details/`. The brand pages (/science,
 * /sustainability, /labs) and shared surfaces (footer trust row) read from here so
 * the voice stays consistent and is easy to verify.
 *
 * Every string below is grounded in the labels: provenance (Atlanta, GA / Made in
 * USA / FDA-registered cGMP), certifications, formulation philosophy, format
 * innovation, sourcing ethics, and the "nature is our thing" tagline.
 */

export const BRAND_TAGLINE = "nature is our thing";

export const PROVENANCE = {
  company: "Organica Living",
  city: "Atlanta, GA",
  country: "United States",
  url: "www.organicaliving.com",
  facility: "FDA-registered, cGMP-certified facility",
  since: 2016,
} as const;

/** Compact trust chips for the footer row and page sub-heads. */
export const TRUST_SIGNALS = [
  "Made in USA",
  "FDA-Registered cGMP",
  "Third-Party Tested",
  "Halal Certified",
  "100% Vegan",
  "Non-GMO",
] as const;

export type Certification = { name: string; note: string };

/** Full certification wall — every mark that appears across the labels. */
export const CERTIFICATIONS: Certification[] = [
  { name: "Non-GMO Verified", note: "No genetically modified ingredients" },
  { name: "Third-Party Tested", note: "Every batch, independently" },
  { name: "Gluten-Free", note: "Suitable for gluten-sensitive diets" },
  { name: "cGMP Compliant", note: "Current Good Manufacturing Practice" },
  { name: "100% Vegan Certified", note: "Plant-based & gelatin-free formulas" },
  { name: "Halal Certified", note: "Halal-permitted ingredients & sourcing" },
  { name: "FDA-Registered Facility", note: "Made in America" },
  { name: "CE Mark", note: "Conformité Européenne" },
  { name: "ISO Certified", note: "International Organization for Standardization" },
  { name: "GMP Certified", note: "Good Manufacturing Practice" },
  { name: "IAF Member", note: "International Accreditation Forum" },
  { name: "HACCP Certified", note: "Hazard Analysis Critical Control Point" },
];

export type Pillar = { k: string; t: string; d: string };

/**
 * "Our standard" — the four principles behind every formula, for the /science
 * page. Grounded in real label facts (5000 IU D3, 1000mg Omega, 31-nutrient Multi
 * Pro, enteric-coated softgels, sustained-release granules, third-party testing).
 */
export const STANDARD_PILLARS: Pillar[] = [
  {
    k: "01",
    t: "Clinically-dosed",
    d: "Each nutrient is included at the amount the research actually used — 5000 IU of Vitamin D3 in Optimus D3, a full 1000mg of Omega-3 in Omega 1000. No under-dosed fillers to pad a label.",
  },
  {
    k: "02",
    t: "Precision-blended",
    d: "We go beyond the basics — Multi Pro carries 31 essential nutrients, and formulas are enhanced with the extras most brands leave out, like CoQ10, Lutein and Lycopene.",
  },
  {
    k: "03",
    t: "Built to absorb",
    d: "Enteric-coated softgels bypass stomach acid, sustained-release granules dissolve steadily, and hard-to-flavor nutrients are engineered into gummies you can actually stomach.",
  },
  {
    k: "04",
    t: "Tested & verified",
    d: "Made in an FDA-registered, cGMP-certified facility in the USA, then third-party tested every batch for purity, potency and label accuracy.",
  },
];

export type Method = { t: string; d: string };

/** Validation methodologies for /science (seed's Flow-Cytometry-style trio). */
export const VALIDATION_METHODS: Method[] = [
  {
    t: "Purity Testing",
    d: "Independent labs screen every batch for heavy metals, microbes and contaminants before it is cleared to ship — because what is not in a supplement matters as much as what is.",
  },
  {
    t: "Potency Verification",
    d: "We confirm each active is present at the amount printed on the Supplement Facts panel, so the clinical dose you read is the clinical dose you take.",
  },
  {
    t: "Label Accuracy",
    d: "Third-party review checks that ingredients, allergens and certifications on the label match what is in the bottle — verified, not assumed.",
  },
];

/**
 * Sourcing & sustainability pillars for /sustainability. Grounded in the labels'
 * vegan / gelatin-free / Halal ethical-sourcing language and US manufacturing.
 */
export const SOURCING_PILLARS: Pillar[] = [
  {
    k: "01",
    t: "Plant-based & Vegan",
    d: "Our capsules and gummies are Certified 100% Vegan — no animal-derived shells, and none of the gelatin most supplements rely on.",
  },
  {
    k: "02",
    t: "Gelatin-Free",
    d: "From bear-shaped kids' gummies to daily capsules, every format is built without gelatin, using pectin and plant-based gelling agents instead.",
  },
  {
    k: "03",
    t: "Ethically-Sourced Omega",
    d: "Our marine Omega-3 uses only Halal-permitted fish with scales — salmon, sardines and mackerel — strictly excluding shellfish and bottom-feeders.",
  },
  {
    k: "04",
    t: "Non-GMO & Clean",
    d: "Non-GMO verified and gluten-free, with natural fruit and vegetable concentrates for color instead of synthetic dyes.",
  },
  {
    k: "05",
    t: "Responsible Manufacturing",
    d: "Proudly made in America in an FDA-registered, cGMP-certified facility held to CE, ISO and HACCP standards.",
  },
  {
    k: "06",
    t: "Honest Labels",
    d: "We tell you exactly what is inside and remind you that supplements support — never replace — a balanced diet and healthy lifestyle.",
  },
];

/** R&D pipeline for /labs (seed's numbered-process pattern). */
export const RND_STEPS: Pillar[] = [
  {
    k: "01",
    t: "Research",
    d: "We start with the nutrients the human body actually needs and the doses the clinical literature supports — not trends.",
  },
  {
    k: "02",
    t: "Formulate",
    d: "Our team precision-blends actives, co-factors and bioavailability boosters so each nutrient works with the others, not against them.",
  },
  {
    k: "03",
    t: "Prototype",
    d: "We engineer the delivery format — enteric coatings, sustained-release granules, softgels and flavored gummies — to make hard-to-take nutrients easy.",
  },
  {
    k: "04",
    t: "Validate",
    d: "Prototypes are third-party tested for purity, potency and stability before a single bottle is produced at scale.",
  },
  {
    k: "05",
    t: "Scale",
    d: "Production runs in our FDA-registered, cGMP-certified facility, with batch testing and full certification at every step.",
  },
];

export type Innovation = { t: string; d: string };

/** Format-engineering highlights for /labs. */
export const FORMAT_INNOVATIONS: Innovation[] = [
  {
    t: "Nutrients you can stomach",
    d: "We engineered typically hard-to-flavor actives like Iron and Omega-3 into a delicious strawberry Bloom gummy — a complete prenatal in one a day, no large pills to swallow.",
  },
  {
    t: "Enteric-coated softgels",
    d: "Optimus D3 and Omega 1000 are coated to bypass stomach acid for absorption in the intestines — lemon-infused to eliminate fishy burps and aftertaste.",
  },
  {
    t: "Sustained-release granules",
    d: "Multi Pro's colorful granules sit inside a clear vegan capsule and dissolve gradually, for steady nutrient uptake instead of a single spike.",
  },
  {
    t: "Made for kids",
    d: "Optimus D3 Mini packs a 9-in-1 nutrient complex into an orange, bear-shaped gummy — building healthy habits without the struggle.",
  },
];

/** Ingredient-science callouts for /labs — the actives that set formulas apart. */
export const INGREDIENT_SCIENCE: Innovation[] = [
  {
    t: "Bioactive Folate",
    d: "Bloom uses L-5-Methyltetrahydrofolate — the body-ready form of folate — with Choline and 260mg of Omega-3 DHA to support neural, brain and eye development.",
  },
  {
    t: "Phyto-Estrogen Blend",
    d: "Meno Pro anchors on Wild Yam, Dong Quai and Soya Isoflavones, working synergistically for natural relief across pre-, peri- and post-menopause.",
  },
  {
    t: "Calm-Complex Aminos",
    d: "Sleep Pro+ pairs Melatonin with GABA, L-Theanine and 5-HTP, plus a Valerian and Ashwagandha herbal matrix, to quiet a racing mind before rest.",
  },
  {
    t: "Beauty Antioxidants",
    d: "Glow Pro combines 10,000mcg Biotin with Collagen, Hyaluronic Acid and antioxidants like Glutathione, CoQ10 and Astaxanthin for hair, skin and nails.",
  },
];

/**
 * End-to-end journey for /approach — the customer-facing "how we do it" story,
 * distinct from the R&D-focused /labs pipeline.
 */
export const APPROACH_JOURNEY: Pillar[] = [
  {
    k: "01",
    t: "We start with need",
    d: "Every formula begins with the nutrients your body actually needs, at the doses the research supports — 5000 IU of D3, a full 1000mg of Omega-3 — never a token sprinkle.",
  },
  {
    k: "02",
    t: "We formulate for synergy",
    d: "Actives are blended with the co-factors that help them work — calcium with D3 and K2, iron with vitamin C — so nutrients support each other instead of competing.",
  },
  {
    k: "03",
    t: "We craft the format",
    d: "Enteric-coated softgels, sustained-release granules and stomachable gummies mean even hard-to-take nutrients are easy to make part of your day.",
  },
  {
    k: "04",
    t: "We prove it",
    d: "Made in an FDA-registered, cGMP-certified facility and third-party tested for purity, potency and label accuracy before a bottle ever ships.",
  },
  {
    k: "05",
    t: "We deliver it",
    d: "Straight to your door, with Subscribe & Save so your daily ritual is always stocked — skip, pause or cancel whenever you like.",
  },
];

/** Honest-wellness reminder that closes each brand page (verbatim from labels). */
export const HONEST_WELLNESS =
  "Food supplements should not be used as a substitute for a balanced diet and healthy lifestyle.";
