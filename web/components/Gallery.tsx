import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";
import { bySlug } from "./templates";

// Three columns of full emails drifting slowly, the middle one in the opposite direction.
// Motion shows the range of designs without making anyone click through them.
// It pauses on hover and stays still for people who prefer reduced motion.
const columns: { slugs: string[]; seconds: number; reverse?: boolean; hideBelow?: string }[] = [
  { slugs: ["launch", "northside-welcome"], seconds: 70 },
  { slugs: ["northside-race", "sale", "northside-plan"], seconds: 86, reverse: true },
  { slugs: ["welcome", "journal"], seconds: 76, hideBelow: "hidden md:block" },
];

function Column({ slugs, seconds, reverse, hideBelow = "" }: { slugs: string[]; seconds: number; reverse?: boolean; hideBelow?: string }) {
  const items = slugs.map(bySlug);
  return (
    <div className={`gallery-col min-w-0 flex-1 ${hideBelow}`}>
      <ul className={`gallery-track ${reverse ? "gallery-track-reverse" : ""}`} style={{ animationDuration: `${seconds}s` }}>
        {/* The list is repeated once so the loop has no visible seam. */}
        {[...items, ...items].map((t, i) => (
          <li key={i} className="pb-5" aria-hidden={i >= items.length}>
            <Image
              src={`/templates/${t.slug}.webp`} alt={i < items.length ? `${t.name} email for ${t.brand}, shown in full` : ""}
              width={t.w} height={t.h} sizes="(min-width: 768px) 30vw, 46vw"
              className="block h-auto w-full rounded-xl shadow-[0_24px_60px_-30px_rgba(23,23,43,0.55)]"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Gallery() {
  return (
    <section className="overflow-hidden bg-soft">
      <div className="mx-auto max-w-page px-5 pt-20 md:px-8 md:pt-28">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="h-section max-w-[16ch]">Emails people are glad to open.</h2>
            <p className="mt-4 max-w-[50ch] text-lg text-muted">Different brands, different styles, all built in LMAIL.</p>
          </div>
          <Link href="/templates" className="inline-flex w-fit items-center gap-1.5 border-b border-ink pb-1 font-medium text-ink transition-colors hover:border-blue hover:text-blue">
            See every template <ArrowUpRight size={16} weight="bold" />
          </Link>
        </Reveal>
      </div>
      <div className="gallery mx-auto mt-12 flex h-[640px] max-w-page gap-5 px-5 md:h-[760px] md:px-8">
        {columns.map((c, i) => <Column key={i} {...c} />)}
      </div>
    </section>
  );
}
