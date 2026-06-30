import { describe, it, expect } from "vitest";
import { parseCart, serializeCart } from "@/lib/cart/guest";

describe("parseCart", () => {
  it("returns empty for undefined / bad JSON", () => {
    expect(parseCart(undefined)).toEqual({ items: [] });
    expect(parseCart("not json")).toEqual({ items: [] });
  });
  it("round-trips valid data", () => {
    const cart = { items: [{ variantId: "v1", quantity: 2, purchaseType: "one_time" as const }], code: "BUNDLE25" };
    expect(parseCart(serializeCart(cart))).toEqual(cart);
  });
  it("drops malformed items and clamps shape", () => {
    const raw = JSON.stringify({ items: [{ variantId: "v1", quantity: 1, purchaseType: "one_time" }, { nope: true }] });
    expect(parseCart(raw).items).toHaveLength(1);
  });
});
