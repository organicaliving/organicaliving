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
