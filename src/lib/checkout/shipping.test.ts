import { describe, it, expect } from "vitest";
import { computeShipping } from "@/lib/checkout/shipping";

describe("computeShipping", () => {
  it("is free at or over the threshold", () => {
    expect(computeShipping(5000).amountCents).toBe(0);
    expect(computeShipping(9999).amountCents).toBe(0);
  });
  it("charges standard below the threshold", () => {
    const s = computeShipping(4999);
    expect(s.amountCents).toBe(599);
    expect(s.id).toBe("standard");
  });
});
