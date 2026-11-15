"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { site } from "./site";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section id="top" className="overflow-hidden">
      <div className="mx-auto grid max-w-page items-center gap-12 px-5 pb-16 pt-12 md:px-8 lg:min-h-[calc(100dvh-72px-120px)] lg:grid-cols-[1fr_1.25fr] lg:gap-14 lg:pb-20 lg:pt-16">
        <div>
          <motion.p {...enter(0)} className="font-mono text-[13px] uppercase tracking-[0.18em] text-muted">Email marketing with AI</motion.p>
          <motion.h1 {...enter(0.05)} className="mt-5 text-[2.6rem] font-normal leading-[1.06] tracking-tight sm:text-6xl lg:text-[2.75rem] xl:text-[3.25rem]">
            Emails that land.
            <br />
            <span className="lg:whitespace-nowrap">Campaigns that think.</span>
          </motion.h1>
          <motion.p {...enter(0.12)} className="mt-6 max-w-[44ch] text-lg leading-relaxed text-muted">
            LMAIL writes with you, sends for you and keeps your sender reputation yours alone.
          </motion.p>
          <motion.div {...enter(0.2)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={site.demoUrl} className="btn-primary">Get a demo</a>
            <a href="#features" className="btn-secondary">See features</a>
          </motion.div>
        </div>

        {/* Real screenshot of the LMAIL home screen, in a tablet-style frame */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
        >
          <div className="rounded-[28px] border-[10px] border-ink bg-ink shadow-[0_40px_80px_-40px_rgba(23,23,43,0.45)]">
            <Image src="/app-home.webp" alt="The LMAIL home screen with a greeting, quick actions and a contacts chart" width={2560} height={1600} priority sizes="(min-width: 1024px) 55vw, 100vw" className="block h-auto w-full rounded-[18px]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
