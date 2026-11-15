import Image from "next/image";
import { ChartLineUp, Lightning, ShieldCheck, Storefront } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-page px-5 py-20 md:px-8 md:py-28">
      <Reveal>
        <h2 className="h-section max-w-[18ch]">Everything you need to send well.</h2>
        <p className="mt-4 max-w-[52ch] text-lg text-muted">Contacts, campaigns and results in one place, with help writing when you want it.</p>
      </Reveal>

      {/* Bento: 5 features, 5 cells (4+2, then 2+2+2). One column below md. */}
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6">
        <Reveal className="md:col-span-4">
          <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-soft">
            <div className="p-7 pb-0">
              <h3 className="text-2xl font-medium tracking-tight">Lists that keep themselves up to date</h3>
              <p className="mt-2 max-w-[50ch] text-muted">Group people by who they are and what they do. No spreadsheets to maintain.</p>
            </div>
            <div className="mt-7 flex-1 overflow-hidden pl-7">
              <Image src="/app-segments.webp" alt="The LMAIL lists and segments screen showing two client segments" width={2560} height={1600} sizes="(min-width: 768px) 60vw, 100vw" className="block h-full min-h-[240px] w-full rounded-tl-2xl border-l border-t border-line object-cover object-left-top" />
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.08} className="md:col-span-2">
          <article className="flex h-full flex-col justify-between rounded-2xl bg-blue p-7 text-white">
            <ShieldCheck size={36} weight="duotone" />
            <div className="mt-16">
              <h3 className="text-2xl font-medium tracking-tight">A reputation that is yours alone</h3>
              <p className="mt-2 text-white/85">Each account sends from its own domain. Nobody else's list can hurt your deliverability.</p>
            </div>
          </article>
        </Reveal>

        <Reveal className="md:col-span-2">
          <article className="panel flex h-full flex-col justify-between p-7">
            <Lightning size={36} weight="duotone" className="text-purple" />
            <div className="mt-12">
              <h3 className="text-xl font-medium tracking-tight">Automations that run themselves</h3>
              <p className="mt-2 text-muted">Welcome series, follow-ups and win-backs that send at the right moment.</p>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.08} className="md:col-span-2">
          <article className="flex h-full flex-col justify-between rounded-2xl bg-pink-tint p-7">
            <ChartLineUp size={36} weight="duotone" className="text-mauve" />
            <div className="mt-12">
              <h3 className="text-xl font-medium tracking-tight">See what is working</h3>
              <p className="mt-2 text-muted">Opens and clicks for every email and every contact, as they happen.</p>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.16} className="md:col-span-2">
          <article className="panel flex h-full flex-col justify-between p-7">
            <Storefront size={36} weight="duotone" className="text-purple" />
            <div className="mt-12">
              <h3 className="text-xl font-medium tracking-tight">Your brand on the door</h3>
              <p className="mt-2 text-muted">Agencies can run LMAIL under their own name, with a separate space per client.</p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
