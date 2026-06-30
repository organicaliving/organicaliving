export function Disclaimer({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <p className={`text-xs leading-relaxed text-muted ${className}`} style={style}>
      These statements have not been evaluated by the Food and Drug
      Administration. This product is not intended to diagnose, treat, cure, or
      prevent any disease.
    </p>
  );
}
