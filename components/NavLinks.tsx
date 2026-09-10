"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [{ href: "/", label: "Home" }, { href: "/meetings", label: "Meetings" }, { href: "/meetings/current", label: "Current program" }];
export function NavLinks() { const pathname = usePathname(); return <nav aria-label="Main navigation" className="flex gap-1">{links.map((link) => { const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href); return <Link key={link.href} href={link.href} className={`rounded-md px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700 ${active ? "bg-teal-50 text-teal-800" : "text-slate-600 hover:bg-slate-100"}`}>{link.label}</Link>; })}</nav>; }
