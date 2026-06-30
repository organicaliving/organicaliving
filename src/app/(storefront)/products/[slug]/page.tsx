import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getActiveProducts, getProductBySlug, getProductSlugs } from "@/lib/catalog";
import { defaultVariant } from "@/lib/products";
import { imageUrl } from "@/lib/format";
import {
  PRODUCT_META,
  PRODUCT_ORDER,
  certsFor,
  faqFor,
  quickCertsFor,
  QUALITY_MATTERS,
} from "@/lib/product-content";
import { ORGANICA_FACTS } from "@/lib/product-facts-data";
import { ProductGallery } from "@/components/product/ProductGallery";
import { BuyBox } from "@/components/product/BuyBox";
import { DoseGlyphs } from "@/components/product/DoseGlyphs";

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = PRODUCT_META[slug];
  if (!meta) return { title: "Product not found — Organica Living" };
  return { title: `${meta.name} — Organica Living`, description: `${meta.intro}.` };
}

const seedMono = "var(--font-mono)";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const meta = PRODUCT_META[slug];
  if (!product || !meta) notFound();

  const variant = defaultVariant(product);
  const facts = ORGANICA_FACTS[slug];
  const img = imageUrl(product.image_path) ?? `/images/${slug}.webp`;
  const thumb = `/images/${slug}-thumb.webp`;
  const certs = certsFor(meta);
  const quickCerts = quickCertsFor(meta);
  const faq = faqFor(meta);

  // Cross-sell: next products in display order, priced from the live catalog.
  const all = await getActiveProducts();
  const priceBySlug = new Map(
    all.map((p) => {
      const v = defaultVariant(p);
      return [p.slug, v ? v.price_cents : null] as const;
    })
  );
  const crossSell = PRODUCT_ORDER.filter((s) => s !== slug && PRODUCT_META[s])
    .slice(0, 3)
    .map((s) => ({
      slug: s,
      name: PRODUCT_META[s].name,
      tag: PRODUCT_META[s].tag,
      priceCents: priceBySlug.get(s) ?? null,
      img: `/images/${s}.webp`,
    }));

  return (
    <main style={{ background: "#fcfcf7" }}>
      {/* breadcrumb */}
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "18px 40px 0" }}>
        <div style={{ fontSize: 11, letterSpacing: ".5px", color: "#8a8a80", fontFamily: seedMono }}>
          <Link href="/" style={{ color: "#8a8a80", textDecoration: "none" }}>Home</Link>{" / "}
          <Link href="/products" style={{ color: "#8a8a80", textDecoration: "none" }}>Shop</Link>{" / "}
          <span style={{ color: "#1a1a1a" }}>{meta.name}</span>
        </div>
      </div>

      {/* PDP hero */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "24px 40px 60px" }}>
        <div data-pdp-hero style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          {/* gallery */}
          <ProductGallery img={img} thumb={thumb} name={meta.name} form={meta.form} badge={meta.badge || undefined} />

          {/* info */}
          <div>
            <span style={{ display: "inline-block", lineHeight: 1, fontSize: 11, fontWeight: 500, color: "#1c3a13", border: "1px solid #cfd3c4", borderRadius: 30, padding: "5px 12px", marginBottom: 14 }}>
              {meta.tag}
            </span>
            <h1 style={{ fontSize: "clamp(34px,4vw,52px)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.02 }}>
              {meta.name}
            </h1>
            <div style={{ fontSize: 16, color: "#5e5e5e", marginTop: 6 }}>
              {meta.sub} · {meta.flavor}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14 }}>
              <span style={{ color: "#E3A82B", letterSpacing: 2, fontSize: 15 }}>★★★★★</span>
              <span style={{ fontSize: 13, color: "#6d6d6d" }}>{meta.rating} · {meta.reviewCount} reviews</span>
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.55, color: "#3a3a36", marginTop: 18, maxWidth: 480 }}>
              {meta.intro}*
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
              {meta.claims.map((c) => (
                <span key={c} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12.5, color: "#1c3a13", background: "#eef2e4", padding: "7px 13px", borderRadius: 30 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1c3a13" strokeWidth="2.4"><path d="M5 12l4.5 4.5L19 7" /></svg>
                  {c}
                </span>
              ))}
            </div>

            {variant ? (
              <BuyBox
                variantId={variant.id}
                priceCents={variant.price_cents}
                subscriptionPriceCents={variant.subscription_price_cents}
                currency={variant.currency}
                form={meta.form}
              />
            ) : null}

            <div style={{ display: "flex", flexWrap: "wrap", gap: 18, marginTop: 22 }}>
              {quickCerts.map((qc) => (
                <span key={qc} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12.5, color: "#3a3a36" }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#62e104" }} />
                  {qc}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* key benefits */}
      <section style={{ background: "#1c3a13", color: "#fcfcf7" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "72px 40px" }}>
          <h2 style={{ fontSize: "clamp(24px,2.8vw,38px)", fontWeight: 300, letterSpacing: "-0.02em", maxWidth: 520 }}>
            Why {meta.name}.
          </h2>
          <div data-rgrid3 style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 40 }}>
            {meta.benefits.map((b, i) => (
              <div key={b.t} style={{ background: "#22401a", borderRadius: 18, padding: "30px 26px" }}>
                <div style={{ fontFamily: seedMono, fontSize: 12, color: "#62e104", marginBottom: 18 }}>
                  0{i + 1}
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 500, color: "#fcfcf7" }}>{b.t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: "#b9c7b5", marginTop: 10 }}>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* narrative */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "90px 40px" }}>
        <div data-rcol2 style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 64, alignItems: "center" }}>
          <div>
            <span style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#8a8a80", fontFamily: seedMono }}>The Formula</span>
            <h2 style={{ fontSize: "clamp(26px,3vw,40px)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.1, marginTop: 14, maxWidth: 460 }}>
              {meta.intro}*
            </h2>
            <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 16 }}>
              {meta.narrative.map((para, i) => (
                <p key={i} style={{ fontSize: 15, lineHeight: 1.6, color: "#3a3a36", maxWidth: 520 }}>{para}</p>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, background: "#f1eee2", borderRadius: 14, padding: "18px 20px", marginTop: 26, maxWidth: 520 }}>
              <DoseGlyphs slug={slug} form={meta.form} servingSize={facts?.serving ?? ""} howToUse={meta.howToUse} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>How to use</div>
                <div style={{ fontSize: 13, color: "#3a3a36" }}>{meta.howToUse}</div>
              </div>
            </div>
          </div>
          <div
            style={{
              aspectRatio: "4 / 5",
              borderRadius: 22,
              position: "relative",
              overflow: "hidden",
              background: `url('${img}') center 54%/86% no-repeat`,
            }}
          />
        </div>
      </section>

      {/* supplement facts */}
      <section style={{ background: "#eef0e6" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "80px 40px" }}>
          <div data-rcol2 style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 48, alignItems: "start" }}>
            <div>
              <h2 style={{ fontSize: "clamp(24px,2.8vw,36px)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                Supplement Facts
              </h2>
              <p style={{ fontSize: 14, color: "#3a3a36", marginTop: 14, lineHeight: 1.55, maxWidth: 360 }}>
                Every batch is third-party tested and made in an FDA-registered, cGMP-certified facility.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
                {certs.map((cert) => (
                  <span key={cert} style={{ fontSize: 12, color: "#1c3a13", border: "1px solid #c8cdb8", borderRadius: 30, padding: "6px 13px" }}>{cert}</span>
                ))}
              </div>
              <p style={{ fontSize: 11, color: "#8a8a80", marginTop: 22, fontFamily: seedMono }}>
                UPC {meta.upc} · Made in USA
              </p>
            </div>
            <div style={{ background: "#fcfcf7", border: "1.5px solid #1a1a1a", borderRadius: 6, padding: 0, overflow: "hidden" }}>
              <div style={{ borderBottom: "7px solid #1a1a1a", padding: "14px 18px 10px" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, lineHeight: 1 }}>Supplement Facts</div>
                <div style={{ fontSize: 13, color: "#1a1a1a", marginTop: 8 }}>Serving Size: {facts?.serving ?? meta.form}</div>
                <div style={{ fontSize: 13, color: "#1a1a1a" }}>Servings Per Container: {facts?.servings ?? "30"}</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 700, padding: "6px 18px", borderBottom: "2px solid #1a1a1a" }}>
                <span>Amount Per Serving</span><span>% DV</span>
              </div>
              <div style={{ maxHeight: 440, overflowY: "auto" }}>
                {(facts?.rows ?? []).map((r, i) => (
                  <div key={`${r.n}-${i}`} style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline", padding: "8px 18px", borderBottom: "1px solid #e4e1d6" }}>
                    <span style={{ fontSize: 13, color: "#1a1a1a" }}>
                      <strong style={{ fontWeight: 600 }}>{r.n}</strong> <span style={{ color: "#6d6d6d" }}>{r.a}</span>
                    </span>
                    <span style={{ fontSize: 13, color: "#1a1a1a", whiteSpace: "nowrap" }}>{r.dv}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 10.5, color: "#6d6d6d", padding: "10px 18px", lineHeight: 1.4 }}>
                — Daily Value (% DV) not established. Percent Daily Values are based on a 2,000 calorie diet.
              </div>
            </div>
          </div>

          {facts?.ingredients ? (
            <div style={{ marginTop: 32, maxWidth: 920 }}>
              <div style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "#8a8a80", marginBottom: 8, fontFamily: seedMono }}>
                Other Ingredients
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: "#3a3a36" }}>{facts.ingredients}</p>
            </div>
          ) : null}

          <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr", gap: 10, maxWidth: 920 }}>
            {(facts?.warnings ?? []).map((w, i) => (
              <div key={i} style={{ background: "#fcfcf7", border: "1px solid #e4e1d6", borderRadius: 12, padding: "16px 18px" }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", color: "#8a8a80", fontFamily: seedMono }}>{w.t}</span>
                <p style={{ fontSize: 13, lineHeight: 1.55, color: "#3a3a36", marginTop: 7 }}>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* quality matters */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap", marginBottom: 36 }}>
          <h2 style={{ fontSize: "clamp(24px,2.8vw,38px)", fontWeight: 300, letterSpacing: "-0.02em", maxWidth: 440 }}>
            Quality matters, in every capsule.
          </h2>
          <span style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "#8a8a80", fontFamily: seedMono }}>Third-party tested</span>
        </div>
        <div data-rgrid6 style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {QUALITY_MATTERS.map((q) => (
            <div key={q} style={{ background: "#f4f1e6", borderRadius: 16, padding: "26px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1c3a13" strokeWidth="1.4"><circle cx="12" cy="12" r="9" /><path d="M8.5 12l2.3 2.3L15.5 9.5" /></svg>
              <span style={{ fontSize: 15, fontWeight: 500, color: "#1a1a1a" }}>{q}</span>
            </div>
          ))}
        </div>
      </section>

      {/* faq */}
      <section style={{ background: "#fcfcf7" }}>
        <div data-rcol2 style={{ maxWidth: 1440, margin: "0 auto", padding: "20px 40px 90px", display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 56, alignItems: "start" }}>
          <h2 style={{ fontSize: "clamp(26px,3vw,42px)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
            Questions?<br />We&rsquo;re here to help.
          </h2>
          <div>
            {faq.map((f) => (
              <details key={f.q} style={{ borderBottom: "1px solid #e4e1d6" }}>
                <summary style={{ listStyle: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", padding: "22px 0", fontSize: 17, fontWeight: 400 }}>
                  {f.q}
                  <span style={{ color: "#6d6d6d", fontSize: 20 }}>+</span>
                </summary>
                <div style={{ padding: "0 0 22px", fontSize: 14, lineHeight: 1.6, color: "#3a3a36", maxWidth: 600 }}>{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* cross sell */}
      <section style={{ background: "#1c3a13", color: "#fcfcf7" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "80px 40px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap", marginBottom: 36 }}>
            <h2 style={{ fontSize: "clamp(24px,2.8vw,38px)", fontWeight: 300, letterSpacing: "-0.02em" }}>Complete your routine.</h2>
            <Link href="/products" style={{ fontSize: 14, fontWeight: 500, color: "#fcfcf7", textDecoration: "underline" }}>Shop all →</Link>
          </div>
          <div data-rgrid3 style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {crossSell.map((x) => (
              <Link key={x.slug} href={`/products/${x.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div
                  style={{
                    aspectRatio: "4 / 3",
                    borderRadius: 18,
                    background: `url('${x.img}') center 54%/72% no-repeat, linear-gradient(160deg, rgba(46,74,37,0.75), rgba(28,58,19,0.75))`,
                  }}
                />
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginTop: 14 }}>
                  <div>
                    <div style={{ fontSize: 12, color: "#9db38f" }}>{x.tag}</div>
                    <div style={{ fontSize: 18, fontWeight: 500 }}>{x.name}</div>
                  </div>
                  {x.priceCents != null ? (
                    <div style={{ fontSize: 15 }}>
                      {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(x.priceCents / 100)}
                    </div>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
