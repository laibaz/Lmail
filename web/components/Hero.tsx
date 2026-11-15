"use client";
import { motion } from "framer-motion";
import { Mascot } from "./Mascot";
import { site } from "./site";

const bars = [38, 52, 44, 66, 58, 79, 71, 92, 84, 100, 88, 96];

function DashboardMock() {
  return (
    <div className="glass relative rounded-3xl p-3 shadow-[0_40px_120px_-30px_rgba(124,92,255,.65)] sm:p-4">
      <div className="rounded-2xl bg-night-800 p-4 sm:p-6">
        {/* window bar */}
        <div className="mb-5 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-blush" />
          <span className="h-2.5 w-2.5 rounded-full bg-lime" />
          <span className="h-2.5 w-2.5 rounded-full bg-violet" />
          <span className="ml-3 rounded-full bg-white/5 px-3 py-1 text-[11px] text-haze">lmail.laibstudios.com</span>
        </div>
        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          {/* chart */}
          <div className="rounded-2xl border border-white/5 bg-night-700/60 p-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-haze">Campaign · Spring launch</p>
                <p className="font-display text-2xl font-bold">Opens this week</p>
              </div>
              <span className="rounded-full bg-lime/15 px-2.5 py-1 text-xs font-semibold text-lime">▲ trending up</span>
            </div>
            <div className="mt-5 flex h-32 items-end gap-1.5 sm:h-40 sm:gap-2">
              {bars.map((h, i) => (
                <motion.span
                  key={i}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-violet-deep to-violet-soft"
                  style={i === bars.length - 3 ? { background: "linear-gradient(to top,#A6E01F,#C6FF3D)" } : undefined}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.9, delay: 0.5 + i * 0.06, ease: "easeOut" }}
                />
              ))}
            </div>
          </div>
          {/* AI panel */}
          <div className="rounded-2xl border border-violet/30 bg-gradient-to-b from-violet/20 to-transparent p-4">
            <p className="flex items-center gap-2 text-xs font-semibold text-lime"><span>✦</span> LMAIL AI</p>
            <p className="mt-3 text-sm text-mist/90">“Write a friendly welcome email for new subscribers.”</p>
            <div className="mt-4 space-y-2">
              {[92, 100, 76, 88, 54].map((w, i) => (
                <motion.div
                  key={i}
                  className="h-2 rounded-full bg-white/15"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: `${w}%`, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.3 + i * 0.18 }}
                />
              ))}
            </div>
            <motion.div
              className="mt-4 inline-flex rounded-full bg-lime px-3 py-1.5 text-xs font-bold text-night"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.4 }}
            >
              Draft ready →
            </motion.div>
          </div>
        </div>
        {/* contacts row */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[["Contacts", "Segments"], ["Sent", "Campaigns"], ["Opened", "Tracking"], ["Clicked", "Links"]].map(([a, b], i) => (
            <div key={a} className="rounded-xl border border-white/5 bg-night-700/60 p-3">
              <p className="text-[11px] text-haze">{b}</p>
              <p className="mt-1 text-sm font-semibold">{a}</p>
              <div className="mt-2 h-1.5 rounded-full bg-white/10">
                <motion.div className="h-full rounded-full bg-violet" initial={{ width: 0 }} animate={{ width: `${[82, 68, 54, 36][i]}%` }} transition={{ duration: 1, delay: 1 + i * 0.12 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-40">
      {/* glow + grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute -left-40 top-10 h-[520px] w-[520px] animate-drift rounded-full bg-violet/35 blur-[130px]" />
        <div className="absolute -right-40 top-40 h-[440px] w-[440px] animate-drift rounded-full bg-blush/25 blur-[130px] [animation-delay:-6s]" />
        <div className="absolute left-1/2 top-[420px] h-[300px] w-[300px] -translate-x-1/2 animate-drift rounded-full bg-lime/15 blur-[120px] [animation-delay:-12s]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 text-center">
        <motion.a
          href="#ai"
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-mist"
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        >
          <span className="rounded-full bg-lime px-2 py-0.5 text-[11px] font-bold text-night">NEW</span>
          Meet the AI email writer <span aria-hidden>→</span>
        </motion.a>

        <motion.h1
          className="mx-auto mt-7 max-w-4xl font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
        >
          Emails that land.
          <br />
          <span className="text-gradient">Campaigns that think.</span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg text-haze sm:text-xl"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
        >
          LMAIL is the email platform that writes with you, sends for you and keeps your
          sender reputation yours alone. Built by Laib Studios.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
        >
          <a href={site.demoUrl} className="btn-lime w-full sm:w-auto">Book a demo <span aria-hidden>→</span></a>
          <a href="#features" className="btn-ghost w-full sm:w-auto">See what it does</a>
        </motion.div>

        <motion.div
          className="relative mx-auto mt-16 max-w-5xl"
          initial={{ opacity: 0, y: 60, rotateX: 12 }} animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.21, 0.6, 0.35, 1] }}
          style={{ transformPerspective: 1200 }}
        >
          <DashboardMock />
          <div className="absolute -right-4 -top-16 hidden w-32 animate-float sm:block lg:-right-16 lg:w-44">
            <Mascot />
          </div>
          <div className="glass absolute -left-6 bottom-16 hidden animate-float-slow rounded-2xl px-4 py-3 text-left lg:block">
            <p className="text-xs text-haze">Delivered</p>
            <p className="text-sm font-semibold">✓ Inbox, not spam</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
