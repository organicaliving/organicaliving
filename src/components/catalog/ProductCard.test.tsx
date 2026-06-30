import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "@/components/catalog/ProductCard";
import type { ProductWithVariants } from "@/lib/products";

const product: ProductWithVariants = {
  id: "p1", slug: "multi-pro", name: "Multi Pro", subtitle: "Multivitamin + Minerals",
  category: "Multivitamin", description: null, badge: "New",
  image_path: "images/multi-pro.webp", hero_claims: [], benefits: [],
  is_active: true, sort_order: 1, created_at: "", updated_at: "",
  variants: [{
    id: "v1", product_id: "p1", sku: "OL-MULTI-60", upc: null, title: "60 capsules",
    price_cents: 3999, compare_at_cents: null, subscription_eligible: true,
    subscription_price_cents: 2999, currency: "usd", stripe_price_id: null,
    stripe_sub_price_id: null, inventory: null, is_default: true,
    created_at: "", updated_at: "",
  }],
};

describe("ProductCard", () => {
  it("links to the product detail page", () => {
    render(<ProductCard product={product} />);
    // All links in the card point to /products/[slug]
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
    links.forEach((link) => {
      expect(link).toHaveAttribute("href", "/products/multi-pro");
    });
  });

  it("shows name, category and price", () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText("Multi Pro")).toBeInTheDocument();
    expect(screen.getByText("Multivitamin")).toBeInTheDocument();
    expect(screen.getByText("$39.99")).toBeInTheDocument();
  });

  it("shows the badge when present", () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("shows Learn More and Add To Cart actions", () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText("Learn More")).toBeInTheDocument();
    expect(screen.getByText("Add To Cart")).toBeInTheDocument();
  });
});
