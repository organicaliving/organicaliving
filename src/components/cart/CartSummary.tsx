import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { applyPromoAction } from "@/lib/cart/actions";
import type { CartView } from "@/lib/cart/types";

const boundApplyPromoAction = applyPromoAction.bind(null, null) as unknown as (formData: FormData) => Promise<void>;

export function CartSummary({ cart }: { cart: CartView }) {
  return (
    <div className="rounded-lg border border-line bg-header p-6">
      <div className="flex justify-between text-sm text-ink"><span>Subtotal</span><span>{formatPrice(cart.subtotalCents, cart.currency)}</span></div>
      {cart.discountCents > 0 ? (
        <div className="mt-2 flex justify-between text-sm text-muted"><span>Discount{cart.code ? ` (${cart.code})` : ""}</span><span>−{formatPrice(cart.discountCents, cart.currency)}</span></div>
      ) : null}
      <div className="mt-3 flex justify-between border-t border-line pt-3 text-base font-medium text-ink"><span>Total</span><span>{formatPrice(cart.totalCents, cart.currency)}</span></div>
      <form action={boundApplyPromoAction} className="mt-4 flex gap-2">
        <input name="code" placeholder="Promo code" className="w-full rounded-sm border border-line bg-cream px-3 py-2 text-sm" />
        <button type="submit" className="rounded-sm border border-line px-3 text-sm text-ink">Apply</button>
      </form>
      <Link href="/checkout" className="mt-4 block rounded-pill bg-lime px-6 py-3 text-center text-sm font-medium text-ink">Checkout</Link>
    </div>
  );
}
