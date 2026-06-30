import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/Badge";

describe("Badge", () => {
  it("renders its label", () => {
    render(<Badge label="New" />);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("applies outline variant styles by default (new)", () => {
    const { container } = render(<Badge label="New" />);
    const badge = container.querySelector("span");
    // Default variant "new" is outline — check it has border class
    expect(badge?.className).toContain("border");
    expect(badge?.className).toContain("text-forest");
  });

  it("applies lime bg for bestseller variant", () => {
    const { container } = render(<Badge label="Bestseller" variant="bestseller" />);
    const badge = container.querySelector("span");
    expect(badge?.className).toContain("bg-lime");
  });

  it("renders label variant with mono border styling", () => {
    const { container } = render(<Badge label="DS-01" variant="label" />);
    const badge = container.querySelector("span");
    expect(badge?.className).toContain("font-mono");
  });
});
