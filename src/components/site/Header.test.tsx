import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/site/Header";

describe("Header", () => {
  it("links Shop to the products page", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: "Shop" })).toHaveAttribute("href", "/products");
  });
  it("renders the Get Started CTA", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: "Get Started" })).toHaveAttribute("href", "/signup");
  });
});
