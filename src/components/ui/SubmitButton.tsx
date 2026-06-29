"use client";
import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";

export function SubmitButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-pill bg-lime px-6 py-3 text-sm font-medium text-ink transition hover:brightness-95 disabled:opacity-60"
    >
      {pending ? "…" : children}
    </button>
  );
}
