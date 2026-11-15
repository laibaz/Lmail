import { Reveal } from "./Reveal";

const who = [
  { emoji: "🏢", title: "Agencies", body: "Run email for every client from one place, each with their own space, domain and reputation." },
  { emoji: "🛍️", title: "Online stores", body: "Welcome new buyers, recover abandoned carts and bring customers back automatically." },
  { emoji: "🎨", title: "Creators & small teams", body: "Send newsletters that sound like you, without spending your week writing them." },
];

export function Audience() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 sm:pb-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-deep via-violet to-blush p-8 sm:p-12">
          <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime/40 blur-[90px]" />
          <h2 className="relative max-w-xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">Built for people who'd rather grow than fiddle.</h2>
          <div className="relative mt-10 grid gap-5 md:grid-cols-3">
            {who.map((w) => (
              <div key={w.title} className="rounded-3xl bg-night/40 p-6 backdrop-blur-md transition hover:bg-night/60">
                <span className="text-4xl" aria-hidden>{w.emoji}</span>
                <h3 className="mt-4 font-display text-xl font-bold text-white">{w.title}</h3>
                <p className="mt-2 text-white/80">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
