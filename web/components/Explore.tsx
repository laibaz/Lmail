import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";

function Card({ title, text, href, linkLabel, children, delay = 0 }: { title: string; text: string; href?: string; linkLabel?: string; children: React.ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay} className="group flex h-full flex-col">
      <h3 className="text-[15px] font-semibold">{title}</h3>
      <div className="mt-4 overflow-hidden rounded-2xl bg-soft transition-transform duration-300 group-hover:-translate-y-1">{children}</div>
      <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-muted">{text}</p>
      {href && (
        <Link href={href} className="mt-4 inline-flex w-fit items-center gap-1.5 border-b border-ink pb-0.5 text-[15px] font-medium text-ink transition-colors hover:border-blue hover:text-blue">
          {linkLabel} <ArrowUpRight size={15} weight="bold" />
        </Link>
      )}
    </Reveal>
  );
}

// Home: what LMAIL does, as five cards (2 large, 3 small). One column on phones.
export function Explore() {
  return (
    <section className="mx-auto max-w-page px-5 py-20 md:px-8 md:py-28">
      <Reveal>
        <h2 className="h-section max-w-[20ch]">Your contacts, your emails and AI, working together.</h2>
      </Reveal>

      <div className="mt-14 grid gap-x-6 gap-y-14 md:grid-cols-6">
        <div className="md:col-span-3">
          <Card title="AI that writes the first draft" text="Describe the email in a sentence. LMAIL writes the subject line and the message, and you edit from there." href="/ai-writer" linkLabel="Explore the AI writer">
            <div className="flex aspect-[4/3] items-start justify-center overflow-hidden px-6 pt-8 sm:pt-10">
              <Image src="/app-ai-modal.webp" alt="The AI writer window in LMAIL asking what the email is about, with tone and sender name fields" width={458} height={494} sizes="(min-width: 768px) 380px, 80vw" className="block h-auto w-[62%] rounded-2xl shadow-[0_24px_60px_-28px_rgba(23,23,43,0.55)]" />
            </div>
          </Card>
        </div>
        <div className="md:col-span-3">
          <Card title="Templates ready to send" text="Offers, invitations, launches and newsletters. Pick one and make it yours." href="/templates" linkLabel="Browse templates" delay={0.08}>
            <div className="flex aspect-[4/3] items-start justify-center gap-5 overflow-hidden px-6 pt-8 sm:px-10 sm:pt-10">
              <Image src="/templates/stem-bouquet.webp" alt="Seasonal offer email template" width={1200} height={1434} sizes="240px" className="block h-auto w-[46%] rounded-t-lg shadow-[0_20px_50px_-25px_rgba(23,23,43,0.5)]" />
              <Image src="/templates/north-service.webp" alt="Service week email template" width={1200} height={1494} sizes="240px" className="mt-8 block h-auto w-[46%] rounded-t-lg shadow-[0_20px_50px_-25px_rgba(23,23,43,0.5)]" />
            </div>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card title="Everyone in one place" text="Import a spreadsheet or collect sign-ups. Every contact, with what they opened and clicked.">
            <div className="aspect-[4/3] overflow-hidden pl-6 pt-6">
              <Image src="/app-contacts.webp" alt="The LMAIL contacts list" width={2560} height={1600} sizes="(min-width: 768px) 30vw, 90vw" className="block h-full w-full rounded-tl-xl object-cover object-[62%_18%]" />
            </div>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card title="Lists that update themselves" text="Group people by who they are and what they do. No spreadsheets to maintain." delay={0.08}>
            <div className="aspect-[4/3] overflow-hidden pl-6 pt-6">
              <Image src="/app-segments.webp" alt="The LMAIL lists and segments screen" width={2560} height={1600} sizes="(min-width: 768px) 30vw, 90vw" className="block h-full w-full rounded-tl-xl object-cover object-[45%_30%]" />
            </div>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card title="A reputation that is yours alone" text="Each account sends from its own domain. Nobody else's list can hurt your deliverability." delay={0.16}>
            <div className="grid aspect-[4/3] place-items-center bg-blue text-white">
              <div className="text-center">
                <ShieldCheck size={56} weight="duotone" className="mx-auto" />
                <p className="mt-4 font-mono text-sm tracking-wide text-white/85">mail.yourbrand.com</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
