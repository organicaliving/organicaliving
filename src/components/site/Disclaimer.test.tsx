import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Disclaimer } from "@/components/site/Disclaimer";

describe("Disclaimer", () => {
  it("renders the FDA disclaimer verbatim", () => {
    render(<Disclaimer />);
    expect(
      screen.getByText(/have not been evaluated by the Food and Drug Administration/i),
    ).toBeInTheDocument();
  });
});
