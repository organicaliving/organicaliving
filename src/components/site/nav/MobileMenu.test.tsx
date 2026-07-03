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
