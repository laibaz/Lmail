"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { brands, templates } from "./templates";

// Templates page: every email shown in full, in a masonry wall, with a brand filter.
export function TemplateWall() {
  const [brand, setBrand] = useState<string>("All");
  const reduce = useReducedMotion();
  const shown = templates.filter((t) => brand === "All" || t.brand === brand);

  return (
    <section className="mx-auto max-w-page px-5 pb-20 md:px-8 md:pb-28">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by brand">
        {["All", ...brands].map((b) => (
          <button
            key={b} role="tab" aria-selected={brand === b} onClick={() => setBrand(b)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition duration-200 active:scale-[0.98] ${brand === b ? "border-ink bg-ink text-white" : "border-line bg-white text-muted hover:border-ink hover:text-ink"}`}
          >
            {b}
          </button>
        ))}
      </div>

      <ul className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((t) => (
            <motion.li
              key={t.slug} layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10 break-inside-avoid"
            >
              <div className="overflow-hidden rounded-2xl border border-line bg-soft shadow-[0_30px_70px_-40px_rgba(23,23,43,0.5)] transition-transform duration-300 hover:-translate-y-1">
                <Image src={`/templates/${t.slug}.webp`} alt={`${t.name} email for ${t.brand}, shown in full`} width={t.w} height={t.h} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw" className="block h-auto w-full" />
              </div>
              <h2 className="mt-4 text-lg font-medium tracking-tight">{t.name}</h2>
              <p className="mt-0.5 text-[15px] text-muted">{t.brand}. {t.use}</p>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </section>
  );
}
