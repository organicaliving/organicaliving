import type { Metadata } from "next";
import { ForgotForm } from "./ForgotForm";

export const metadata: Metadata = { title: "Reset password — Organica Living" };

export default function ForgotPage() {
  return <ForgotForm />;
}
