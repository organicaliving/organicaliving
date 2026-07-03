"use client";
import Link from "next/link";
import { useCartDrawer } from "@/components/cart/CartDrawerProvider";

type Props = { children: React.ReactNode } & Omit<
  React.ComponentProps<"a">,
  "href" | "ref"
>;

export function CartTrigger({ children, onClick, ...rest }: Props) {
  const { openDrawer } = useCartDrawer();
  return (
    <Link
      href="/cart"
      onClick={(e) => {
        onClick?.(e);
        // Let modified / middle clicks open the real /cart page in a new tab.
        if (
          e.defaultPrevented ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          e.button === 1
        ) {
          return;
        }
        e.preventDefault();
        openDrawer();
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
