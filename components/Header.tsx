import { NavLinks } from "@/components/NavLinks";

export function Header() {
  const date = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="border-b border-[#b7b398] bg-[#f8f5ed]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div>
          <p className="font-serif text-[22px] font-bold text-[#304a2c]">Cedar Ridge Ward</p>
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#5a6349]">{date}</p>
        </div>
        <NavLinks />
      </div>
    </header>
  );
}
