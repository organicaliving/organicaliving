"use client";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addItemAction } from "@/lib/cart/actions";

/**
 * "Add To Cart" control for product cards (grid + featured on /products).
 * Submits the default variant to addItemAction, then refreshes so the header
 * cart badge reflects the new item. Rendered as an underline link to match the
 * mockup — pass `className` to control its colour on dark cards.
 */
export function ProductCardAddToCart({
  variantId,
  className = "text-[13px] font-medium text-ink underline",
}: {
  variantId: string;
  className?: string;
}) {
  const router = useRouter();
  const [state, action, pending] = useActionState(addItemAction, null);

  useEffect(() => {
    if (state?.ok) router.refresh();
  }, [state, router]);

  return (
    <form action={action} className="relative z-[2] inline-flex leading-none">
      <input type="hidden" name="variantId" value={variantId} />
      <input type="hidden" name="purchaseType" value="one_time" />
      <input type="hidden" name="quantity" value="1" />
      <button
        type="submit"
        disabled={pending}
        className={`${className} disabled:opacity-70`}
      >
        {state?.ok ? "Added To Cart ✓" : pending ? "Adding…" : "Add To Cart"}
      </button>
      {state && !state.ok ? (
        <span className="ml-2 text-[12px] text-[#b3261e]">{state.error}</span>
      ) : null}
    </form>
  );
}
