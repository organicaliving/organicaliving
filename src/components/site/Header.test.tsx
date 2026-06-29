import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => ({ auth: { getUser: async () => ({ data: { user: null } }) } })),
}));
import { Header } from "@/components/site/Header";

describe("Header (logged out)", () => {
  it("links Shop to products and shows Get Started", async () => {
    render(await Header());
    expect(screen.getByRole("link", { name: "Shop" })).toHaveAttribute("href", "/products");
    expect(screen.getByRole("link", { name: "Get Started" })).toHaveAttribute("href", "/signup");
  });
});
