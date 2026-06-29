import type { Tables } from "@/lib/supabase/database.types";

export type Product = Tables<"products">;
export type ProductVariant = Tables<"product_variants">;
export type ProductFacts = Tables<"product_facts">;

export type ProductWithVariants = Product & { variants: ProductVariant[] };
export type ProductDetail = ProductWithVariants & { facts: ProductFacts[] };

/** One row of a Supplement Facts table (stored as JSON in product_facts.rows). */
export type FactRow = { name: string; amount?: string; dv?: string };

export function defaultVariant(p: ProductWithVariants): ProductVariant | undefined {
  return p.variants.find((v) => v.is_default) ?? p.variants[0];
}
