"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/meetings", label: "Meetings" },
  { href: "/meetings/current", label: "Current program" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-4">
      {links.map((link) => {
        const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`text-[11px] font-black uppercase tracking-[0.24em] transition hover:text-[#a26945] ${
              active ? "text-[#304a2c] underline decoration-[#a26945] text-decoration-thickness:2px" : "text-[#5a6349]"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
