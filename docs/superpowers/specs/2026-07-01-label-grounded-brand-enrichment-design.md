# Label-Grounded Brand Enrichment — Design Spec

**Date:** 2026-07-01
**Status:** Approved direction, pending spec review

## Problem

The nine product-label transcriptions in `design-reference/uploads/product-details/`
are the authoritative source of Organica Living's product facts *and* brand voice.
Much of this is already ported into the site (`src/lib/product-content.ts`,
`src/lib/product-facts-data.ts`, the PDP, footer, and home `FormulaSection`). But:

1. A few product data fields are incomplete (empty `ingredients` on some products).
2. The general/brand pages still carry residual **competitor framing**
   (microbiome/"ecosystem"/"more than human" language) instead of Organica's own
   vitamin-and-supplement voice.
3. Brand pages the footer links to — `/science` and `/contact` — **do not exist**
   (they 404). There is no design-reference mockup for either.

This pass enriches product copy, realigns the brand pages to the label voice, and
builds the two missing brand pages, all grounded strictly in the label canon.

## Scope decisions (confirmed with user)

- **Breadth:** Broad — product pages *and* brand/general pages.
- **Depth:** Refine existing copy + build new brand page(s).
- **Claims tone:** Match the labels closely (confident label voice; the FDA
  disclaimer already covers these statements).
- **`MoreThanHuman`:** Soften — keep a "more than a vitamin" hook, strip the
  ecosystem/microbiome language, add label trust signals.
- **`/contact`:** Yes — add a minimal, on-brand page so footer links resolve.

## The brand voice canon (distilled from all 9 labels)

This is the single source of truth every touched surface must reflect. It will
live in a new module `src/lib/brand-content.ts` (mirroring the existing
`product-content.ts` pattern), exported as typed constants:

- **Tagline:** `nature is our thing`
- **Provenance:** Proudly Made in America (USA); distributed from Atlanta, GA;
  made in an **FDA-registered, cGMP-certified** facility; **third-party tested**
  every batch.
- **Certifications:** Non-GMO · Gluten-Free · 100% Vegan · Halal · CE Mark ·
  ISO Certified · GMP Certified · IAF Member · HACCP Certified.
- **Formulation philosophy:** precision-blended; clinically-dosed ("the amount the
  research actually used"); "beyond basic".
- **Format innovation:** stomachable gummies; enteric-coated softgels;
  sustained-release granules; bear-shaped kids gummies; no fishy burps.
- **Sourcing ethics:** vegan + gelatin-free; Omega uses only Halal fish *with
  scales* (salmon, sardines, mackerel), excluding shellfish and bottom-feeders.
- **Honest wellness:** "Food supplements should not be used as a substitute for a
  balanced diet and healthy lifestyle," plus the standard FDA disclaimer
  (already centralized in `src/components/site/Disclaimer.tsx`).

## Work items

### A. `src/lib/brand-content.ts` (new)

Typed constants for the canon above: `BRAND_TAGLINE`, `TRUST_SIGNALS` (short chip
list), `CERTIFICATIONS` (full list, reusing the shape `certsFor` already returns),
`STANDARD_PILLARS` (title + body, e.g. "Clinically-dosed", "Built to absorb",
"Tested & certified"), `SOURCING_NOTES`, and `PROVENANCE` (Atlanta GA, USA, facility).
Keep it presentation-free data; components own layout.

### B. Product data refinements

Files: `src/lib/product-facts-data.ts`, `src/lib/product-content.ts`.

- **Fill empty `ingredients`** *only where the label states a base*:
  - `optimus-d3`: Sunflower-oil base, natural Lemon flavor, vegan enteric-coated
    softgel (from the D3 narrative).
  - `omega-1000`: Omega-3 fish-oil concentrate from the named scaled species,
    Vitamin E (D-alpha tocopherol), natural Lemon flavor (from the Omega narrative
    + allergen list).
  - Leave `sleep-pro` and `vision-pro` empty — their labels do not enumerate an
    "other ingredients" list; do **not** fabricate.
- **No claim rewrites.** Product marketing copy already tracks the labels; only fix
  a mismatch if one is factually wrong (none blocking found — Meno Pro's
  Trans-Resveratrol mention is faithful to its label narrative, so it stays).
- Do not alter Supplement Facts numbers (already verbatim from labels).

### C. Home + footer alignment

- **`src/components/home/MoreThanHuman.tsx`** — soften: keep a "more than a
  vitamin" style hook; replace "You are more than human / complex ecosystem" body
  with the precision-blended, clinically-dosed, Made-in-USA voice. Layout/imagery
  unchanged.
- **`src/components/home/ClosingCta.tsx`** — realign the "Labs" card copy
  ("Because health is not just human" → an authentic sourcing/quality line from the
  canon).
- **`src/components/site/Footer.tsx`** — enrich the brand blurb with provenance and
  add a compact trust/certification row (Made in USA · FDA-registered cGMP ·
  Third-party tested · Halal · Vegan · Non-GMO), sourced from `brand-content.ts`.

### D. New page: `src/app/(storefront)/science/page.tsx`

One page serving the footer's Science / Sustainability / Labs links, built entirely
from the canon and in the existing design idiom (cream/forest palette, `data-reveal`,
`data-rcol2` responsive hooks, inline-style pattern used by home sections):

1. Hero — "nature is our thing" brand promise.
2. "Our standard" — the `STANDARD_PILLARS`.
3. Certifications wall — `CERTIFICATIONS` chips.
4. Format innovation — gummies / enteric softgels / sustained-release granules.
5. Ethical sourcing — vegan, gelatin-free, Halal scaled-fish.
6. Honest wellness — the "not a substitute" line + `<Disclaimer />`.

### E. New page: `src/app/(storefront)/contact/page.tsx`

Minimal, on-brand: short intro, Organica Living / Atlanta, GA / www.organicaliving.com
distributor info from the labels, and a simple inquiry blurb. Reuses existing layout
primitives. No new form backend (YAGNI) — link to a mailto or the existing newsletter
pattern; a real form is out of scope.

## Out of scope

- New Supplement Facts data or numeric changes (already verbatim).
- A functional contact-form backend, quiz route, or blog changes.
- Any design-reference mockup replication (no mockup exists for these brand pages).
- Reworking product imagery.

## Constraints & conventions

- **AGENTS.md:** Read the relevant `node_modules/next/dist/docs/` guide for the app-
  router page/route conventions in this Next.js version before adding the two routes.
- **CLAUDE.md verification rule:** For every changed/new page, build, `next start`,
  `curl` the route, and **grep the rendered HTML** for the exact new copy and
  certification strings as proof. Screenshots only as a targeted supplement.
- Follow the existing inline-style + `data-*` responsive-hook idiom
  (see `responsiveness-architecture` memory), not new Tailwind for the home-style pages.

## Success criteria

- `/science` and `/contact` resolve (no 404) and render the canon copy — verified by
  grep of the served HTML.
- Home `MoreThanHuman` and `ClosingCta` no longer contain "more than human" /
  "complex ecosystem" / "not just human" — verified by grep returning zero matches.
- Footer shows the trust/certification row — verified by grep.
- Empty `ingredients` filled for `optimus-d3` and `omega-1000`; PDP "Other
  Ingredients" block renders for them — verified by grep.
- `npm run audit:responsive` (or the project's responsive check) passes for new pages.
