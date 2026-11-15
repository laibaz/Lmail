import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Reveal } from "./Reveal";

// A short note from the founder. Drop a square photo at public/founder.jpg to replace the initials.
export function Founder() {
  const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", "founder.jpg"));
  return (
    <section className="mx-auto max-w-page px-5 pb-20 md:px-8 md:pb-28">
      <Reveal>
        <div className="flex flex-col gap-6 border-t border-line pt-12 md:flex-row md:items-center md:gap-10">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full bg-brand p-[3px]">
            {hasPhoto ? (
              <Image src="/founder.jpg" alt="Laiba Hassan, founder of Laib Studios" width={192} height={192} className="h-full w-full rounded-full object-cover" />
            ) : (
              <div className="grid h-full w-full place-items-center rounded-full bg-white text-2xl font-medium text-purple" aria-hidden>LH</div>
            )}
          </div>
          <div>
            <p className="max-w-[58ch] text-2xl font-normal leading-snug tracking-tight md:text-[1.75rem]">
              I built LMAIL so small teams can send good email without needing a marketing department.
            </p>
            <p className="mt-3 text-muted">Laiba Hassan, founder of Laib Studios</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
