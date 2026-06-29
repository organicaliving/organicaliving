import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Your account — Organica Living" };

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", user!.id)
    .maybeSingle();

  return (
    <div>
      <h1 className="text-3xl font-light text-ink">
        Welcome{profile?.full_name ? `, ${profile.full_name}` : ""}
      </h1>
      <p className="mt-2 text-muted">{profile?.email ?? user!.email}</p>
      <p className="mt-8 text-sm text-muted">Orders, subscriptions, and settings arrive in later phases.</p>
    </div>
  );
}
