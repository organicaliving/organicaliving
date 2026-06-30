export type ActionResult =
  | { ok: true; redirect?: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export function fieldError(result: ActionResult | null | undefined, name: string): string | undefined {
  if (!result || result.ok) return undefined;
  return result.fieldErrors?.[name]?.[0];
}

/** Returns a safe same-origin path to redirect to, or the fallback. */
export function safeNextPath(next: string | null | undefined, fallback = "/account"): string {
  if (!next) return fallback;
  // Must be a same-origin absolute path: starts with a single "/", not "//" or "/\"
  if (!next.startsWith("/")) return fallback;
  if (next.startsWith("//") || next.startsWith("/\\")) return fallback;
  return next;
}
