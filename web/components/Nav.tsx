"use client";
import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { List, X } from "@phosphor-icons/react";
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
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${scrolled || open ? "border-b border-white/10 bg-night/85 backdrop-blur-xl" : "border-b border-transparent"}`}>
      <nav className="mx-auto flex h-16 max-w-page items-center justify-between px-5 md:px-8" aria-label="Main">
        <a href="#top" aria-label="LMAIL home"><Logo /></a>
        <ul className="hidden items-center gap-8 text-sm text-haze md:flex">
          {links.map(([label, href]) => (
            <li key={href}><a className="transition-colors hover:text-white" href={href}>{label}</a></li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a href={site.demoUrl} className="btn-primary !px-5 !py-2 !text-sm">Book a demo</a>
          <button className="grid h-10 w-10 place-items-center rounded-full border border-white/20 md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X size={18} /> : <List size={18} />}
          </button>
        </div>
      </nav>
      {open && (
        <ul className="px-5 pb-5 md:hidden">
          {links.map(([label, href]) => (
            <li key={href}>
              <a className="block border-t border-white/10 py-4 text-haze hover:text-white" href={href} onClick={() => setOpen(false)}>{label}</a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
