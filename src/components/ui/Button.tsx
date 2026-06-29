import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "lime" | "forest" | "cream";

const variantClasses: Record<Variant, string> = {
  lime: "bg-lime text-ink hover:brightness-95",
  forest: "bg-forest text-cream hover:brightness-110",
  cream: "bg-cream text-forest border border-line hover:bg-header",
};

type Props = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
};

export function Button({ children, href, variant = "lime", className = "" }: Props) {
  const classes = `inline-flex items-center justify-center rounded-pill px-6 py-3 text-sm font-medium transition ${variantClasses[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return <button className={classes}>{children}</button>;
}
