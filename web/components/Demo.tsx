"use client";
import Script from "next/script";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Reveal } from "./Reveal";
import { site } from "./site";

// Booking section: Calendly's inline calendar. If the calendar cannot load
// (blocked script, no JavaScript), the link underneath still opens the booking page.
export function Demo() {
  return (
    <section className="mx-auto max-w-page px-5 pb-20 md:px-8 md:pb-28">
      <Reveal>
        <div className="rounded-2xl bg-ink px-4 pt-4 text-white md:px-10 md:pt-10">
          <div className="overflow-hidden rounded-t-2xl bg-white">
            <div className="calendly-inline-widget" data-url={site.demoUrl} style={{ minWidth: 320, height: 700 }} />
          </div>
        </div>
        <p className="mt-4 text-sm text-muted">
          Calendar not showing?{" "}
          <a className="inline-flex items-center gap-1 text-blue underline underline-offset-4" href={site.demoUrl} target="_blank" rel="noreferrer">
            Open the booking page <ArrowUpRight size={14} weight="bold" />
          </a>
        </p>
      </Reveal>
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
    </section>
  );
}
