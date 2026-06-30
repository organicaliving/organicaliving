import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => ({
    auth: { getUser: async () => ({ data: { user: null } }) },
  })),
}));

vi.mock("@/lib/cart/queries", () => ({
  getCart: vi.fn(async () => ({
    itemCount: 0,
    lines: [],
    subtotalCents: 0,
    discountCents: 0,
    totalCents: 0,
    code: null,
    currency: "usd",
  })),
}));

vi.mock("@/components/cart/CartCountBadge", () => ({
  CartCountBadge: () => null,
}));

// NavMenus renders client-side hover menus. In tests we render a simple nav
// with a Shop → /products anchor so the assertion below stays valid.
// We use next/link to satisfy the next/no-html-link-for-pages lint rule.
vi.mock("@/components/site/nav/NavMenus", () => ({
  NavMenus: () => {
    // Dynamic import avoids vi.mock hoisting issues with top-level imports.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Link = require("next/link").default;
    return (
      <nav>
        <Link href="/products">Shop</Link>
        <Link href="/science">Science</Link>
        <Link href="/blog">Learn</Link>
      </nav>
    );
  },
}));

// MobileMenu is client-only — stub it out.
vi.mock("@/components/site/nav/MobileMenu", () => ({
  MobileMenu: () => null,
}));

import { Header } from "@/components/site/Header";

describe("Header (logged out)", () => {
  it("links Shop to products and shows Get Started", async () => {
    render(await Header());
    expect(screen.getByRole("link", { name: "Shop" })).toHaveAttribute(
      "href",
      "/products",
    );
    expect(screen.getByRole("link", { name: "Get Started" })).toHaveAttribute(
      "href",
      "/signup",
    );
  });
});
