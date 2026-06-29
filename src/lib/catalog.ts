import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { ProductWithVariants, ProductDetail } from "@/lib/products";

export async function getActiveProducts(): Promise<ProductWithVariants[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, variants:product_variants(*)")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as unknown as ProductWithVariants[];
}

export async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, variants:product_variants(*), facts:product_facts(*)")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (error) throw error;
  return (data as unknown as ProductDetail) ?? null;
}

export async function getProductSlugs(): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("slug")
    .eq("is_active", true);
  if (error) throw error;
  return (data ?? []).map((r: { slug: string }) => r.slug);
}
