import { Key, ShieldCheck, UsersThree } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";

const points = [
  { icon: Key, title: "The system is yours", body: "LMAIL is set up as your own platform, on your own sending account. You are not renting a seat in someone else's." },
  { icon: ShieldCheck, title: "The reputation is yours", body: "You send from your own domain. Your inbox placement depends on your sending, not on thousands of strangers sharing the same service." },
  { icon: UsersThree, title: "No charge per contact", body: "Keep as many contacts as you like. You pay for the emails you send, not for the size of your list." },
];

// Home: the core promise. Why owning your email system beats renting one.
export function Ownership() {
  return (
    <section className="mx-auto grid max-w-page gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
      <Reveal>
        <h2 className="h-section max-w-[13ch] lg:sticky lg:top-28">Stop renting your email. Own it.</h2>
      </Reveal>
      <ul>
        {points.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <li className={`flex gap-5 py-8 ${i > 0 ? "border-t border-line" : "pt-0"}`}>
              <p.icon size={30} weight="duotone" className="mt-1 shrink-0 text-purple" />
              <div>
                <h3 className="text-2xl font-medium tracking-tight">{p.title}</h3>
                <p className="mt-2 max-w-[52ch] text-lg leading-relaxed text-muted">{p.body}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
