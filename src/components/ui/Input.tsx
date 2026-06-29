import type { InputHTMLAttributes } from "react";

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-sm border border-line bg-cream px-3 py-2 text-sm text-ink outline-none transition focus:border-forest ${className}`}
      {...props}
    />
  );
}
