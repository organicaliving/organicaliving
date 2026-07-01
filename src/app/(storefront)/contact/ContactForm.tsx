"use client";

import { useActionState } from "react";
import { sendContactMessage } from "@/lib/contact/actions";
import { fieldError } from "@/lib/forms";
import { CONTACT_TOPICS } from "@/lib/contact/schema";

const INK = "#1a1a1a";
const FOREST = "#1c3a13";

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: ".3px",
  color: "#5e5e5e",
  marginBottom: 7,
};
const controlStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid #d5d9c8",
  borderRadius: 12,
  padding: "13px 14px",
  fontSize: 15,
  outline: "none",
  background: "#fcfcf7",
  fontFamily: "inherit",
  color: INK,
};
const errStyle: React.CSSProperties = { marginTop: 6, fontSize: 12.5, color: "#b3261e" };
const fieldWrap: React.CSSProperties = { marginBottom: 18 };

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContactMessage, null);

  if (state?.ok) {
    return (
      <div
        style={{
          background: "#eef2e4",
          border: "1px solid #cfd8bf",
          borderRadius: 18,
          padding: "36px 30px",
          textAlign: "center",
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={FOREST} strokeWidth="1.5" style={{ margin: "0 auto" }}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8.3 12.2l2.5 2.5 4.9-5" />
        </svg>
        <h3 style={{ fontSize: 22, fontWeight: 400, color: INK, marginTop: 14 }}>Message sent — thank you.</h3>
        <p style={{ fontSize: 16, lineHeight: 1.55, color: "#3a3a36", marginTop: 8, maxWidth: 360, marginInline: "auto" }}>
          We&rsquo;ve received your note and will get back to you as soon as we can.
        </p>
      </div>
    );
  }

  return (
    <form action={action} noValidate>
      {/* Honeypot: hidden from humans, catches bots. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state && !state.ok && state.error ? (
        <p style={{ ...errStyle, marginTop: 0, marginBottom: 16, fontSize: 14 }}>{state.error}</p>
      ) : null}

      <div data-rcol2 style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <div style={fieldWrap}>
          <label htmlFor="name" style={labelStyle}>Name</label>
          <input id="name" name="name" type="text" autoComplete="name" required style={controlStyle} />
          {fieldError(state, "name") ? <p style={errStyle}>{fieldError(state, "name")}</p> : null}
        </div>
        <div style={fieldWrap}>
          <label htmlFor="email" style={labelStyle}>Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required style={controlStyle} />
          {fieldError(state, "email") ? <p style={errStyle}>{fieldError(state, "email")}</p> : null}
        </div>
      </div>

      <div style={fieldWrap}>
        <label htmlFor="topic" style={labelStyle}>Topic</label>
        <select id="topic" name="topic" defaultValue="" required style={controlStyle}>
          <option value="" disabled>Choose a topic…</option>
          {CONTACT_TOPICS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {fieldError(state, "topic") ? <p style={errStyle}>{fieldError(state, "topic")}</p> : null}
      </div>

      <div style={fieldWrap}>
        <label htmlFor="message" style={labelStyle}>Message</label>
        <textarea id="message" name="message" rows={5} required style={{ ...controlStyle, resize: "vertical", minHeight: 120 }} />
        {fieldError(state, "message") ? <p style={errStyle}>{fieldError(state, "message")}</p> : null}
      </div>

      <button
        type="submit"
        disabled={pending}
        style={{
          lineHeight: 1,
          display: "inline-block",
          padding: "15px 32px",
          fontSize: 14,
          fontWeight: 500,
          color: "#fcfcf7",
          background: FOREST,
          border: "none",
          borderRadius: 40,
          cursor: pending ? "default" : "pointer",
          fontFamily: "inherit",
          opacity: pending ? 0.7 : 1,
          marginTop: 4,
        }}
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
