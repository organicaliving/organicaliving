import Link from "next/link";
import { getCart } from "@/lib/cart/queries";

export async function CartCountBadge() {
  const cart = await getCart();
  // Per the mockup, the Cart only appears once there's something in it.
  if (cart.itemCount === 0) return null;
  return (
    <Link href="/cart" className="relative text-sm text-ink">
      Cart
      <span className="ml-1 rounded-pill bg-forest px-1.5 py-0.5 align-super text-[10px] text-cream">{cart.itemCount}</span>
    </Link>
  );
}
