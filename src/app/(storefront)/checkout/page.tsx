import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/cart/queries";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Checkout — Organica Living" };
export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const cart = await getCart();
  if (cart.lines.length === 0) redirect("/cart");
  return (
    <main className="mx-auto max-w-[1180px] px-6 py-16">
      <h1 className="mb-8 text-3xl font-light text-ink">Checkout</h1>
      <div className="grid gap-10 md:grid-cols-[1fr_360px]">
        <CheckoutForm />
        <div className="rounded-lg border border-line bg-header p-6">
          <div className="flex justify-between text-sm text-ink"><span>Subtotal</span><span>{formatPrice(cart.subtotalCents, cart.currency)}</span></div>
          {cart.discountCents > 0 ? <div className="mt-2 flex justify-between text-sm text-muted"><span>Discount</span><span>−{formatPrice(cart.discountCents, cart.currency)}</span></div> : null}
          <p className="mt-3 text-xs text-muted">Shipping &amp; tax calculated at payment.</p>
        </div>
      </div>
    </main>
  );
}
