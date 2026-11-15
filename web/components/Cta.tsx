import { Mascot } from "./Mascot";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";
import { site } from "./site";

export function Cta() {
  return (
    <section className="relative overflow-hidden px-5 pb-24">
      <Reveal>
        <div className="glass relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] px-8 py-16 text-center sm:py-20">
          <div aria-hidden className="absolute left-1/2 top-0 h-72 w-[700px] -translate-x-1/2 rounded-full bg-violet/40 blur-[120px]" />
          <div className="relative mx-auto w-28 animate-float sm:w-36"><Mascot /></div>
          <h2 className="relative mx-auto mt-6 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-6xl">
            Ready to send <span className="text-gradient">smarter?</span>
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-haze">See LMAIL in action. A 20-minute call, your questions, no pressure.</p>
          <a href={site.demoUrl} className="btn-lime relative mt-8">Book a demo <span aria-hidden>→</span></a>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-5 py-10 text-sm text-haze sm:flex-row">
        <Logo />
        <p>
          © {new Date().getFullYear()} LMAIL by{" "}
          <a className="text-mist underline-offset-4 hover:underline" href={site.studioUrl}>Laib Studios</a>
        </p>
        <div className="flex gap-6">
          <a className="hover:text-white" href="#features">Features</a>
          <a className="hover:text-white" href="#faq">FAQ</a>
          <a className="hover:text-white" href={site.demoUrl}>Contact</a>
        </div>
      </div>
    </footer>
  );
}
