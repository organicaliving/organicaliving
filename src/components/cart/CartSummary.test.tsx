import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CartSummary } from "@/components/cart/CartSummary";
import type { CartView } from "@/lib/cart/types";

const cart: CartView = {
  lines: [], itemCount: 3, subtotalCents: 10497, discountCents: 2624, totalCents: 7873, code: "BUNDLE25", currency: "usd",
};

describe("CartSummary", () => {
  it("shows subtotal, discount and total", () => {
    render(<CartSummary cart={cart} />);
    expect(screen.getByText("$104.97")).toBeInTheDocument();
    expect(screen.getByText(/\$26\.24/)).toBeInTheDocument();
    expect(screen.getByText("$78.73")).toBeInTheDocument();
  });
  it("links to checkout", () => {
    render(<CartSummary cart={cart} />);
    expect(screen.getByRole("link", { name: /checkout/i })).toHaveAttribute("href", "/checkout");
  });
});
