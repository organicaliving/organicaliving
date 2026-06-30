export type PurchaseType = "one_time" | "subscription";

export type CartCookieItem = {
  variantId: string;
  quantity: number;
  purchaseType: PurchaseType;
};

export type Discount = {
  code: string;
  type: "percent" | "fixed";
  value: number; // percent: 0-100; fixed: cents
};

export type CartLine = {
  variantId: string;
  productSlug: string;
  productName: string;
  variantTitle: string;
  imagePath: string | null;
  unitCents: number;
  /** Regular (one-time) unit price — used to show subscription savings / struck price. */
  regularUnitCents: number;
  quantity: number;
  purchaseType: PurchaseType;
  lineCents: number;
};

export type CartView = {
  lines: CartLine[];
  itemCount: number;
  subtotalCents: number;
  discountCents: number;
  totalCents: number;
  code: string | null;
  currency: string;
};
