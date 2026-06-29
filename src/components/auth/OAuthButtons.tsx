"use client";
import { signInWithOAuth } from "@/lib/auth/actions";

export function OAuthButtons() {
  async function go(provider: "google" | "facebook") {
    const res = await signInWithOAuth(provider);
    if (res.ok && res.redirect) window.location.assign(res.redirect);
  }
  return (
    <div className="flex flex-col gap-2">
      <button type="button" onClick={() => go("google")} className="rounded-sm border border-line bg-cream px-4 py-2 text-sm text-ink transition hover:bg-header">Continue with Google</button>
      <button type="button" onClick={() => go("facebook")} className="rounded-sm border border-line bg-cream px-4 py-2 text-sm text-ink transition hover:bg-header">Continue with Facebook</button>
    </div>
  );
}
