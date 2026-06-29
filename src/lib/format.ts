export function formatPrice(cents: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

/**
 * Formats an image path for use with next/image.
 * @param path - A local asset path under public/ (e.g., "images/x.webp").
 *               Remote URLs are not supported unless remotePatterns is configured in next.config.ts.
 * @returns The normalized path with leading slash, or null if path is falsy.
 */
export function imageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  return path.startsWith("/") ? path : `/${path}`;
}
