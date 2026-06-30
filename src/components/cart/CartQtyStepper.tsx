import { updateQtyAction } from "@/lib/cart/actions";
import type { PurchaseType } from "@/lib/cart/types";

const boundUpdateQty = updateQtyAction.bind(null, null) as unknown as (
  formData: FormData
) => Promise<void>;

/**
 * Pill stepper matching the Cart mockup (− value +). Wired to the real
 * updateQtyAction; decrementing below 1 sends quantity 0, which removes the line.
 */
export function CartQtyStepper({
  variantId,
  purchaseType,
  quantity,
}: {
  variantId: string;
  purchaseType: PurchaseType;
  quantity: number;
}) {
  const btn = (next: number, label: string, glyph: string) => (
    <form action={boundUpdateQty} style={{ display: "flex" }}>
      <input type="hidden" name="variantId" value={variantId} />
      <input type="hidden" name="purchaseType" value={purchaseType} />
      <input type="hidden" name="quantity" value={next} />
      <button
        type="submit"
        aria-label={label}
        style={{
          cursor: "pointer",
          fontSize: 16,
          color: "#1a1a1a",
          background: "transparent",
          border: "none",
          padding: 0,
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        {glyph}
      </button>
    </form>
  );

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 18,
        border: "1px solid #d7d3c6",
        borderRadius: 30,
        padding: "8px 16px",
      }}
    >
      {btn(Math.max(0, quantity - 1), "Decrease quantity", "−")}
      <span style={{ fontSize: 14, minWidth: 10, textAlign: "center" }}>{quantity}</span>
      {btn(quantity + 1, "Increase quantity", "+")}
    </div>
  );
}
