export type ActionResult =
  | { ok: true; redirect?: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export function fieldError(result: ActionResult | null | undefined, name: string): string | undefined {
  if (!result || result.ok) return undefined;
  return result.fieldErrors?.[name]?.[0];
}
