import Link from "next/link";
import { NavLinks } from "@/components/NavLinks";
import { getSession } from "@/lib/auth";

export async function Header() {
  const date = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const session = await getSession();

  return (
    <header className="border-b border-[#b7b398] bg-[#f8f5ed]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div>
          <p className="font-serif text-[22px] font-bold text-[#304a2c]">Cedar Ridge Ward</p>
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#5a6349]">{date}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <NavLinks />
          {session ? (
            <Link href="/meetings/new" className="text-[11px] font-black uppercase tracking-[0.24em] text-[#304a2c] hover:text-[#a26945]">
              Admin
            </Link>
          ) : (
            <Link href="/login" className="text-[11px] font-black uppercase tracking-[0.24em] text-[#304a2c] hover:text-[#a26945]">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
