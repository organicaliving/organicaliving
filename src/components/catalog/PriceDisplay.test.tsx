import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PriceDisplay } from "@/components/catalog/PriceDisplay";

describe("PriceDisplay", () => {
  it("shows the price", () => {
    render(<PriceDisplay priceCents={3999} />);
    expect(screen.getByText("$39.99")).toBeInTheDocument();
  });
  it("shows a subscribe & save line when provided", () => {
    render(<PriceDisplay priceCents={3999} subscriptionPriceCents={2999} />);
    expect(screen.getByText(/subscribe & save/i)).toBeInTheDocument();
    expect(screen.getByText(/\$29\.99/)).toBeInTheDocument();
  });
  it("shows a struck compare-at price when provided", () => {
    render(<PriceDisplay priceCents={2999} compareAtCents={3999} />);
    expect(screen.getByText("$39.99")).toBeInTheDocument();
  });
});
