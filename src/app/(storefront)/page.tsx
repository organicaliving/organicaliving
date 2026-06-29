import { getActiveProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Button } from "@/components/ui/Button";

export default async function Home() {
  const products = await getActiveProducts();
  const featured = products.slice(0, 4);

  return (
    <main>
      <section className="mx-auto max-w-[1180px] px-6 py-24 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          Organica Living
        </p>
        <h1 className="mt-4 text-5xl font-light tracking-tight text-ink">
          Rooted in nature,
          <br />
          backed by science.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
          Clinically formulated supplements for everyday health.
        </p>
        <div className="mt-9">
          <Button href="/products">Shop All Products</Button>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-6 pb-24">
        <h2 className="mb-8 text-2xl font-light text-ink">Featured</h2>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
