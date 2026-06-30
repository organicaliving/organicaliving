import Link from "next/link";

export function AnnouncementBar() {
  return (
    <Link
      href="/products"
      style={{
        display: "block",
        background: "#62e104",
        color: "#1a1a1a",
        textAlign: "center",
        fontSize: "13px",
        fontWeight: 500,
        padding: "9px 16px",
        letterSpacing: 0,
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      Find the right products for you&nbsp;{" "}
      <span style={{ display: "inline-block" }}>→</span>
    </Link>
  );
}
