"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { site } from "./site";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid min-h-[100dvh] max-w-page items-center gap-12 px-5 pb-16 pt-24 md:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
        <div>
          <motion.h1 {...enter(0)} className="text-[2.6rem] font-semibold leading-[1.04] tracking-tighter sm:text-6xl lg:text-[3rem] xl:text-[3.25rem]">
            Emails that land.
            <br />
            <span className="text-violet-soft lg:whitespace-nowrap">Campaigns that think.</span>
          </motion.h1>
          <motion.p {...enter(0.1)} className="mt-6 max-w-[46ch] text-lg leading-relaxed text-haze">
            LMAIL writes with you, sends for you and keeps your sender reputation yours alone.
          </motion.p>
          <motion.div {...enter(0.2)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={site.demoUrl} className="btn-primary">Book a demo <ArrowRight size={18} weight="bold" /></a>
            <a href="#features" className="btn-secondary">See features</a>
          </motion.div>
        </div>

        {/* Real screenshot of the LMAIL app, bleeding off the right edge on desktop */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease }}
          className="lg:-mr-[30%]"
        >
          <div className="overflow-hidden rounded-2xl border border-white/15 shadow-[0_40px_100px_-30px_rgba(124,92,255,0.45)]">
            <Image src="/app-contacts.webp" alt="The LMAIL contacts screen, listing subscribers with their email and location" width={2560} height={1600} priority sizes="(min-width: 1024px) 60vw, 100vw" className="block h-auto w-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
