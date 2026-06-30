# Organica Living — Launch-Readiness Roadmap

> **Master program doc.** This decomposes "make the website launch-ready" into a sequenced set of **per-subsystem plans**. Each phase becomes its own detailed bite-sized plan (`docs/superpowers/plans/2026-06-29-phase-NN-<name>.md`) executed via **superpowers:subagent-driven-development**. This file is the index, dependency graph, and launch Definition of Done — not the task-level detail.

**Scope decisions (locked 2026-06-29):**
- **Launch scope:** Full mockup parity (commerce + subscriptions + accounts + referrals + blog/science content).
- **Checkout:** Custom on-site **Stripe Elements** (matches `Checkout.dc.html`), not hosted Stripe Checkout.
- **Guest checkout:** Allowed — anonymous cart + email-only purchase, optional post-purchase account.
- **Content:** **MDX-in-repo** for blog/articles/science pages.
- **Visual fidelity (locked 2026-06-30):** every rendered page MUST be a pixel-faithful replica of its `design-reference/*.dc.html` mockup — exact layout, components, spacing, imagery, and interactions (glass dropdown menus, lightbox, marquee, ViaCap count-up, etc.) — with **corrected copy/data** (fix the dosage errors, remove DS-01®/Seed competitor copy, resolve the byline/citation contradictions, wire dead links). The `.dc.html` files are the visual+content SPEC; each is re-implemented as a React/Tailwind page wired to live data (they can't be dropped in — they use the proprietary `<x-dc>` runtime).

## Design fidelity standard (applies to ALL page phases)
Every phase that renders a page carries this acceptance criterion: **the page visually matches its `design-reference/<Name>.dc.html` mockup** (port the exact markup/inline styles → React/Tailwind; match fonts, colors, spacing, components, and interactions). Verification = build + lint + side-by-side visual QA against the mockup (and, once Phase 11 lands, Playwright visual snapshots). Earlier phases (storefront, auth, cart, checkout) were built functional-but-simplified and are re-skinned in **Phase V** below.

**Baseline (already done):**
- Next.js 16 + React 19 + TS + Tailwind v4; Supabase (schema + RLS + 9-product seed); Stripe/Resend SDKs installed.
- Read-only storefront (Home, `/products`, `/products/[slug]`) on branch `feat/storefront-pages` (assumed merged to `main` before Phase 1 starts).

---

## Phase map & dependencies

```
Phase V  Visual fidelity re-skin (NOW) ── re-skin shipped pages to match mockups
Phase 0  Shared foundations (form UI, validation, email infra)  ── no deps
Phase 1  Auth & sessions ───────────────┐ depends 0
Phase 2  Cart (guest + auth) ───────────┤ depends 0 (auth-aware, not auth-blocked)
Phase 3  Checkout + Payments (Elements) ─┤ depends 1,2
Phase 4  Subscriptions (Stripe Billing) ─┤ depends 3
Phase 5  Account area ───────────────────┤ depends 1,3
Phase 6  Referrals ($25/$25) ────────────┘ depends 1,3
Phase 7  Catalog data correctness        ── depends none (can run early/parallel)
Phase 8  Content system (MDX)            ── depends 0
Phase 9  Legal & compliance pages         ── depends 8 (reuses MDX/static)
Phase 10 SEO, analytics, observability    ── depends most pages exist
Phase 11 Accessibility & QA hardening     ── depends all UI built
Phase 12 Production deploy & launch       ── depends ALL
```

**Critical path to "can take an order":** 0 → 1 → 2 → 3 → 12.
**Parallelizable anytime:** 7 (data) and 8 (content) are independent of the commerce path.

---

## Phase V — Visual fidelity re-skin (running NOW)
**Goal:** Rebuild the already-shipped pages as pixel-faithful replicas of their mockups, and establish the exact shared chrome (header with glass dropdown menus + mobile menu, announcement bar, footer) that every other page reuses.
**Depends on:** the functional pages already merged (storefront, auth, cart, checkout) — re-skins them in place, keeps their data wiring/actions.
**Detailed plan:** `docs/superpowers/plans/2026-06-30-phase-V-visual-fidelity.md`.
**Pages re-skinned (against `design-reference/`):** shared Header/AnnouncementBar/Footer (used everywhere) → `Organica Home` → `Products` → `Product` (claim pills, benefit cards, Supplement Facts, lightbox) → `Cart` → `Checkout` → `Login` + `Signup`.
**Acceptance:** each re-skinned page matches its mockup (layout/components/interactions), keeps its existing data/actions, build+lint+suite green, copy corrected per the fidelity standard.
**Note:** the mockup-only pages (Account, Order History, Subscriptions, Refer, Blogs, Blog Article, Design System) are built as replicas when their functional phase lands (4/5/6/8) — the fidelity standard above binds them.

## Phase 0 — Shared foundations
**Goal:** Reusable form/UI primitives, validation, and email infrastructure that later phases depend on, so they aren't re-invented per phase.
**Depends on:** none.
**Key files:** `src/components/ui/{Input,FormField,FormError,SubmitButton,Spinner}.tsx`; `src/lib/validation/` (zod schemas dir); `src/emails/` (React Email base layout + `src/lib/email/send.ts` wrapper around Resend); `src/components/ui/EmptyState.tsx`.
**Tasks (titles):** Input + FormField primitives (TDD); SubmitButton with pending state; FormError/EmptyState/Spinner; Resend send wrapper + base email layout + a render test; a `useFormState`-style server-action result type (`ActionResult`).
**Acceptance:** all primitives unit-tested; `send()` wrapper unit-tested with a mocked Resend; `pnpm test/build/lint` green.

## Phase 1 — Auth & sessions
**Goal:** Email/password + OAuth (Google, Facebook) auth via Supabase Auth, with session handling, route protection, and auth-aware header. *(Detailed plan: `2026-06-29-phase-01-auth.md`.)*
**Depends on:** 0.
**Key files:** `src/lib/auth/{schemas,actions}.ts`; `src/app/(auth)/{login,signup,forgot-password,reset-password}/page.tsx`; `src/app/auth/callback/route.ts`; `src/app/auth/signout/route.ts`; updates to `src/proxy.ts` and `src/components/site/Header.tsx`.
**Tasks:** auth zod schemas; signUp/signIn/signOut/reset server actions; login page; signup page; forgot/reset pages; OAuth buttons + callback route; route protection in proxy; auth-aware Header; email-confirmation handling.
**Acceptance:** sign up → confirm → log in → log out works against live Supabase; `/account/*` redirects to `/login` when signed out; logged-in users redirected off `/login`; Header reflects auth state; profile row auto-created (existing trigger).

## Phase 2 — Cart (guest + authenticated)
**Goal:** Working cart for anonymous and logged-in users, with server-computed totals (fixes the mockup's cart-math issues).
**Depends on:** 0; auth-aware (merges guest cart on login) but not auth-blocked.
**Key files:** `src/lib/cart/{actions,queries,totals}.ts`; `src/components/cart/{CartDrawer,CartLineItem,CartSummary,AddToCartButton}.tsx`; `src/app/(storefront)/cart/page.tsx`; anonymous cart cookie helper `src/lib/cart/session.ts`; cart context/provider for client updates.
**Tasks:** cart-totals pure module (TDD: subtotal/discount/line math in cents); anonymous cart id cookie; add/update/remove server actions (write `cart_items`); cart queries (hydrate with variant/product); AddToCartButton (client) wired to PDP; CartDrawer + CartLineItem + quantity steppers (real `<button>`s, a11y); Cart page; **guest→user cart merge on login** (hook into Phase 1 sign-in); promo-code apply against `discount_codes`.
**Acceptance:** add from PDP/PLP; quantities update; totals recompute server-side and reconcile (subtotal − discount = total); cart persists across reload for guest (cookie) and user (DB); merges on login; promo code validates and applies.

## Phase 3 — Checkout + payments (Stripe Elements)
**Goal:** On-site custom checkout matching `Checkout.dc.html`, taking real card/Apple/Google Pay payments, computing tax, and recording orders.
**Depends on:** 1, 2.
**Key files:** `src/app/(storefront)/checkout/page.tsx`; `src/components/checkout/{ContactForm,ShippingForm,PaymentElement,OrderSummary,ExpressCheckout}.tsx`; `src/app/api/checkout/create-intent/route.ts`; `src/app/api/stripe/webhook/route.ts`; `src/lib/checkout/{shipping,tax}.ts`; `src/lib/orders/write.ts` (service-role); order-confirmation email template.
**Tasks:** address/contact zod + forms; shipping-rate calculation (flat-rate tiers); Stripe **PaymentIntent** create route (server, amount computed server-side from cart — never trust client); **Stripe Tax** line in PaymentIntent; Stripe **Elements** Payment + Express Checkout components; webhook route (verify signature, `payment_intent.succeeded` → write `orders`/`order_items` via `createAdminClient`, mark cart converted, decrement inventory); order-confirmation email (Resend); guest-vs-user order linking by email/user_id; success/`/order/[id]` confirmation page.
**Acceptance:** end-to-end test-mode purchase (guest + logged-in) creates a paid `orders` row via webhook, sends a confirmation email, empties the cart; amounts/tax computed server-side; signature-verified webhook; `stripe trigger`/CLI verified locally.

## Phase 4 — Subscriptions (Stripe Billing)
**Goal:** Subscribe-and-save at checkout + a self-serve management UI (the Subscriptions page).
**Depends on:** 3.
**Key files:** `src/app/(account)/subscriptions/page.tsx`; `src/components/subscriptions/*`; `src/lib/subscriptions/actions.ts`; extend webhook for subscription events; Stripe Products/Prices sync for `subscription_price_cents` → `stripe_sub_price_id`.
**Tasks:** create Stripe recurring Prices for variants + backfill `stripe_sub_price_id`; subscription purchase path in checkout (interval selector); webhook handlers for `customer.subscription.created/updated/deleted` + `invoice.paid/payment_failed` (mirror into `subscriptions`); management UI (pause/skip/cancel/change cadence) via `src/lib/subscriptions/actions.ts`; dunning/past_due surface.
**Acceptance:** subscribe at checkout → `subscriptions` row active; management actions reflect in Stripe + DB; renewal invoice webhook creates a new order; cancel works.

## Phase 5 — Account area
**Goal:** Logged-in dashboard: order history, settings/profile, addresses. (Subscriptions live in Phase 4; Refer in Phase 6.)
**Depends on:** 1, 3.
**Key files:** `src/app/(account)/layout.tsx` (gated + account nav); `src/app/(account)/account/page.tsx`, `.../orders/page.tsx`, `.../orders/[id]/page.tsx`, `.../settings/page.tsx`; `src/lib/account/queries.ts`.
**Tasks:** gated account layout + nav; profile/settings view+update (server actions, RLS-own); order history list + detail (from `orders`/`order_items`); empty states; address management on `profiles`/orders.
**Acceptance:** account pages render only own data (RLS verified); settings update persists; order history matches placed orders; matches `Account.dc.html`/`Order History.dc.html` structure.

## Phase 6 — Referrals ($25 / $25)
**Goal:** Working referral program matching `Refer.dc.html`.
**Depends on:** 1, 3 (rewards as discount credit).
**Key files:** `src/app/(account)/refer/page.tsx`; `src/lib/referrals/{actions,queries}.ts`; referral attribution in signup (Phase 1 hook) and reward issuance in webhook (Phase 3 hook); referral email template.
**Tasks:** surface user's referral code/link (code already minted by the `handle_new_user` trigger); capture `?ref=` on signup → set `referred_by` + create `referrals` row; on referred user's first paid order (webhook) → mark `completed`, issue `$25` discount code to referrer + referee; referral status UI; share/email.
**Acceptance:** referred signup attributes correctly; first purchase issues both rewards once (idempotent); status reflects pending/completed/rewarded.

## Phase 7 — Catalog data correctness
**Goal:** Fix the data defects from the design review and seed real supplement facts. **Independent — can run early.**
**Depends on:** none.
**Key files:** `supabase/migrations/0003_seed_product_facts.sql` (+ corrections); `supabase/migrations/0004_catalog_copy.sql`; source: `design-reference/uploads/*-Label-Transcription.md`.
**Tasks:** reconcile each product's facts from its label transcription; **fix dosage unit errors** (Bloom iodine mg→mcg; Vitamin K2 mg→mcg on Glow Pro & Optimus D3 Mini; rebuild corrupted Vision Pro rows); seed `product_facts` (serving size, rows, other ingredients, warnings); add real `description`/`benefits`/`hero_claims`; assign **unique UPCs** (fix Multi Pro/Glow Pro duplicate); add `*`-to-disclaimer linkage on claims; re-run Supabase security/lint advisors.
**Acceptance:** every active product has a facts row; no mg/mcg outliers; PDP facts table renders; advisors clean; a data-validation test asserts unit sanity (no iodine in mg, etc.).

## Phase 8 — Content system (MDX)
**Goal:** Blog, article, and science/approach pages from MDX, matching `Blogs.dc.html`/`Blog Article.dc.html`.
**Depends on:** 0.
**Key files:** `@next/mdx` config in `next.config.ts`; `content/blog/*.mdx`, `content/science/*.mdx`; `src/lib/content/{posts,mdx}.ts`; `src/app/(storefront)/blog/page.tsx`, `.../blog/[slug]/page.tsx`, `.../science/page.tsx` + subpages; MDX components map.
**Tasks:** MDX pipeline + frontmatter parsing (title, author, date, citations); post index/query; blog listing; article page (TOC, author card, citations — fix the mockup's name/citation mismatches in real content); science/approach/scientists/sustainability pages; **remove DS-01®/Seed competitor references**; wire Header "Learn"/"Science" menus to real routes.
**Acceptance:** blog list + at least 3 real articles render from MDX; science pages render; no 404s from Header/footer content links; no competitor/trademark copy.

## Phase 9 — Legal & compliance pages
**Goal:** Terms, Privacy, Shipping/Returns, cookie consent, accessibility statement.
**Depends on:** 8 (static/MDX rendering).
**Key files:** `src/app/(storefront)/legal/{terms,privacy,shipping-returns,accessibility}/page.tsx`; `src/components/site/CookieConsent.tsx`; footer link wiring.
**Tasks:** legal page content (MDX/static); cookie-consent banner + storage; wire all footer legal links; supplement-marketing disclaimer review pass.
**Acceptance:** all footer legal links resolve; cookie consent persists; FDA disclaimer present site-wide where required.

## Phase 10 — SEO, analytics, observability
**Goal:** Discoverable, measured, monitored.
**Depends on:** pages exist (post 1–8).
**Key files:** `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.tsx`; per-route `generateMetadata`; `src/lib/analytics.ts`; Sentry config; `next.config.ts` `images.remotePatterns` (the deferred review item).
**Tasks:** dynamic sitemap (products + posts) + robots; OG images; canonical/metadata audit; analytics (GA4 or Vercel) + consent-gated; error monitoring (Sentry); structured data (Product/Organization JSON-LD); image host config.
**Acceptance:** sitemap/robots valid; OG previews render; analytics + Sentry receiving events in staging; Lighthouse SEO ≥ 95.

## Phase 11 — Accessibility & QA hardening
**Goal:** WCAG AA pass + end-to-end confidence.
**Depends on:** all UI built.
**Key files:** `e2e/` (Playwright); `playwright.config.ts`; a11y fixes across components (contrast, labels, keyboard nav, the mockup's non-semantic clickable spans, facts-table `<thead>`).
**Tasks:** Playwright setup; e2e happy paths (browse→cart→checkout→order; signup→login; subscribe; refer); axe-core a11y scan + fixes (contrast on footer text, form labels, keyboard menus, focus states); cross-browser/mobile pass.
**Acceptance:** e2e suite green in CI; axe scans clean on key pages; keyboard-only checkout works.

## Phase 12 — Production deploy & launch
**Goal:** Live on a custom domain with production services.
**Depends on:** ALL.
**Key files:** Vercel project config; `.github/workflows/ci.yml`; production env in Vercel/Supabase/Stripe; runbook `docs/RUNBOOK.md`.
**Tasks:** Vercel project + env vars (Supabase, Stripe **live**, Resend, site URL); custom domain + DNS + SSL; Stripe live keys + **production webhook endpoint** + Stripe Tax registration; Supabase prod hardening (backups, rate limits, SMTP for auth emails, redirect URLs); CI (test+build+lint+e2e on PR); seed/migrate prod DB; smoke a real $-test order; launch checklist sign-off.
**Acceptance:** see Definition of Done.

---

## Launch Definition of Done (global)
- [ ] Guest **and** account checkout complete a real (live-mode) order; confirmation email arrives.
- [ ] Subscriptions create, renew (webhook), and cancel.
- [ ] Accounts: signup/login/logout/reset; order history + settings; referrals issue rewards.
- [ ] All nav/footer links resolve (no 404s); blog + science + legal pages live.
- [ ] Catalog data correct (no dosage outliers; facts seeded; unique UPCs).
- [ ] Tax computed at checkout; shipping rates applied; webhooks signature-verified.
- [ ] `pnpm test` + Playwright e2e green in CI; axe a11y clean on key pages.
- [ ] SEO (sitemap/robots/metadata/OG) + analytics + Sentry live.
- [ ] Legal pages + cookie consent published; supplement-claim review signed off.
- [ ] Custom domain + SSL; production Supabase/Stripe/Resend configured; secrets only in env.
- [ ] Runbook + rollback documented.

## Sequencing recommendation
Run **7 (data)** and **8 (content)** in parallel with the commerce path. Commerce critical path: **0 → 1 → 2 → 3**, then **4/5/6** (account-side) in parallel, then **9/10/11**, then **12** last. Each phase = one detailed plan + one subagent-driven execution + review pass before the next.
```
