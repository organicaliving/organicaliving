import type { Metadata } from "next";
import { getActiveProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/catalog/ProductCard";

export const metadata: Metadata = {
  title: "Shop All — Organica Living",
  description: "Browse the full Organica Living supplement range.",
};

export default async function ProductsPage() {
  const products = await getActiveProducts();

  return (
    <main className="mx-auto max-w-[1180px] px-6 py-16">
      <header className="mb-10">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Shop</p>
        <h1 className="mt-2 text-4xl font-light tracking-tight text-ink">All Products</h1>
      </header>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
