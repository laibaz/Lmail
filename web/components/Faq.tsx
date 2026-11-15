"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./Reveal";

const faqs = [
  ["What is LMAIL?", "LMAIL is an email marketing platform by Laib Studios. You can store contacts, build segments, design emails, run automated campaigns and track results, with AI to help you write."],
  ["Do I need technical skills?", "No. We set up your account and sending domain with you. After that it's point, click and send."],
  ["How does pricing work?", "Pricing depends on how many contacts you have and how much you send. Book a demo and we'll give you a clear quote."],
  ["Will my emails reach the inbox?", "Each account sends from its own domain with its own reputation, and we warm new domains up gradually. That gives your email the best chance of landing in the inbox, though no platform can guarantee it."],
  ["Can I use LMAIL for my own clients?", "Yes. Agencies can give each client a separate space, and run it under their own brand."],
  ["Is the AI writer available now?", "It's in early access. Book a demo and we'll show you where it's at and add you to the list."],
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-24 sm:py-32">
      <Reveal className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime">FAQ</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Good questions.</h2>
      </Reveal>
      <div className="mt-12 space-y-3">
        {faqs.map(([q, a], i) => {
          const isOpen = open === i;
          return (
            <Reveal key={q} delay={i * 0.04}>
              <div className={`glass rounded-2xl transition ${isOpen ? "border-violet/50" : ""}`}>
                <button
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-lg font-semibold"
                  aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? null : i)}
                >
                  {q}
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xl transition ${isOpen ? "rotate-45 bg-lime text-night" : "bg-white/10"}`} aria-hidden>+</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <p className="px-6 pb-6 text-haze">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
