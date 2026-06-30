"use client";
import { updateQtyAction } from "@/lib/cart/actions";
import type { PurchaseType } from "@/lib/cart/types";

export function QuantityStepper({ variantId, purchaseType, quantity }: { variantId: string; purchaseType: PurchaseType; quantity: number }) {
  function form(next: number, label: string) {
    return (
      <form action={updateQtyAction.bind(null, null) as (formData: FormData) => Promise<void>}>
        <input type="hidden" name="variantId" value={variantId} />
        <input type="hidden" name="purchaseType" value={purchaseType} />
        <input type="hidden" name="quantity" value={next} />
        <button type="submit" aria-label={label} className="h-7 w-7 rounded-sm border border-line text-ink">{label === "Increase quantity" ? "+" : "−"}</button>
      </form>
    );
  }
  return (
    <div className="flex items-center gap-2">
      {form(Math.max(0, quantity - 1), "Decrease quantity")}
      <span className="min-w-6 text-center text-sm text-ink">{quantity}</span>
      {form(quantity + 1, "Increase quantity")}
    </div>
  );
}
