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
