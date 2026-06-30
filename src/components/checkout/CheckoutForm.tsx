"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { formatPrice } from "@/lib/format";
import type { CheckoutQuote } from "@/lib/checkout/types";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function PayStep({ quote }: { quote: CheckoutQuote }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function pay() {
    if (!stripe || !elements) return;
    setBusy(true);
    setError(null);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/checkout/success` },
    });
    if (error) { setError(error.message ?? "Payment failed."); setBusy(false); }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-line bg-header p-4">
        <div className="flex justify-between text-sm text-ink"><span>Subtotal</span><span>{formatPrice(quote.subtotalCents, quote.currency)}</span></div>
        {quote.discountCents > 0 ? <div className="mt-2 flex justify-between text-sm text-muted"><span>Discount</span><span>−{formatPrice(quote.discountCents, quote.currency)}</span></div> : null}
        {quote.shippingCents > 0 ? <div className="mt-2 flex justify-between text-sm text-ink"><span>Shipping</span><span>{formatPrice(quote.shippingCents, quote.currency)}</span></div> : null}
        {quote.taxCents > 0 ? <div className="mt-2 flex justify-between text-sm text-ink"><span>Tax</span><span>{formatPrice(quote.taxCents, quote.currency)}</span></div> : null}
        <div className="mt-3 flex justify-between border-t border-line pt-3 text-sm font-medium text-ink"><span>Total</span><span>{formatPrice(quote.totalCents, quote.currency)}</span></div>
      </div>
      <PaymentElement />
      {error ? <p className="text-sm text-[#b3261e]">{error}</p> : null}
      <button onClick={pay} disabled={busy || !stripe} className="rounded-pill bg-lime px-6 py-3 text-sm font-medium text-ink disabled:opacity-60">
        {busy ? "Processing…" : `Pay ${formatPrice(quote.totalCents, quote.currency)}`}
      </button>
    </div>
  );
}

export function CheckoutForm() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [quote, setQuote] = useState<CheckoutQuote | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Object.fromEntries(fd)),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error ?? "Could not start checkout."); setBusy(false); return; }
    setClientSecret(data.clientSecret);
    setQuote(data.quote);
    setBusy(false);
  }

  if (clientSecret && quote) {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PayStep quote={quote} />
      </Elements>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <FormField label="Email" htmlFor="email"><Input id="email" name="email" type="email" autoComplete="email" required /></FormField>
      <FormField label="Full name" htmlFor="fullName"><Input id="fullName" name="fullName" autoComplete="name" required /></FormField>
      <FormField label="Address" htmlFor="line1"><Input id="line1" name="line1" autoComplete="address-line1" required /></FormField>
      <FormField label="Apt, suite (optional)" htmlFor="line2"><Input id="line2" name="line2" autoComplete="address-line2" /></FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="City" htmlFor="city"><Input id="city" name="city" autoComplete="address-level2" required /></FormField>
        <FormField label="State" htmlFor="state"><Input id="state" name="state" autoComplete="address-level1" required /></FormField>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="ZIP" htmlFor="postalCode"><Input id="postalCode" name="postalCode" autoComplete="postal-code" required /></FormField>
        <FormField label="Country" htmlFor="country"><Input id="country" name="country" defaultValue="US" autoComplete="country" required /></FormField>
      </div>
      {error ? <p className="text-sm text-[#b3261e]">{error}</p> : null}
      <button type="submit" disabled={busy} className="rounded-pill bg-lime px-6 py-3 text-sm font-medium text-ink disabled:opacity-60">
        {busy ? "…" : "Continue to payment"}
      </button>
    </form>
  );
}
