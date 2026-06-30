import type { Metadata } from "next";
import Link from "next/link";
import { getOrderByPaymentIntent } from "@/lib/orders/queries";
import { clearGuestCart } from "@/lib/cart/guest";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Order confirmed — Organica Living" };
export const dynamic = "force-dynamic";

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ payment_intent?: string }> }) {
  const { payment_intent: piId } = await searchParams;
  await clearGuestCart();
  const order = piId ? await getOrderByPaymentIntent(piId) : null;

  return (
    <main className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="text-3xl font-light text-ink">Thank you for your order</h1>
      {order ? (
        <p className="mt-4 text-muted">Order {order.id} — {formatPrice(order.total_cents)}. A confirmation is on its way to your inbox.</p>
      ) : (
        <p className="mt-4 text-muted">Your payment is processing. You&apos;ll receive a confirmation email shortly.</p>
      )}
      <Link href="/products" className="mt-9 inline-block rounded-pill bg-lime px-6 py-3 text-sm font-medium text-ink">Continue shopping</Link>
    </main>
  );
}
