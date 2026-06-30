import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ActionInput } from "@/components/ui/ActionInput";

describe("ActionInput", () => {
  it("renders an input with the given name", () => {
    render(<ActionInput name="email" placeholder="Enter your email" ariaLabel="Subscribe" />);
    const input = document.querySelector("input[name='email']");
    expect(input).toBeInTheDocument();
  });

  it("renders a submit button", () => {
    render(<ActionInput name="email" ariaLabel="Subscribe" />);
    const btn = screen.getByRole("button", { name: "Subscribe" });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute("type", "submit");
  });

  it("button contains a [data-arrow] element for the arrow nudge", () => {
    render(<ActionInput name="email" ariaLabel="Subscribe" />);
    const arrow = document.querySelector("[data-arrow]");
    expect(arrow).toBeInTheDocument();
  });

  it("accepts type prop", () => {
    render(<ActionInput name="email" type="email" ariaLabel="Subscribe" />);
    const input = document.querySelector("input[name='email']");
    expect(input).toHaveAttribute("type", "email");
  });
});
