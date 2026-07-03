/**
 * Desktop "Cart" label + count pill. Rendered inside a CartTrigger by the Header,
 * which supplies itemCount (fetched once). Per the mockup, absent when the cart
 * is empty. The pill is keyed by itemCount so it replays the bump animation on change.
 */
export function CartCountBadge({ itemCount }: { itemCount: number }) {
  if (itemCount === 0) return null;
  return (
    <span className="relative text-sm text-ink">
      Cart
      <span
        key={itemCount}
        className="og-cart-bump ml-1 rounded-pill bg-forest px-1.5 py-0.5 align-super text-[10px] text-cream"
      >
        {itemCount}
      </span>
    </span>
  );
}
