import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to view and manage ward sacrament meeting plans.",
};

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/meetings/new");
  }

  return (
    <main className="mx-auto flex max-w-5xl flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl rounded border border-[#d7d1bd] bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#a26945]">Protected area</p>
            <h1 className="mt-2 font-serif text-5xl font-bold text-[#304a2c]">Ward access</h1>
          </div>
          <Link href="/" className="text-[11px] font-black uppercase tracking-[0.24em] text-[#5a6349] hover:text-[#a26945]">
            Back home
          </Link>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
