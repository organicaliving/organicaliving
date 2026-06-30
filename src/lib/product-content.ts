/**
 * Product detail page content — ported verbatim from the Claude Design source
 * `Product.dc.html` (the `DB()` META map + derived fields) imported via the
 * claude_design MCP. This holds the marketing copy the PDP renders; live
 * commerce data (price, variant id, stock) still comes from Supabase.
 */
export type Benefit = { t: string; d: string };
export type FaqItem = { q: string; a: string };

export type ProductMeta = {
  name: string;
  tag: string;
  sub: string;
  form: string;
  flavor: string;
  badge: string;
  vegan: boolean;
  rating: string;
  reviewCount: string;
  upc: string;
  claims: string[];
  intro: string;
  narrative: string[];
  benefits: Benefit[];
  howToUse: string;
};

/** Display order used for nav, cross-sell, and listings. */
export const PRODUCT_ORDER = [
  "multi-pro",
  "optimus-d3",
  "omega-1000",
  "vision-pro",
  "sleep-pro",
  "glow-pro",
  "bloom",
  "meno-pro",
  "optimus-d3-mini",
] as const;

export const PRODUCT_META: Record<string, ProductMeta> = {
  "multi-pro": {
    name: "Multi Pro",
    tag: "Multivitamin",
    sub: "Multivitamin + Minerals",
    form: "60 Capsules",
    flavor: "Max Strength",
    badge: "Bestseller",
    vegan: true,
    rating: "4.8",
    reviewCount: "2,140",
    upc: "8 60015 53610 5",
    claims: ["Immune System Support", "Energy & Fatigue Reduction", "Bone Health"],
    intro:
      "A complete 31-nutrient multivitamin and minerals blend to bridge your daily nutrient gap",
    narrative: [
      "Our advanced formula is precision-blended to offer a comprehensive spectrum of 31 essential nutrients — Vitamins A, C, D3, K2, a full B-Complex, and trace elements. It goes beyond basic nutrition by incorporating Omega-3 (EPA/DHA), Coenzyme Q10, and Lycopene to bridge the nutrient gap in your daily diet.",
      "Science-backed nutrition delivered in unique Sustained Release Granules. This colorful, visible delivery system within clear vegan capsules ensures steady nutrient absorption — supporting immune health, bone strength, and the reduction of tiredness and fatigue throughout your day.",
    ],
    benefits: [
      { t: "31 Essential Nutrients", d: "A full spectrum of vitamins, minerals and trace elements in one daily serving." },
      { t: "Beyond the Basics", d: "Enhanced with Omega-3 EPA/DHA, CoQ10 and Lycopene that most multivitamins leave out." },
      { t: "Sustained Release", d: "Granules dissolve gradually for steady absorption, not a single spike." },
    ],
    howToUse: "Take 2 capsules daily, with food.",
  },
  "optimus-d3": {
    name: "Optimus D3",
    tag: "Vitamin D3",
    sub: "Vitamin D3 · 5000 IU",
    form: "30 Softgels",
    flavor: "Lemon",
    badge: "",
    vegan: true,
    rating: "4.9",
    reviewCount: "1,318",
    upc: "8 60015 53616 7",
    claims: ["Heart Health", "Bone & Immune Support", "Optimal Calcium Absorption"],
    intro: "Clinical-strength 5000 IU Vitamin D3 for heart, bone and immune support",
    narrative: [
      "This advanced formula delivers a clinical-strength dose of 5000 IU (125mcg) of Vitamin D3. Designed for maximum efficacy, it works in harmony to optimize calcium utilization — directing it to your bones where it is needed most — while supporting immune function and cardiovascular health.",
      "Our specialized Enteric-Coated Softgels are designed to bypass stomach acid for optimal absorption in the intestines. Suspended in a premium Sunflower Oil base with a refreshing hint of Lemon, this clear softgel offers a powerful daily boost without the fishy aftertaste of fat-soluble vitamins.",
    ],
    benefits: [
      { t: "5000 IU Potency", d: "A clinical-strength dose of Vitamin D3 (cholecalciferol) per softgel." },
      { t: "Enteric-Coated", d: "Bypasses stomach acid for optimal absorption in the intestines." },
      { t: "Vegan & Lemon-Infused", d: "A sunflower-oil base, certified vegan, with no fishy aftertaste." },
    ],
    howToUse: "Take 1 softgel daily, with a meal.",
  },
  "optimus-d3-mini": {
    name: "Optimus D3 Mini",
    tag: "Kids Vitamin D3",
    sub: "Kids' Vitamin D3 Plus",
    form: "30 Gummies",
    flavor: "Orange · Bear-Shaped",
    badge: "",
    vegan: true,
    rating: "4.9",
    reviewCount: "864",
    upc: "8 60015 53618 1",
    claims: ["Bone & Immune Support", "Brain Health & Vision", "Healthy Teeth & Muscles"],
    intro: "A tasty 9-in-1 bear gummy to support kids' bones, immunity and growth",
    narrative: [
      "These delicious gummies are a 9-in-1 powerhouse, formulated to go beyond basic bone health. We combined Calcium Citrate and Vitamin D3 with essential co-factors like Vitamin K2, Phosphorus, and Magnesium Glycinate for optimal absorption and bone mineralization. The blend also includes Omega-3 Fish Oil and Zinc to support immunity and overall development in growing children.",
      "Building healthy habits should not be a chore — which is why we packed these premium nutrients into a tasty, orange-flavored, bear-shaped gummy. It is the perfect daily boost for your child’s active lifestyle, without the struggle of swallowing pills.",
    ],
    benefits: [
      { t: "9-in-1 Complex", d: "D3, Calcium, K2, Phosphorus, Magnesium, Zinc and Omega-3 in one gummy." },
      { t: "Bone Mineralization", d: "Co-factors work together for absorption and strong growing bones." },
      { t: "Kids Actually Love It", d: "Orange-flavored and bear-shaped — no pills to swallow." },
    ],
    howToUse: "Children 3+: take 1 gummy daily. Adult supervision required.",
  },
  "omega-1000": {
    name: "Omega 1000",
    tag: "Omega-3",
    sub: "Omega-3 · 1000mg",
    form: "60 Softgels",
    flavor: "Lemon",
    badge: "",
    vegan: false,
    rating: "4.8",
    reviewCount: "1,602",
    upc: "8 60015 53611 2",
    claims: ["Heart, Brain & Eye Health", "High-Potency with Vitamin E", "Anti-Inflammatory"],
    intro: "1000mg full-spectrum Omega-3 with 520mg EPA and 330mg DHA per softgel",
    narrative: [
      "Our advanced Omega-3 formula delivers a potent 1000mg dose of essential fatty acids in a single softgel — a high concentration of 520mg EPA and 330mg DHA. This full-spectrum profile acts as a powerful anti-inflammatory to support cardiovascular health, cognitive function, and vision, enhanced with Vitamin E for freshness and antioxidant support.",
      "We utilize only Halal-permitted fish species with scales — such as salmon, sardines, and mackerel. To ensure a pleasant daily experience, our clear, long-shape softgels are infused with natural Lemon flavor, effectively eliminating fishy burps and aftertaste.",
    ],
    benefits: [
      { t: "1000mg Per Softgel", d: "520mg EPA + 330mg DHA — a high-concentration, full-spectrum dose." },
      { t: "Heart, Brain & Eyes", d: "Essential fatty acids that support cardiovascular and cognitive health." },
      { t: "No Fishy Burps", d: "Lemon-infused and ethically sourced from scaled fish only." },
    ],
    howToUse: "Take 1 softgel daily, with a meal.",
  },
  "vision-pro": {
    name: "Vision Pro",
    tag: "Eye Health",
    sub: "Eye Health Micronutrients",
    form: "30 Softgels",
    flavor: "Blueberry",
    badge: "New",
    vegan: true,
    rating: "4.7",
    reviewCount: "742",
    upc: "8 60015 53614 3",
    claims: ["Night Vision Boost", "Retina & Macula Guard", "Dry Eye Hydration"],
    intro: "A 29-in-1 optical defense softgel with 20mg Lutein and 4mg Zeaxanthin",
    narrative: [
      "In the modern digital age your eyes face constant blue light, glare, and fatigue. Vision Pro is a 29-in-1 optical defense system with a massive 20mg of Lutein and 4mg of Zeaxanthin — nature’s internal sunglasses — to filter harmful high-energy blue light and protect your retina from cumulative screen exposure.",
      "Our formula features a rare Hydration Complex with Omega-7 from Sea Buckthorn and Omega-3 EPA/DHA to improve tear film quality and combat the gritty, dry sensation felt by contact-lens wearers and office workers. Bilberry Extract and Vitamin A sharpen night vision, while CoQ10 and Vitamin C fight cellular aging — all in a pleasant Blueberry softgel.",
    ],
    benefits: [
      { t: "Blue-Light Filter", d: "20mg Lutein + 4mg Zeaxanthin shield the retina from screen glare." },
      { t: "Dry-Eye Hydration", d: "Omega-7 and Omega-3 improve tear film and ease gritty eyes." },
      { t: "Sharper Night Vision", d: "Bilberry Extract and Vitamin A support low-light sight." },
    ],
    howToUse: "Take 2 softgels daily, with a meal.",
  },
  "sleep-pro": {
    name: "Sleep Pro+",
    tag: "Sleep Support",
    sub: "Melatonin Sleep Complex",
    form: "30 Gummies",
    flavor: "Mixed Berries",
    badge: "",
    vegan: true,
    rating: "4.8",
    reviewCount: "1,955",
    upc: "8 60015 53615 0",
    claims: ["Promotes Deep Sleep", "Calms Racing Minds", "Stress Relief Support"],
    intro: "A mixed-berry gummy that helps you wind down — not just knock you out",
    narrative: [
      "Sleep Pro+ is a scientifically formulated sleep complex designed to do more than just knock you out — it helps you wind down. While standard supplements rely solely on Melatonin, our formula integrates GABA, L-Theanine, and 5-HTP to quiet a racing mind and prepare your body for rest.",
      "We fortified the blend with a potent herbal matrix of Valerian Root, Ashwagandha, and Rhodiola to combat the daily stress that keeps you awake. Combined with Magnesium Glycinate for muscle relaxation, this targeted system helps you drift off faster, sleep deeper, and wake refreshed without morning grogginess.",
    ],
    benefits: [
      { t: "Calm a Racing Mind", d: "GABA, L-Theanine and 5-HTP quiet mental chatter before bed." },
      { t: "Herbal Stress Matrix", d: "Valerian, Ashwagandha and Rhodiola ease daily tension." },
      { t: "No Morning Grog", d: "5mg Melatonin for restful sleep and a refreshed wake-up." },
    ],
    howToUse: "Take 1 gummy 30–60 minutes before bed.",
  },
  "glow-pro": {
    name: "Glow Pro",
    tag: "Hair, Skin & Nails",
    sub: "Biotin 10,000",
    form: "30 Gummies",
    flavor: "Mixed Berries",
    badge: "New",
    vegan: true,
    rating: "4.7",
    reviewCount: "1,087",
    upc: "8 60015 53610 5",
    claims: ["Maximum Hair & Nails Support", "Skin Elasticity Boost", "Cellular Anti-Aging"],
    intro: "A 25-in-1 beauty gummy with 10,000mcg Biotin, Collagen and Hyaluronic Acid",
    narrative: [
      "Unlock your natural radiance with Glow Pro — a 25-in-1 beauty complex to revitalize hair, skin, and nails from the cellular level. Unlike standard beauty vitamins that rely on Biotin alone, this formula combines a massive 10,000mcg of Biotin with Collagen Peptides and Hyaluronic Acid to restore elasticity and hydration.",
      "We added a powerhouse defense system — premium anti-aging antioxidants like Glutathione, CoQ10, and Astaxanthin, plus a proprietary blend of Bamboo Silica and Keratin — to defend against environmental stress while rebuilding strength. It is your daily beauty treatment in a bottle.",
    ],
    benefits: [
      { t: "10,000mcg Biotin", d: "Maximum-strength support for hair thickness and nail strength." },
      { t: "Collagen + Hyaluronic", d: "Restore skin elasticity and deep dermal hydration." },
      { t: "Anti-Aging Antioxidants", d: "Glutathione, CoQ10 and Astaxanthin defend against stress." },
    ],
    howToUse: "Take 2 gummies daily.",
  },
  bloom: {
    name: "Bloom",
    tag: "Prenatal",
    sub: "Pregnancy Support",
    form: "30 Gummies",
    flavor: "Strawberry",
    badge: "",
    vegan: true,
    rating: "4.9",
    reviewCount: "1,433",
    upc: "8 60015 53613 6",
    claims: ["Neural & Brain Development", "Bioactive Folate + DHA", "Combats Pregnancy Fatigue"],
    intro: "A complete prenatal strawberry gummy — one a day for mother and baby",
    narrative: [
      "Bloom is a precision-blended, comprehensive formula designed to nurture both mother and developing baby through every stage of pregnancy. We use L-5-Methyltetrahydrofolate — the bioactive form of Folic Acid — combined with Choline and a high concentration of Omega-3 DHA (260mg) to support critical neural tube, brain, and eye development. It includes 25mg of Iron and Vitamins B6 & B12 to combat fatigue and support healthy red blood cell formation.",
      "We engineered this high-potency profile — including hard-to-flavor nutrients like Iron and Omega-3 — into a delicious Strawberry gummy. You get 26 essential nutrients, including CoQ10 and Calcium Malate, in just one enjoyable gummy per day, without the stress of swallowing large pills.",
    ],
    benefits: [
      { t: "Bioactive Folate", d: "L-5-Methylfolate plus Choline for neural-tube and brain development." },
      { t: "260mg DHA", d: "High-concentration Omega-3 for baby’s brain and eye development." },
      { t: "Combats Fatigue", d: "25mg Iron with B6 & B12 supports energy and red blood cells." },
    ],
    howToUse: "Take 1 gummy daily.",
  },
  "meno-pro": {
    name: "Meno Pro",
    tag: "Menopause Support",
    sub: "Menopause Support",
    form: "30 Capsules",
    flavor: "Max Strength",
    badge: "New",
    vegan: true,
    rating: "4.8",
    reviewCount: "968",
    upc: "8 60015 53612 9",
    claims: ["Eases Hot Flashes & Night Sweats", "Regulates Hormonal Balance", "Improves Sleep & Reduces Anxiety"],
    intro: "A 31-ingredient hormonal-balance system for pre, peri and post-menopause",
    narrative: [
      "Menopause is a natural transition, but the symptoms do not have to dictate your day. Meno Pro is a 31-ingredient hormonal regulation system to smooth the waves of pre, peri, and post-menopause. We anchored it with a targeted Phyto-Estrogen Blend of Wild Yam, Dong Quai, and Soya Isoflavones, which work synergistically for natural relief from hot flashes and night sweats.",
      "Because sleep and mood often suffer first, we engineered a Night & Calm Complex — 2mg of Melatonin with Ashwagandha and L-Theanine — to silence the anxiety that keeps you awake. We added Biotin for hair and skin, plus 260 Million CFUs of Bacillus subtilis to reduce bloating and improve nutrient absorption.",
    ],
    benefits: [
      { t: "Phyto-Estrogen Blend", d: "Wild Yam, Dong Quai and Soya Isoflavones ease hot flashes." },
      { t: "Night & Calm Complex", d: "Melatonin, Ashwagandha and L-Theanine for sleep and mood." },
      { t: "Vitality Support", d: "Biotin plus Bacillus subtilis probiotics for skin and digestion." },
    ],
    howToUse: "Take 2 capsules daily.",
  },
};

/** Trust-mark pills shown beside the Supplement Facts panel. */
export function certsFor(meta: ProductMeta): string[] {
  return [
    "CE Mark",
    "ISO Certified",
    "GMP Certified",
    "Halal Certified",
    meta.vegan ? "100% Vegan" : "Marine-Sourced",
    "FDA Registered",
    "IAF Member",
    "HACCP Certified",
  ];
}

/** Quick certification chips under the buy box. */
export function quickCertsFor(meta: ProductMeta): string[] {
  return [meta.vegan ? "Vegan" : "Pescatarian", "Non-GMO", "Gluten-Free", "Third-Party Tested"];
}

/** Generic FAQ generated per product (mirrors the mockup's genericFaq). */
export function faqFor(meta: ProductMeta): FaqItem[] {
  return [
    {
      q: `How do I take ${meta.name}?`,
      a: `${meta.howToUse} For best results, take consistently as part of your daily routine. No refrigeration required.`,
    },
    {
      q: "Is it vegan and non-GMO?",
      a:
        (meta.vegan
          ? `${meta.name} is Certified Vegan, Halal, non-GMO and gelatin-free.`
          : `${meta.name} is Halal-certified, non-GMO and gelatin-free. It is sourced from marine fish oil, so it is not vegan.`) +
        " Every batch is third-party tested for purity.",
    },
    {
      q: "Where is it made?",
      a: "Made in the USA in an FDA-registered, cGMP-certified facility, then third-party tested for contaminants and label accuracy before it reaches you.",
    },
    {
      q: "Can I subscribe and save?",
      a: `Yes — choose Subscribe & Save to get ${meta.name} delivered monthly at a discount with free shipping. Skip, pause or cancel anytime from your account.`,
    },
  ];
}

export const QUALITY_MATTERS = [
  "Non-GMO Verified",
  "Third-Party Tested",
  "Gluten-Free",
  "cGMP Compliant",
];
