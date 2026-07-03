"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useCartDrawer } from "@/components/cart/CartDrawerProvider";

export function CartDrawer({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const { open, closeDrawer } = useCartDrawer();
  const pathname = usePathname();

  const mountedRef = useRef(false);
  // Close on soft navigation so the drawer never lingers over the next page.
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    closeDrawer();
  }, [pathname, closeDrawer]);

  // Esc to close + body scroll-lock while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, closeDrawer]);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={closeDrawer}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "rgba(0,0,0,0.35)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity .3s cubic-bezier(0.75,0,0.25,1)",
        }}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your Cart"
        aria-hidden={open ? "false" : "true"}
        data-cart-drawer
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 201,
          width: "min(420px, 92vw)",
          background: "#fcfcf7",
          // Only cast the shadow while open — otherwise the off-screen panel's
          // left-side shadow bleeds a dark strip onto the viewport's right edge.
          boxShadow: open ? "-30px 0 60px rgba(0,0,0,0.18)" : "none",
          transform: open ? "translateX(0)" : "translateX(100%)",
          pointerEvents: open ? "auto" : "none",
          transition: "transform .34s cubic-bezier(0.75,0,0.25,1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "22px 24px 16px",
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 300, letterSpacing: "-0.01em", color: "#1c3a13" }}>
            Your Cart
          </span>
          <button
            type="button"
            aria-label="Close cart"
            onClick={closeDrawer}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "none",
              background: "#e4e2da",
              color: "#1a1a1a",
              fontSize: 20,
              lineHeight: 1,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            &times;
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 24px" }}>{children}</div>

        {footer ? <div style={{ flexShrink: 0 }}>{footer}</div> : null}
      </aside>
    </>
  );
}
