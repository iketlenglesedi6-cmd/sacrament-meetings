import { NavLinks } from "@/components/NavLinks";

export default function MeetingsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="no-print border-b border-[#b7b398] bg-[#eef0e7]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <p className="font-serif text-[16px] font-bold uppercase tracking-[0.24em] text-[#304a2c]">
            Meeting programs
          </p>
          <NavLinks />
        </div>
      </div>
      {children}
    </>
  );
}
