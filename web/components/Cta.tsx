import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";
import { site } from "./site";

export function Cta() {
  return (
    <section className="mx-auto max-w-page px-5 pb-20 md:px-8 md:pb-28">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-8 rounded-2xl bg-ink p-8 text-white md:flex-row md:items-end md:p-14">
          <div>
            <h2 className="text-4xl font-normal leading-[1.05] tracking-tight md:text-6xl">See LMAIL in action.</h2>
            <p className="mt-4 max-w-[44ch] text-lg text-white/75">A 20-minute call with your questions. No pressure.</p>
          </div>
          <a href={site.demoUrl} className="btn bg-white text-ink hover:bg-pink-tint">Get a demo <ArrowRight size={18} weight="bold" /></a>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-page flex-col items-start justify-between gap-5 px-5 py-10 text-sm text-muted sm:flex-row sm:items-center md:px-8">
        <Logo />
        <p>
          © {new Date().getFullYear()} LMAIL by{" "}
          <a className="text-ink underline-offset-4 hover:underline" href={site.studioUrl}>Laib Studios</a>
        </p>
        <div className="flex gap-6">
          <a className="hover:text-ink" href="#features">Features</a>
          <a className="hover:text-ink" href="#faq">FAQ</a>
          <a className="hover:text-ink" href={site.loginUrl}>Log in</a>
        </div>
      </div>
    </footer>
  );
}
