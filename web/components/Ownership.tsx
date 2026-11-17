import { Check, Key, ShieldCheck, UsersThree, X } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";

const points = [
  { icon: Key, title: "The system is yours", body: "Set up as your own platform, on your own sending account." },
  { icon: ShieldCheck, title: "The reputation is yours", body: "You send from your own domain, so inbox placement depends on you." },
  { icon: UsersThree, title: "No charge per contact", body: "Keep as many contacts as you like. Pay for the emails you send." },
];

const rows: [string, string, string][] = [
  ["Who owns the system", "The provider", "You"],
  ["What the price is based on", "Usually your contact count", "The emails you send"],
  ["Sending reputation", "Often shared with other senders", "Your own domain"],
  ["Your contacts and history", "Kept on their platform", "Kept on yours"],
];

// Home: the core promise, as the one full-colour band on the page, followed by a plain comparison.
export function Ownership() {
  return (
    <>
      <section className="bg-brand text-white">
        <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-20">
          <Reveal>
            <h2 className="max-w-[14ch] text-4xl font-normal leading-[1.05] tracking-tight md:text-6xl">Stop renting your email. Own it.</h2>
          </Reveal>
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {points.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <li className="border-t border-white/30 pt-6">
                  <p.icon size={28} weight="duotone" />
                  <h3 className="mt-4 text-xl font-medium tracking-tight">{p.title}</h3>
                  <p className="mt-2 max-w-[34ch] text-white/85">{p.body}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-page px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <h2 className="h-section max-w-[18ch]">Renting a platform, compared with owning one.</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left">
              <thead>
                <tr className="text-sm text-muted">
                  <th scope="col" className="w-[34%] pb-4 font-medium"><span className="sr-only">Topic</span></th>
                  <th scope="col" className="w-[33%] pb-4 pl-6 font-medium">A rented platform</th>
                  <th scope="col" className="w-[33%] rounded-t-2xl bg-pink-tint px-6 pb-4 pt-5 text-base font-semibold text-ink">LMAIL</th>
                </tr>
              </thead>
              <tbody className="text-[17px]">
                {rows.map(([topic, rented, ours], i) => (
                  <tr key={topic}>
                    <th scope="row" className="border-t border-line py-5 pr-4 font-medium">{topic}</th>
                    <td className="border-t border-line py-5 pl-6 text-muted">
                      <span className="flex items-center gap-2.5"><X size={16} weight="bold" className="shrink-0 text-muted/70" />{rented}</span>
                    </td>
                    <td className={`border-t border-white bg-pink-tint px-6 py-5 font-medium ${i === rows.length - 1 ? "rounded-b-2xl" : ""}`}>
                      <span className="flex items-center gap-2.5"><Check size={18} weight="bold" className="shrink-0 text-purple" />{ours}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>
    </>
  );
}
