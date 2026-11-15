import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";
import { site } from "./site";

// Closing panel used at the bottom of every page except the demo page itself.
export function CtaBand() {
  return (
    <section className="mx-auto max-w-page px-5 pb-20 md:px-8 md:pb-28">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-8 rounded-2xl bg-ink p-8 text-white md:flex-row md:items-end md:p-14">
          <div>
            <h2 className="text-4xl font-normal leading-[1.05] tracking-tight md:text-6xl">See LMAIL in action.</h2>
            <p className="mt-4 max-w-[44ch] text-lg text-white/75">Pick a time for a short call. Bring your questions.</p>
          </div>
          <Link href="/demo" className="btn bg-white text-ink hover:bg-pink-tint">Get a demo <ArrowRight size={18} weight="bold" /></Link>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-page flex-col items-start justify-between gap-6 px-5 py-10 text-sm text-muted md:flex-row md:items-center md:px-8">
        <Logo />
        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
          <Link className="hover:text-ink" href="/ai-writer">AI writer</Link>
          <Link className="hover:text-ink" href="/templates">Templates</Link>
          <Link className="hover:text-ink" href="/how-it-works">How it works</Link>
          <Link className="hover:text-ink" href="/faq">FAQ</Link>
          <a className="hover:text-ink" href={site.loginUrl}>Log in</a>
        </nav>
        <p>
          © {new Date().getFullYear()} LMAIL by{" "}
          <a className="text-ink underline-offset-4 hover:underline" href={site.studioUrl}>Laib Studios</a>
        </p>
      </div>
    </footer>
  );
}
