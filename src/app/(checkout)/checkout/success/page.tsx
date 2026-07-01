import type { Metadata } from "next";
import Link from "next/link";
import { getOrderByPaymentIntent } from "@/lib/orders/queries";
import { formatPrice } from "@/lib/format";
import { stripe } from "@/lib/stripe";
import { ClearCartOnMount } from "./ClearCartOnMount";

export const metadata: Metadata = { title: "Order confirmed — Organica Living" };
export const dynamic = "force-dynamic";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ payment_intent?: string; payment_intent_client_secret?: string }>;
}) {
  const { payment_intent: piId, payment_intent_client_secret: clientSecret } = await searchParams;

  let order = null;
  if (piId && clientSecret) {
    try {
      const pi = await stripe.paymentIntents.retrieve(piId);
      if (pi.client_secret === clientSecret) {
        order = await getOrderByPaymentIntent(piId);
      }
    } catch {
      // ignore; show the processing fallback
    }
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-24 text-center">
      <ClearCartOnMount />
      <h1 className="text-3xl font-light text-ink">Thank you for your order</h1>
      {order ? (
        <p className="mt-4 text-[20px] text-muted">Order {order.id} — {formatPrice(order.total_cents)}. A confirmation is on its way to your inbox.</p>
      ) : (
        <p className="mt-4 text-[20px] text-muted">Your payment is processing. You&apos;ll receive a confirmation email shortly.</p>
      )}
      <Link href="/products" className="mt-9 inline-block rounded-pill bg-lime px-6 py-3 text-sm font-medium text-ink">Continue shopping</Link>
    </main>
  );
}
