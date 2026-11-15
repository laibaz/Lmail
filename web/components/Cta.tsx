import { Logo } from "./Logo";
import { site } from "./site";

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
