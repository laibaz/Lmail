import { EnvelopeSimple, ShieldCheck, Sparkle } from "@phosphor-icons/react/dist/ssr";

const points = [
  { icon: Sparkle, text: "Drafts written with AI" },
  { icon: ShieldCheck, text: "Your own sending domain" },
  { icon: EnvelopeSimple, text: "Contacts, emails and results together" },
];

// The one full-width brand moment on the page.
export function Band() {
  return (
    <section className="bg-brand text-white">
      <ul className="mx-auto grid max-w-page gap-5 px-5 py-9 md:grid-cols-3 md:px-8">
        {points.map((p) => (
          <li key={p.text} className="flex items-center gap-3 text-lg">
            <p.icon size={24} weight="duotone" className="shrink-0" />
            {p.text}
          </li>
        ))}
      </ul>
    </section>
  );
}
