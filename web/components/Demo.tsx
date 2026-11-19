"use client";
import { useCallback, useEffect, useRef } from "react";
import Script from "next/script";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Reveal } from "./Reveal";
import { site } from "./site";

type CalendlyApi = { initInlineWidget: (o: { url: string; parentElement: HTMLElement }) => void };

// Booking section: Calendly's inline calendar.
// Calendly only starts calendars by itself if its script is present when the page first loads.
// This page loads the script afterwards, so the calendar is started explicitly once it arrives.
// If it cannot load (blocked script, no JavaScript), the link underneath still opens the booking page.
export function Demo() {
  const box = useRef<HTMLDivElement>(null);

  const start = useCallback(() => {
    const api = (window as unknown as { Calendly?: CalendlyApi }).Calendly;
    if (!api || !box.current || box.current.querySelector("iframe")) return;
    api.initInlineWidget({ url: site.demoUrl, parentElement: box.current });
  }, []);

  // Covers coming back to this page after the script has already loaded once.
  useEffect(() => { start(); }, [start]);

  return (
    <section className="mx-auto max-w-page px-5 pb-20 md:px-8 md:pb-28">
      <Reveal>
        <div className="rounded-2xl bg-ink px-4 pt-4 text-white md:px-10 md:pt-10">
          <div className="overflow-hidden rounded-t-2xl bg-white">
            <div ref={box} style={{ minWidth: 320, height: 700 }} />
          </div>
        </div>
        <p className="mt-4 text-sm text-muted">
          Calendar not showing?{" "}
          <a className="inline-flex items-center gap-1 text-blue underline underline-offset-4" href={site.demoUrl} target="_blank" rel="noreferrer">
            Open the booking page <ArrowUpRight size={14} weight="bold" />
          </a>
        </p>
      </Reveal>
      <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" onLoad={start} onReady={start} />
    </section>
  );
}
