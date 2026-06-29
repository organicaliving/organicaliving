export function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs leading-relaxed text-muted ${className}`}>
      These statements have not been evaluated by the Food and Drug
      Administration. This product is not intended to diagnose, treat, cure, or
      prevent any disease.
    </p>
  );
}
