import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => ({ auth: { getUser: async () => ({ data: { user: null } }) } })),
}));
vi.mock("@/lib/cart/queries", () => ({ getCart: vi.fn(async () => ({ itemCount: 0, lines: [], subtotalCents: 0, discountCents: 0, totalCents: 0, code: null, currency: "usd" })) }));
vi.mock("@/components/cart/CartCountBadge", () => ({ CartCountBadge: () => null }));
import { Header } from "@/components/site/Header";

describe("Header (logged out)", () => {
  it("links Shop to products and shows Get Started", async () => {
    render(await Header());
    expect(screen.getByRole("link", { name: "Shop" })).toHaveAttribute("href", "/products");
    expect(screen.getByRole("link", { name: "Get Started" })).toHaveAttribute("href", "/signup");
  });
});
