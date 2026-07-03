import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { CartIcon } from "@/components/ui/CartIcon";

describe("CartIcon", () => {
  it("renders an svg sized by the size prop with currentColor stroke", () => {
    const { container } = render(<CartIcon size={30} />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("width", "30");
    expect(svg).toHaveAttribute("height", "30");
    expect(svg).toHaveAttribute("stroke", "currentColor");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });
});
