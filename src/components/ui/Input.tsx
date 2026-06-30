import type { InputHTMLAttributes } from "react";

/**
 * DS text field — Design System.dc.html §Form Inputs
 *   border-radius: 10px
 *   border: 1px solid rgba(0,0,0,0.15)
 *   background: rgba(255,255,255,0.7)
 *   padding: 13px 14px
 *   font-size: 14px
 *   outline: none
 *   focus: border-forest
 */
export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={[
        "w-full rounded-[10px]",
        "border border-[rgba(0,0,0,0.15)]",
        "bg-[rgba(255,255,255,0.7)]",
        "px-3.5 py-3",
        "text-sm text-ink",
        "outline-none",
        "transition-[border-color] duration-[200ms]",
        "focus:border-forest",
        "placeholder:text-soft",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
