"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Sparkle } from "@phosphor-icons/react";
import { Reveal } from "./Reveal";

// Sample outputs, written by hand to show the kind of draft the AI writer produces.
const samples = [
  {
    label: "Welcome email",
    prompt: "Welcome new subscribers to a coffee brand. Warm, short, with a 10% code.",
    subject: "Welcome to the morning club",
    body: ["Hi Laiba,", "You're in, and your mornings are about to get better.", "Here is 10% off your first bag: use WELCOME10 at checkout.", "Brew slow, sip happy."],
  },
  {
    label: "Sale announcement",
    prompt: "Announce a weekend sale for a skincare shop. Clear and upbeat.",
    subject: "This weekend only: 20% off everything",
    body: ["Hi Laiba,", "From Friday to Sunday, everything in the shop is 20% off.", "No code needed. The discount shows up in your basket.", "Stock up on your favourites before Monday."],
  },
  {
    label: "Win-back",
    prompt: "Bring back customers who have not ordered in 3 months. Friendly, no pressure.",
    subject: "It has been a while. Here is what is new",
    body: ["Hi Laiba,", "We have added a few things since your last order and thought of you.", "Take a look whenever you like. Your account is right where you left it.", "Hope to see you soon."],
  },
];

export function AiWriter() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const s = samples[i];

  return (
    <section className="bg-soft">
      <div className="mx-auto grid max-w-page items-center gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h2 className="h-section max-w-[14ch]">From one sentence to a ready email.</h2>
          <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-muted">
            Say what you want to send. LMAIL drafts the subject line and the email in your tone, ready for you to edit.
          </p>
          <p className="mt-4 flex max-w-[48ch] items-start gap-2 text-muted"><Sparkle size={18} weight="fill" className="mt-1 shrink-0 text-purple" /> Built into the email editor: press Write with AI, describe the email, and use the draft.</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Example requests">
            {samples.map((x, n) => (
              <button
                key={x.label} role="tab" aria-selected={n === i} onClick={() => setI(n)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition duration-200 active:scale-[0.98] ${n === i ? "border-ink bg-ink text-white" : "border-line bg-white text-muted hover:border-ink hover:text-ink"}`}
              >
                {x.label}
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-line bg-white p-5" role="tabpanel">
            <p className="text-sm text-muted">You ask</p>
            <p className="mt-1 text-ink">{s.prompt}</p>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 rounded-2xl bg-soft p-6 text-ink"
              >
                <p className="text-sm text-muted">Subject</p>
                <p className="mt-1 text-lg font-semibold tracking-tight">{s.subject}</p>
                <div className="mt-4 space-y-3 border-t border-line pt-4 text-[15px] leading-relaxed">
                  {s.body.map((line) => <p key={line}>{line}</p>)}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="mt-3 text-sm text-muted">Sample drafts, shown as examples.</p>
        </Reveal>
      </div>
    </section>
  );
}
