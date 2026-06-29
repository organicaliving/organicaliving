import { describe, it, expect } from "vitest";
import { formatPrice, imageUrl } from "@/lib/format";

describe("formatPrice", () => {
  it("formats cents as USD", () => {
    expect(formatPrice(3999)).toBe("$39.99");
  });
  it("formats whole-dollar amounts", () => {
    expect(formatPrice(2500)).toBe("$25.00");
  });
});

describe("imageUrl", () => {
  it("prefixes a leading slash", () => {
    expect(imageUrl("images/multi-pro.webp")).toBe("/images/multi-pro.webp");
  });
  it("leaves an already-absolute path alone", () => {
    expect(imageUrl("/images/x.webp")).toBe("/images/x.webp");
  });
  it("returns null for missing paths", () => {
    expect(imageUrl(null)).toBeNull();
  });
});
