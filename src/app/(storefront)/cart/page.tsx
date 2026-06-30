import type { Metadata } from "next";
import Link from "next/link";
import { getCart } from "@/lib/cart/queries";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { CartSummary } from "@/components/cart/CartSummary";

export const metadata: Metadata = { title: "Cart — Organica Living" };
export const dynamic = "force-dynamic";

export default async function CartPage() {
  const cart = await getCart();
  return (
    <main className="mx-auto max-w-[1180px] px-6 py-16">
      <h1 className="mb-8 text-3xl font-light text-ink">Your cart</h1>
      {cart.lines.length === 0 ? (
        <div className="rounded-lg border border-line bg-header p-10 text-center">
          <p className="text-muted">Your cart is empty.</p>
          <Link href="/products" className="mt-4 inline-block rounded-pill bg-lime px-6 py-3 text-sm font-medium text-ink">Shop products</Link>
        </div>
      ) : (
        <div className="grid gap-10 md:grid-cols-[1fr_360px]">
          <div>{cart.lines.map((l) => <CartLineItem key={`${l.variantId}-${l.purchaseType}`} line={l} />)}</div>
          <CartSummary cart={cart} />
        </div>
      )}
    </main>
  );
}
