"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";

const prompt = "Write a welcome email for new subscribers of a coffee brand. Warm, short, with a 10% code.";
const subject = "Welcome to the morning club ☕";
const body = [
  "Hi Ayesha,",
  "You're in — and your mornings are about to get a lot better.",
  "To say thanks for joining, here's 10% off your first bag: use WELCOME10 at checkout.",
  "Brew slow, sip happy.",
];

export function AiDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-120px" });
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const [lines, setLines] = useState(0);

  useEffect(() => {
    if (reduce) { setTyped(prompt.length); setLines(body.length + 1); return; }
    if (!inView) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      setTyped(0); setLines(0);
      for (let i = 1; i <= prompt.length; i++) timers.push(setTimeout(() => !cancelled && setTyped(i), i * 28));
      const start = prompt.length * 28 + 600;
      for (let l = 1; l <= body.length + 1; l++) timers.push(setTimeout(() => !cancelled && setLines(l), start + l * 520));
      timers.push(setTimeout(() => !cancelled && run(), start + (body.length + 1) * 520 + 5000));
    };
    run();
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, [inView, reduce]);

  const typing = typed < prompt.length;

  return (
    <section id="ai" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/20 blur-[160px]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime">LMAIL AI · Early access</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            From a sentence to a <span className="text-gradient">send-ready email.</span>
          </h2>
          <p className="mt-4 text-lg text-haze">
            Tell LMAIL what you want to say. It writes the subject line and the email, in your tone,
            ready to edit and send. No blank page, no copywriter needed.
          </p>
          <ul className="mt-7 space-y-3 text-mist">
            {["Subject lines people actually open", "Rewrites: shorter, friendlier, more formal", "Plain-language summaries of your results"].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lime text-sm font-bold text-night">✓</span>
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <div ref={ref} className="glass rounded-3xl p-3 shadow-[0_40px_120px_-40px_rgba(124,92,255,.8)]" aria-label="Animated example of the AI email writer">
            <div className="rounded-2xl bg-night-800 p-5">
              <p className="flex items-center gap-2 text-xs font-semibold text-lime"><span>✦</span> Ask LMAIL AI</p>
              <div className="mt-3 min-h-[76px] rounded-2xl border border-violet/40 bg-night-700 p-4 text-sm leading-relaxed text-mist">
                {prompt.slice(0, typed)}
                {typing && <span className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 animate-blink bg-lime" />}
              </div>

              <div className="mt-4 rounded-2xl bg-white p-5 text-night">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-night/50">Subject</p>
                <p className={`mt-1 font-display text-lg font-bold transition-opacity duration-500 ${lines >= 1 ? "opacity-100" : "opacity-0"}`}>{subject}</p>
                <div className="my-4 h-px bg-night/10" />
                <div className="space-y-3 text-sm leading-relaxed">
                  {body.map((line, i) => (
                    <p key={i} className={`transition-all duration-500 ${lines >= i + 2 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>{line}</p>
                  ))}
                </div>
                <span className={`mt-5 inline-flex rounded-full bg-violet px-4 py-2 text-xs font-bold text-white transition-opacity duration-500 ${lines > body.length ? "opacity-100" : "opacity-0"}`}>
                  Use this draft →
                </span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-haze">Example for illustration.</p>
        </Reveal>
      </div>
    </section>
  );
}
