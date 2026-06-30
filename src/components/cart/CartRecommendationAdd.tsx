import { addItemAction } from "@/lib/cart/actions";
import type { PurchaseType } from "@/lib/cart/types";

const boundAdd = addItemAction.bind(null, null) as unknown as (
  formData: FormData
) => Promise<void>;

/** Outline "Add" button on the "You Might Also Like" cards, wired to addItemAction. */
export function CartRecommendationAdd({
  variantId,
  purchaseType = "subscription",
}: {
  variantId: string;
  purchaseType?: PurchaseType;
}) {
  return (
    <form action={boundAdd} style={{ marginTop: 14 }}>
      <input type="hidden" name="variantId" value={variantId} />
      <input type="hidden" name="purchaseType" value={purchaseType} />
      <input type="hidden" name="quantity" value="1" />
      <button
        type="submit"
        style={{
          display: "inline-block",
          fontSize: 13,
          fontWeight: 500,
          color: "#1a1a1a",
          border: "1.5px solid #1a1a1a",
          borderRadius: 30,
          padding: "8px 26px",
          textDecoration: "none",
          background: "transparent",
          cursor: "pointer",
        }}
      >
        Add
      </button>
    </form>
  );
}
