import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/SignOutButton";
import { getSession } from "@/lib/auth";

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-6 flex flex-col gap-3 border-b border-[#b7b398] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#a26945]">Admin</p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-[#304a2c]">Meeting Management</h1>
        </div>
        <SignOutButton />
      </div>
      {children}
    </main>
  );
}
