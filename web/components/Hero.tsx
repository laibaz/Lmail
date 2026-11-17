"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";

const ease = [0.16, 1, 0.3, 1] as const;
const line1 = ["Emails", "that", "land."];
const line2 = ["Campaigns", "that", "think."];

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // The product picture drifts up slightly as the page scrolls, for a sense of depth.
  const drift = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -40]);

  const word = (w: string, i: number) => (
    <motion.span key={w + i} className="inline-block" initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 + i * 0.07, ease }}>
      {w}&nbsp;
    </motion.span>
  );
  const enter = (delay: number) => ({ initial: reduce ? false : { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease } });

  return (
    <section id="top" className="relative overflow-hidden">
      {/* soft brand glow behind the product picture */}
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[560px] w-[760px] rounded-full bg-brand opacity-[0.13] blur-[110px]" />

      <div className="relative mx-auto grid max-w-page items-center gap-14 px-5 pb-20 pt-12 md:px-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12 lg:pb-28 lg:pt-16">
        <div>
          <motion.p {...enter(0)} className="font-mono text-[13px] uppercase tracking-[0.18em] text-muted">Email marketing you own</motion.p>
          <h1 className="mt-5 text-[2.6rem] font-normal leading-[1.06] tracking-tight sm:text-6xl lg:text-[2.75rem] xl:text-[3.25rem]">
            <span className="block lg:whitespace-nowrap">{line1.map(word)}</span>
            <span className="block lg:whitespace-nowrap">{line2.map((w, i) => word(w, i + 3))}</span>
          </h1>
          <motion.p {...enter(0.5)} className="mt-6 max-w-[44ch] text-lg leading-relaxed text-muted">
            Your own email platform, with an AI writer built in and no charge per contact.
          </motion.p>
          <motion.div {...enter(0.6)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/demo" className="btn-primary group">Get a demo <ArrowRight size={17} weight="bold" className="transition-transform duration-200 group-hover:translate-x-0.5" /></Link>
            <Link href="/templates" className="btn-secondary">See templates</Link>
          </motion.div>
        </div>

        <motion.div style={{ y: drift }} className="relative mx-auto w-full max-w-[720px]">
          <motion.div initial={reduce ? false : { opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25, ease }}>
            <div className="rounded-[28px] border-[10px] border-ink bg-ink shadow-[0_40px_80px_-40px_rgba(23,23,43,0.5)]">
              <Image src="/app-home.webp" alt="The LMAIL home screen with a greeting, quick actions and a contacts chart" width={2560} height={1600} priority sizes="(min-width: 1024px) 50vw, 100vw" className="block h-auto w-full rounded-[18px]" />
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
