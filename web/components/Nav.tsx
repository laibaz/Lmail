"use client";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { site } from "./site";

const links = [
  ["Features", "#features"],
  ["AI writer", "#ai"],
  ["How it works", "#how"],
  ["FAQ", "#faq"],
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled || open ? "border-b border-white/10 bg-night/80 backdrop-blur-xl" : ""}`}>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5" aria-label="Main">
        <a href="#top" aria-label="LMAIL home"><Logo /></a>
        <ul className="hidden items-center gap-8 text-sm text-haze md:flex">
          {links.map(([label, href]) => (
            <li key={href}><a className="transition hover:text-white" href={href}>{label}</a></li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a href={site.demoUrl} className="btn-lime !px-5 !py-2 text-sm">Book a demo</a>
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 md:hidden"
            aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-0.5 w-4 bg-white transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-4 bg-white transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </nav>
      {open && (
        <ul className="space-y-1 px-5 pb-5 md:hidden">
          {links.map(([label, href]) => (
            <li key={href}>
              <a className="block rounded-xl px-3 py-3 text-haze hover:bg-white/5 hover:text-white" href={href} onClick={() => setOpen(false)}>{label}</a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
