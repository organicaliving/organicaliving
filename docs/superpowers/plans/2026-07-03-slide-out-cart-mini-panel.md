# Slide-out Cart Mini-Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a persistent cart affordance (desktop badge + mobile icon) that slides open a functional cart mini-panel — on desktop and mobile — replicating `design-reference/uploads/slide-out-cart-mini-panel-sample.png` with the existing design system and cart components.

**Architecture:** The panel content is server-rendered inside `Header` and always present in the DOM; a client React context (`CartDrawerProvider`) toggles its visibility via CSS transforms — the same always-in-DOM overlay pattern `MobileMenu` already uses. This reuses the existing cart server-components verbatim, so they re-render in place after each cart server action (Next's post-action router refresh re-renders `Header` → panel, while the client `open` state is preserved). Clicking the affordance opens the drawer; a real `<a href="/cart">` is the no-JS fallback.

**Tech Stack:** Next.js 16 (App Router, RSC), React 19, TypeScript, inline styles + `globals.css` data-hooks (not Tailwind for these surfaces), Vitest + @testing-library/react (jsdom), server actions.

## Global Constraints

- **Verification before "done":** `npx next build` passes; `npx eslint <changed files>` clean; `npm run test` passes; rendered-HTML grep confirms output; `npm run audit:responsive` clean. (CLAUDE.md → Definition of done.)
- **Mockup fidelity = rendered-HTML grep**, never screenshots. (CLAUDE.md → Mockup replication rule.)
- **Brand canon:** vitamin/supplement voice; populate with real products (never `PM-02`/`DM-02`); **omit** the fictional "Glass Travel Vial — Bonus gift — FREE" line (no free-gift mechanism). Free-shipping banner is truthful (shipping is free on every order).
- **Design tokens (exact):** cream panel `#fcfcf7`; forest CTA `#1c3a13`; green highlight chip bg `#e7f0c8` / text `#1c3a13`; strikethrough `#9a9a8e`; borders `#ece9de` / `#d7d3c6`; secondary bg `#f4f1e6`; muted text `#6d6d6d`.
- **Inline-styled surfaces** use `data-*` hooks wired in `src/app/globals.css`; mirror the existing `data-desktop-actions` / `data-burger` `@media (max-width:900px)` rules — do not invent Tailwind for the header.
- **Tests:** use `fireEvent` from `@testing-library/react` (no `user-event` dependency). `server-only` is aliased to a stub by `vitest.config.ts`.
- Commit after every task with a `feat:`/`test:`/`style:` message ending:
  `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`

---

## File Structure

**New**
- `src/components/ui/CartIcon.tsx` — inline-SVG cart glyph (design-system piece).
- `src/components/cart/CartDrawerProvider.tsx` (`"use client"`) — open-state context + `useCartDrawer()` hook.
- `src/components/cart/CartTrigger.tsx` (`"use client"`) — `<a href="/cart">` that opens the drawer on plain click.
- `src/components/cart/CartDrawer.tsx` (`"use client"`) — overlay + sliding panel shell (header, scroll area, footer slot, Esc, scroll-lock, close-on-route-change).
- `src/components/cart/CartDrawerBody.tsx` (server, async) — panel scroll content (banner, line items, recommendation, promo, empty state).
- `src/components/cart/CartDrawerFooter.tsx` (server) — sticky footer (discounts, total, checkout).

**Modified**
- `src/components/cart/CartCountBadge.tsx` — take `itemCount` prop instead of calling `getCart()`.
- `src/components/site/Header.tsx` — fetch cart once; wrap in provider; render desktop + mobile triggers and the drawer.
- `src/components/site/nav/MobileMenu.tsx` — accept `itemCount`; add a "View cart (N)" row that opens the drawer.
- `src/app/globals.css` — `data-mobile-cart` show/hide + `og-pop-in` / `og-bump` keyframes.
- `src/components/site/Header.test.tsx` — update mocks for the new children.

---

### Task 1: CartIcon (design-system glyph)

**Files:**
- Create: `src/components/ui/CartIcon.tsx`
- Test: `src/components/ui/CartIcon.test.tsx`

**Interfaces:**
- Produces: `CartIcon({ size?: number; strokeWidth?: number }): JSX.Element` — renders an `<svg role/aria-hidden>` shopping-cart glyph using `currentColor`.
- Consumes: nothing.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/ui/CartIcon.test.tsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { CartIcon } from "@/components/ui/CartIcon";

describe("CartIcon", () => {
  it("renders an svg sized by the size prop with currentColor stroke", () => {
    const { container } = render(<CartIcon size={30} />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("width", "30");
    expect(svg).toHaveAttribute("height", "30");
    expect(svg).toHaveAttribute("stroke", "currentColor");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/ui/CartIcon.test.tsx`
Expected: FAIL — cannot resolve `@/components/ui/CartIcon`.

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/components/ui/CartIcon.tsx
/**
 * CartIcon — inline Lucide `shopping-cart` (lucide.dev, ISC), rendered inline to
 * match the icon pattern in ArrowRight / CheckoutExperience. Uses currentColor so
 * the host controls colour.
 */
export function CartIcon({
  size = 22,
  strokeWidth = 1.6,
}: {
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/ui/CartIcon.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/CartIcon.tsx src/components/ui/CartIcon.test.tsx
git commit -m "feat: add CartIcon design-system glyph

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: CartDrawerProvider (open-state context)

**Files:**
- Create: `src/components/cart/CartDrawerProvider.tsx`
- Test: `src/components/cart/CartDrawerProvider.test.tsx`

**Interfaces:**
- Produces:
  - `CartDrawerProvider({ children }): JSX.Element` — client context provider.
  - `useCartDrawer(): { open: boolean; openDrawer: () => void; closeDrawer: () => void }` — throws if used outside the provider.
- Consumes: nothing.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/cart/CartDrawerProvider.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CartDrawerProvider, useCartDrawer } from "@/components/cart/CartDrawerProvider";

function Probe() {
  const { open, openDrawer, closeDrawer } = useCartDrawer();
  return (
    <div>
      <span data-testid="state">{open ? "open" : "closed"}</span>
      <button onClick={openDrawer}>open</button>
      <button onClick={closeDrawer}>close</button>
    </div>
  );
}

describe("CartDrawerProvider", () => {
  it("starts closed and toggles open/closed", () => {
    render(
      <CartDrawerProvider>
        <Probe />
      </CartDrawerProvider>,
    );
    expect(screen.getByTestId("state")).toHaveTextContent("closed");
    fireEvent.click(screen.getByText("open"));
    expect(screen.getByTestId("state")).toHaveTextContent("open");
    fireEvent.click(screen.getByText("close"));
    expect(screen.getByTestId("state")).toHaveTextContent("closed");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/cart/CartDrawerProvider.test.tsx`
Expected: FAIL — cannot resolve module.

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/components/cart/CartDrawerProvider.tsx
"use client";
import { createContext, useCallback, useContext, useState } from "react";

type CartDrawerContextValue = {
  open: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const CartDrawerContext = createContext<CartDrawerContextValue | null>(null);

export function useCartDrawer(): CartDrawerContextValue {
  const ctx = useContext(CartDrawerContext);
  if (!ctx) throw new Error("useCartDrawer must be used within CartDrawerProvider");
  return ctx;
}

export function CartDrawerProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openDrawer = useCallback(() => setOpen(true), []);
  const closeDrawer = useCallback(() => setOpen(false), []);
  return (
    <CartDrawerContext.Provider value={{ open, openDrawer, closeDrawer }}>
      {children}
    </CartDrawerContext.Provider>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/cart/CartDrawerProvider.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/cart/CartDrawerProvider.tsx src/components/cart/CartDrawerProvider.test.tsx
git commit -m "feat: add CartDrawerProvider open-state context

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: CartTrigger (click-to-open link)

**Files:**
- Create: `src/components/cart/CartTrigger.tsx`
- Test: `src/components/cart/CartTrigger.test.tsx`

**Interfaces:**
- Consumes: `useCartDrawer()` (Task 2).
- Produces: `CartTrigger(props): JSX.Element` where `props = { children: React.ReactNode } & Omit<React.ComponentProps<"a">, "href" | "ref">`. Renders `<a href="/cart">`; a plain left-click calls `preventDefault()` + `openDrawer()`; modified clicks (meta/ctrl/shift/alt/middle) fall through to normal navigation. Extra props (e.g. `data-mobile-cart`, `style`, `aria-label`) spread onto the anchor. Uses `next/link`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/cart/CartTrigger.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CartDrawerProvider, useCartDrawer } from "@/components/cart/CartDrawerProvider";
import { CartTrigger } from "@/components/cart/CartTrigger";

function State() {
  const { open } = useCartDrawer();
  return <span data-testid="state">{open ? "open" : "closed"}</span>;
}

describe("CartTrigger", () => {
  it("renders an anchor to /cart", () => {
    render(
      <CartDrawerProvider>
        <CartTrigger aria-label="Cart">Cart</CartTrigger>
      </CartDrawerProvider>,
    );
    expect(screen.getByRole("link", { name: "Cart" })).toHaveAttribute("href", "/cart");
  });

  it("opens the drawer on a plain click instead of navigating", () => {
    render(
      <CartDrawerProvider>
        <State />
        <CartTrigger>Cart</CartTrigger>
      </CartDrawerProvider>,
    );
    expect(screen.getByTestId("state")).toHaveTextContent("closed");
    const link = screen.getByText("Cart");
    const evt = fireEvent.click(link);
    // fireEvent.click returns false when preventDefault was called.
    expect(evt).toBe(false);
    expect(screen.getByTestId("state")).toHaveTextContent("open");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/cart/CartTrigger.test.tsx`
Expected: FAIL — cannot resolve module.

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/components/cart/CartTrigger.tsx
"use client";
import Link from "next/link";
import { useCartDrawer } from "@/components/cart/CartDrawerProvider";

type Props = { children: React.ReactNode } & Omit<
  React.ComponentProps<"a">,
  "href" | "ref"
>;

export function CartTrigger({ children, onClick, ...rest }: Props) {
  const { openDrawer } = useCartDrawer();
  return (
    <Link
      href="/cart"
      onClick={(e) => {
        onClick?.(e);
        // Let modified / middle clicks open the real /cart page in a new tab.
        if (
          e.defaultPrevented ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          e.button === 1
        ) {
          return;
        }
        e.preventDefault();
        openDrawer();
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/cart/CartTrigger.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/cart/CartTrigger.tsx src/components/cart/CartTrigger.test.tsx
git commit -m "feat: add CartTrigger click-to-open link

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: CartDrawer (overlay + sliding panel shell)

**Files:**
- Create: `src/components/cart/CartDrawer.tsx`
- Test: `src/components/cart/CartDrawer.test.tsx`

**Interfaces:**
- Consumes: `useCartDrawer()` (Task 2); `usePathname` from `next/navigation`.
- Produces: `CartDrawer({ children, footer }): JSX.Element` where `children: React.ReactNode` (scroll content) and `footer?: React.ReactNode` (sticky footer). Renders a dimmed overlay + a right-anchored `<aside role="dialog" aria-modal aria-label="Your Cart" data-cart-drawer>` with a "Your Cart" header row + close button, a scrollable middle, and the footer slot. `aria-hidden` reflects closed state. Esc and overlay-click close it; opening locks body scroll; a pathname change closes it (so soft navigations don't leave it open over the next page).

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/cart/CartDrawer.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

import { CartDrawerProvider, useCartDrawer } from "@/components/cart/CartDrawerProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";

function Opener() {
  const { openDrawer } = useCartDrawer();
  return <button onClick={openDrawer}>open</button>;
}

function setup() {
  return render(
    <CartDrawerProvider>
      <Opener />
      <CartDrawer footer={<div>FOOTER</div>}>
        <div>PANEL CONTENT</div>
      </CartDrawer>
    </CartDrawerProvider>,
  );
}

describe("CartDrawer", () => {
  it("is hidden until opened, then shows content and footer", () => {
    setup();
    const panel = screen.getByRole("dialog", { hidden: true });
    expect(panel).toHaveAttribute("aria-hidden", "true");
    fireEvent.click(screen.getByText("open"));
    expect(panel).toHaveAttribute("aria-hidden", "false");
    expect(screen.getByText("PANEL CONTENT")).toBeInTheDocument();
    expect(screen.getByText("FOOTER")).toBeInTheDocument();
  });

  it("closes on Escape", () => {
    setup();
    fireEvent.click(screen.getByText("open"));
    const panel = screen.getByRole("dialog", { hidden: true });
    expect(panel).toHaveAttribute("aria-hidden", "false");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(panel).toHaveAttribute("aria-hidden", "true");
  });

  it("closes on the close button", () => {
    setup();
    fireEvent.click(screen.getByText("open"));
    fireEvent.click(screen.getByRole("button", { name: "Close cart" }));
    expect(screen.getByRole("dialog", { hidden: true })).toHaveAttribute("aria-hidden", "true");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/cart/CartDrawer.test.tsx`
Expected: FAIL — cannot resolve module.

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/components/cart/CartDrawer.tsx
"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCartDrawer } from "@/components/cart/CartDrawerProvider";

export function CartDrawer({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const { open, closeDrawer } = useCartDrawer();
  const pathname = usePathname();

  // Close on soft navigation so the drawer never lingers over the next page.
  useEffect(() => {
    closeDrawer();
  }, [pathname, closeDrawer]);

  // Esc to close + body scroll-lock while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, closeDrawer]);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={closeDrawer}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "rgba(0,0,0,0.35)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity .3s cubic-bezier(0.75,0,0.25,1)",
        }}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your Cart"
        aria-hidden={open ? "false" : "true"}
        data-cart-drawer
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 201,
          width: "min(420px, 92vw)",
          background: "#fcfcf7",
          boxShadow: "-30px 0 60px rgba(0,0,0,0.18)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          pointerEvents: open ? "auto" : "none",
          transition: "transform .34s cubic-bezier(0.75,0,0.25,1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "22px 24px 16px",
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 300, letterSpacing: "-0.01em", color: "#1c3a13" }}>
            Your Cart
          </span>
          <button
            type="button"
            aria-label="Close cart"
            onClick={closeDrawer}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "none",
              background: "#e4e2da",
              color: "#1a1a1a",
              fontSize: 20,
              lineHeight: 1,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            &times;
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 24px" }}>{children}</div>

        {footer ? <div style={{ flexShrink: 0 }}>{footer}</div> : null}
      </aside>
    </>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/cart/CartDrawer.test.tsx`
Expected: PASS (all three cases).

- [ ] **Step 5: Commit**

```bash
git add src/components/cart/CartDrawer.tsx src/components/cart/CartDrawer.test.tsx
git commit -m "feat: add CartDrawer overlay + sliding panel shell

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: CartDrawerFooter (sticky totals + checkout)

**Files:**
- Create: `src/components/cart/CartDrawerFooter.tsx`
- Test: `src/components/cart/CartDrawerFooter.test.tsx`

**Interfaces:**
- Consumes: `CartView` from `@/lib/cart/types`; `formatPrice` from `@/lib/format`.
- Produces: `CartDrawerFooter({ cart }: { cart: CartView }): JSX.Element` — renders a Discounts row (only when `cart.discountCents > 0`), a **Total** row (`cart.totalCents`), the caption "Shipping + taxes calculated at checkout", and a full-width forest **Checkout** `<Link href="/checkout">`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/cart/CartDrawerFooter.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CartDrawerFooter } from "@/components/cart/CartDrawerFooter";
import type { CartView } from "@/lib/cart/types";

const base: CartView = {
  lines: [],
  itemCount: 2,
  subtotalCents: 17500,
  discountCents: 4371,
  totalCents: 13125,
  code: "BUNDLE25",
  currency: "usd",
};

describe("CartDrawerFooter", () => {
  it("shows total, discount and a checkout link", () => {
    render(<CartDrawerFooter cart={base} />);
    expect(screen.getByText("$131.25")).toBeInTheDocument();
    expect(screen.getByText("−$43.71")).toBeInTheDocument();
    expect(screen.getByText("Shipping + taxes calculated at checkout")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Checkout" })).toHaveAttribute("href", "/checkout");
  });

  it("hides the discount row when there is no discount", () => {
    render(<CartDrawerFooter cart={{ ...base, discountCents: 0, code: null }} />);
    expect(screen.queryByText("Discounts")).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/cart/CartDrawerFooter.test.tsx`
Expected: FAIL — cannot resolve module.

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/components/cart/CartDrawerFooter.tsx
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { CartView } from "@/lib/cart/types";

/** Sticky footer of the cart mini-panel: discounts, total, checkout. */
export function CartDrawerFooter({ cart }: { cart: CartView }) {
  return (
    <div style={{ borderTop: "1px solid #ece9de", padding: "18px 24px 24px", background: "#fcfcf7" }}>
      {cart.discountCents > 0 ? (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 14, color: "#1a1a1a" }}>Discounts</span>
          <span style={{ fontSize: 13, color: "#1c3a13", background: "#e7f0c8", padding: "3px 10px", borderRadius: 6 }}>
            −{formatPrice(cart.discountCents, cart.currency)}
          </span>
        </div>
      ) : null}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: 20, fontWeight: 600 }}>Total</span>
        <span style={{ fontSize: 20, fontWeight: 600 }}>{formatPrice(cart.totalCents, cart.currency)}</span>
      </div>
      <div style={{ fontSize: 12, color: "#6d6d6d", marginTop: 6 }}>
        Shipping + taxes calculated at checkout
      </div>
      <Link
        href="/checkout"
        style={{
          lineHeight: 1,
          display: "block",
          textAlign: "center",
          width: "100%",
          padding: "19px 0",
          marginTop: 18,
          fontSize: 15,
          fontWeight: 500,
          color: "#fcfcf7",
          background: "#1c3a13",
          borderRadius: 40,
          textDecoration: "none",
        }}
      >
        Checkout
      </Link>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/cart/CartDrawerFooter.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/cart/CartDrawerFooter.tsx src/components/cart/CartDrawerFooter.test.tsx
git commit -m "feat: add CartDrawerFooter sticky totals + checkout

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: CartDrawerBody (panel scroll content)

**Files:**
- Create: `src/components/cart/CartDrawerBody.tsx`
- Test: `src/components/cart/CartDrawerBody.test.tsx`

**Interfaces:**
- Consumes: `CartView` from `@/lib/cart/types`; `getActiveProducts` from `@/lib/catalog`; `defaultVariant` from `@/lib/products`; `formatPrice`, `imageUrl` from `@/lib/format`; `CartQtyStepper`, `CartDeliveryUpgrade`, `CartPromo`, `CartRecommendationAdd` (existing).
- Produces: `async CartDrawerBody({ cart }: { cart: CartView }): Promise<JSX.Element>` — renders (in order): the free-shipping banner; either an empty-state (when `cart.lines.length === 0`) or the line-item rows; a single "Bundle + Save {n}%" recommendation (first active product not already in the cart) when the cart is non-empty; and the `CartPromo` control. Line rows show image → PDP link, product name, delivery/variant subtitle, an "$X off today" green highlight when `regularUnitCents·qty − lineCents > 0`, price + strikethrough regular, and `CartQtyStepper`; subscription lines also render `CartDeliveryUpgrade`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/cart/CartDrawerBody.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { CartView } from "@/lib/cart/types";

// Isolate layout: stub the action-bound child components and catalog data.
vi.mock("@/components/cart/CartQtyStepper", () => ({
  CartQtyStepper: () => <div data-testid="stepper" />,
}));
vi.mock("@/components/cart/CartDeliveryUpgrade", () => ({
  CartDeliveryUpgrade: () => <div data-testid="upgrade" />,
}));
vi.mock("@/components/cart/CartPromo", () => ({
  CartPromo: () => <div data-testid="promo" />,
}));
vi.mock("@/components/cart/CartRecommendationAdd", () => ({
  CartRecommendationAdd: () => <div data-testid="rec-add" />,
}));
vi.mock("@/lib/catalog", () => ({ getActiveProducts: vi.fn(async () => []) }));
vi.mock("@/lib/products", () => ({ defaultVariant: () => null }));

import { CartDrawerBody } from "@/components/cart/CartDrawerBody";

const line = {
  variantId: "v1",
  productSlug: "multi-pro",
  productName: "Multi Pro",
  variantTitle: "60 capsules",
  imagePath: "images/multi-pro.webp",
  unitCents: 3000,
  regularUnitCents: 3999,
  quantity: 1,
  purchaseType: "subscription" as const,
  interval: "monthly" as const,
  lineCents: 3000,
};

const cart: CartView = {
  lines: [line],
  itemCount: 1,
  subtotalCents: 3000,
  discountCents: 0,
  totalCents: 3000,
  code: null,
  currency: "usd",
};

describe("CartDrawerBody", () => {
  it("renders the free-shipping banner, line item, off-today savings and promo", async () => {
    render(await CartDrawerBody({ cart }));
    expect(screen.getByText(/free shipping/i)).toBeInTheDocument();
    expect(screen.getByText("Multi Pro")).toBeInTheDocument();
    expect(screen.getByText(/off today/i)).toBeInTheDocument();
    expect(screen.getByTestId("stepper")).toBeInTheDocument();
    expect(screen.getByTestId("promo")).toBeInTheDocument();
  });

  it("shows an empty state when the cart has no lines", async () => {
    render(await CartDrawerBody({ cart: { ...cart, lines: [], itemCount: 0 } }));
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /shop products/i })).toHaveAttribute("href", "/products");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/cart/CartDrawerBody.test.tsx`
Expected: FAIL — cannot resolve module.

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/components/cart/CartDrawerBody.tsx
import Link from "next/link";
import { getActiveProducts } from "@/lib/catalog";
import { defaultVariant } from "@/lib/products";
import { formatPrice, imageUrl } from "@/lib/format";
import { CartQtyStepper } from "@/components/cart/CartQtyStepper";
import { CartDeliveryUpgrade } from "@/components/cart/CartDeliveryUpgrade";
import { CartPromo } from "@/components/cart/CartPromo";
import { CartRecommendationAdd } from "@/components/cart/CartRecommendationAdd";
import type { CartView } from "@/lib/cart/types";

/** Scrollable content of the cart mini-panel (everything above the sticky footer). */
export async function CartDrawerBody({ cart }: { cart: CartView }) {
  const currency = cart.currency;

  if (cart.lines.length === 0) {
    return (
      <div style={{ padding: "40px 0", textAlign: "center" }}>
        <p style={{ fontSize: 16, color: "#6d6d6d" }}>Your cart is empty.</p>
        <Link
          href="/products"
          style={{ display: "inline-block", marginTop: 16, fontSize: 14, fontWeight: 500, color: "#fcfcf7", background: "#1c3a13", padding: "12px 26px", borderRadius: 40, textDecoration: "none" }}
        >
          Shop products
        </Link>
      </div>
    );
  }

  // One recommendation: first active product not already in the cart.
  const inCart = new Set(cart.lines.map((l) => l.productSlug));
  const recProduct = (await getActiveProducts()).find((p) => !inCart.has(p.slug));
  const recVariant = recProduct ? defaultVariant(recProduct) : null;
  const rec =
    recProduct && recVariant
      ? {
          slug: recProduct.slug,
          name: recProduct.name,
          img: imageUrl(recProduct.image_path) ?? `/images/${recProduct.slug}.webp`,
          variantId: recVariant.id,
          subCents: recVariant.subscription_price_cents ?? recVariant.price_cents,
          oneCents: recVariant.price_cents,
        }
      : null;
  const recPct = rec && rec.oneCents > rec.subCents ? Math.round((1 - rec.subCents / rec.oneCents) * 100) : 0;

  return (
    <div>
      {/* Free-shipping banner — truthful (free shipping on every order). */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          background: "#f4f1e6",
          borderRadius: 12,
          padding: "12px 18px",
          fontSize: 14,
          color: "#1a1a1a",
        }}
      >
        <span style={{ color: "#9a9a8e" }}>【</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1c3a13" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="M3.3 7 12 12l8.7-5" />
            <path d="M12 22V12" />
          </svg>
          You&rsquo;re getting free shipping
        </span>
        <span style={{ color: "#9a9a8e" }}>】</span>
      </div>

      {/* Line items */}
      <div style={{ marginTop: 8 }}>
        {cart.lines.map((line) => {
          const isSub = line.purchaseType === "subscription";
          const regularLine = line.regularUnitCents * line.quantity;
          const savings = regularLine - line.lineCents;
          const lineImg = imageUrl(line.imagePath) ?? `/images/${line.productSlug}.webp`;
          return (
            <div
              key={`${line.variantId}-${line.purchaseType}`}
              style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "20px 0", borderBottom: "1px solid #ece9de" }}
            >
              <Link
                href={`/products/${line.productSlug}`}
                aria-label={line.productName}
                style={{ width: 72, height: 72, flex: "none", borderRadius: 12, background: `url('${lineImg}') center/125% no-repeat`, display: "block" }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <Link href={`/products/${line.productSlug}`} style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a", textDecoration: "none" }}>
                  {line.productName}
                </Link>
                <div style={{ fontSize: 13, color: "#6d6d6d", marginTop: 2 }}>
                  {isSub
                    ? line.interval === "quarterly"
                      ? "Delivered every 3 months"
                      : "Delivered monthly"
                    : line.variantTitle}
                </div>
                {savings > 0 ? (
                  <div style={{ display: "inline-block", fontSize: 12, fontWeight: 600, color: "#1c3a13", background: "#e7f0c8", padding: "3px 8px", borderRadius: 6, marginTop: 8 }}>
                    {formatPrice(savings, currency)} off today
                  </div>
                ) : null}
                <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 14 }}>
                  <CartQtyStepper variantId={line.variantId} purchaseType={line.purchaseType} quantity={line.quantity} />
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: 15, fontWeight: 500 }}>{formatPrice(line.lineCents, currency)}</span>
                    {savings > 0 ? (
                      <span style={{ fontSize: 13, color: "#9a9a8e", textDecoration: "line-through", marginLeft: 6 }}>{formatPrice(regularLine, currency)}</span>
                    ) : null}
                  </div>
                </div>
                {isSub ? <CartDeliveryUpgrade variantId={line.variantId} interval={line.interval} /> : null}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bundle + Save recommendation (single) */}
      {rec ? (
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 10 }}>
            {recPct > 0 ? `Bundle + Save ${recPct}%` : "You might also like"}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, background: "#f4f1e6", borderRadius: 14, padding: 14 }}>
            <div aria-hidden style={{ width: 60, height: 60, flex: "none", borderRadius: 10, background: `url('${rec.img}') center/125% no-repeat` }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a" }}>{rec.name}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{formatPrice(rec.subCents, currency)}</span>
                {rec.subCents < rec.oneCents ? (
                  <span style={{ fontSize: 12, color: "#9a9a8e", textDecoration: "line-through" }}>{formatPrice(rec.oneCents, currency)}</span>
                ) : null}
              </div>
            </div>
            <div style={{ flex: "none", marginTop: -14 }}>
              <CartRecommendationAdd variantId={rec.variantId} />
            </div>
          </div>
        </div>
      ) : null}

      {/* Promo code */}
      <div style={{ marginTop: 22, paddingBottom: 8 }}>
        <CartPromo code={cart.code} />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/cart/CartDrawerBody.test.tsx`
Expected: PASS (both cases).

- [ ] **Step 5: Commit**

```bash
git add src/components/cart/CartDrawerBody.tsx src/components/cart/CartDrawerBody.test.tsx
git commit -m "feat: add CartDrawerBody panel content

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: globals.css — mobile-cart hook + animation keyframes

**Files:**
- Modify: `src/app/globals.css` (the `[data-burger] { display: none; }` block near line 91 and its `@media (max-width: 900px)` companion near line 93-96)

**Interfaces:**
- Produces: CSS rules — `[data-mobile-cart]` hidden by default, shown as `inline-flex` at ≤900px; `@keyframes og-pop-in` and `@keyframes og-bump` + helper classes `.og-cart-pop` / `.og-cart-bump` used by the mobile trigger in Task 8.
- Consumes: nothing (referenced by Task 8 markup).

- [ ] **Step 1: Add the CSS (no test — verified by grep + responsive audit)**

Locate the existing rules:

```css
[data-burger] { display: none; }

@media (max-width: 900px) {
  /* ... */
  [data-desktop-actions] { display: none !important; }
  [data-burger] { display: flex !important; }
}
```

Add `[data-mobile-cart] { display: none; }` next to the `[data-burger]` default, and add `[data-mobile-cart] { display: inline-flex !important; }` inside the `@media (max-width: 900px)` block (alongside the `[data-burger]` show rule). Then append the keyframes at the end of the file:

```css
[data-mobile-cart] { display: none; }

/* inside @media (max-width: 900px) { ... } */
[data-mobile-cart] { display: inline-flex !important; }

/* --- cart affordance feedback --- */
@keyframes og-pop-in {
  from { opacity: 0; transform: scale(0.6); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes og-bump {
  0%   { transform: scale(1); }
  35%  { transform: scale(1.35); }
  100% { transform: scale(1); }
}
.og-cart-pop  { animation: og-pop-in .28s cubic-bezier(0.34,1.56,0.64,1) both; }
.og-cart-bump { animation: og-bump .3s ease-out both; }
```

- [ ] **Step 2: Verify the rules landed**

Run: `grep -n "data-mobile-cart\|og-pop-in\|og-bump" src/app/globals.css`
Expected: the default hide rule, the ≤900px show rule, both keyframes, and both helper classes are present.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "style: add data-mobile-cart hook + cart pop/bump keyframes

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 8: Header wiring + CartCountBadge refactor

**Files:**
- Modify: `src/components/cart/CartCountBadge.tsx`
- Modify: `src/components/site/Header.tsx`
- Modify: `src/components/site/Header.test.tsx`

**Interfaces:**
- Consumes: `CartDrawerProvider` (Task 2), `CartTrigger` (Task 3), `CartDrawer` (Task 4), `CartDrawerFooter` (Task 5), `CartDrawerBody` (Task 6), `CartIcon` (Task 1); `getCart` from `@/lib/cart/queries`.
- Produces:
  - `CartCountBadge({ itemCount }: { itemCount: number }): JSX.Element | null` — renders the desktop "Cart" label + count pill; returns `null` when `itemCount === 0`. **No longer async, no `getCart()` call.**
  - Updated `Header` that fetches the cart once, wraps everything in `CartDrawerProvider`, renders the desktop badge and the mobile icon as `CartTrigger`s (gated on `itemCount > 0`), passes `itemCount` to `MobileMenu`, and renders `<CartDrawer footer={…}><CartDrawerBody …/></CartDrawer>`.

- [ ] **Step 1: Refactor CartCountBadge to take `itemCount`**

```tsx
// src/components/cart/CartCountBadge.tsx
/**
 * Desktop "Cart" label + count pill. Rendered inside a CartTrigger by the Header,
 * which supplies itemCount (fetched once). Per the mockup, absent when the cart
 * is empty. The pill is keyed by itemCount so it replays the bump animation on change.
 */
export function CartCountBadge({ itemCount }: { itemCount: number }) {
  if (itemCount === 0) return null;
  return (
    <span className="relative text-sm text-ink">
      Cart
      <span
        key={itemCount}
        className="og-cart-bump ml-1 rounded-pill bg-forest px-1.5 py-0.5 align-super text-[10px] text-cream"
      >
        {itemCount}
      </span>
    </span>
  );
}
```

- [ ] **Step 2: Update Header.test.tsx mocks, then run to confirm still green**

Add mocks so the new children don't require the app-router/navigation context, and update the `CartCountBadge` mock to accept the prop. Insert alongside the existing `vi.mock` calls (before `import { Header }`):

```tsx
vi.mock("@/components/cart/CartCountBadge", () => ({
  CartCountBadge: ({ itemCount }: { itemCount: number }) =>
    itemCount > 0 ? <span>Cart</span> : null,
}));
vi.mock("@/components/cart/CartDrawer", () => ({
  CartDrawer: ({ children, footer }: { children: React.ReactNode; footer?: React.ReactNode }) => (
    <div>{children}{footer}</div>
  ),
}));
vi.mock("@/components/cart/CartDrawerBody", () => ({ CartDrawerBody: () => null }));
vi.mock("@/components/cart/CartDrawerFooter", () => ({ CartDrawerFooter: () => null }));
```

Run: `npx vitest run src/components/site/Header.test.tsx`
Expected: still PASS (Shop → /products, Get Started → /signup). It fails to compile until Step 3 wires the new imports — that's expected; proceed.

- [ ] **Step 3: Wire the Header**

Rewrite `src/components/site/Header.tsx`:

```tsx
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { getCart } from "@/lib/cart/queries";
import { CartCountBadge } from "@/components/cart/CartCountBadge";
import { CartIcon } from "@/components/ui/CartIcon";
import { CartDrawerProvider } from "@/components/cart/CartDrawerProvider";
import { CartTrigger } from "@/components/cart/CartTrigger";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartDrawerBody } from "@/components/cart/CartDrawerBody";
import { CartDrawerFooter } from "@/components/cart/CartDrawerFooter";
import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { NavMenus } from "@/components/site/nav/NavMenus";
import { MobileMenu } from "@/components/site/nav/MobileMenu";
import { SignInMenu } from "@/components/site/nav/SignInMenu";
import { AccountMenu } from "@/components/site/nav/AccountMenu";

export async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const cart = await getCart();
  const itemCount = cart.itemCount;

  return (
    <CartDrawerProvider>
      <AnnouncementBar loggedIn={!!user} />
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(243,240,232,.82)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "15px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {/* Left: Logo + Desktop Nav */}
          <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
            <Link
              href="/"
              style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "22px", fontWeight: 500, letterSpacing: "-0.5px", color: "#1a1a1a", textDecoration: "none" }}
            >
              <Image
                src="/organica-living-logo.webp"
                alt="Organica Living"
                width={200}
                height={92}
                quality={90}
                style={{ height: "42px", width: "auto", display: "block" }}
                priority
              />
            </Link>
            <NavMenus />
          </div>

          {/* Right: auth + cart — desktop only */}
          <div data-desktop-actions style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {user ? (
              <>
                <AccountMenu />
                <Link href="/refer" style={{ fontSize: "14px", color: "#1a1a1a", fontWeight: 400, textDecoration: "none" }}>
                  Refer
                </Link>
                {itemCount > 0 ? (
                  <CartTrigger aria-label="Open cart" style={{ textDecoration: "none" }}>
                    <CartCountBadge itemCount={itemCount} />
                  </CartTrigger>
                ) : null}
              </>
            ) : (
              <>
                {itemCount > 0 ? (
                  <CartTrigger aria-label="Open cart" style={{ textDecoration: "none" }}>
                    <CartCountBadge itemCount={itemCount} />
                  </CartTrigger>
                ) : null}
                <SignInMenu />
                <Link
                  href="/signup"
                  style={{ lineHeight: 1, display: "inline-block", fontSize: "14px", fontWeight: 500, color: "#1a1a1a", background: "#62e104", padding: "10px 22px", borderRadius: "40px", textDecoration: "none" }}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile: cart icon (≤900px) + burger */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {itemCount > 0 ? (
              <CartTrigger
                data-mobile-cart
                aria-label="Open cart"
                style={{ position: "relative", alignItems: "center", justifyContent: "center", width: "42px", height: "42px", color: "#1a1a1a", textDecoration: "none" }}
              >
                <span className="og-cart-pop" style={{ display: "inline-flex" }}>
                  <CartIcon size={24} />
                </span>
                <span
                  key={itemCount}
                  className="og-cart-bump"
                  style={{ position: "absolute", top: "2px", right: "0px", minWidth: "17px", height: "17px", padding: "0 4px", borderRadius: "9px", background: "#1c3a13", color: "#fcfcf7", fontSize: "10px", lineHeight: "17px", textAlign: "center", fontWeight: 600 }}
                >
                  {itemCount}
                </span>
              </CartTrigger>
            ) : null}
            <MobileMenu isLoggedIn={!!user} itemCount={itemCount} />
          </div>
        </div>
      </header>

      <CartDrawer footer={itemCount > 0 ? <CartDrawerFooter cart={cart} /> : null}>
        <CartDrawerBody cart={cart} />
      </CartDrawer>
    </CartDrawerProvider>
  );
}
```

Note: `MobileMenu` was previously a direct child of the header row; it is now wrapped with the mobile cart icon in a flex container. `MobileMenu`'s `itemCount` prop is added in Task 9 — until then TypeScript flags it; that's expected and resolved by Task 9. To keep tasks independently green, do Step 4 after Task 9, OR temporarily pass `itemCount` and accept the compile error until Task 9. (Sequencing note: run Task 9 immediately after this step; the full-suite/build gate is Task 10.)

- [ ] **Step 4: Run the Header test**

Run: `npx vitest run src/components/site/Header.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/cart/CartCountBadge.tsx src/components/site/Header.tsx src/components/site/Header.test.tsx
git commit -m "feat: wire cart drawer + triggers into Header; badge takes itemCount

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 9: MobileMenu "View cart" row

**Files:**
- Modify: `src/components/site/nav/MobileMenu.tsx`
- Test: `src/components/site/nav/MobileMenu.test.tsx` (create)

**Interfaces:**
- Consumes: `useCartDrawer()` (Task 2).
- Produces: `MobileMenu({ isLoggedIn?, itemCount }: { isLoggedIn?: boolean; itemCount: number })` — unchanged behaviour plus, when `itemCount > 0`, a "View cart (N)" button under the top bar that closes the menu and calls `openDrawer()`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/site/nav/MobileMenu.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

const openDrawer = vi.fn();
vi.mock("@/components/cart/CartDrawerProvider", () => ({
  useCartDrawer: () => ({ open: false, openDrawer, closeDrawer: vi.fn() }),
}));

import { MobileMenu } from "@/components/site/nav/MobileMenu";

describe("MobileMenu view-cart row", () => {
  it("shows a View cart row with the count and opens the drawer", () => {
    render(<MobileMenu isLoggedIn={false} itemCount={3} />);
    const row = screen.getByRole("button", { name: /view cart \(3\)/i });
    fireEvent.click(row);
    expect(openDrawer).toHaveBeenCalledOnce();
  });

  it("hides the View cart row when the cart is empty", () => {
    render(<MobileMenu isLoggedIn={false} itemCount={0} />);
    expect(screen.queryByRole("button", { name: /view cart/i })).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/site/nav/MobileMenu.test.tsx`
Expected: FAIL — `itemCount` not in props / no view-cart button.

- [ ] **Step 3: Implement the change**

In `src/components/site/nav/MobileMenu.tsx`:

1. Extend the props interface:

```tsx
interface MobileMenuProps {
  /** Whether user is logged in — controls Sign In vs Account links */
  isLoggedIn?: boolean;
  /** Current cart item count — drives the "View cart" row */
  itemCount: number;
}
```

2. Update the signature + import the hook (add near the top imports):

```tsx
import { useCartDrawer } from "@/components/cart/CartDrawerProvider";
```

```tsx
export function MobileMenu({ isLoggedIn, itemCount }: MobileMenuProps) {
  const { openDrawer } = useCartDrawer();
```

3. Inside the "Scrollable content" wrapper, as its first child (before the SHOP pane `div`), add the row:

```tsx
{itemCount > 0 ? (
  <button
    type="button"
    aria-label={`View cart (${itemCount})`}
    onClick={() => { closeMenu(); openDrawer(); }}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      margin: "4px 0 10px",
      padding: "13px 16px",
      borderRadius: 14,
      background: "#1c3a13",
      color: "#fcfcf7",
      border: "none",
      fontSize: 15,
      fontWeight: 500,
      cursor: "pointer",
    }}
  >
    <span>View cart ({itemCount})</span>
    <ArrowRight size={15} />
  </button>
) : null}
```

(`ArrowRight` and `closeMenu` are already imported/defined in this file.)

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/site/nav/MobileMenu.test.tsx`
Expected: PASS (both cases).

- [ ] **Step 5: Commit**

```bash
git add src/components/site/nav/MobileMenu.tsx src/components/site/nav/MobileMenu.test.tsx
git commit -m "feat: add View cart row to mobile menu

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 10: Full verification pass

**Files:** none (verification only)

**Interfaces:** none.

- [ ] **Step 1: Typecheck + build**

Run: `npx next build`
Expected: compiles with no type errors (confirms Header ↔ MobileMenu `itemCount` prop agreement and all new modules resolve).

- [ ] **Step 2: Lint changed files**

Run: `npx eslint src/components/ui/CartIcon.tsx src/components/cart/CartDrawerProvider.tsx src/components/cart/CartTrigger.tsx src/components/cart/CartDrawer.tsx src/components/cart/CartDrawerBody.tsx src/components/cart/CartDrawerFooter.tsx src/components/cart/CartCountBadge.tsx src/components/site/Header.tsx src/components/site/nav/MobileMenu.tsx`
Expected: clean.

- [ ] **Step 3: Full test suite**

Run: `npm run test`
Expected: all tests pass (new + existing).

- [ ] **Step 4: Rendered-HTML grep (mockup rule)**

Seed a guest cart so the panel renders with real data, then serve and grep. Start the server (`npm run build` already done):

```bash
npm run start &   # serves on :3000
# Add an item as a guest to populate og_cart, capturing the Set-Cookie:
# (use a real variant id from the DB; e.g. via the product page form or:)
curl -s -c cookies.txt -b cookies.txt "http://localhost:3000/products/multi-pro" -o /dev/null
# Then load a page and grep the panel markup + real product data:
curl -s -b cookies.txt "http://localhost:3000/" > home.html
grep -c 'data-cart-drawer' home.html            # expect exactly 1
grep -o "You're getting free shipping" home.html # expect present
grep -o 'Your Cart' home.html                    # expect present (panel header)
grep -o 'Checkout' home.html                     # expect present
grep -c 'Glass Travel Vial' home.html            # expect 0 (fictional line omitted)
grep -c 'PM-02\|DM-02' home.html                 # expect 0 (competitor names absent)
```

Expected: exactly one `data-cart-drawer`; the free-shipping / "Your Cart" / Checkout strings present; zero "Glass Travel Vial" and zero competitor names. (If the cart is empty, the panel still renders once with the empty state — the `data-cart-drawer` count must still be exactly 1. Populate the cart to assert the line-item + footer strings.)

- [ ] **Step 5: Responsive audit**

Run: `npm run audit:responsive`
Expected: clean (no horizontal overflow). If the audit renders with an open drawer, confirm the ~420px panel is `92vw`-capped so it never overflows ≤520px.

- [ ] **Step 6: Clean up + final commit**

```bash
rm -f cookies.txt home.html   # note: rm -rf is denied; rm -f of these two files is fine
git add -A
git commit -m "chore: cart mini-panel verification pass

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- Persistent affordance (desktop badge + mobile icon) → Tasks 1, 8. ✓
- Slide-out panel opening on click → Tasks 3, 4, 8. ✓
- Mockup structure (banner, line rows with "$X off today", stepper, single recommendation, promo, sticky footer with total + checkout) → Tasks 5, 6. ✓
- Reuse existing cart server-components verbatim → Task 6 (CartQtyStepper/CartPromo/CartRecommendationAdd/CartDeliveryUpgrade). ✓
- Server-rendered, always-in-DOM, client toggle → Tasks 2, 4, 8. ✓
- Hidden at 0 items → Tasks 1/8 (`itemCount > 0` gates), CartCountBadge null at 0. ✓
- Pop-in + bump feedback → Task 7 keyframes, Task 8 `key={itemCount}` + classes. ✓
- Mobile drawer "View cart" row → Task 9. ✓
- No-JS/SEO fallback + `/cart` kept → Task 3 (real `<a href="/cart">`); `/cart` page untouched. ✓
- Omit fictional bonus-gift line; real products; vitamin voice → Task 6 + Task 10 grep. ✓
- Fetch cart once (remove duplicate `getCart()` in badge) → Task 8. ✓
- Close-on-navigation (drawer must not linger over `/checkout`) → Task 4 pathname effect. ✓
- Verification (build/eslint/test/grep/responsive) → Task 10. ✓

**Placeholder scan:** No TBD/TODO; every code step contains full code; commands have expected output. ✓

**Type consistency:** `useCartDrawer()` returns `{ open, openDrawer, closeDrawer }` — used consistently in Tasks 3, 4, 9. `CartCountBadge({ itemCount })`, `CartDrawer({ children, footer })`, `CartDrawerBody({ cart })`, `CartDrawerFooter({ cart })`, `MobileMenu({ isLoggedIn, itemCount })` — signatures match across producing and consuming tasks. `CartView` fields (`lines`, `itemCount`, `discountCents`, `totalCents`, `code`, `currency`) match `src/lib/cart/types`. ✓

**Note on task independence:** Task 8 introduces a `MobileMenu itemCount` prop that Task 9 adds; build/type-green is only guaranteed once both land (gated at Task 10 Step 1). Execute Tasks 8 → 9 back-to-back before the build gate.
