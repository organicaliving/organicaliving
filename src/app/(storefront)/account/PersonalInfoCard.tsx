"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/* Personal Information card — faithful port of the Account.dc.html      */
/* card. The inputs are controlled so "Discard Changes" can reset them.  */
/* "Save" is intentionally disabled (matching the mockup): there is no    */
/* profile-update action wired yet, so we never fake a write.            */
/* ------------------------------------------------------------------ */

const labelStyle: React.CSSProperties = { fontSize: "11px", color: "#6d6d6d" };
const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  marginTop: "4px",
  border: "1px solid #d7d3c6",
  borderRadius: "8px",
  padding: "12px 14px",
  fontSize: "14px",
  fontFamily: "inherit",
  outline: "none",
  color: "#1a1a1a",
  background: "#fff",
};

export function PersonalInfoCard({
  initialFirstName,
  initialLastName,
}: {
  initialFirstName: string;
  initialLastName: string;
}) {
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");

  const dirty =
    firstName !== initialFirstName ||
    lastName !== initialLastName ||
    phone !== "" ||
    birthday !== "";

  const discard = () => {
    setFirstName(initialFirstName);
    setLastName(initialLastName);
    setPhone("");
    setBirthday("");
  };

  return (
    <div style={{ border: "1px solid #e4e1d6", borderRadius: "8px", padding: "28px" }}>
      <div style={{ fontSize: "15px", fontWeight: 600, color: "#1a1a1a", marginBottom: "18px" }}>
        Personal Information
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label htmlFor="firstName" style={labelStyle}>First name</label>
          <input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="lastName" style={labelStyle}>Last name</label>
          <input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="phone" style={labelStyle}>Phone Number</label>
          <input
            id="phone"
            value={phone}
            placeholder="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="birthday" style={labelStyle}>Birthday</label>
          <input
            id="birthday"
            value={birthday}
            placeholder="mm/dd/yyyy"
            onChange={(e) => setBirthday(e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>
      <div style={{ display: "flex", gap: "14px", marginTop: "22px" }}>
        <button
          type="button"
          disabled
          title="Profile editing is coming soon"
          style={{
            lineHeight: 1,
            display: "inline-block",
            height: "44px",
            padding: "0 30px",
            border: "none",
            borderRadius: "40px",
            background: "#e4e2da",
            color: "#6d6d6d",
            fontSize: "14px",
            fontWeight: 500,
            fontFamily: "inherit",
            cursor: "not-allowed",
          }}
        >
          Save
        </button>
        <button
          type="button"
          onClick={discard}
          disabled={!dirty}
          style={{
            lineHeight: 1,
            display: "inline-block",
            height: "44px",
            padding: "0 26px",
            border: "1.5px solid #c9c5b8",
            borderRadius: "40px",
            background: "transparent",
            color: "#1a1a1a",
            fontSize: "14px",
            fontWeight: 500,
            fontFamily: "inherit",
            cursor: dirty ? "pointer" : "not-allowed",
            opacity: dirty ? 1 : 0.6,
          }}
        >
          Discard Changes
        </button>
      </div>
    </div>
  );
}
