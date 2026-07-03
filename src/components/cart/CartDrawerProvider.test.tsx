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
