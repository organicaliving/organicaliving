# Help Center + Footer Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a `/help` center (data-driven landing + category + article routes) plus seven original footer pages (`/practitioners`, `/press`, `/careers`, `/terms`, `/privacy`, `/accessibility`, `/consent`) in the Organica Living design system, and rewire the footer to them.

**Architecture:** All routes live in the `(storefront)` group so they inherit nav + footer. Footer pages compose the existing `BrandSections.tsx` primitives. Help content is data-driven from a single typed module (`src/lib/help/content.ts`); help routes render it via a small set of shared components and `generateStaticParams` / `generateMetadata`.

**Tech Stack:** Next.js 16 (App Router, RSC), TypeScript, inline styles + `data-*` hooks in `globals.css` (no Tailwind), `zod` (existing patterns only — no new forms here).

## Global Constraints

- **Original copy only.** Competitor pages were reviewed as a topic checklist. No verbatim reproduction, no verbatim-with-substitution. Write fresh copy in Organica Living's voice.
- **Voice = vitamin/supplement.** Strip all microbiome/probiotic/DS-01®/strain/Fullscript framing. Reference `src/lib/brand-content.ts` for canon; extend it rather than hard-coding brand facts.
- **No fabricated facts.** No invented press coverage, awards, or roles. Unknown policy/legal specifics use clearly-marked `[[DEFAULT: …]]` values, collected from the owner at the end.
- **Legal pages are drafts.** `/terms`, `/privacy`, `/accessibility`, `/consent` each render a visible "Draft — pending legal review" banner + a last-updated date.
- **Citations rule.** Any factual/educational article that states outside facts cites authoritative primary sources inline (`ExtLink`), verified HTTP 200, with a `ReferencesList` at the foot. Product/health claims carry the FDA disclaimer.
- **Metadata rule.** Every page exports full-suffixed `title: "X — Organica Living"` + `description`. No title template.
- **Definition of done (per CLAUDE.md), every route:** `npx next build` passes · `npx eslint <changed files>` clean · rendered-HTML grep confirms expected copy (serve via `next start`, curl, grep) · `npm run audit:responsive` clean (route added to `STATIC_ROUTES`).
- **Windows:** clear caches with PowerShell `Remove-Item -Recurse -Force` (never `rm -rf`).

---

## File structure

**Create:**
- `src/lib/legal-content.ts` — shared legal facts (entity, jurisdiction, last-updated, `[[DEFAULT]]` policy values) + `DraftBanner` data. One source of truth for all four legal pages.
- `src/components/legal/LegalPage.tsx` — shared legal layout (title, draft banner, last-updated, numbered sections, table of contents).
- `src/app/(storefront)/terms/page.tsx`
- `src/app/(storefront)/privacy/page.tsx`
- `src/app/(storefront)/accessibility/page.tsx`
- `src/app/(storefront)/consent/page.tsx`
- `src/app/(storefront)/practitioners/page.tsx`
- `src/app/(storefront)/press/page.tsx`
- `src/app/(storefront)/careers/page.tsx`
- `src/lib/help/content.ts` — typed category → article tree (the help canon).
- `src/components/help/HelpArticle.tsx` — renders one article's typed body sections.
- `src/components/help/HelpNav.tsx` — search box + category tiles (shared by landing/category).
- `src/app/(storefront)/help/page.tsx`
- `src/app/(storefront)/help/[category]/page.tsx`
- `src/app/(storefront)/help/[category]/[article]/page.tsx`

**Modify:**
- `src/components/site/Footer.tsx` — rewire Legal/Inquire/Help columns to real routes.
- `scripts/responsive-audit.mjs` — add new routes to `STATIC_ROUTES`.

---

## Task 1: Legal content module + shared LegalPage layout

**Files:**
- Create: `src/lib/legal-content.ts`
- Create: `src/components/legal/LegalPage.tsx`

**Interfaces:**
- Produces: `LEGAL_META` (`{ entity: string; jurisdiction: string; address: string; privacyEmail: string; lastUpdated: string }`), `type LegalSection = { id: string; heading: string; body: React.ReactNode }`, and `<LegalPage title govBody sections lastUpdated />`.

- [ ] **Step 1: Create `src/lib/legal-content.ts`**

```ts
/**
 * Shared facts for the legal pages (/terms, /privacy, /accessibility, /consent).
 * Real values supplied by the owner; unresolved specifics are marked
 * `[[DEFAULT: …]]` and confirmed at the end of the build. Reuses entity facts
 * already established in the footer / brand-content.
 */
export const LEGAL_META = {
  entity: "Organica Living, Inc.",
  brand: "Organica Living",
  address: "[[DEFAULT: registered business address, Atlanta, GA]]",
  jurisdiction: "[[DEFAULT: State of Georgia, USA]]",
  privacyEmail: "privacy@organicaliving.com",
  careEmail: "care@organicaliving.com",
  lastUpdated: "July 2, 2026",
} as const;

export const DRAFT_NOTICE =
  "Draft — pending legal review. This document is a working draft and not yet a binding legal agreement.";
```

- [ ] **Step 2: Create `src/components/legal/LegalPage.tsx`** — shared layout: cream `<main>`, a max-width 820 measure, an amber draft banner, `<h1>`, a "Last updated" line, an anchored table of contents, then numbered `<section>`s. Model typography on `ProseSection` (light headings, 18px/1.7 body, forest links). Signature:

```tsx
import type { ReactNode } from "react";
export type LegalSection = { id: string; heading: string; body: ReactNode };
export function LegalPage({
  title, intro, sections, lastUpdated, draftNotice,
}: {
  title: string; intro: ReactNode; sections: LegalSection[];
  lastUpdated: string; draftNotice: string;
}) { /* draft banner + TOC (maps sections to #id anchors) + numbered sections */ }
```

- [ ] **Step 3: Verify build + lint**

Run: `npx next build && npx eslint src/lib/legal-content.ts src/components/legal/LegalPage.tsx`
Expected: build passes, eslint clean. (No route yet — this task ships infra only.)

- [ ] **Step 4: Commit**

```bash
git add src/lib/legal-content.ts src/components/legal/LegalPage.tsx
git commit -m "feat(legal): shared legal content module + LegalPage layout"
```

---

## Task 2: `/terms` page

**Files:**
- Create: `src/app/(storefront)/terms/page.tsx`

**Interfaces:**
- Consumes: `LegalPage`, `LegalSection`, `LEGAL_META`, `DRAFT_NOTICE` from Task 1.

- [ ] **Step 1: Write the page.** Export full-suffixed `metadata`. Compose `<LegalPage>` with original sections (write fresh copy — the headings below are the coverage checklist, not copy to paste):

  Sections: `agreement` (who we are / acceptance), `eligibility`, `orders-pricing` (order acceptance, pricing, taxes), `subscriptions` (Subscribe & Save terms, billing authorization, cancellation — mirror the real cart copy at `CheckoutExperience.tsx:371`), `shipping-title` (when title/risk passes), `returns` (link to `/help/returns-refunds`), `intellectual-property`, `user-content`, `disclaimers` (supplements + FDA disclaimer, "not medical advice"), `limitation-of-liability`, `governing-law` (`LEGAL_META.jurisdiction`), `changes`, `contact` (`LEGAL_META.careEmail`).

```tsx
import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { LEGAL_META, DRAFT_NOTICE } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Terms & Conditions — Organica Living",
  description: "The terms that govern your use of the Organica Living website, orders and subscriptions.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      lastUpdated={LEGAL_META.lastUpdated}
      draftNotice={DRAFT_NOTICE}
      intro={/* original 2–3 sentence intro naming the entity */ null}
      sections={[/* the sections above, each with original body copy */]}
    />
  );
}
```

- [ ] **Step 2: Build + lint + serve + grep.**

```bash
npx next build
npx eslint "src/app/(storefront)/terms/page.tsx"
npx next start &   # then:
curl -s http://localhost:3000/terms | grep -c "Governing Law"     # expect >= 1
curl -s http://localhost:3000/terms | grep -c "pending legal review"  # expect 1 (draft banner)
```
Expected: build passes, eslint clean, both greps match.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(storefront)/terms/page.tsx"
git commit -m "feat(legal): /terms page (draft)"
```

---

## Task 3: `/privacy` page

**Files:**
- Create: `src/app/(storefront)/privacy/page.tsx`

**Interfaces:** Consumes Task 1 exports.

- [ ] **Step 1: Write the page** with original copy. Coverage checklist (headings, not copy): `what-we-collect` (account, order, payment-via-processor, analytics, marketing), `how-we-use`, `sharing` (processors: payment, shipping, email — Resend, analytics; no selling of data), `cookies` (link to `/consent`), `your-rights` (access/delete/opt-out; GDPR + CCPA language), `data-retention`, `security`, `childrens-privacy`, `international-transfers`, `changes`, `contact` (`LEGAL_META.privacyEmail`). Export full-suffixed metadata.

- [ ] **Step 2: Build + lint + serve + grep**

```bash
npx next build && npx eslint "src/app/(storefront)/privacy/page.tsx"
curl -s http://localhost:3000/privacy | grep -c "Your Rights"     # expect >= 1
curl -s http://localhost:3000/privacy | grep -c "privacy@organicaliving.com"  # expect >= 1
```
Expected: passes; greps match.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(storefront)/privacy/page.tsx"
git commit -m "feat(legal): /privacy page (draft)"
```

---

## Task 4: `/accessibility` page

**Files:**
- Create: `src/app/(storefront)/accessibility/page.tsx`

**Interfaces:** Consumes Task 1 exports.

- [ ] **Step 1: Write the page** with original copy. Coverage: `commitment` (accessibility is part of "nature is our thing" — for everyone), `standard` (state a WCAG 2.1 AA **aim**, not a certification — do NOT claim conformance), `what-we-do` (semantic markup, alt text, keyboard nav, color contrast), `known-limitations` (honest — third-party embeds), `feedback` (how to report a barrier → `LEGAL_META.careEmail`), `ongoing`. Export full-suffixed metadata.

- [ ] **Step 2: Build + lint + serve + grep**

```bash
npx next build && npx eslint "src/app/(storefront)/accessibility/page.tsx"
curl -s http://localhost:3000/accessibility | grep -c "WCAG 2.1"   # expect >= 1
curl -s http://localhost:3000/accessibility | grep -ci "we aim"    # expect >= 1 (aim, not claim)
```
Expected: passes; greps match.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(storefront)/accessibility/page.tsx"
git commit -m "feat(legal): /accessibility page (draft)"
```

---

## Task 5: `/consent` page

**Files:**
- Create: `src/app/(storefront)/consent/page.tsx`

**Interfaces:** Consumes Task 1 exports.

- [ ] **Step 1: Write the page** with original copy. Coverage: `intro` (what consent preferences are), `categories` (Essential — always on; Analytics; Marketing — plain-language descriptions of each), `how-to-change` (honest: if a live cookie-consent tool isn't wired yet, say preferences can be requested via `LEGAL_META.privacyEmail`, and mark the interactive toggle as `[[DEFAULT: consent tool integration pending]]`), `related` (links to `/privacy`). Export full-suffixed metadata. Do NOT fake a working toggle UI that stores nothing.

- [ ] **Step 2: Build + lint + serve + grep**

```bash
npx next build && npx eslint "src/app/(storefront)/consent/page.tsx"
curl -s http://localhost:3000/consent | grep -c "Essential"   # expect >= 1
curl -s http://localhost:3000/consent | grep -c "Marketing"   # expect >= 1
```
Expected: passes; greps match.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(storefront)/consent/page.tsx"
git commit -m "feat(legal): /consent preferences page (draft)"
```

---

## Task 6: `/practitioners` page

**Files:**
- Create: `src/app/(storefront)/practitioners/page.tsx`

**Interfaces:** Consumes `BrandHero, ProseSection, PillarGrid, ClosingBand` from `BrandSections`; `HONEST_WELLNESS` from `brand-content`.

- [ ] **Step 1: Write the page.** Original copy, vitamin voice. Composition, in order:
  - `BrandHero` — eyebrow "For Practitioners", title + subtitle about partnering with clinicians, `cta` → `mailto:practitioners@organicaliving.com` (or `/contact`). Image: reuse an existing brand hero under `/images/` or add a new WebP via the sharp pipeline (see CLAUDE.md images rule) — do NOT invent a path.
  - `ProseSection` — "Why practitioners choose Organica Living" (clinically-dosed, third-party tested, Halal/Vegan/Non-GMO) with inline `<Link>`s to `/science` and `/products`.
  - `PillarGrid` — the professional program: e.g. `{k:"01",t:"Professional pricing",d:"[[DEFAULT: wholesale/pro discount terms]]"}`, referral, education, dedicated support. Mark unresolved terms `[[DEFAULT]]`.
  - A small original FAQ (reuse the `<details data-faq>` pattern from `subscriptions/page.tsx`).
  - `ClosingBand` — CTA to email `practitioners@`, `note` = FDA disclaimer + `HONEST_WELLNESS`.
  - Drop every DS-01®/strain/Fullscript reference. Export full-suffixed metadata.

- [ ] **Step 2: Build + lint + serve + grep**

```bash
npx next build && npx eslint "src/app/(storefront)/practitioners/page.tsx"
curl -s http://localhost:3000/practitioners | grep -c "practitioners@organicaliving.com"  # expect >= 1
curl -s http://localhost:3000/practitioners | grep -ci "probiotic\|microbiome\|DS-01"      # expect 0
```
Expected: passes; first grep matches, second is 0 (no competitor framing).

- [ ] **Step 3: Commit**

```bash
git add "src/app/(storefront)/practitioners/page.tsx"
git commit -m "feat(pages): /practitioners professional program"
```

---

## Task 7: `/press` page

**Files:**
- Create: `src/app/(storefront)/press/page.tsx`

**Interfaces:** Consumes `BrandHero`/`SectionIntro`/`ClosingBand`, `PROVENANCE` from `brand-content`.

- [ ] **Step 1: Write the page.** Original copy. Composition:
  - Header/`SectionIntro` — "Press & Media".
  - Media-contact card — `press@organicaliving.com`.
  - "Brand in brief" — original boilerplate from `PROVENANCE`/brand canon (founded 2016, Atlanta, vitamin/supplement, certifications).
  - Brand-asset kit — link to the real generated assets (`/organica-living-logo.webp`, `/og-image.png`); a "download logo" link. Do NOT fabricate a zip that doesn't exist — link the real files.
  - **No fabricated coverage or awards.** If none supplied, render an honest "For recent coverage or interviews, contact us" block.
  - Export full-suffixed metadata.

- [ ] **Step 2: Build + lint + serve + grep**

```bash
npx next build && npx eslint "src/app/(storefront)/press/page.tsx"
curl -s http://localhost:3000/press | grep -c "press@organicaliving.com"  # expect >= 1
curl -s http://localhost:3000/press | grep -c "organica-living-logo.webp" # expect >= 1 (real asset)
```
Expected: passes; greps match.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(storefront)/press/page.tsx"
git commit -m "feat(pages): /press media page"
```

---

## Task 8: `/careers` page

**Files:**
- Create: `src/app/(storefront)/careers/page.tsx`

**Interfaces:** Consumes `BrandHero`/`ProseSection`/`PillarGrid`/`ClosingBand`.

- [ ] **Step 1: Write the page.** Original copy. Composition:
  - `BrandHero` — "Join Us".
  - `ProseSection` — mission/culture (from brand canon).
  - `PillarGrid` — values and/or benefits (health, parental leave, PTO, remote stipend — mark specifics `[[DEFAULT]]`).
  - Open roles — an honest empty-state block ("No open roles right now — introduce yourself at `careers@organicaliving.com`") unless the owner supplies real roles. **No invented job listings or salaries.**
  - A brief recruitment-fraud notice (we never ask for payment; official domain only).
  - `ClosingBand` — CTA to `careers@`. Export full-suffixed metadata.

- [ ] **Step 2: Build + lint + serve + grep**

```bash
npx next build && npx eslint "src/app/(storefront)/careers/page.tsx"
curl -s http://localhost:3000/careers | grep -ci "recruitment fraud\|never ask"  # expect >= 1
```
Expected: passes; grep matches.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(storefront)/careers/page.tsx"
git commit -m "feat(pages): /careers page"
```

---

## Task 9: Help content module + types

**Files:**
- Create: `src/lib/help/content.ts`

**Interfaces:**
- Produces:
```ts
export type HelpBlock =
  | { kind: "p"; text: string }
  | { kind: "steps"; items: string[] }
  | { kind: "faq"; items: { q: string; a: string }[] }
  | { kind: "callout"; text: string };
export type HelpArticle = { slug: string; title: string; summary: string; blocks: HelpBlock[] };
export type HelpCategory = { slug: string; title: string; blurb: string; icon?: string; articles: HelpArticle[] };
export const HELP_CATEGORIES: HelpCategory[];
export function getCategory(slug: string): HelpCategory | undefined;
export function getArticle(cat: string, art: string): { category: HelpCategory; article: HelpArticle } | undefined;
export function allArticleParams(): { category: string; article: string }[];
```

- [ ] **Step 1: Create the module** with the six categories from the spec (`orders-shipping`, `subscriptions`, `returns-refunds`, `products-usage`, `account-payments`, `about-contact`), each with 4–6 articles of **original** copy. Policy specifics use `[[DEFAULT: …]]`. Reuse the real `care@organicaliving.com` in answers. Implement the three lookup helpers with plain `.find`.

- [ ] **Step 2: Lint + typecheck**

Run: `npx eslint src/lib/help/content.ts && npx tsc --noEmit`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/lib/help/content.ts
git commit -m "feat(help): typed help-center content module"
```

---

## Task 10: HelpArticle + HelpNav components

**Files:**
- Create: `src/components/help/HelpArticle.tsx`
- Create: `src/components/help/HelpNav.tsx`

**Interfaces:**
- Consumes: `HelpArticle`, `HelpCategory`, `HELP_CATEGORIES` (Task 9).
- Produces: `<HelpArticle article={HelpArticle} />` (renders each `HelpBlock` by `kind`, reusing the `<details data-faq>` accordion for `faq` blocks); `<HelpNav categories={HelpCategory[]} />` (a non-JS search `<input>` styled like the footer newsletter field + a `data-brand-cards` grid of category tiles linking to `/help/[slug]`).

- [ ] **Step 1: Write both components.** `HelpArticle` switches on `block.kind`; forest/cream palette, 18px/1.7 prose. `HelpNav` category tiles reuse the `CrossLinks` visual language.

- [ ] **Step 2: Lint + typecheck**

Run: `npx eslint src/components/help/HelpArticle.tsx src/components/help/HelpNav.tsx && npx tsc --noEmit`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/help/HelpArticle.tsx src/components/help/HelpNav.tsx
git commit -m "feat(help): HelpArticle + HelpNav components"
```

---

## Task 11: `/help` landing route

**Files:**
- Create: `src/app/(storefront)/help/page.tsx`

**Interfaces:** Consumes `HELP_CATEGORIES`, `HelpNav`, `BrandHero`/`SectionIntro`.

- [ ] **Step 1: Write the landing.** `BrandHero` ("How can we help?") → `HelpNav` (search + category tiles) → a "Popular articles" `SectionIntro` + list linking to a few `/help/[cat]/[article]` paths → `ClosingBand` CTA to `/contact`. Full-suffixed metadata.

- [ ] **Step 2: Build + lint + serve + grep**

```bash
npx next build && npx eslint "src/app/(storefront)/help/page.tsx"
curl -s http://localhost:3000/help | grep -c "Orders & Shipping"  # expect >= 1 (category tile)
curl -s http://localhost:3000/help | grep -c "Subscriptions"      # expect >= 1
```
Expected: passes; greps match.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(storefront)/help/page.tsx"
git commit -m "feat(help): /help landing page"
```

---

## Task 12: `/help/[category]` route

**Files:**
- Create: `src/app/(storefront)/help/[category]/page.tsx`

**Interfaces:** Consumes `getCategory`, `HELP_CATEGORIES`. Uses `generateStaticParams` + `generateMetadata` + `notFound()`.

- [ ] **Step 1: Write the route.** `generateStaticParams` returns `HELP_CATEGORIES.map(c => ({ category: c.slug }))`. In the page, `getCategory(params.category)` or `notFound()`. Render category title/blurb + a list of its articles linking to `/help/[category]/[article]`, plus a `HelpNav` back to other categories. `generateMetadata` builds a full-suffixed title from the category.

  Note (Next 16): `params` is a Promise — `const { category } = await params;`.

- [ ] **Step 2: Build + lint + serve + grep**

```bash
npx next build && npx eslint "src/app/(storefront)/help/[category]/page.tsx"
curl -s http://localhost:3000/help/subscriptions | grep -ci "subscribe & save\|skip\|pause"  # expect >= 1
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/help/not-a-real-category        # expect 404
```
Expected: passes; article grep matches; unknown slug 404s.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(storefront)/help/[category]/page.tsx"
git commit -m "feat(help): /help/[category] route"
```

---

## Task 13: `/help/[category]/[article]` route

**Files:**
- Create: `src/app/(storefront)/help/[category]/[article]/page.tsx`

**Interfaces:** Consumes `getArticle`, `allArticleParams`, `<HelpArticle>`.

- [ ] **Step 1: Write the route.** `generateStaticParams` returns `allArticleParams()`. In the page, `await params`, `getArticle(category, article)` or `notFound()`. Render breadcrumb (`Help / <Category> / <Article>`) + `<HelpArticle>` + a "Still need help?" CTA to `/contact`. `generateMetadata` from the article title/summary.

- [ ] **Step 2: Build + lint + serve + grep**

```bash
npx next build && npx eslint "src/app/(storefront)/help/[category]/[article]/page.tsx"
# pick a real slug pair from content.ts, e.g. returns-refunds / how-to-start-a-return:
curl -s http://localhost:3000/help/returns-refunds/how-to-start-a-return | grep -ci "return"  # expect >= 1
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/help/returns-refunds/nope        # expect 404
```
Expected: passes; article grep matches; unknown slug 404s.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(storefront)/help/[category]/[article]/page.tsx"
git commit -m "feat(help): /help/[category]/[article] route"
```

---

## Task 14: Footer rewiring + responsive audit registration

**Files:**
- Modify: `src/components/site/Footer.tsx` (the `FOOTER_COLS` array, lines ~28–63)
- Modify: `scripts/responsive-audit.mjs` (`STATIC_ROUTES`)

- [ ] **Step 1: Rewire `FOOTER_COLS`.** Inquire: Practitioners → `/practitioners`, Press → `/press`, Join → `/careers` (Partner stays `/contact`). Help: Help → `/help`. Legal: Terms → `/terms`, Privacy → `/privacy`, Accessibility → `/accessibility`, Consent Preferences → `/consent`.

- [ ] **Step 2: Register routes** in `scripts/responsive-audit.mjs` `STATIC_ROUTES`: add `/help`, `/help/orders-shipping`, one representative `/help/orders-shipping/<article>`, `/practitioners`, `/press`, `/careers`, `/terms`, `/privacy`, `/accessibility`, `/consent`.

- [ ] **Step 3: Build + lint + audit**

```bash
npx next build
npx eslint "src/components/site/Footer.tsx"
npm run audit:responsive
```
Expected: build passes, eslint clean, audit reports no horizontal overflow on any new route.

- [ ] **Step 4: Grep footer links served**

```bash
curl -s http://localhost:3000/ | grep -c 'href="/help"'    # expect >= 1
curl -s http://localhost:3000/ | grep -c 'href="/terms"'   # expect >= 1
```
Expected: both match (footer now points at real routes).

- [ ] **Step 5: Commit**

```bash
git add "src/components/site/Footer.tsx" scripts/responsive-audit.mjs
git commit -m "feat(nav): wire footer to /help + new footer pages; register audit routes"
```

---

## Task 15: Full verification pass + facts-confirmation table

**Files:** none (verification + a deliverable doc)

- [ ] **Step 1: Full build + lint + audit**

```bash
npx next build
npx eslint "src/app/(storefront)/**/*.tsx" src/components/help/*.tsx src/components/legal/*.tsx src/lib/help/content.ts src/lib/legal-content.ts
npm run audit:responsive
```
Expected: all clean.

- [ ] **Step 2: Verify no competitor framing leaked** across all new copy:

```bash
grep -rniE "microbiome|probiotic|DS-01|synbiotic|Fullscript|more than human" src/app "(storefront)" src/lib/help src/lib/legal-content.ts
```
Expected: no matches.

- [ ] **Step 3: Verify every `ExtLink`/citation URL returns 200** (per CLAUDE.md). For each external URL used:

```bash
curl -s -o /dev/null -L -w "%{http_code}\n" <url>   # expect 200
```

- [ ] **Step 4: Produce the facts-confirmation table** for the owner — a markdown doc `docs/help-facts-to-confirm.md` listing every `[[DEFAULT]]` used, with columns: Fact · Reference data point (a plain numeric/term value observed on the competitor site, for calibration only) · Our current default · (blank for the owner's real value). Grep the codebase for `[[DEFAULT` to ensure the table is exhaustive:

```bash
grep -rn "\[\[DEFAULT" src/ | wc -l   # every hit must appear as a row in the table
```

- [ ] **Step 5: Commit**

```bash
git add docs/help-facts-to-confirm.md
git commit -m "docs: facts-to-confirm table for help center + footer pages"
```

---

## Self-review notes (author)

- **Spec coverage:** all 7 footer pages (Tasks 2–8) + help landing/category/article (Tasks 11–13) + data module (9) + components (10) + footer rewiring (14) + verification & facts table (15). ✓
- **Legal-draft banner:** enforced via `LegalPage` in Task 1, asserted by grep in Task 2. ✓
- **No fabricated facts:** press coverage (Task 7), roles/salaries (Task 8) explicitly forbidden; `[[DEFAULT]]` markers collected in Task 15. ✓
- **Competitor-framing strip:** asserted by grep in Task 6 and repo-wide in Task 15. ✓
- **Types consistent:** `HelpBlock`/`HelpArticle`/`HelpCategory` and helper signatures defined in Task 9 are consumed unchanged in Tasks 10–13. ✓
