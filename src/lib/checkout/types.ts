export type CheckoutAddress = {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type ShippingMethod = { id: string; label: string; amountCents: number };

export type CheckoutQuote = {
  subtotalCents: number;
  discountCents: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
  currency: string;
};
