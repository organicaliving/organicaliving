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

// Base classes shared by all variants
const BASE =
  "inline-flex items-center justify-center gap-2 rounded-pill px-6 text-sm font-medium whitespace-nowrap leading-none " +
  "transition-[transform,box-shadow,background-color,color,border-color,filter] duration-[250ms] [transition-timing-function:cubic-bezier(.75,0,.25,1)] " +
  "active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/50";

// Height — 40px pill (per spec). We use py to create the height rather than h-10 so the inline layout is controlled.
const HEIGHT = "py-[11px]"; // 14px top + 14px bottom + ~12px line = ≈40px

const variantClasses: Record<Variant, { base: string; hover: string }> = {
  forest: {
    base: "bg-forest text-cream border-0",
    hover: "hover:-translate-y-0.5 hover:brightness-110 hover:shadow-card",
  },
  lime: {
    base: "bg-lime text-ink border-0",
    hover: "hover:-translate-y-0.5 hover:brightness-110 hover:shadow-card",
  },
  cream: {
    // on-dark: cream bg / ink text
    base: "bg-cream text-ink border-0",
    hover: "hover:-translate-y-0.5 hover:brightness-105 hover:shadow-card",
  },
  outline: {
    // transparent, forest-tinted border → fill forest on hover
    base: "bg-transparent text-ink border border-[1.5px] border-[rgba(27,42,31,0.35)]",
    hover: "hover:bg-forest hover:text-cream hover:border-forest hover:shadow-card",
  },
  "ghost-light": {
    // on-dark ghost: transparent, cream-tinted border, cream text → fill cream on hover
    base: "bg-transparent text-cream border border-[1.5px] border-[rgba(243,240,232,0.5)]",
    hover: "hover:bg-cream hover:text-forest hover:border-cream hover:shadow-card",
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
  const { base, hover } = variantClasses[variant];
  // Arrow buttons skip the lift/fill hover; the [data-arrow] span handles motion via globals.css
  const hoverClasses = arrow ? "" : hover;

  const classes = [BASE, HEIGHT, base, hoverClasses, className]
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
