import type { CSSProperties } from "react";

/**
 * Visual dose pills for the "How to use" panel — ported from the mockup's
 * applyDose(): count comes from the serving size, glyph shape from the form
 * (capsule / softgel / gummy), with per-product accent tints.
 */
const SOFTGEL_TINT: Record<string, [string, string]> = {
  "vision-pro": ["#9a8fd0", "#494072"],
  "omega-1000": ["#e8c668", "#b07f2e"],
  "optimus-d3": ["#e8ca7b", "#b8923a"],
};
const GUMMY_TINT: Record<string, [string, string]> = {
  "optimus-d3-mini": ["#f0a85a", "#c06a22"],
  "sleep-pro": ["#9a6ab0", "#3e2452"],
  "glow-pro": ["#bd7390", "#5e2f44"],
  bloom: ["#e76d6d", "#9c3036"],
};

function doseCount(servingSize: string, howToUse: string): number {
  const m = servingSize.match(/\d+/) || howToUse.match(/\d+/);
  let count = m ? parseInt(m[0], 10) : 1;
  if (!count || count > 6) count = 1;
  return count;
}

function glyphStyle(slug: string, form: string): CSSProperties {
  const f = form.toLowerCase();
  const kind = f.includes("softgel") ? "softgel" : f.includes("gumm") ? "gummy" : "capsule";

  if (kind === "softgel") {
    const c = SOFTGEL_TINT[slug] ?? ["#e8ca7b", "#b08534"];
    return {
      width: 18,
      height: 27,
      borderRadius: "50% / 46%",
      background: `radial-gradient(circle at 36% 30%, ${c[0]}, ${c[1]})`,
      boxShadow: "inset 0 -2px 3px rgba(0,0,0,0.12)",
    };
  }
  if (kind === "gummy") {
    if (slug === "sleep-pro") {
      return {
        width: 26,
        height: 17,
        borderRadius: "50% 50% 16% 16% / 100% 100% 24% 24%",
        background: "radial-gradient(circle at 38% 26%, #843f44, #4a2024 70%, #361519)",
        boxShadow: "inset 1.5px 2px 3px rgba(255,255,255,0.22), inset -1px -2px 3px rgba(0,0,0,0.3)",
      };
    }
    const c = GUMMY_TINT[slug] ?? ["#9a6ab0", "#3e2452"];
    return {
      width: 22,
      height: 20,
      borderRadius: 7,
      background: `linear-gradient(155deg, ${c[0]}, ${c[1]})`,
      boxShadow: "inset 1.5px 1.5px 2px rgba(255,255,255,0.22), inset -1px -1px 2px rgba(0,0,0,0.15)",
    };
  }
  return {
    width: 12,
    height: 30,
    borderRadius: 7,
    background: "linear-gradient(180deg, #3a5a2a 0 50%, #1c3a13 50% 100%)",
    boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.12)",
  };
}

export function DoseGlyphs({
  slug,
  form,
  servingSize,
  howToUse,
}: {
  slug: string;
  form: string;
  servingSize: string;
  howToUse: string;
}) {
  const count = doseCount(servingSize, howToUse);
  const style = glyphStyle(slug, form);
  return (
    <div style={{ display: "flex", gap: 6, flex: "none", alignItems: "center" }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={style} />
      ))}
    </div>
  );
}
