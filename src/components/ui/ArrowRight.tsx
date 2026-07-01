/**
 * ArrowRight — inline Lucide `arrow-right` (lucide.dev, ISC), rendered inline to
 * avoid a new dependency (matches the icon pattern in CheckoutExperience).
 *
 * Used as the trailing icon on every "arrow" link/button so they render a crisp
 * SVG instead of the messy `→` glyph. It carries [data-arrow], which makes
 * SiteInteractions apply the hover *nudge* (translateX) only — and suppress the
 * pill lift/fill — so arrow buttons never lift. The inline transition keeps the
 * nudge smooth even on non-pill link hosts.
 */
export function ArrowRight({
  size = 16,
  strokeWidth = 2,
}: {
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <svg
      data-arrow
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        flexShrink: 0,
        transition: "transform 0.25s cubic-bezier(0.75,0,0.25,1)",
      }}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
