import { Reveal } from "./Reveal";

function Icon({ d }: { d: string }) {
  return (
    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet to-violet-deep shadow-[0_10px_30px_-10px_rgba(124,92,255,.9)]">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
    </span>
  );
}

const features: { title: string; body: string; icon: string; wide?: boolean; tag?: string; art?: string }[] = [
  { title: "AI that writes with you", body: "Describe the email in a sentence. LMAIL drafts the subject line and the whole message in your brand voice.", icon: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z", wide: true, tag: "Early access", art: "ai" },
  { title: "Segments that update themselves", body: "Group contacts by who they are and what they do. Lists stay fresh without spreadsheets.", icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8M23 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8" },
  { title: "Campaigns on autopilot", body: "Welcome series, follow-ups and win-backs that send themselves at the right moment.", icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" },
  { title: "A reputation that's yours alone", body: "Every account sends from its own domain with its own reputation. Nobody else's list can hurt your deliverability.", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4", wide: true, art: "domain" },
  { title: "See what's working", body: "Opens, clicks and replies in clear, live charts — per campaign and per contact.", icon: "M3 3v18h18M7 15l4-4 3 3 5-6" },
  { title: "Your brand, front and centre", body: "Agencies can run LMAIL under their own name, with a separate space for every client.", icon: "M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 16.8 6.5 19.5l1-6.3L3 8.9 9 8l3-6z" },
];

function AiArt() {
  return (
    <div aria-hidden className="absolute bottom-6 right-6 hidden w-56 space-y-2 lg:block">
      <div className="ml-auto w-fit rounded-2xl rounded-br-sm bg-violet px-3 py-2 text-xs text-white">Make it friendlier ✨</div>
      <div className="w-fit rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2 text-xs text-mist">Done! Here's a warmer version…</div>
      <div className="ml-auto flex w-fit items-center gap-1 rounded-full bg-lime px-3 py-1.5 text-[11px] font-bold text-night">Subject: You're in 🎉</div>
    </div>
  );
}

function DomainArt() {
  return (
    <div aria-hidden className="absolute bottom-7 right-6 hidden w-60 space-y-2 lg:block">
      {["mail.yourbrand.com", "news.client-two.com", "hello.client-three.com"].map((d, i) => (
        <div key={d} className="flex items-center justify-between rounded-xl border border-white/10 bg-night/60 px-3 py-2 text-xs" style={{ marginLeft: i * 10 }}>
          <span className="text-mist">{d}</span>
          <span className="flex items-center gap-1 font-semibold text-lime"><span className="h-1.5 w-1.5 rounded-full bg-lime" />healthy</span>
        </div>
      ))}
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime">Features</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Everything email. <span className="text-gradient">Nothing boring.</span></h2>
        <p className="mt-4 text-lg text-haze">One place to write, send, automate and measure — with AI doing the heavy lifting.</p>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={(i % 3) * 0.08} className={f.wide ? "md:col-span-2" : ""}>
            <article className="glass group relative h-full overflow-hidden rounded-3xl p-7 transition duration-300 hover:-translate-y-1 hover:border-violet/50">
              <div aria-hidden className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet/0 blur-3xl transition duration-500 group-hover:bg-violet/30" />
              {f.art === "ai" && <AiArt />}
              {f.art === "domain" && <DomainArt />}
              <div className="relative">
                <div className="flex items-center justify-between lg:justify-start lg:gap-4">
                  <Icon d={f.icon} />
                  {f.tag && <span className="rounded-full border border-lime/40 px-3 py-1 text-xs font-semibold text-lime">{f.tag}</span>}
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold">{f.title}</h3>
                <p className={`mt-2 text-haze ${f.wide ? "max-w-sm" : "max-w-md"}`}>{f.body}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
