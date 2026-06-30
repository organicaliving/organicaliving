import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "lime" | "forest" | "cream" | "outline" | "ghost-light";

/**
 * DS motion rules (Design System.dc.html §Buttons):
 *   Solid variants (forest, lime, cream) → lift + brighten on hover; scale(.96) on press.
 *   Transparent variants (outline, ghost-light) → fill on hover; scale(.96) on press.
 *   Arrow buttons (arrow=true) → NO lift/fill; [data-arrow] slides via global CSS rule in globals.css.
 *   Transition easing: cubic-bezier(.75,0,.25,1) 250ms.
 */

// Base classes shared by all variants.
// NOTE: hover/press motion is owned by SiteInteractions (global JS wiring).
// Do NOT add hover:* or active:* transforms here — they will conflict.
const BASE =
  "inline-flex items-center justify-center gap-2 rounded-pill px-6 text-sm font-medium whitespace-nowrap leading-none " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/50";

// Height — 40px pill (per spec). We use py to create the height rather than h-10 so the inline layout is controlled.
const HEIGHT = "py-[11px]"; // 14px top + 14px bottom + ~12px line = ≈40px

// Hover/press motion is owned entirely by SiteInteractions (global JS wiring).
// Only include base layout, color, and border classes here.
const variantClasses: Record<Variant, { base: string }> = {
  forest: {
    base: "bg-forest text-cream border-0",
  },
  lime: {
    base: "bg-lime text-ink border-0",
  },
  cream: {
    // on-dark: cream bg / ink text
    base: "bg-cream text-ink border-0",
  },
  outline: {
    // transparent, forest-tinted border → fill forest on hover (via SiteInteractions)
    base: "bg-transparent text-ink border border-[1.5px] border-[rgba(27,42,31,0.35)]",
  },
  "ghost-light": {
    // on-dark ghost: transparent, cream-tinted border, cream text → fill cream on hover (via SiteInteractions)
    base: "bg-transparent text-cream border border-[1.5px] border-[rgba(243,240,232,0.5)]",
  },
};

type Props = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  /** When true: renders a trailing → arrow; disables the lift/fill hover — arrow slides via global CSS instead. */
  arrow?: boolean;
  className?: string;
};

export function Button({
  children,
  href,
  variant = "lime",
  arrow = false,
  className = "",
}: Props) {
  const { base } = variantClasses[variant];

  const classes = [BASE, HEIGHT, base, className]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {children}
      {arrow && <span data-arrow>→</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" className={classes}>
      {content}
    </button>
  );
}
