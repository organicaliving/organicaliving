/**
 * Badge / Label primitives — Design System.dc.html §Badges & Labels
 *
 * variant "new"        → outline pill  (transparent, forest border, forest text, uppercase)  [default]
 * variant "bestseller" → lime filled pill (bg #62e104, ink text, uppercase)
 * variant "save"       → lime filled pill (bg #62e104, ink text) — same colours, no uppercase
 * variant "label"      → mono code label (border rgba(0,0,0,.2), muted text)
 *
 * All are 30px-equivalent pills (border-radius:30px in spec).
 */

type Variant = "new" | "bestseller" | "save" | "label";

const variantClasses: Record<Variant, string> = {
  // Outline — transparent bg, forest border + text, uppercase
  new: "bg-transparent border border-[rgba(28,58,19,0.4)] text-forest uppercase tracking-[0.05em] text-[11px] font-semibold px-3 py-1.5",
  // Lime filled — bestseller (with uppercase tracking)
  bestseller:
    "bg-lime text-ink uppercase tracking-[0.05em] text-[10px] font-semibold px-[11px] py-[6px]",
  // Lime filled — save % (no uppercase needed, matches DS "Save 25%" badge)
  save: "bg-lime text-ink text-[10px] font-semibold px-[9px] py-[2px]",
  // Mono code label — border only, muted text
  label:
    "font-mono border border-[rgba(0,0,0,0.2)] text-muted text-[10px] font-medium px-[11px] py-[6px]",
};

type Props = {
  label: string;
  variant?: Variant;
};

export function Badge({ label, variant = "new" }: Props) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-[30px] leading-none ${variantClasses[variant]}`}
    >
      {label}
    </span>
  );
}
