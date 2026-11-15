import Image from "next/image";
import { Reveal } from "./Reveal";
import { templates } from "./templates";

export function TemplatesGrid() {
  return (
    <section className="mx-auto max-w-page px-5 pb-20 md:px-8 md:pb-28">
      <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2">
        {templates.map((t, i) => (
          <Reveal key={t.slug} delay={(i % 2) * 0.08}>
            <li>
              <div className="overflow-hidden rounded-2xl bg-soft px-6 pt-8 sm:px-12 sm:pt-12">
                <div className="aspect-[4/5] overflow-hidden">
                  <Image src={`/templates/${t.slug}.webp`} alt={`${t.name} email template`} width={t.w} height={t.h} sizes="(min-width: 640px) 45vw, 90vw" className="block h-auto w-full rounded-t-xl shadow-[0_20px_50px_-25px_rgba(23,23,43,0.5)]" />
                </div>
              </div>
              <h2 className="mt-5 text-xl font-medium tracking-tight">{t.name}</h2>
              <p className="mt-1 text-muted">{t.use}</p>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
