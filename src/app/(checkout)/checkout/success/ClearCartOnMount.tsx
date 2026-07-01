"use client";
import { useEffect, useRef } from "react";
import { clearCartAction } from "@/lib/cart/actions";

/**
 * Empties the cart once, after a successful checkout.
 *
 * The cart lives in an httpOnly cookie (guests) or the DB (signed-in users),
 * and cookies may only be mutated from a Server Action or Route Handler — not
 * during a Server Component render. So we clear it from a client effect that
 * invokes the `clearCartAction` server action exactly once on mount.
 */
export function ClearCartOnMount() {
  const cleared = useRef(false);
  useEffect(() => {
    if (cleared.current) return;
    cleared.current = true;
    void clearCartAction();
  }, []);
  return null;
}
