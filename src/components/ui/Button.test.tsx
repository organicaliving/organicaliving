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
  it("renders a button with type=button (not submit)", () => {
    render(<Button>Add</Button>);
    expect(screen.getByRole("button", { name: "Add" })).toHaveAttribute("type", "button");
  });
});
