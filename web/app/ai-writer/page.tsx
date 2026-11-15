import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { AiWriter } from "@/components/AiWriter";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/Cta";

export const metadata: Metadata = { title: "AI writer | LMAIL", description: "Describe your email in a sentence and LMAIL drafts the subject line and the message." };

export default function Page() {
  return (
    <>
      <PageHeader title="An AI writer inside your email editor." lead="Tell LMAIL what you want to say. It writes the subject line and the email, and puts them into a finished design you can edit." />
      <AiWriter />
      <section className="mx-auto grid max-w-page items-center gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <Reveal>
          <h2 className="h-section max-w-[14ch]">You stay in charge of every word.</h2>
          <ul className="mt-6 space-y-4 text-lg text-muted">
            <li>It only uses the facts you give it. It will not invent prices, dates or claims.</li>
            <li>The draft lands in the editor. Nothing is sent until you press send.</li>
            <li>Pick the tone: friendly, professional, playful, urgent or warm.</li>
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-line shadow-[0_40px_80px_-40px_rgba(23,23,43,0.4)]">
            <Image src="/app-ai-writer.webp" alt="The LMAIL email editor with the AI writer window open" width={1440} height={900} sizes="(min-width: 1024px) 55vw, 100vw" className="block h-auto w-full" />
          </div>
        </Reveal>
      </section>
      <CtaBand />
    </>
  );
}
