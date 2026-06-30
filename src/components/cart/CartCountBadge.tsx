import Link from "next/link";
import { getCart } from "@/lib/cart/queries";

export async function CartCountBadge() {
  const cart = await getCart();
  return (
    <Link href="/cart" className="relative text-sm text-ink">
      Cart
      {cart.itemCount > 0 ? (
        <span className="ml-1 rounded-pill bg-forest px-1.5 py-0.5 align-super text-[10px] text-cream">{cart.itemCount}</span>
      ) : null}
    </Link>
  );
}
