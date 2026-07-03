// src/components/site/nav/MobileMenu.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MobileMenu } from "@/components/site/nav/MobileMenu";

describe("MobileMenu", () => {
  it("renders the shop pane and no View cart row", () => {
    render(<MobileMenu isLoggedIn={false} />);
    expect(screen.getByText("Multi Pro")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /view cart/i })).not.toBeInTheDocument();
  });
});
