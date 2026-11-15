"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMotionValueEvent, useScroll } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { Logo } from "./Logo";
import { site } from "./site";

const links = [
  ["AI writer", "/ai-writer"],
  ["Templates", "/templates"],
  ["How it works", "/how-it-works"],
  ["FAQ", "/faq"],
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  return (
    <header className={`sticky top-0 z-40 bg-white/90 backdrop-blur-xl transition-colors duration-300 ${scrolled || open ? "border-b border-line" : "border-b border-transparent"}`}>
      <nav className="mx-auto flex h-[72px] max-w-page items-center justify-between gap-6 px-5 md:px-8" aria-label="Main">
        <div className="flex items-center gap-10">
          <Link href="/" aria-label="LMAIL home" onClick={() => setOpen(false)}><Logo /></Link>
          <ul className="hidden items-center gap-7 text-[15px] lg:flex">
            {links.map(([label, href]) => (
              <li key={href}>
                <Link href={href} aria-current={pathname === href ? "page" : undefined} className={`underline-offset-8 transition-colors hover:text-blue ${pathname === href ? "text-blue underline" : "text-ink"}`}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <a href={site.loginUrl} className="hidden rounded-lg px-4 py-2.5 text-[15px] font-medium text-ink underline-offset-4 hover:underline sm:block">Log in</a>
          <Link href="/demo" className="btn-primary !py-2.5">Get a demo</Link>
          <button className="grid h-11 w-11 place-items-center rounded-lg border border-line lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X size={18} /> : <List size={18} />}
          </button>
        </div>
      </nav>
      {open && (
        <ul className="px-5 pb-5 lg:hidden">
          {links.map(([label, href]) => (
            <li key={href}><Link className="block border-t border-line py-4 text-ink" href={href} onClick={() => setOpen(false)}>{label}</Link></li>
          ))}
          <li><a className="block border-t border-line py-4 text-ink" href={site.loginUrl}>Log in</a></li>
        </ul>
      )}
    </header>
  );
}
