import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { CartView } from "@/lib/cart/types";

/** Sticky footer of the cart mini-panel: discounts, total, checkout. */
export function CartDrawerFooter({ cart }: { cart: CartView }) {
  return (
    <div style={{ borderTop: "1px solid #ece9de", padding: "18px 24px 24px", background: "#fcfcf7" }}>
      {cart.discountCents > 0 ? (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 14, color: "#1a1a1a" }}>Discounts</span>
          <span style={{ fontSize: 13, color: "#1c3a13", background: "#e7f0c8", padding: "3px 10px", borderRadius: 6 }}>
            −{formatPrice(cart.discountCents, cart.currency)}
          </span>
        </div>
      ) : null}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: 20, fontWeight: 600 }}>Total</span>
        <span style={{ fontSize: 20, fontWeight: 600 }}>{formatPrice(cart.totalCents, cart.currency)}</span>
      </div>
      <div style={{ fontSize: 12, color: "#6d6d6d", marginTop: 6 }}>
        Shipping + taxes calculated at checkout
      </div>
      <Link
        href="/checkout"
        style={{
          lineHeight: 1,
          display: "block",
          textAlign: "center",
          width: "100%",
          padding: "19px 0",
          marginTop: 18,
          fontSize: 15,
          fontWeight: 500,
          color: "#fcfcf7",
          background: "#1c3a13",
          borderRadius: 40,
          textDecoration: "none",
        }}
      >
        Checkout
      </Link>
    </div>
  );
}
