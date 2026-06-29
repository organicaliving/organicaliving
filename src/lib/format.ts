export function formatPrice(cents: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export function imageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  return path.startsWith("/") ? path : `/${path}`;
}
