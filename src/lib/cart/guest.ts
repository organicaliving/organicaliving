import "server-only";
import { cookies } from "next/headers";
import type { CartCookieItem, PurchaseType } from "@/lib/cart/types";

export const COOKIE_NAME = "og_cart";
export const MAX_ITEMS = 50;

type GuestCart = { items: CartCookieItem[]; code?: string };

function isItem(x: unknown): x is CartCookieItem {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  const pt = o.purchaseType;
  return (
    typeof o.variantId === "string" &&
    typeof o.quantity === "number" &&
    o.quantity > 0 &&
    (pt === "one_time" || pt === "subscription")
  );
}

export function parseCart(raw: string | undefined): GuestCart {
  if (!raw) return { items: [] };
  try {
    const data = JSON.parse(raw) as unknown;
    if (!data || typeof data !== "object") return { items: [] };
    const o = data as Record<string, unknown>;
    const items = Array.isArray(o.items) ? o.items.filter(isItem).slice(0, MAX_ITEMS) : [];
    const code = typeof o.code === "string" ? o.code : undefined;
    return code ? { items, code } : { items };
  } catch {
    return { items: [] };
  }
}

export function serializeCart(cart: GuestCart): string {
  return JSON.stringify(cart);
}

export async function readGuestCart(): Promise<GuestCart> {
  const store = await cookies();
  return parseCart(store.get(COOKIE_NAME)?.value);
}

export async function writeGuestCart(cart: GuestCart): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, serializeCart(cart), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearGuestCart(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export type { GuestCart, PurchaseType };
