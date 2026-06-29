import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SubmitButton } from "@/components/ui/SubmitButton";

describe("SubmitButton", () => {
  it("renders its label and is type=submit", () => {
    render(<SubmitButton>Sign In</SubmitButton>);
    const btn = screen.getByRole("button", { name: "Sign In" });
    expect(btn).toHaveAttribute("type", "submit");
  });
});
