import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";

describe("FormField", () => {
  it("associates label and shows error", () => {
    render(<FormField label="Email" htmlFor="email" error="Required"><Input id="email" name="email" /></FormField>);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByText("Required")).toBeInTheDocument();
  });
});
