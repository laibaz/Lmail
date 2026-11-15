import Image from "next/image";
import { Reveal } from "./Reveal";

export function Inbox() {
  return (
    <section className="px-5 md:px-8">
      <div className="mx-auto max-w-page overflow-hidden rounded-2xl bg-violet px-6 pt-16 text-center md:pt-20">
        <Reveal>
          <h2 className="h-section mx-auto max-w-[18ch] text-white">What your subscribers actually see.</h2>
          <p className="mx-auto mt-4 max-w-[48ch] text-lg text-white/85">Clean, on-brand emails that look right on every phone and inbox.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <Image src="/email-welcome.webp" alt="A welcome email sent from LMAIL, with a greeting, a short message and a button" width={1360} height={1128} sizes="(min-width: 768px) 560px, 100vw" className="mx-auto mt-12 block h-auto w-full max-w-[560px] rounded-t-2xl shadow-[0_-10px_80px_-10px_rgba(11,11,26,0.6)]" />
        </Reveal>
      </div>
    </section>
  );
}
