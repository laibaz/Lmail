import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";

// Home: real LMAIL email templates shown on a tablet and a phone.
export function Showcase() {
  return (
    <section className="overflow-hidden bg-soft">
      <div className="mx-auto grid max-w-page items-center gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <Reveal className="relative mx-auto w-full max-w-[640px] pb-10 pl-10 sm:pl-16">
          {/* tablet */}
          <div className="overflow-hidden rounded-[26px] border-[10px] border-ink bg-white shadow-[0_40px_80px_-40px_rgba(23,23,43,0.5)]">
            <div className="aspect-[4/3] overflow-hidden bg-soft">
              <Image src="/templates/sale.webp" alt="A sale email built in LMAIL, announcing 20% off with a discount code" width={1328} height={1482} sizes="(min-width: 1024px) 560px, 90vw" className="block h-auto w-full" />
            </div>
          </div>
          {/* phone, overlapping the tablet's lower left corner */}
          <div className="absolute bottom-0 left-0 w-[34%] overflow-hidden rounded-[26px] border-[7px] border-ink bg-white shadow-[0_30px_60px_-30px_rgba(23,23,43,0.6)]">
            <div className="aspect-[9/14] overflow-hidden bg-soft">
              <Image src="/templates/welcome.webp" alt="A welcome email built in LMAIL, shown on a phone" width={1328} height={1452} sizes="220px" className="block h-auto w-[112%] max-w-none -translate-x-[5.4%] -translate-y-[2.2%]" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="h-section max-w-[14ch]">Emails people are glad to open.</h2>
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-muted">
            Start from a ready design, change the words, and send. Every template looks right on phones and computers.
          </p>
          <Link href="/templates" className="mt-7 inline-flex items-center gap-1.5 border-b border-ink pb-1 font-medium text-ink transition-colors hover:border-blue hover:text-blue">
            See the templates <ArrowUpRight size={16} weight="bold" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
