import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/account");
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1180px] flex-1 px-6 py-12">{children}</main>
      <Footer />
    </>
  );
}
