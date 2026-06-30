"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { readGuestCart, writeGuestCart, clearGuestCart, MAX_ITEMS, MAX_QTY_PER_LINE } from "@/lib/cart/guest";
import { validatePromoCode } from "@/lib/cart/queries";
import type { ActionResult } from "@/lib/forms";

const addSchema = z.object({
  variantId: z.string().uuid(),
  quantity: z.coerce.number().int().min(1).default(1),
  purchaseType: z.enum(["one_time", "subscription"]).default("one_time"),
});
const updateSchema = z.object({
  variantId: z.string().uuid(),
  purchaseType: z.enum(["one_time", "subscription"]).default("one_time"),
  quantity: z.coerce.number().int().min(0),
});
const removeSchema = z.object({
  variantId: z.string().uuid(),
  purchaseType: z.enum(["one_time", "subscription"]).default("one_time"),
});

async function currentUserId(): Promise<string | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id ?? null;
}

async function dbActiveCartId(userId: string): Promise<string> {
  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("carts").select("id").eq("user_id", userId).eq("status", "active").maybeSingle();
  if (existing?.id) return existing.id;
  const { data: created, error } = await supabase
    .from("carts").insert({ user_id: userId }).select("id").single();
  if (error || !created) throw new Error(error?.message ?? "Could not create cart");
  return created.id;
}

export async function addItemAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const parsed = addSchema.safeParse({
    variantId: formData.get("variantId"),
    quantity: formData.get("quantity") ?? undefined,
    purchaseType: formData.get("purchaseType") ?? undefined,
  });
  if (!parsed.success) return { ok: false, error: "Could not add to cart.", fieldErrors: parsed.error.flatten().fieldErrors };
  const { variantId, quantity, purchaseType } = parsed.data;
  const userId = await currentUserId();

  if (!userId) {
    const cart = await readGuestCart();
    const existing = cart.items.find((i) => i.variantId === variantId && i.purchaseType === purchaseType);
    if (existing) existing.quantity = Math.min(existing.quantity + quantity, MAX_QTY_PER_LINE);
    else {
      if (cart.items.length >= MAX_ITEMS) return { ok: false, error: "Cart is full." };
      cart.items.push({ variantId, quantity: Math.min(quantity, MAX_QTY_PER_LINE), purchaseType });
    }
    await writeGuestCart(cart);
    revalidatePath("/cart");
    return { ok: true };
  }

  const supabase = await createClient();
  const cartId = await dbActiveCartId(userId);
  const { data: row } = await supabase
    .from("cart_items").select("id, quantity")
    .eq("cart_id", cartId).eq("variant_id", variantId).eq("purchase_type", purchaseType).maybeSingle();
  if (row) await supabase.from("cart_items").update({ quantity: Math.min(row.quantity + quantity, MAX_QTY_PER_LINE) }).eq("id", row.id);
  else await supabase.from("cart_items").insert({ cart_id: cartId, variant_id: variantId, quantity: Math.min(quantity, MAX_QTY_PER_LINE), purchase_type: purchaseType });
  revalidatePath("/cart");
  return { ok: true };
}

export async function updateQtyAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const parsed = updateSchema.safeParse({
    variantId: formData.get("variantId"),
    purchaseType: formData.get("purchaseType") ?? undefined,
    quantity: formData.get("quantity"),
  });
  if (!parsed.success) return { ok: false, error: "Could not update cart." };
  const { variantId, purchaseType, quantity } = parsed.data;
  const userId = await currentUserId();

  if (!userId) {
    const cart = await readGuestCart();
    const idx = cart.items.findIndex((i) => i.variantId === variantId && i.purchaseType === purchaseType);
    if (idx >= 0) {
      if (quantity === 0) cart.items.splice(idx, 1);
      else cart.items[idx].quantity = Math.min(quantity, MAX_QTY_PER_LINE);
      await writeGuestCart(cart);
    }
    revalidatePath("/cart");
    return { ok: true };
  }

  const supabase = await createClient();
  const { data: cartRow } = await supabase.from("carts").select("id").eq("user_id", userId).eq("status", "active").maybeSingle();
  if (cartRow?.id) {
    if (quantity === 0) {
      await supabase.from("cart_items").delete().eq("cart_id", cartRow.id).eq("variant_id", variantId).eq("purchase_type", purchaseType);
    } else {
      await supabase.from("cart_items").update({ quantity: Math.min(quantity, MAX_QTY_PER_LINE) }).eq("cart_id", cartRow.id).eq("variant_id", variantId).eq("purchase_type", purchaseType);
    }
  }
  revalidatePath("/cart");
  return { ok: true };
}

export async function removeItemAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const parsed = removeSchema.safeParse({ variantId: formData.get("variantId"), purchaseType: formData.get("purchaseType") ?? undefined });
  if (!parsed.success) return { ok: false, error: "Could not remove item." };
  const f = new FormData();
  f.set("variantId", parsed.data.variantId);
  f.set("purchaseType", parsed.data.purchaseType);
  f.set("quantity", "0");
  return updateQtyAction(null, f);
}

export async function applyPromoAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const code = String(formData.get("code") ?? "").trim().toUpperCase();
  if (!code) return { ok: false, error: "Enter a code." };
  const discount = await validatePromoCode(code);
  if (!discount) return { ok: false, error: "That code isn't valid." };
  const cart = await readGuestCart();
  cart.code = code;
  await writeGuestCart(cart);
  revalidatePath("/cart");
  return { ok: true };
}

const intervalSchema = z.object({
  variantId: z.string().uuid(),
  interval: z.enum(["monthly", "quarterly"]),
});

/** Set the delivery cadence (monthly / quarterly) for a subscription line. */
export async function setDeliveryIntervalAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = intervalSchema.safeParse({
    variantId: formData.get("variantId"),
    interval: formData.get("interval"),
  });
  if (!parsed.success) return { ok: false, error: "Could not update delivery." };
  const { variantId, interval } = parsed.data;
  const userId = await currentUserId();

  if (!userId) {
    const cart = await readGuestCart();
    const item = cart.items.find(
      (i) => i.variantId === variantId && i.purchaseType === "subscription",
    );
    if (item) {
      item.interval = interval;
      await writeGuestCart(cart);
    }
    revalidatePath("/cart");
    return { ok: true };
  }

  const supabase = await createClient();
  const { data: cartRow } = await supabase
    .from("carts").select("id").eq("user_id", userId).eq("status", "active").maybeSingle();
  if (cartRow?.id) {
    await supabase
      .from("cart_items")
      .update({ delivery_interval: interval })
      .eq("cart_id", cartRow.id)
      .eq("variant_id", variantId)
      .eq("purchase_type", "subscription");
  }
  revalidatePath("/cart");
  return { ok: true };
}

export async function removePromoAction(): Promise<ActionResult> {
  const cart = await readGuestCart();
  delete cart.code;
  await writeGuestCart(cart);
  revalidatePath("/cart");
  return { ok: true };
}

export async function clearCartAction(): Promise<ActionResult> {
  const userId = await currentUserId();
  if (!userId) { await clearGuestCart(); revalidatePath("/cart"); return { ok: true }; }
  const supabase = await createClient();
  const { data: cartRow } = await supabase.from("carts").select("id").eq("user_id", userId).eq("status", "active").maybeSingle();
  if (cartRow?.id) await supabase.from("cart_items").delete().eq("cart_id", cartRow.id);
  revalidatePath("/cart");
  return { ok: true };
}
