export function Badge({ label }: { label: string }) {
  return (
    <span className="rounded-pill bg-forest px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-cream">
      {label}
    </span>
  );
}
