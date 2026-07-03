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
