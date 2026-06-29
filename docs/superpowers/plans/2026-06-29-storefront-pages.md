# Storefront Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the read-only storefront (Home, Products listing, Product detail) as Next.js Server Components that render the live Supabase catalog through typed data-access functions and a shared set of design-system components.

**Architecture:** Pages are React Server Components that call server-only data functions in `src/lib/catalog.ts` (typed against the generated `Database` type). Presentational pieces (Button, Badge, PriceDisplay, ProductCard, Header, Footer) are pure components driven by props, unit-tested in isolation with Vitest + React Testing Library. Pure helpers/types live in `src/lib/products.ts` so components can import them without pulling in the `server-only` data layer. The three pages live under an `(storefront)` route group that supplies the shared Header/Footer chrome.

**Tech Stack:** Next.js 16 (App Router, RSC), React 19, TypeScript, Tailwind v4, Supabase (`@supabase/ssr`), Vitest + @testing-library/react + jsdom.

## Global Constraints

- Package manager: **pnpm**. All commands use `pnpm`.
- Money is stored and passed as integer **cents**; format only at the view layer via `formatPrice`.
- Catalog reads go through `src/lib/catalog.ts` (server-only). Components never call Supabase directly.
- Pure types/helpers shared with components live in `src/lib/products.ts` (must NOT import `server-only` or `next/headers`).
- Design tokens are the Tailwind utilities generated from `src/app/globals.css` `@theme` (`bg-cream`, `text-ink`, `text-muted`, `bg-forest`, `text-cream`, `bg-lime`, `bg-header`, `border-line`, `rounded-sm/md/lg/pill`, `font-display`, `font-mono`). Do not hardcode hex values in components.
- FDA disclaimer text, verbatim: `These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.`
- Product detail routes are `/products/[slug]`. The Products listing is `/products`. Home is `/`.
- `pnpm build` and `pnpm lint` must pass at the end of every task that touches app/component code.

---

## File Structure

**Create:**
- `vitest.config.ts` — Vitest config (jsdom, react plugin, tsconfig paths, server-only stub alias)
- `vitest.setup.ts` — imports `@testing-library/jest-dom`
- `test/stubs/server-only.ts` — empty module aliased for `server-only` under test
- `src/lib/format.ts` — `formatPrice`, `imageUrl` (+ tests `src/lib/format.test.ts`)
- `src/lib/products.ts` — catalog types + `defaultVariant` pure helper (+ `src/lib/products.test.ts`)
- `src/lib/catalog.ts` — server-only data fetchers (+ `src/lib/catalog.test.ts`)
- `src/components/ui/Button.tsx` (+ test)
- `src/components/ui/Badge.tsx` (+ test)
- `src/components/catalog/PriceDisplay.tsx` (+ test)
- `src/components/catalog/ProductCard.tsx` (+ test)
- `src/components/site/AnnouncementBar.tsx`
- `src/components/site/Header.tsx` (+ test)
- `src/components/site/Disclaimer.tsx` (+ test)
- `src/components/site/Footer.tsx`
- `src/app/(storefront)/layout.tsx` — Header/Footer chrome
- `src/app/(storefront)/page.tsx` — Home (moved from `src/app/page.tsx`)
- `src/app/(storefront)/products/page.tsx` — Products listing
- `src/app/(storefront)/products/[slug]/page.tsx` — Product detail
- `public/images/*.webp` — product images copied from `design-reference/images/`

**Modify:**
- `package.json` — add `test` / `test:watch` scripts + dev deps
- `src/app/page.tsx` — removed (moved into the route group)

---

## Task 1: Test infrastructure

**Files:**
- Create: `vitest.config.ts`, `vitest.setup.ts`, `test/stubs/server-only.ts`, `test/sanity.test.ts`
- Modify: `package.json`
- Create: `public/images/*.webp` (copied assets)

**Interfaces:**
- Produces: a working `pnpm test` runner with jsdom + RTL, `@/*` path resolution, and a `server-only` stub so server-only modules can be imported under test. Product images served from `/images/*.webp`.

- [ ] **Step 1: Install dev dependencies**

```bash
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event vite-tsconfig-paths
```

- [ ] **Step 2: Add test scripts to package.json**

In `package.json` `"scripts"`, add:

```json
    "test": "vitest run",
    "test:watch": "vitest"
```

- [ ] **Step 3: Create the server-only stub**

`test/stubs/server-only.ts`:

```ts
// Under test, `server-only` is aliased here so server modules import cleanly.
export {};
```

- [ ] **Step 4: Create vitest config**

`vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "server-only": resolve(__dirname, "test/stubs/server-only.ts"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}", "test/**/*.test.{ts,tsx}"],
  },
});
```

- [ ] **Step 5: Create vitest setup**

`vitest.setup.ts`:

```ts
import "@testing-library/jest-dom";
```

- [ ] **Step 6: Write a sanity test**

`test/sanity.test.ts`:

```ts
import { describe, it, expect } from "vitest";

describe("test harness", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 7: Run the sanity test**

Run: `pnpm test`
Expected: PASS — 1 passed, file `test/sanity.test.ts`.

- [ ] **Step 8: Copy product images into public/**

```bash
mkdir -p public/images
cp design-reference/images/*.webp public/images/
ls public/images | wc -l   # expect 19
```

- [ ] **Step 9: Commit**

```bash
git add package.json pnpm-lock.yaml vitest.config.ts vitest.setup.ts test public/images
git commit -m "test: add Vitest + RTL harness and copy product images to public"
```

---

## Task 2: Currency & image formatting utilities

**Files:**
- Create: `src/lib/format.ts`, `src/lib/format.test.ts`

**Interfaces:**
- Produces:
  - `formatPrice(cents: number, currency?: string): string` — `3999 -> "$39.99"` (default currency `"USD"`).
  - `imageUrl(path: string | null | undefined): string | null` — `"images/x.webp" -> "/images/x.webp"`, leading-slash-safe, `null` passthrough.

- [ ] **Step 1: Write the failing test**

`src/lib/format.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { formatPrice, imageUrl } from "@/lib/format";

describe("formatPrice", () => {
  it("formats cents as USD", () => {
    expect(formatPrice(3999)).toBe("$39.99");
  });
  it("formats whole-dollar amounts", () => {
    expect(formatPrice(2500)).toBe("$25.00");
  });
});

describe("imageUrl", () => {
  it("prefixes a leading slash", () => {
    expect(imageUrl("images/multi-pro.webp")).toBe("/images/multi-pro.webp");
  });
  it("leaves an already-absolute path alone", () => {
    expect(imageUrl("/images/x.webp")).toBe("/images/x.webp");
  });
  it("returns null for missing paths", () => {
    expect(imageUrl(null)).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/lib/format.test.ts`
Expected: FAIL — cannot find module `@/lib/format`.

- [ ] **Step 3: Write minimal implementation**

`src/lib/format.ts`:

```ts
export function formatPrice(cents: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export function imageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  return path.startsWith("/") ? path : `/${path}`;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/lib/format.test.ts`
Expected: PASS — 5 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/format.ts src/lib/format.test.ts
git commit -m "feat: add price and image URL formatting helpers"
```

---

## Task 3: Catalog types & pure helpers

**Files:**
- Create: `src/lib/products.ts`, `src/lib/products.test.ts`

**Interfaces:**
- Consumes: `Tables<...>` from `@/lib/supabase/database.types`.
- Produces:
  - Types `Product`, `ProductVariant`, `ProductFacts`, `ProductWithVariants` (`Product & { variants: ProductVariant[] }`), `ProductDetail` (`ProductWithVariants & { facts: ProductFacts[] }`), `FactRow` (`{ name: string; amount?: string; dv?: string }`).
  - `defaultVariant(p: ProductWithVariants): ProductVariant | undefined` — the `is_default` variant, else the first.

- [ ] **Step 1: Write the failing test**

`src/lib/products.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { defaultVariant, type ProductWithVariants } from "@/lib/products";

function make(variants: Array<{ id: string; is_default: boolean }>): ProductWithVariants {
  return {
    id: "p1", slug: "x", name: "X", subtitle: null, category: null,
    description: null, badge: null, image_path: null, hero_claims: [],
    benefits: [], is_active: true, sort_order: 0,
    created_at: "", updated_at: "",
    variants: variants.map((v) => ({
      id: v.id, product_id: "p1", sku: null, upc: null, title: "t",
      price_cents: 1000, compare_at_cents: null, subscription_eligible: true,
      subscription_price_cents: null, currency: "usd", stripe_price_id: null,
      stripe_sub_price_id: null, inventory: null, is_default: v.is_default,
      created_at: "", updated_at: "",
    })),
  };
}

describe("defaultVariant", () => {
  it("returns the is_default variant", () => {
    const p = make([{ id: "a", is_default: false }, { id: "b", is_default: true }]);
    expect(defaultVariant(p)?.id).toBe("b");
  });
  it("falls back to the first variant", () => {
    const p = make([{ id: "a", is_default: false }]);
    expect(defaultVariant(p)?.id).toBe("a");
  });
  it("returns undefined with no variants", () => {
    const p = make([]);
    expect(defaultVariant(p)).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/lib/products.test.ts`
Expected: FAIL — cannot find module `@/lib/products`.

- [ ] **Step 3: Write minimal implementation**

`src/lib/products.ts`:

```ts
import type { Tables } from "@/lib/supabase/database.types";

export type Product = Tables<"products">;
export type ProductVariant = Tables<"product_variants">;
export type ProductFacts = Tables<"product_facts">;

export type ProductWithVariants = Product & { variants: ProductVariant[] };
export type ProductDetail = ProductWithVariants & { facts: ProductFacts[] };

/** One row of a Supplement Facts table (stored as JSON in product_facts.rows). */
export type FactRow = { name: string; amount?: string; dv?: string };

export function defaultVariant(p: ProductWithVariants): ProductVariant | undefined {
  return p.variants.find((v) => v.is_default) ?? p.variants[0];
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/lib/products.test.ts`
Expected: PASS — 3 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/products.ts src/lib/products.test.ts
git commit -m "feat: add catalog types and defaultVariant helper"
```

---

## Task 4: Catalog data-access layer (server-only)

**Files:**
- Create: `src/lib/catalog.ts`, `src/lib/catalog.test.ts`

**Interfaces:**
- Consumes: `createClient` from `@/lib/supabase/server`; types from `@/lib/products`.
- Produces:
  - `getActiveProducts(): Promise<ProductWithVariants[]>` — active products, `variants` embedded, ordered by `sort_order` asc.
  - `getProductBySlug(slug: string): Promise<ProductDetail | null>` — active product with `variants` and `facts`, or `null`.
  - `getProductSlugs(): Promise<string[]>` — slugs of active products.

- [ ] **Step 1: Write the failing test**

`src/lib/catalog.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

// Chainable, awaitable Supabase query-builder mock.
function builder(result: { data: unknown; error: unknown }) {
  const b: Record<string, unknown> = {};
  b.select = () => b;
  b.eq = () => b;
  b.order = () => b;
  b.maybeSingle = () => Promise.resolve(result);
  b.then = (resolve: (v: unknown) => void) => resolve(result);
  return b;
}

const fromMock = vi.fn();
vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => ({ from: fromMock })),
}));

import { getActiveProducts, getProductBySlug, getProductSlugs } from "@/lib/catalog";

beforeEach(() => fromMock.mockReset());

describe("getActiveProducts", () => {
  it("returns the data array", async () => {
    fromMock.mockReturnValue(builder({ data: [{ id: "p1", variants: [] }], error: null }));
    const res = await getActiveProducts();
    expect(res).toHaveLength(1);
    expect(fromMock).toHaveBeenCalledWith("products");
  });
  it("throws on error", async () => {
    fromMock.mockReturnValue(builder({ data: null, error: { message: "boom" } }));
    await expect(getActiveProducts()).rejects.toBeTruthy();
  });
});

describe("getProductBySlug", () => {
  it("returns a single product or null", async () => {
    fromMock.mockReturnValue(builder({ data: null, error: null }));
    expect(await getProductBySlug("nope")).toBeNull();
  });
});

describe("getProductSlugs", () => {
  it("maps rows to slug strings", async () => {
    fromMock.mockReturnValue(builder({ data: [{ slug: "a" }, { slug: "b" }], error: null }));
    expect(await getProductSlugs()).toEqual(["a", "b"]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/lib/catalog.test.ts`
Expected: FAIL — cannot find module `@/lib/catalog`.

- [ ] **Step 3: Write minimal implementation**

`src/lib/catalog.ts`:

```ts
import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { ProductWithVariants, ProductDetail } from "@/lib/products";

export async function getActiveProducts(): Promise<ProductWithVariants[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, variants:product_variants(*)")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as unknown as ProductWithVariants[];
}

export async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, variants:product_variants(*), facts:product_facts(*)")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (error) throw error;
  return (data as unknown as ProductDetail) ?? null;
}

export async function getProductSlugs(): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("slug")
    .eq("is_active", true);
  if (error) throw error;
  return (data ?? []).map((r) => r.slug);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/lib/catalog.test.ts`
Expected: PASS — 4 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/catalog.ts src/lib/catalog.test.ts
git commit -m "feat: add server-only catalog data-access layer"
```

---

## Task 5: Button primitive

**Files:**
- Create: `src/components/ui/Button.tsx`, `src/components/ui/Button.test.tsx`

**Interfaces:**
- Produces: `Button({ children, href?, variant?, className? })` where `variant` is `"lime" | "forest" | "cream"` (default `"lime"`). Renders a Next `<Link>` when `href` is set, otherwise a `<button>`.

- [ ] **Step 1: Write the failing test**

`src/components/ui/Button.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders a link when href is provided", () => {
    render(<Button href="/products">Shop</Button>);
    const link = screen.getByRole("link", { name: "Shop" });
    expect(link).toHaveAttribute("href", "/products");
  });
  it("renders a button without href", () => {
    render(<Button>Add</Button>);
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/components/ui/Button.test.tsx`
Expected: FAIL — cannot find module `@/components/ui/Button`.

- [ ] **Step 3: Write minimal implementation**

`src/components/ui/Button.tsx`:

```tsx
import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "lime" | "forest" | "cream";

const variantClasses: Record<Variant, string> = {
  lime: "bg-lime text-ink hover:brightness-95",
  forest: "bg-forest text-cream hover:brightness-110",
  cream: "bg-cream text-forest border border-line hover:bg-header",
};

type Props = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
};

export function Button({ children, href, variant = "lime", className = "" }: Props) {
  const classes = `inline-flex items-center justify-center rounded-pill px-6 py-3 text-sm font-medium transition ${variantClasses[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return <button className={classes}>{children}</button>;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/components/ui/Button.test.tsx`
Expected: PASS — 2 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/Button.tsx src/components/ui/Button.test.tsx
git commit -m "feat: add Button design-system primitive"
```

---

## Task 6: Badge primitive

**Files:**
- Create: `src/components/ui/Badge.tsx`, `src/components/ui/Badge.test.tsx`

**Interfaces:**
- Produces: `Badge({ label }: { label: string })` — a small forest-on-cream uppercase mono pill.

- [ ] **Step 1: Write the failing test**

`src/components/ui/Badge.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/Badge";

describe("Badge", () => {
  it("renders its label", () => {
    render(<Badge label="New" />);
    expect(screen.getByText("New")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/components/ui/Badge.test.tsx`
Expected: FAIL — cannot find module `@/components/ui/Badge`.

- [ ] **Step 3: Write minimal implementation**

`src/components/ui/Badge.tsx`:

```tsx
export function Badge({ label }: { label: string }) {
  return (
    <span className="rounded-pill bg-forest px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-cream">
      {label}
    </span>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/components/ui/Badge.test.tsx`
Expected: PASS — 1 test.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/Badge.tsx src/components/ui/Badge.test.tsx
git commit -m "feat: add Badge design-system primitive"
```

---

## Task 7: PriceDisplay

**Files:**
- Create: `src/components/catalog/PriceDisplay.tsx`, `src/components/catalog/PriceDisplay.test.tsx`

**Interfaces:**
- Consumes: `formatPrice` from `@/lib/format`.
- Produces: `PriceDisplay({ priceCents, subscriptionPriceCents?, compareAtCents?, currency? })`. Always shows the price; shows a struck `compareAt` when present; shows a `… subscribe & save` line when `subscriptionPriceCents` present. `currency` default `"USD"`.

- [ ] **Step 1: Write the failing test**

`src/components/catalog/PriceDisplay.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PriceDisplay } from "@/components/catalog/PriceDisplay";

describe("PriceDisplay", () => {
  it("shows the price", () => {
    render(<PriceDisplay priceCents={3999} />);
    expect(screen.getByText("$39.99")).toBeInTheDocument();
  });
  it("shows a subscribe & save line when provided", () => {
    render(<PriceDisplay priceCents={3999} subscriptionPriceCents={2999} />);
    expect(screen.getByText(/subscribe & save/i)).toBeInTheDocument();
    expect(screen.getByText(/\$29\.99/)).toBeInTheDocument();
  });
  it("shows a struck compare-at price when provided", () => {
    render(<PriceDisplay priceCents={2999} compareAtCents={3999} />);
    expect(screen.getByText("$39.99")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/components/catalog/PriceDisplay.test.tsx`
Expected: FAIL — cannot find module `@/components/catalog/PriceDisplay`.

- [ ] **Step 3: Write minimal implementation**

`src/components/catalog/PriceDisplay.tsx`:

```tsx
import { formatPrice } from "@/lib/format";

type Props = {
  priceCents: number;
  subscriptionPriceCents?: number | null;
  compareAtCents?: number | null;
  currency?: string;
};

export function PriceDisplay({
  priceCents,
  subscriptionPriceCents,
  compareAtCents,
  currency = "USD",
}: Props) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-baseline gap-2">
        <span className="text-lg text-ink">{formatPrice(priceCents, currency)}</span>
        {compareAtCents ? (
          <span className="text-sm text-muted line-through">
            {formatPrice(compareAtCents, currency)}
          </span>
        ) : null}
      </div>
      {subscriptionPriceCents ? (
        <span className="font-mono text-[11px] text-muted">
          {formatPrice(subscriptionPriceCents, currency)} subscribe &amp; save
        </span>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/components/catalog/PriceDisplay.test.tsx`
Expected: PASS — 3 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/catalog/PriceDisplay.tsx src/components/catalog/PriceDisplay.test.tsx
git commit -m "feat: add PriceDisplay component"
```

---

## Task 8: ProductCard

**Files:**
- Create: `src/components/catalog/ProductCard.tsx`, `src/components/catalog/ProductCard.test.tsx`

**Interfaces:**
- Consumes: `ProductWithVariants`, `defaultVariant` from `@/lib/products`; `imageUrl` from `@/lib/format`; `Badge`, `PriceDisplay`.
- Produces: `ProductCard({ product }: { product: ProductWithVariants })` — a `Link` to `/products/{slug}` showing image, category, name, subtitle, price, and badge (when set).

- [ ] **Step 1: Write the failing test**

`src/components/catalog/ProductCard.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "@/components/catalog/ProductCard";
import type { ProductWithVariants } from "@/lib/products";

const product: ProductWithVariants = {
  id: "p1", slug: "multi-pro", name: "Multi Pro", subtitle: "Multivitamin + Minerals",
  category: "Multivitamin", description: null, badge: "New",
  image_path: "images/multi-pro.webp", hero_claims: [], benefits: [],
  is_active: true, sort_order: 1, created_at: "", updated_at: "",
  variants: [{
    id: "v1", product_id: "p1", sku: "OL-MULTI-60", upc: null, title: "60 capsules",
    price_cents: 3999, compare_at_cents: null, subscription_eligible: true,
    subscription_price_cents: 2999, currency: "usd", stripe_price_id: null,
    stripe_sub_price_id: null, inventory: null, is_default: true,
    created_at: "", updated_at: "",
  }],
};

describe("ProductCard", () => {
  it("links to the product detail page", () => {
    render(<ProductCard product={product} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/products/multi-pro");
  });
  it("shows name, category and price", () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText("Multi Pro")).toBeInTheDocument();
    expect(screen.getByText("Multivitamin")).toBeInTheDocument();
    expect(screen.getByText("$39.99")).toBeInTheDocument();
  });
  it("shows the badge when present", () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText("New")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/components/catalog/ProductCard.test.tsx`
Expected: FAIL — cannot find module `@/components/catalog/ProductCard`.

- [ ] **Step 3: Write minimal implementation**

`src/components/catalog/ProductCard.tsx`:

```tsx
import Link from "next/link";
import Image from "next/image";
import { imageUrl } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { PriceDisplay } from "@/components/catalog/PriceDisplay";
import { defaultVariant, type ProductWithVariants } from "@/lib/products";

export function ProductCard({ product }: { product: ProductWithVariants }) {
  const variant = defaultVariant(product);
  const img = imageUrl(product.image_path);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col rounded-lg border border-line bg-header p-4 transition hover:shadow-lg"
    >
      {product.badge ? (
        <span className="absolute right-4 top-4 z-10">
          <Badge label={product.badge} />
        </span>
      ) : null}

      <div className="relative aspect-[4/5] w-full">
        {img ? (
          <Image
            src={img}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-2 transition group-hover:scale-105"
          />
        ) : null}
      </div>

      <div className="mt-4">
        <p className="font-mono text-[11px] uppercase tracking-wide text-muted">
          {product.category}
        </p>
        <h3 className="mt-1 text-lg font-medium text-ink">{product.name}</h3>
        {product.subtitle ? (
          <p className="text-sm text-muted">{product.subtitle}</p>
        ) : null}
        {variant ? (
          <div className="mt-3">
            <PriceDisplay
              priceCents={variant.price_cents}
              subscriptionPriceCents={variant.subscription_price_cents}
              compareAtCents={variant.compare_at_cents}
              currency={variant.currency}
            />
          </div>
        ) : null}
      </div>
    </Link>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test src/components/catalog/ProductCard.test.tsx`
Expected: PASS — 3 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/catalog/ProductCard.tsx src/components/catalog/ProductCard.test.tsx
git commit -m "feat: add ProductCard component"
```

---

## Task 9: Header & AnnouncementBar

**Files:**
- Create: `src/components/site/AnnouncementBar.tsx`, `src/components/site/Header.tsx`, `src/components/site/Header.test.tsx`

**Interfaces:**
- Produces:
  - `AnnouncementBar()` — a lime promo strip.
  - `Header()` — sticky header with logo (links `/`), primary nav (Shop → `/products`, Science → `/science`, Learn → `/blog`), and actions (Sign In → `/login`, Get Started → `/signup`). Uses the `Button` primitive for "Get Started". Interactive dropdown menus are intentionally out of scope for this plan (links only).

- [ ] **Step 1: Write the failing test**

`src/components/site/Header.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/site/Header";

describe("Header", () => {
  it("links Shop to the products page", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: "Shop" })).toHaveAttribute("href", "/products");
  });
  it("renders the Get Started CTA", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: "Get Started" })).toHaveAttribute("href", "/signup");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/components/site/Header.test.tsx`
Expected: FAIL — cannot find module `@/components/site/Header`.

- [ ] **Step 3: Write the AnnouncementBar**

`src/components/site/AnnouncementBar.tsx`:

```tsx
export function AnnouncementBar() {
  return (
    <div className="bg-lime px-4 py-2 text-center text-sm font-medium text-ink">
      Find the right products for you →
    </div>
  );
}
```

- [ ] **Step 4: Write the Header**

`src/components/site/Header.tsx`:

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const NAV = [
  { label: "Shop", href: "/products" },
  { label: "Science", href: "/science" },
  { label: "Learn", href: "/blog" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-header/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-xl font-medium tracking-tight text-ink">
            Organica Living
          </Link>
          <nav className="hidden gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-pill px-3 py-1.5 text-sm text-ink transition hover:bg-cream"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/login" className="text-sm text-ink">
            Sign In
          </Link>
          <Button href="/signup">Get Started</Button>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm test src/components/site/Header.test.tsx`
Expected: PASS — 2 tests.

- [ ] **Step 6: Commit**

```bash
git add src/components/site/AnnouncementBar.tsx src/components/site/Header.tsx src/components/site/Header.test.tsx
git commit -m "feat: add Header and AnnouncementBar"
```

---

## Task 10: Disclaimer & Footer

**Files:**
- Create: `src/components/site/Disclaimer.tsx`, `src/components/site/Disclaimer.test.tsx`, `src/components/site/Footer.tsx`

**Interfaces:**
- Produces:
  - `Disclaimer({ className? })` — renders the exact FDA disclaimer string (see Global Constraints).
  - `Footer()` — forest footer with link columns and the `Disclaimer`.

- [ ] **Step 1: Write the failing test**

`src/components/site/Disclaimer.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Disclaimer } from "@/components/site/Disclaimer";

describe("Disclaimer", () => {
  it("renders the FDA disclaimer verbatim", () => {
    render(<Disclaimer />);
    expect(
      screen.getByText(/have not been evaluated by the Food and Drug Administration/i),
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/components/site/Disclaimer.test.tsx`
Expected: FAIL — cannot find module `@/components/site/Disclaimer`.

- [ ] **Step 3: Write the Disclaimer**

`src/components/site/Disclaimer.tsx`:

```tsx
export function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs leading-relaxed text-muted ${className}`}>
      These statements have not been evaluated by the Food and Drug
      Administration. This product is not intended to diagnose, treat, cure, or
      prevent any disease.
    </p>
  );
}
```

- [ ] **Step 4: Write the Footer**

`src/components/site/Footer.tsx`:

```tsx
import Link from "next/link";
import { Disclaimer } from "@/components/site/Disclaimer";

const COLUMNS: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Subscriptions", href: "/subscriptions" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Science", href: "/science" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign In", href: "/login" },
      { label: "Refer a Friend", href: "/refer" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="mx-auto max-w-[1180px] px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <p className="text-lg font-medium">Organica Living</p>
            <p className="mt-2 text-sm text-cream/70">Rooted in nature, backed by science.</p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[11px] uppercase tracking-wide text-cream/60">
                {col.title}
              </p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-cream/90 hover:text-lime">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-cream/15 pt-6">
          <Disclaimer className="text-cream/60" />
          <p className="mt-4 text-xs text-cream/50">© 2026 Organica Living, Inc.</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm test src/components/site/Disclaimer.test.tsx`
Expected: PASS — 1 test.

- [ ] **Step 6: Commit**

```bash
git add src/components/site/Disclaimer.tsx src/components/site/Disclaimer.test.tsx src/components/site/Footer.tsx
git commit -m "feat: add Disclaimer and Footer"
```

---

## Task 11: Storefront layout group + move Home

**Files:**
- Create: `src/app/(storefront)/layout.tsx`, `src/app/(storefront)/page.tsx`
- Delete: `src/app/page.tsx`

**Interfaces:**
- Consumes: `AnnouncementBar`, `Header`, `Footer`; `getActiveProducts` from `@/lib/catalog`; `ProductCard`, `Button`.
- Produces: shared chrome for all storefront routes, and the Home page at `/` (hero + featured grid of the first 4 active products).

- [ ] **Step 1: Create the storefront layout**

`src/app/(storefront)/layout.tsx`:

```tsx
import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Move Home into the group**

```bash
git mv src/app/page.tsx "src/app/(storefront)/page.tsx"
```

- [ ] **Step 3: Replace Home page content**

`src/app/(storefront)/page.tsx`:

```tsx
import { getActiveProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Button } from "@/components/ui/Button";

export default async function Home() {
  const products = await getActiveProducts();
  const featured = products.slice(0, 4);

  return (
    <main>
      <section className="mx-auto max-w-[1180px] px-6 py-24 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          Organica Living
        </p>
        <h1 className="mt-4 text-5xl font-light tracking-tight text-ink">
          Rooted in nature,
          <br />
          backed by science.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
          Clinically formulated supplements for everyday health.
        </p>
        <div className="mt-9">
          <Button href="/products">Shop All Products</Button>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-6 pb-24">
        <h2 className="mb-8 text-2xl font-light text-ink">Featured</h2>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 4: Verify build + lint**

Run: `pnpm build && pnpm lint`
Expected: build succeeds; `/` listed as a route; no lint errors.

- [ ] **Step 5: Smoke-test the running page**

Run in one shell: `pnpm dev`
In another: `curl -s http://localhost:3000 | grep -c "Featured"`
Expected: `1` (page renders the Featured section). Stop the dev server afterward.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add storefront layout group and data-driven Home page"
```

---

## Task 12: Products listing page (PLP)

**Files:**
- Create: `src/app/(storefront)/products/page.tsx`

**Interfaces:**
- Consumes: `getActiveProducts` from `@/lib/catalog`; `ProductCard`.
- Produces: `/products` — a responsive grid of all active products.

- [ ] **Step 1: Write the page**

`src/app/(storefront)/products/page.tsx`:

```tsx
import type { Metadata } from "next";
import { getActiveProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/catalog/ProductCard";

export const metadata: Metadata = {
  title: "Shop All — Organica Living",
  description: "Browse the full Organica Living supplement range.",
};

export default async function ProductsPage() {
  const products = await getActiveProducts();

  return (
    <main className="mx-auto max-w-[1180px] px-6 py-16">
      <header className="mb-10">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Shop</p>
        <h1 className="mt-2 text-4xl font-light tracking-tight text-ink">All Products</h1>
      </header>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verify build + lint**

Run: `pnpm build && pnpm lint`
Expected: build succeeds; `/products` listed as a route; no lint errors.

- [ ] **Step 3: Smoke-test the running page**

Run: `pnpm dev`, then in another shell:
`curl -s http://localhost:3000/products | grep -c "Multi Pro"`
Expected: `1` (the seeded catalog renders). Stop the dev server afterward.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(storefront)/products/page.tsx"
git commit -m "feat: add products listing page"
```

---

## Task 13: Product detail page (PDP)

**Files:**
- Create: `src/app/(storefront)/products/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getProductBySlug`, `getProductSlugs` from `@/lib/catalog`; `defaultVariant`, `FactRow` from `@/lib/products`; `imageUrl` from `@/lib/format`; `PriceDisplay`, `Button`, `Badge`, `Disclaimer`; `notFound` from `next/navigation`.
- Produces: `/products/[slug]` with `generateStaticParams` (all active slugs) and `generateMetadata` (product name title). Renders hero (image, name, subtitle, price, non-functional "Add to Cart" placeholder button), benefits (when present), Supplement Facts table (when `facts` present), and the FDA disclaimer.

- [ ] **Step 1: Write the page**

`src/app/(storefront)/products/[slug]/page.tsx`:

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, getProductSlugs } from "@/lib/catalog";
import { defaultVariant, type FactRow } from "@/lib/products";
import { imageUrl } from "@/lib/format";
import { PriceDisplay } from "@/components/catalog/PriceDisplay";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Disclaimer } from "@/components/site/Disclaimer";

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found — Organica Living" };
  return {
    title: `${product.name} — Organica Living`,
    description: product.description ?? product.subtitle ?? undefined,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const variant = defaultVariant(product);
  const img = imageUrl(product.image_path);
  const facts = product.facts[0];
  const factRows = (facts?.rows as FactRow[] | undefined) ?? [];
  const benefits = (product.benefits as string[] | undefined) ?? [];

  return (
    <main className="mx-auto max-w-[1180px] px-6 py-16">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="relative aspect-square w-full rounded-lg bg-header">
          {img ? (
            <Image
              src={img}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-8"
              priority
            />
          ) : null}
        </div>

        <div>
          {product.badge ? <Badge label={product.badge} /> : null}
          <p className="mt-3 font-mono text-xs uppercase tracking-wide text-muted">
            {product.category}
          </p>
          <h1 className="mt-1 text-4xl font-light tracking-tight text-ink">{product.name}</h1>
          {product.subtitle ? (
            <p className="mt-2 text-lg text-muted">{product.subtitle}</p>
          ) : null}
          {product.description ? (
            <p className="mt-4 text-ink/80">{product.description}</p>
          ) : null}

          {variant ? (
            <div className="mt-6">
              <PriceDisplay
                priceCents={variant.price_cents}
                subscriptionPriceCents={variant.subscription_price_cents}
                compareAtCents={variant.compare_at_cents}
                currency={variant.currency}
              />
            </div>
          ) : null}

          {/* Add to Cart is wired up in the cart/checkout plan. */}
          <div className="mt-6">
            <Button>Add to Cart</Button>
          </div>

          {benefits.length > 0 ? (
            <ul className="mt-8 space-y-2">
              {benefits.map((b) => (
                <li key={b} className="text-sm text-ink/80">
                  • {b}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      {factRows.length > 0 ? (
        <section className="mt-16 max-w-md rounded-md border border-line bg-header p-6">
          <h2 className="text-lg font-medium text-ink">Supplement Facts</h2>
          {facts?.serving_size ? (
            <p className="mt-1 font-mono text-xs text-muted">
              Serving size: {facts.serving_size}
            </p>
          ) : null}
          <table className="mt-4 w-full text-sm">
            <tbody>
              {factRows.map((row, i) => (
                <tr key={`${row.name}-${i}`} className="border-t border-line">
                  <td className="py-2 text-ink">{row.name}</td>
                  <td className="py-2 text-right text-ink">{row.amount ?? ""}</td>
                  <td className="py-2 text-right text-muted">{row.dv ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {facts?.warnings ? (
            <p className="mt-4 text-xs text-muted">{facts.warnings}</p>
          ) : null}
        </section>
      ) : null}

      <div className="mt-12">
        <Disclaimer />
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verify build + lint**

Run: `pnpm build && pnpm lint`
Expected: build succeeds; `/products/[slug]` shown as a prerendered (SSG) route with 9 params generated; no lint errors.

- [ ] **Step 3: Smoke-test the running page**

Run: `pnpm dev`, then in another shell:
`curl -s http://localhost:3000/products/multi-pro | grep -c "Multi Pro"`
Expected: `1`. Also confirm a bad slug 404s:
`curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/products/does-not-exist`
Expected: `404`. Stop the dev server afterward.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(storefront)/products/[slug]/page.tsx"
git commit -m "feat: add product detail page with SSG params and metadata"
```

---

## Task 14: Full verification & push

**Files:** none (verification only)

- [ ] **Step 1: Run the full test suite**

Run: `pnpm test`
Expected: all unit tests pass (format, products, catalog, Button, Badge, PriceDisplay, ProductCard, Header, Disclaimer).

- [ ] **Step 2: Production build + lint**

Run: `pnpm build && pnpm lint`
Expected: build succeeds with routes `/`, `/products`, `/products/[slug]` (SSG, 9 params); lint clean.

- [ ] **Step 3: Manual smoke pass**

Run: `pnpm dev`. In a browser, verify:
- `/` shows hero + 4 featured cards with images and prices.
- `/products` shows all 9 products.
- Clicking a card navigates to `/products/<slug>` with image, price, and the FDA disclaimer.
Stop the dev server afterward.

- [ ] **Step 4: Push**

```bash
git push origin main
```

---

## Self-Review

**Spec coverage:**
- Storefront read-path (Home, PLP, PDP) against live Supabase data → Tasks 11, 12, 13. ✅
- Typed data access through `catalog.ts` → Task 4 (consumed by 11–13). ✅
- Design-system components (Button, Badge, PriceDisplay, ProductCard, Header, Footer) → Tasks 5–10. ✅
- Money handled as cents, formatted at view → Task 2 `formatPrice`, used everywhere prices render. ✅
- FDA disclaimer present on PDP and footer → Task 10 `Disclaimer`, used in 10 and 13. ✅
- Images served from app → Task 1 Step 8 copies them to `public/images`; `imageUrl` maps stored paths. ✅
- Test harness for TDD → Task 1. ✅

**Known deferrals (out of scope, by design):**
- Cart/checkout (the PDP "Add to Cart" is a non-functional placeholder), auth pages, Science/Blog pages (Header links will 404 until built), interactive nav dropdowns, and `product_facts` seeding (PDP gracefully omits the table while `facts` is empty). These are separate plans.

**Type consistency:** `ProductWithVariants` / `ProductDetail` / `FactRow` / `defaultVariant` are defined in Task 3 and consumed with identical signatures in Tasks 4, 8, 13. `formatPrice`/`imageUrl` signatures defined in Task 2 match all call sites. `Button` variant union (`lime|forest|cream`) is stable across 5, 9, 11, 13.

**Placeholder scan:** No TBD/TODO; every code step contains complete code; every test step has runnable assertions and an exact command + expected result.
