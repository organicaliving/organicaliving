import { describe, it, expect } from "vitest";
import { defaultVariant, type ProductWithVariants } from "@/lib/products";

function make(variants: Array<{ id: string; is_default: boolean }>): ProductWithVariants {
  return {
    id: "p1", slug: "x", name: "X", subtitle: null, category: null,
    description: null, badge: null, image_path: null, hero_claims: [],
    benefits: [], is_active: true, sort_order: 0,
    created_at: "", updated_at: "",
    variants: variants.map((v) => ({
      id: v.id, product_id: "p1", sku: null, upc: null, title: "t",
      price_cents: 1000, compare_at_cents: null, subscription_eligible: true,
      subscription_price_cents: null, currency: "usd", stripe_price_id: null,
      stripe_sub_price_id: null, inventory: null, is_default: v.is_default,
      created_at: "", updated_at: "",
    })),
  };
}

describe("defaultVariant", () => {
  it("returns the is_default variant", () => {
    const p = make([{ id: "a", is_default: false }, { id: "b", is_default: true }]);
    expect(defaultVariant(p)?.id).toBe("b");
  });
  it("falls back to the first variant", () => {
    const p = make([{ id: "a", is_default: false }]);
    expect(defaultVariant(p)?.id).toBe("a");
  });
  it("returns undefined with no variants", () => {
    const p = make([]);
    expect(defaultVariant(p)).toBeUndefined();
  });
});
