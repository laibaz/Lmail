"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "@phosphor-icons/react";

const faqs = [
  ["Do I own the system?", "Yes. LMAIL is set up as your own platform with your own sending account and domain. Your contacts, your emails and your sending reputation belong to you."],
  ["What is LMAIL?", "An email marketing platform by Laib Studios. Store contacts, build segments, design emails, run automated campaigns and track results."],
  ["Do I need technical skills?", "No. We set up your account and sending domain with you. After that it is point, click and send."],
  ["How does pricing work?", "A one-time setup, then a monthly fee plus the cost of the emails you send. There is no charge per contact. Book a demo and we will give you a clear quote."],
  ["Will my emails reach the inbox?", "Each account sends from its own domain with its own reputation, and new domains are warmed up gradually. That gives your email the best chance, though no platform can guarantee the inbox."],
  ["Can I use LMAIL for my own clients?", "Yes. Agencies can give each client a separate space and run it under their own brand."],
  ["How does the AI writer work?", "In the email editor, press Write with AI and describe your email in a sentence or two. LMAIL drafts the subject line and the message. You review and edit it before anything is sent."],
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  return (
    <section className="mx-auto max-w-3xl px-5 pb-20 md:px-8 md:pb-28">
      <div>
        {faqs.map(([q, a], i) => {
          const isOpen = open === i;
          return (
            <div key={q} className="border-t border-line last:border-b">
              <button className="flex w-full items-center justify-between gap-6 py-6 text-left text-xl font-medium tracking-tight" aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                {q}
                <Plus size={20} weight="bold" className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45 text-blue" : "text-muted"}`} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div id={`faq-${i}`} initial={reduce ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={reduce ? undefined : { height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                    <p className="max-w-[60ch] pb-6 text-muted">{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
