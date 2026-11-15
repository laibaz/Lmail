import { Reveal } from "./Reveal";

const steps = [
  { n: "01", title: "Bring your contacts", body: "Import a spreadsheet or connect a signup form. LMAIL sorts people into smart segments." },
  { n: "02", title: "Write with AI", body: "Describe your email, pick a design, and polish the draft LMAIL writes for you." },
  { n: "03", title: "Send and learn", body: "Send now or automate it. Watch opens and clicks roll in, and let AI explain what to do next." },
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime">How it works</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Up and sending in <span className="text-gradient">three steps.</span></h2>
      </Reveal>
      <ol className="relative mt-14 grid gap-5 md:grid-cols-3">
        <div aria-hidden className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-violet/60 to-transparent md:block" />
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.12}>
            <li className="glass relative h-full rounded-3xl p-7">
              <span className="font-display text-6xl font-bold text-gradient">{s.n}</span>
              <h3 className="mt-4 font-display text-2xl font-bold">{s.title}</h3>
              <p className="mt-2 text-haze">{s.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
