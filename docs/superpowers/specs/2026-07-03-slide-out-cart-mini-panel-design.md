# Slide-out cart mini-panel — design

**Date:** 2026-07-03
**Status:** Approved (brainstorming) — pending implementation plan
**Reference mockup:** `design-reference/uploads/slide-out-cart-mini-panel-sample.png`

## Problem

On mobile, adding a product to the cart gives no visible feedback: the only cart
indicator ([CartCountBadge](../../../src/components/cart/CartCountBadge.tsx)) lives inside
the `data-desktop-actions` cluster, which [globals.css](../../../src/app/globals.css) hides
(`display:none !important`) below 900px. So on mobile there is **no cart affordance at all**
— for guests or signed-in users. (Guest carts already work and are already auth-agnostic via
[getCart()](../../../src/lib/cart/queries.ts); the gap is purely visibility/placement, not auth.)

## Goal

Add a persistent cart affordance and a **functional slide-out cart mini-panel** that opens when
the user clicks the cart affordance, on desktop and mobile alike, replicating the reference
mockup's structure using the existing design system and cart components.

## Decisions (from brainstorming)

- **Trigger:** click the cart affordance (desktop text-"Cart" badge; new mobile cart icon).
  Opens the drawer instead of navigating.
- **Auto-open on add:** **No.** Adding a product makes the icon appear + bump its counter; the
  user taps it to open. (Click-to-open only.)
- **Empty state:** the cart affordance is **hidden at 0 items** (nothing to open when empty).
- **Icon feedback:** subtle **pop-in** on first appearance + a **bump** each time the count changes.
- **Fidelity vs. canon:** replicate the mockup's *layout/treatments*, but populate with our real
  products and vitamin voice. **Omit** the fictional "Glass Travel Vial — Bonus gift — FREE" line
  (no free-gift mechanism in the cart model; brand canon forbids inventing one). Do not use the
  mockup's `PM-02`/`DM-02` competitor names.

## Architecture

The panel content is **server-rendered and always in the DOM**, toggled by client state — the
same pattern [MobileMenu](../../../src/components/site/nav/MobileMenu.tsx) already uses (always
rendered; shown via `opacity`/`transform`/`pointerEvents` gated on `open`). This lets the panel
reuse the existing cart **server-components verbatim** and inherit their "re-render in place after
each server action" behavior: a stepper action inside the drawer triggers Next's post-action
router refresh → the server tree (Header → panel body) re-renders with new data → the client
drawer's `open` state is preserved, so the drawer stays open and its contents update. This is the
same mechanism the `/cart` page steppers already rely on.

### New files

- **`src/components/ui/CartIcon.tsx`** — inline-SVG cart glyph, `size` prop, `currentColor`, same
  pattern as [ArrowRight.tsx](../../../src/components/ui/ArrowRight.tsx). The design-system piece.
- **`src/components/cart/CartDrawerProvider.tsx`** (`"use client"`) — React context holding
  `open: boolean` + `open()` / `close()`. Wraps the header so triggers and the panel share state.
- **`src/components/cart/CartTrigger.tsx`** (`"use client"`) — wraps its children in a real
  `<a href="/cart">` whose `onClick` calls `preventDefault()` + `open()`. No-JS / SEO fallback:
  the link resolves to the full `/cart` page.
- **`src/components/cart/CartDrawer.tsx`** (`"use client"`) — overlay + right-sliding panel shell.
  Renders the server body passed as `children`. Handles Esc, outside-click, body scroll-lock,
  focus management, and the slide/fade transition (same easing as `MobileMenu`).
- **`src/components/cart/CartDrawerBody.tsx`** (server) — the mini-panel layout (see below),
  composing [CartQtyStepper](../../../src/components/cart/CartQtyStepper.tsx),
  [CartPromo](../../../src/components/cart/CartPromo.tsx),
  [CartRecommendationAdd](../../../src/components/cart/CartRecommendationAdd.tsx),
  [CartDeliveryUpgrade](../../../src/components/cart/CartDeliveryUpgrade.tsx), and
  [formatPrice](../../../src/lib/format.ts). Receives the already-fetched `cart` + `recs`.

### Modified files

- **[Header.tsx](../../../src/components/site/Header.tsx)** — call `getCart()` **once**; fetch
  recommendations only when the cart is non-empty (wrap the catalog read in React `cache` so
  repeat calls are free); wrap the header contents in `CartDrawerProvider`; render the desktop
  badge and a new mobile cart icon as `CartTrigger`s; render
  `<CartDrawer><CartDrawerBody cart={cart} recs={recs} /></CartDrawer>`. (Server component passing
  a server child into a client component as `children` — valid.)
- **[CartCountBadge.tsx](../../../src/components/cart/CartCountBadge.tsx)** — take `itemCount` as a
  **prop** (Header already has it; removes the duplicate `getCart()` call) and render as the
  desktop trigger content ("Cart" + counter pill). Still returns `null` at 0.
- **Mobile cart icon** — a `CartTrigger` wrapping `CartIcon` + a counter bubble (reusing the
  [Badge](../../../src/components/ui/Badge.tsx) style), shown only ≤900px via a new
  `data-mobile-cart` hook (mirrors the existing `data-desktop-actions` / `data-burger` rules).
  Counter bubble carries `key={itemCount}` so React swaps the node on change → replays the CSS
  `bump` keyframe; the icon's `pop-in` plays on mount.
- **[MobileMenu.tsx](../../../src/components/site/nav/MobileMenu.tsx)** — accept `itemCount`; when
  `> 0`, render a "View cart (N)" row under the top bar (tab-independent) that closes the menu and
  opens the cart drawer.
- **[globals.css](../../../src/app/globals.css)** — `data-mobile-cart` show/hide rules alongside
  the `@media (max-width:900px)` block, plus `pop-in` and `bump` keyframes.

## Panel layout (CartDrawerBody)

Right-anchored panel: ~400–420px wide on desktop; ≤90vw (max 420px) on mobile. Cream `#fcfcf7`.
Top-to-bottom, matching the mockup:

1. **Header row** — "Your Cart" + close × (round `#e4e2da` button).
2. **Free-shipping banner** — bracketed `【 … 】` bar with a package glyph + "You're getting free
   shipping" on `#f4f1e6`. Truthful: shipping is free on every order
   (per [CheckoutExperience](../../../src/components/checkout/CheckoutExperience.tsx)).
3. **Line items** (scrollable) — per line: 96²-ish image, product name (links to PDP),
   "Delivered monthly" / "Delivered every 3 months" / one-time variant title, an "$X off today"
   green highlight (`#e7f0c8`/`#1c3a13`) when `regularUnitCents·qty − lineCents > 0`, price +
   strikethrough regular, and a `− n +` [CartQtyStepper](../../../src/components/cart/CartQtyStepper.tsx).
   Subscription lines also render [CartDeliveryUpgrade](../../../src/components/cart/CartDeliveryUpgrade.tsx).
4. **Bundle + Save recommendation** — a **single** rec card (first active product not in cart)
   reusing [CartRecommendationAdd](../../../src/components/cart/CartRecommendationAdd.tsx). Heading
   grounded in the real subscription savings, not a hard-coded "25%".
5. **Promo Code** — [CartPromo](../../../src/components/cart/CartPromo.tsx) verbatim.
6. **Sticky footer** — Discounts (green `−$X` when `discountCents > 0`), **Total**, "Shipping +
   taxes calculated at checkout", and a full-width forest `#1c3a13` **Checkout** `<Link href="/checkout">`.
7. **Empty state** — if the cart empties while open (last item decremented to 0), show a small
   "Your cart is empty" + "Shop products" link; the drawer stays open, and the header icon
   disappears on the refresh.

## Kept / out of scope

- `/cart` full page **stays** (no-JS fallback + direct navigation + SEO).
- No free-gift/bonus-item mechanism (mockup's "Glass Travel Vial" line omitted).
- No change to the cart data model, server actions, checkout, or the desktop badge's copy.

## Verification (per repo rules)

- `npx next build` passes; `npx eslint <changed files>` clean.
- `npm run test` passes; add unit tests for `CartIcon` render, `CartCountBadge({itemCount})`, and
  drawer open/close + Esc/outside-click (mirroring [Header.test.tsx](../../../src/components/site/Header.test.tsx)
  and [ProductCard.test.tsx](../../../src/components/catalog/ProductCard.test.tsx)).
- **Rendered-HTML grep** of a served page (`next start` → `curl` → grep): confirm exactly one
  panel, the "Your Cart" / free-shipping / Checkout markup, and **real product data** in the line
  rows (not `PM-02`/`DM-02`, no "Glass Travel Vial").
- `npm run audit:responsive` clean; add any new static route/state as needed and confirm the panel
  doesn't overflow at ≤520px with the drawer open.
