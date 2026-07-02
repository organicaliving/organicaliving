import type { HelpArticle as HelpArticleType, HelpBlock } from "@/lib/help/content";

/* ------------------------------------------------------------------ */
/* Block renderers                                                       */
/* ------------------------------------------------------------------ */

function PBlock({ text }: { text: string }) {
  return (
    <p
      style={{
        fontSize: "18px",
        lineHeight: 1.7,
        color: "#3a3a36",
        margin: "0 0 16px",
      }}
    >
      {text}
    </p>
  );
}

function StepsBlock({ items }: { items: string[] }) {
  return (
    <ol
      style={{
        paddingLeft: "24px",
        margin: "0 0 16px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            fontSize: "18px",
            lineHeight: 1.7,
            color: "#3a3a36",
          }}
        >
          {item}
        </li>
      ))}
    </ol>
  );
}

function FaqBlock({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div data-faq style={{ margin: "0 0 16px" }}>
      {items.map((item) => (
        <details key={item.q} style={{ borderBottom: "1px solid #e4e1d6" }}>
          <summary
            style={{
              listStyle: "none",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              alignItems: "center",
              padding: "20px 0",
              fontSize: "15px",
              color: "#1a1a1a",
            }}
          >
            {item.q}
            <span style={{ color: "#6d6d6d", fontSize: "18px", flexShrink: 0 }}>+</span>
          </summary>
          <div
            style={{
              padding: "0 0 20px",
              fontSize: "13px",
              lineHeight: 1.6,
              color: "#3a3a36",
            }}
          >
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}

function CalloutBlock({ text }: { text: string }) {
  return (
    <div
      style={{
        background: "#eef0e6",
        borderLeft: "3px solid #1c3a13",
        borderRadius: "0 10px 10px 0",
        padding: "16px 20px",
        margin: "0 0 16px",
        fontSize: "16px",
        lineHeight: 1.65,
        color: "#3a3a36",
      }}
    >
      {text}
    </div>
  );
}

function Block({ block }: { block: HelpBlock }) {
  switch (block.kind) {
    case "p":
      return <PBlock text={block.text} />;
    case "steps":
      return <StepsBlock items={block.items} />;
    case "faq":
      return <FaqBlock items={block.items} />;
    case "callout":
      return <CalloutBlock text={block.text} />;
  }
}

/* ------------------------------------------------------------------ */
/* Public component                                                      */
/* ------------------------------------------------------------------ */

export function HelpArticle({ article }: { article: HelpArticleType }) {
  return (
    <article>
      <h1
        style={{
          fontSize: "clamp(24px,2.8vw,38px)",
          fontWeight: 300,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "#1a1a1a",
          marginBottom: "12px",
        }}
      >
        {article.title}
      </h1>
      {article.summary && (
        <p
          style={{
            fontSize: "17px",
            lineHeight: 1.6,
            color: "#5e5e5e",
            marginBottom: "32px",
          }}
        >
          {article.summary}
        </p>
      )}
      <div>
        {article.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    </article>
  );
}
