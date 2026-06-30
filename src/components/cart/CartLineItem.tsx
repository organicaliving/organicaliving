import Image from "next/image";
import Link from "next/link";
import { imageUrl, formatPrice } from "@/lib/format";
import { QuantityStepper } from "@/components/cart/QuantityStepper";
import { removeItemAction } from "@/lib/cart/actions";
import type { CartLine } from "@/lib/cart/types";

export function CartLineItem({ line }: { line: CartLine }) {
  const img = imageUrl(line.imagePath);
  return (
    <div className="flex items-center gap-4 border-b border-line py-4">
      <div className="relative h-16 w-16 flex-none rounded-sm bg-header">
        {img ? <Image src={img} alt={line.productName} fill className="object-contain p-1" sizes="64px" /> : null}
      </div>
      <div className="min-w-0 flex-1">
        <Link href={`/products/${line.productSlug}`} className="text-sm font-medium text-ink">{line.productName}</Link>
        <p className="text-xs text-muted">{line.variantTitle}{line.purchaseType === "subscription" ? " · Subscription" : ""}</p>
        <div className="mt-2"><QuantityStepper variantId={line.variantId} purchaseType={line.purchaseType} quantity={line.quantity} /></div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="text-sm text-ink">{formatPrice(line.lineCents)}</span>
        <form action={removeItemAction.bind(null, null) as (formData: FormData) => Promise<void>}>
          <input type="hidden" name="variantId" value={line.variantId} />
          <input type="hidden" name="purchaseType" value={line.purchaseType} />
          <button type="submit" className="text-xs text-muted underline">Remove</button>
        </form>
      </div>
    </div>
  );
}
