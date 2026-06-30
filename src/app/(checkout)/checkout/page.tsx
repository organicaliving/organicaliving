import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/cart/queries";
import { computeShipping } from "@/lib/checkout/shipping";
import { imageUrl } from "@/lib/format";
import { CheckoutExperience, type CheckoutLine, type CheckoutSummary } from "@/components/checkout/CheckoutExperience";

export const metadata: Metadata = { title: "Checkout — Organica Living" };
export const dynamic = "force-dynamic";

const FOOTER_LINKS = ["Refund policy", "Shipping", "Privacy policy", "Terms of service", "Cancellations"];

export default async function CheckoutPage() {
  const cart = await getCart();
  if (cart.lines.length === 0) redirect("/cart");

  const shipping = computeShipping(cart.subtotalCents);
  const amountCents = cart.subtotalCents - cart.discountCents + shipping.amountCents;

  const lines: CheckoutLine[] = cart.lines.map((l) => {
    const regularLineCents = l.regularUnitCents * l.quantity;
    const isSub = l.purchaseType === "subscription";
    return {
      key: `${l.variantId}-${l.purchaseType}`,
      name: l.productName,
      quantity: l.quantity,
      lineCents: l.lineCents,
      regularLineCents,
      isSubscription: isSub,
      intervalLabel: isSub
        ? l.interval === "quarterly"
          ? "3-month subscription"
          : "Monthly subscription"
        : null,
      savingsCents: isSub ? Math.max(0, regularLineCents - l.lineCents) : 0,
      imageUrl: imageUrl(l.imagePath) ?? (l.productSlug ? `/images/${l.productSlug}.webp` : null),
    };
  });

  const lineSavings = lines.reduce((sum, l) => sum + l.savingsCents, 0);
  const summary: CheckoutSummary = {
    lines,
    itemCount: cart.itemCount,
    subtotalCents: cart.subtotalCents,
    discountCents: cart.discountCents,
    shippingCents: shipping.amountCents,
    amountCents,
    totalSavingsCents: lineSavings + cart.discountCents,
    code: cart.code,
    currency: cart.currency,
  };

  return (
    <div style={{ background: "#fcfcf7" }}>
      {/* minimal checkout header */}
      <header style={{ borderBottom: "1px solid #ece9de", padding: "20px 0", background: "#fcfcf7" }}>
        <div style={{ textAlign: "center" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }} aria-label="Organica Living">
            <Image src="/organica-living-logo.png" alt="Organica Living" width={133} height={40} style={{ height: 40, width: "auto", display: "block" }} priority />
          </Link>
        </div>
      </header>

      {/* checkout body */}
      <section style={{ background: "#fff" }}>
        <CheckoutExperience summary={summary} />
      </section>

      {/* minimal checkout footer */}
      <footer style={{ borderTop: "1px solid #ece9de", padding: "26px 0", background: "#fcfcf7" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", fontSize: 13 }}>
          {FOOTER_LINKS.map((l) => (
            <a key={l} href="#" style={{ color: "#1c3a13", textDecoration: "underline" }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
