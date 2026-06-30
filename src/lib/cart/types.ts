export type PurchaseType = "one_time" | "subscription";

/** Subscription cadence. "quarterly" (3-month delivery) earns an extra discount. */
export type DeliveryInterval = "monthly" | "quarterly";

export type CartCookieItem = {
  variantId: string;
  quantity: number;
  purchaseType: PurchaseType;
  /** Only meaningful for subscription lines; defaults to "monthly". */
  interval?: DeliveryInterval;
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
  /** Subscription cadence; "monthly" for one-time lines (unused). */
  interval: DeliveryInterval;
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
