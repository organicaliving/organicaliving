"use client";
import { useActionState } from "react";
import { addItemAction } from "@/lib/cart/actions";
import { SubmitButton } from "@/components/ui/SubmitButton";

export function AddToCartButton({ variantId }: { variantId: string }) {
  const [state, action] = useActionState(addItemAction, null);
  return (
    <form action={action} className="flex flex-col gap-2">
      <input type="hidden" name="variantId" value={variantId} />
      <input type="hidden" name="purchaseType" value="one_time" />
      <input type="hidden" name="quantity" value="1" />
      <SubmitButton>Add to Cart</SubmitButton>
      {state?.ok ? <span className="text-sm text-muted">Added to cart ✓</span> : null}
      {state && !state.ok ? <span className="text-sm text-[#b3261e]">{state.error}</span> : null}
    </form>
  );
}
