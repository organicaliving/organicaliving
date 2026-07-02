# Help Center + Footer Pages — Design Spec

**Date:** 2026-07-02
**Status:** Approved (structure) — awaiting spec review

## Goal

Add a customer help center at `/help` plus six footer-linked standalone pages to
the Organica Living site. The site already references "our help center" in several
places (orders, subscriptions, refer) but the route does not exist yet, so this
fills a real gap.

## Scope & non-goals

**In scope:** 6 footer pages (built first), then the `/help` center that links to
them; footer rewiring to the new routes.

**Explicit non-goals / guardrails:**

- **Original copy only.** The competitor help center (Seed) and its footer pages
  were reviewed *only as a topic-coverage checklist*. No verbatim reproduction,
  and no verbatim-with-substitutions. All copy is written fresh in Organica
  Living's voice.
- **Strip competitor framing.** Per brand canon, drop all microbiome / probiotic /
  DS-01® / strain / Fullscript / "you are more than human" framing. Our voice is
  **vitamin / supplement**.
- **No fabricated facts.** No invented press coverage, awards, or job roles. No
  invented legal/policy specifics — unknowns are marked `[[PLACEHOLDER]]`.
- **Legal pages are drafts.** `/terms`, `/privacy`, `/accessibility` are labeled
  "draft — pending legal review" and must be human/counsel reviewed before launch.

## Content source (option A)

Real facts supplied by the site owner take precedence. Facts already encoded in
the codebase are reused:

- Entity: **Organica Living, Inc.** · © 2026 · Atlanta, GA · founded 2016
- Provenance: Made in USA, FDA-registered cGMP facility; certifications
  (Non-GMO, Halal, Vegan, Gluten-Free, ISO/HACCP/CE) — from `src/lib/brand-content.ts`
- Emails: `care@`, `hello@`, `partners@`, `practitioners@`, `press@ organicaliving.com`

Facts still needed from owner (each rendered as `[[PLACEHOLDER: …]]` until supplied):
shipping timeframe/threshold/international, return window & terms, subscription
charge timing/discount/cancel rules, governing-law jurisdiction, registered address,
privacy contact + data-collection list, practitioner program terms, press kit
availability, open roles.

## Route map

```
/help                          Help-center landing (search + category tiles + top articles)
/help/[category]               Category page (lists its articles)
/help/[category]/[article]     Individual article
/practitioners                 Wholesale / professional program
/press                         Media contact + coverage + brand-asset kit
/careers                       Culture, values, benefits, open roles
/terms                         Terms & Conditions (legal draft)
/privacy                       Privacy Policy (legal draft)
/accessibility                 Accessibility statement
```

All under the `(storefront)` route group so they inherit nav + footer.

## Architecture

- **Help content is data-driven.** A single typed module
  `src/lib/help/content.ts` exports the category → article tree (slug, title,
  summary, body sections). Pages render from this data — mirrors the
  `brand-content.ts` pattern. Avoids ~30 hand-authored page files and makes copy
  easy to verify/edit.
- **Dynamic help routes** (`/help/[category]`, `/help/[category]/[article]`) use
  `generateStaticParams` from the content module and `generateMetadata` per page
  (full-suffixed titles per SEO rule — no title template).
- **Article body** is a small set of typed section primitives (prose, FAQ list,
  step list, callout) rendered by a shared `<HelpArticle>` component — no raw HTML
  strings.
- **Footer pages** are individual `page.tsx` files composing `BrandSections.tsx`
  primitives.

## Help-center taxonomy

Six categories, ~4–6 articles each (all original copy):

1. **Orders & Shipping** — placing an order; tracking; shipping times & costs;
   international; changing or canceling an order.
2. **Subscriptions** — how Subscribe & Save works; skip/pause/cancel; change
   frequency; billing timing; the discount.
3. **Returns & Refunds** — policy; how to start a return; refund timing;
   damaged/wrong item.
4. **Products & Usage** — how to take each formula; timing; storage;
   allergens & certifications; safety + FDA disclaimer; pregnancy & kids.
5. **Account & Payments** — sign in; reset password; update payment/address;
   accepted payment methods.
6. **About & Contact** — who we are; certifications & testing; how to reach us;
   practitioner/press/wholesale pointers.

## Footer page outlines

- **`/practitioners`**: intro (our standard for professionals) → why recommend
  (clinically-dosed, third-party tested, Halal/Vegan) → professional program
  (wholesale/referral — real terms or `[[PLACEHOLDER]]`) → practitioner FAQ →
  CTA to `practitioners@`. Drops DS-01®/strain/Fullscript entirely.
- **`/press`**: media-contact card (`press@`) → brand-in-brief boilerplate →
  downloadable brand-asset kit (existing logo/OG assets). Coverage/awards omitted
  unless real ones are supplied.
- **`/careers`**: mission/culture → values (brand canon) → benefits → open roles
  (real roles, else honest "no openings — introduce yourself") → recruitment-fraud
  notice → apply-via-email CTA.
- **`/terms`, `/privacy`, `/accessibility`**: structured legal drafts grounded in
  supplied facts, `[[PLACEHOLDER]]` otherwise, each labeled "draft — pending legal
  review" with a last-updated date. Accessibility states a WCAG 2.1 AA *aim*, not a
  certification.

## Design system

- Reuse `src/components/brand/BrandSections.tsx` primitives (Hero, PillarSection,
  ClosingBand [cream `#fcfcf7`], ExtLink, ReferencesList).
- Forest/cream palette; inline styles + `data-*` responsive hooks wired in
  `globals.css` (`data-brand-cards`, `data-rgrid*`, `data-rcol2`). No Tailwind.
- Help search box + FAQ accordions follow the existing orders/subscriptions FAQ
  pattern already in the repo.
- Content citations rule applies to any factual/educational article: internal
  `<Link>`, external `ExtLink` to authoritative sources only, verified HTTP 200,
  `ReferencesList` at the foot.

## Footer rewiring

`src/components/site/Footer.tsx`:

- Legal column → `/terms`, `/privacy`, `/accessibility` (drop or keep `/consent`
  as `[[PLACEHOLDER]]`).
- Inquire column: Practitioners → `/practitioners`, Press → `/press`,
  Join → `/careers` (Partner stays `/contact`).
- Help column: Help → `/help`.

## Verification (definition of done, per CLAUDE.md)

For every new/changed route:

- `npx next build` passes.
- `npx eslint <changed files>` clean.
- Rendered-HTML grep confirms expected copy/topics (serve via `next start`, curl,
  grep the served HTML) — not screenshots.
- `npm run audit:responsive` clean (add each new static route to `STATIC_ROUTES`;
  dynamic help routes added as representative paths).
- Every `ExtLink` URL verified HTTP 200 before shipping.

## Build sequence

1. Footer pages first: `/terms`, `/privacy`, `/accessibility`, `/practitioners`,
   `/press`, `/careers`.
2. `src/lib/help/content.ts` + `<HelpArticle>` + help routes.
3. Footer rewiring.
4. Verification pass.

## Open questions

- Real values for the `[[PLACEHOLDER]]` facts (owner will supply, or approve
  sensible defaults).
- Keep or drop the footer's `/consent` (Consent Preferences) link.
