import { Reveal } from "./Reveal";

export function PageHeader({ title, lead }: { title: string; lead: string }) {
  return (
    <section className="mx-auto max-w-page px-5 pb-10 pt-14 md:px-8 md:pb-14 md:pt-20">
      <Reveal>
        <h1 className="max-w-[18ch] text-[2.6rem] font-normal leading-[1.06] tracking-tight md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-muted">{lead}</p>
      </Reveal>
    </section>
  );
}
