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
