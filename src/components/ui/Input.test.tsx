import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "@/components/ui/Input";

describe("Input", () => {
  it("renders with name and type", () => {
    render(<Input name="email" type="email" aria-label="Email" />);
    const el = screen.getByLabelText("Email");
    expect(el).toHaveAttribute("name", "email");
    expect(el).toHaveAttribute("type", "email");
  });
});
