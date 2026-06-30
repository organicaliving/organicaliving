# Phase V — Visual Fidelity Re-skin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the already-shipped pages as **pixel-faithful replicas** of their `design-reference/*.dc.html` mockups — exact layout, components, spacing, imagery, and interactions — wired to the live data/actions already built, with corrected copy/data.

**Architecture:** Each `.dc.html` mockup is the visual+content SPEC. Porting = translate its inline-styled HTML into a React/Tailwind component tree (keep inline `style={{…}}` where it's faster to be exact; use tokens where they match), replace `<sc-for list="{{ items }}">` loops with `.map()` over **live Supabase data**, replace `{{ bindings }}` with real values/props, and re-implement the `support.js` interactions (nav dropdowns, mobile menu, image lightbox, story marquee, arrow nudge, ViaCap count-up) as small **client components**. Data fetching and Server Actions from Phases 1–3 are reused unchanged — this phase changes presentation only.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind v4 (+ inline styles for exact ports), the fonts already loaded (Sora / League Spartan / Space Mono / Caveat), Vitest + RTL.

## Global Constraints
- Package manager: **pnpm**.
- **Pixel fidelity:** each page must visually match its named `design-reference/<Name>.dc.html` mockup — layout, components, spacing, colors, typography, imagery, and interactions. When in doubt, open the mockup file and reproduce it exactly.
- **Corrected copy/data (fidelity standard):** reproduce the mockup's copy EXCEPT — remove all **DS-01® / Seed** competitor references (replace with Organica Living equivalents or generic copy); fix the **byline/citation** contradictions; wire **dead `#` links** to the real routes that now exist (`/products`, `/products/[slug]`, `/cart`, `/checkout`, `/login`, `/signup`, `/account`); do not invent health claims beyond the mockup. Supplement-facts dosage corrections live in the data layer (Phase 7) — the PDP renders whatever the DB provides.
- **Live data, not mockup hardcode:** product lists/prices/names come from `getActiveProducts`/`getProductBySlug`/`getCart` (already built). Cart/checkout/auth keep their existing Server Actions.
- **Don't break behavior:** every page that already works (add-to-cart, login, checkout, etc.) must still work after re-skin — re-skin is presentation only. Full `pnpm test` stays green; build + lint clean (0 warnings).
- **Interactions** are `"use client"` components; keep server components for data fetching and compose the client pieces inside.
- **One intentional deviation:** the Checkout payment fields are NOT a static replica — the visual frame matches `Checkout.dc.html`, but the actual payment input is the live Stripe **Payment Element** (real payments require it). Match everything around it.
- Verification per page = `pnpm build` + `pnpm lint` + full `pnpm test` green, plus a dev-server render smoke (key copy/sections present). True pixel QA is a side-by-side visual check by the human against the mockup (Playwright visual snapshots arrive in Phase 11) — each task flags what to eyeball.

## File Structure
**Replace/rewrite (presentation):**
- `src/components/site/Header.tsx` + new `src/components/site/nav/*` (dropdown menus, mobile menu — client) + `src/components/site/AnnouncementBar.tsx` + `src/components/site/Footer.tsx`
- `src/app/(storefront)/page.tsx` (Home) + new `src/components/home/*` (hero, ViaCap, product grid, story marquee — as needed)
- `src/app/(storefront)/products/page.tsx` (+ `src/components/catalog/ProductCard.tsx` re-skin)
- `src/app/(storefront)/products/[slug]/page.tsx` + new `src/components/product/*` (claim pills, benefit cards, SupplementFacts, ImageLightbox client)
- `src/app/(storefront)/cart/page.tsx` (+ cart components re-skin)
- `src/app/(storefront)/checkout/page.tsx` + `src/components/checkout/CheckoutForm.tsx` (frame re-skin; keep Payment Element)
- `src/app/(auth)/login/*` + `src/app/(auth)/signup/*` (+ `src/app/(auth)/layout.tsx`)

**Source specs (read-only):** `design-reference/Organica Home.dc.html`, `Products.dc.html`, `Product.dc.html`, `Cart.dc.html`, `Checkout.dc.html`, `Login.dc.html`, `Signup.dc.html`, and `design-reference/support.js` (for interaction behavior). Images already in `public/images/`.

---

## Task 1: Shared chrome — Header (glass dropdowns + mobile menu), AnnouncementBar, Footer

**Files:**
- Rewrite: `src/components/site/Header.tsx`, `src/components/site/AnnouncementBar.tsx`, `src/components/site/Footer.tsx`
- Create: `src/components/site/nav/NavMenus.tsx` (client — Shop/Science/Learn glass dropdown panels + open/close behavior), `src/components/site/nav/MobileMenu.tsx` (client — burger + slide-down)
- Update: `src/components/site/Header.test.tsx` (keep auth-state + cart-count assertions green)

**Spec:** `design-reference/Organica Home.dc.html` (header markup lines ~54–160) + `design-reference/support.js` (`wireNavMenus`, `wireMobileNav` for behavior). The header is consistent across mockups — this is the canonical port.

**Reproduce exactly:**
- Sticky translucent header (`backdrop-filter: blur`), logo (`organica-living-logo.png` — already in `public/`), primary nav **Shop / Science / Learn** as hover/click **glass dropdown panels** (the Shop panel lists products with thumbnails; Science/Learn list their items) — port the panel markup + the open/close/blur transitions from `support.js`.
- The green **announcement bar** above the header.
- Right-side actions: **auth-aware** (keep Phase 1 logic — logged out: Sign In + Get Started; logged in: Account + Sign out) AND the **cart count** (keep Phase 2 `CartCountBadge`), styled to match the mockup.
- **Mobile burger menu** (`data-burger`/`data-mobile-menu`) with the collapsible sections.
- **Footer:** port the forest footer with its columns + the "nature is our thing" signature + the FDA disclaimer (keep the real `Disclaimer` component).

**Keep:** auth state via `getUser()`, `CartCountBadge`. **Correct:** dead `#` nav links → real routes; Shop dropdown product rows → link to real `/products/[slug]`; remove any DS-01®/Seed references.

- [ ] **Step 1: Read the spec** — read `design-reference/Organica Home.dc.html` (header + footer) and the `wireNavMenus`/`wireMobileNav` functions in `design-reference/support.js`.
- [ ] **Step 2: Build the glass dropdown + mobile menu** as `"use client"` components (`NavMenus.tsx`, `MobileMenu.tsx`) reproducing the panel markup, blur/transition styles, and open-on-hover/click + close-on-outside-click behavior.
- [ ] **Step 3: Rewrite `Header.tsx`** (server component) to render AnnouncementBar + the logo + `<NavMenus/>` + auth actions + `<CartCountBadge/>` + `<MobileMenu/>`, matching the mockup layout exactly.
- [ ] **Step 4: Rewrite `Footer.tsx` + `AnnouncementBar.tsx`** to match the mockup.
- [ ] **Step 5: Update `Header.test.tsx`** — keep the logged-out assertions (Shop → `/products`, Get Started → `/signup`) and the supabase/cart mocks; adjust selectors if nav structure changed. Tests green.
- [ ] **Step 6: Verify** — `pnpm test` green; `pnpm build && pnpm lint` clean.
- [ ] **Step 7: Smoke** — dev server: header renders, Shop dropdown markup present (`curl -s / | grep -c "Shop All"` ≥ 1), footer disclaimer present.
- [ ] **Step 8: Commit** — `feat: re-skin header (glass nav), announcement bar, and footer to match mockup`
- [ ] **VISUAL QA (human):** open `design-reference/Organica Home.dc.html` and the running site side by side — header, dropdowns, mobile menu, footer should match.

---

## Task 2: Home page replica

**Files:** Rewrite `src/app/(storefront)/page.tsx`; Create `src/components/home/*` as needed (Hero, ViaCapSection client for the count-up, ProductGrid, StoryMarquee client).
**Spec:** `design-reference/Organica Home.dc.html` (body sections) + `support.js` (`onViaCap` count-up, story marquee keyframes).

**Reproduce exactly:** the hero, the value-prop / "ViaCap"-style section (re-skin its copy to Organica Living — **no DS-01®/Seed, no unsubstantiated "↑11x" stat**; use generic brand copy), the **product grid driven by `getActiveProducts()`** (cards match the mockup), the story/press marquee, and any interstitial sections — in the mockup's order and styling.
**Keep:** `getActiveProducts()`; link CTAs to real routes (`/products`, `/products/[slug]`).

- [ ] **Step 1:** Read `design-reference/Organica Home.dc.html` body + relevant `support.js` interactions.
- [ ] **Step 2:** Implement the section components (client only where animated: count-up, marquee).
- [ ] **Step 3:** Rewrite `page.tsx` (server) to fetch `getActiveProducts()` and compose the sections in mockup order, corrected copy.
- [ ] **Step 4: Verify** — `pnpm build && pnpm lint` clean; full `pnpm test` green.
- [ ] **Step 5: Smoke** — `curl -s http://localhost:3000/ | grep -c "Multi Pro"` ≥ 1; hero copy present.
- [ ] **Step 6: Commit** — `feat: re-skin Home page to match Organica Home mockup`
- [ ] **VISUAL QA (human):** side-by-side vs `Organica Home.dc.html`.

---

## Task 3: Products listing replica

**Files:** Rewrite `src/app/(storefront)/products/page.tsx`; re-skin `src/components/catalog/ProductCard.tsx`.
**Spec:** `design-reference/Products.dc.html`.
**Reproduce:** the featured product banner + the responsive product grid + the category/quiz callouts, exactly. **Keep** `getActiveProducts()`; cards link to real `/products/[slug]`. Correct dead links (quiz CTA → `/products` or a stub noted).

- [ ] **Step 1:** Read `design-reference/Products.dc.html`.
- [ ] **Step 2:** Re-skin `ProductCard` to match the mockup card; rewrite `products/page.tsx` to match the listing layout, live data.
- [ ] **Step 3: Verify** — build + lint + suite green (update `ProductCard.test.tsx` if structure changed, keeping its assertions meaningful).
- [ ] **Step 4: Smoke** — `/products` renders the 9 products.
- [ ] **Step 5: Commit** — `feat: re-skin Products listing to match mockup`
- [ ] **VISUAL QA (human):** vs `Products.dc.html`.

---

## Task 4: Product detail replica (claim pills, benefit cards, Supplement Facts, lightbox)

**Files:** Rewrite `src/app/(storefront)/products/[slug]/page.tsx`; Create `src/components/product/{ClaimPills,BenefitCards,SupplementFacts,ImageLightbox}.tsx` (ImageLightbox is `"use client"`).
**Spec:** `design-reference/Product.dc.html` + `support.js` (lightbox behavior).
**Reproduce:** the PDP hero (image gallery + lightbox, price, AddToCart), claim pills, benefit cards, the **Supplement Facts** styled table, reviews/marketing sections — exactly.
**Keep:** `getProductBySlug()`, the existing `<AddToCartButton variantId={…}/>`, `defaultVariant`. **Supplement Facts** render from `product.facts` (DB) — show the styled table when facts exist, omit gracefully when empty (Phase 7 seeds them). Correct copy; `*`-link claims to the footer FDA disclaimer.

- [ ] **Step 1:** Read `design-reference/Product.dc.html` + the lightbox code in `support.js`.
- [ ] **Step 2:** Build the product sub-components (ClaimPills/BenefitCards/SupplementFacts presentational; ImageLightbox client).
- [ ] **Step 3:** Rewrite `[slug]/page.tsx` to compose them with live data, keeping `AddToCartButton` and `notFound()`.
- [ ] **Step 4: Verify** — build + lint + suite green.
- [ ] **Step 5: Smoke** — `/products/multi-pro` renders name + Add to Cart + FDA disclaimer.
- [ ] **Step 6: Commit** — `feat: re-skin Product detail page to match mockup`
- [ ] **VISUAL QA (human):** vs `Product.dc.html`.

---

## Task 5: Cart replica

**Files:** Rewrite `src/app/(storefront)/cart/page.tsx`; re-skin `src/components/cart/{CartLineItem,CartSummary,QuantityStepper}.tsx`.
**Spec:** `design-reference/Cart.dc.html`.
**Reproduce:** the cart line-item rows, the order summary panel, promo field, "you might also like" upsells, exactly. **Keep** `getCart()` + the existing cart Server Actions (add/update/remove/promo). Wire upsells to real products. Make the cart-math display reconcile (the review flagged the mockup's math as inconsistent — use the real server totals).

- [ ] **Step 1:** Read `design-reference/Cart.dc.html`.
- [ ] **Step 2:** Re-skin the cart components + page to match, keeping the Server Actions + `CartSummary.test.tsx` green.
- [ ] **Step 3: Verify** — build + lint + suite green.
- [ ] **Step 4: Smoke** — `/cart` empty state + (with item) line item render.
- [ ] **Step 5: Commit** — `feat: re-skin Cart to match mockup`
- [ ] **VISUAL QA (human):** vs `Cart.dc.html`.

---

## Task 6: Checkout replica (frame matches mockup; Payment Element kept)

**Files:** Rewrite `src/app/(storefront)/checkout/page.tsx`; re-skin `src/components/checkout/CheckoutForm.tsx`.
**Spec:** `design-reference/Checkout.dc.html`.
**Reproduce:** the checkout layout — contact, delivery/address, shipping, order summary, the express-pay buttons frame — exactly. **Intentional deviation:** the card-entry area uses the live Stripe **Payment Element** (not the mockup's static fields); style its container to fit. **Keep** the `/api/checkout` POST flow + `confirmPayment`.

- [ ] **Step 1:** Read `design-reference/Checkout.dc.html`.
- [ ] **Step 2:** Re-skin the form + page to match the mockup layout; keep the two-step (details → Payment Element) flow and the order summary.
- [ ] **Step 3: Verify** — build + lint + suite green.
- [ ] **Step 4: Smoke** — empty cart `/checkout` → `/cart`; with item, form renders.
- [ ] **Step 5: Commit** — `feat: re-skin Checkout to match mockup (Payment Element retained)`
- [ ] **VISUAL QA (human):** vs `Checkout.dc.html`.

---

## Task 7: Login + Signup replicas

**Files:** Rewrite `src/app/(auth)/login/{page,LoginForm}.tsx`, `src/app/(auth)/signup/{page,SignupForm}.tsx`, `src/app/(auth)/layout.tsx`.
**Spec:** `design-reference/Login.dc.html`, `design-reference/Signup.dc.html`.
**Reproduce:** the auth page layouts (split/branded panels, social buttons, field styling) exactly. **Keep** the Phase 1 Server Actions (`signInAction`/`signUpAction`/OAuth), `useActionState`, field validation, referral `?ref=` capture. Add the proper input labels/`autocomplete` the mockup omitted (accessibility — an improvement, not a deviation). Match social providers to what the mockup shows (reconcile Login vs Signup provider mismatch → show the same set).

- [ ] **Step 1:** Read both mockups.
- [ ] **Step 2:** Re-skin layout + both forms, keeping the actions + `fieldError` wiring + OAuth buttons.
- [ ] **Step 3: Verify** — build + lint + suite green.
- [ ] **Step 4: Smoke** — `/login` and `/signup` render their headings + fields.
- [ ] **Step 5: Commit** — `feat: re-skin Login and Signup to match mockups`
- [ ] **VISUAL QA (human):** vs `Login.dc.html` / `Signup.dc.html`.

---

## Task 8: Full verification & push

- [ ] **Step 1:** `pnpm test` → full suite green.
- [ ] **Step 2:** `pnpm build && pnpm lint` → clean; all routes present.
- [ ] **Step 3:** Dev-server pass over `/`, `/products`, `/products/multi-pro`, `/cart`, `/checkout` (with item), `/login`, `/signup` — each renders without error.
- [ ] **Step 4: Push** the branch.
- [ ] **Step 5: HUMAN VISUAL QA SWEEP:** open each `design-reference/*.dc.html` beside the matching running route and confirm the replica. Log any pixel deltas as follow-up fixes.

---

## Self-Review
- **Scope:** re-skins the 7 already-shipped page groups (chrome, Home, Products, Product, Cart, Checkout, Login/Signup) to match mockups; mockup-only pages (Account, Order History, Subscriptions, Refer, Blog, Design System) are built as replicas in their later functional phases under the standing fidelity standard. ✅
- **Behavior preserved:** data fetching + Server Actions from Phases 1–3 are reused; full suite stays green; re-skin is presentation-only. ✅
- **Corrected copy:** DS-01®/Seed removed, dead links wired, contradictions fixed, dosage corrections deferred to the DB (Phase 7); claims tied to the FDA disclaimer. ✅
- **One declared deviation:** Checkout payment uses the live Stripe Payment Element, not the mockup's static fields. ✅
- **Verification honesty:** automated = build/lint/suite + render smoke; true pixel-match is human side-by-side QA (Playwright visual snapshots come in Phase 11). Each task flags the QA target. This is the one phase where "looks exactly like the mockup" cannot be fully machine-verified here, so human QA is in the loop by design. ✅
- **Porting method, not placeholders:** the "complete code" for a 1:1 port is the `.dc.html` file in the repo; tasks direct the implementer to port it exactly (inline styles → JSX, `sc-for` → live-data `.map()`, `{{ }}` → values, `support.js` behaviors → client components) rather than inlining 30–68KB of HTML per task into this plan.
