import { describe, it, expect } from "vitest";
import { toTaxLineItems } from "@/lib/checkout/tax";
import type { CartLine } from "@/lib/cart/types";

const line: CartLine = {
  variantId: "v1", productSlug: "x", productName: "X", variantTitle: "30", imagePath: null,
  unitCents: 3999, quantity: 2, purchaseType: "one_time", lineCents: 7998,
};

describe("toTaxLineItems", () => {
  it("maps cart lines to Stripe tax line items", () => {
    expect(toTaxLineItems([line])).toEqual([{ amount: 7998, reference: "v1" }]);
  });
});
