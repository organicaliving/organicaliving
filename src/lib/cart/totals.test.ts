import { describe, it, expect } from "vitest";
import { computeDiscountCents, computeTotals } from "@/lib/cart/totals";

describe("computeDiscountCents", () => {
  it("returns 0 for no discount", () => {
    expect(computeDiscountCents(5000, null)).toBe(0);
  });
  it("computes a percent discount (floored)", () => {
    expect(computeDiscountCents(3999, { code: "X", type: "percent", value: 25 })).toBe(999);
  });
  it("computes a fixed discount capped at subtotal", () => {
    expect(computeDiscountCents(1500, { code: "X", type: "fixed", value: 2500 })).toBe(1500);
  });
});

describe("computeTotals", () => {
  it("sums line items and applies a percent discount", () => {
    const r = computeTotals(
      [{ unitCents: 3999, quantity: 2 }, { unitCents: 2499, quantity: 1 }],
      { code: "BUNDLE25", type: "percent", value: 25 },
    );
    expect(r.subtotalCents).toBe(10497);
    expect(r.itemCount).toBe(3);
    expect(r.discountCents).toBe(2624); // floor(10497*0.25)
    expect(r.totalCents).toBe(7873);
  });
  it("handles an empty cart", () => {
    const r = computeTotals([], null);
    expect(r).toEqual({ subtotalCents: 0, discountCents: 0, totalCents: 0, itemCount: 0 });
  });
});
