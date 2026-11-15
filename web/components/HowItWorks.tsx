import { PaperPlaneTilt, PencilSimpleLine, UsersThree } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";

const steps = [
  { icon: UsersThree, title: "Bring your contacts", body: "Import a spreadsheet or connect a signup form. LMAIL sorts people into segments for you." },
  { icon: PencilSimpleLine, title: "Write the email", body: "Start from a design, describe what you want to say, and edit the draft until it sounds like you." },
  { icon: PaperPlaneTilt, title: "Send and measure", body: "Send now or schedule it. Watch opens and clicks come in and see what to do next." },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-page px-5 pb-20 md:px-8 md:pb-28">
      <ol>
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06}>
            <li className="grid gap-3 border-t border-line py-8 md:grid-cols-[auto_1fr_1fr] md:items-center md:gap-10">
              <s.icon size={32} weight="duotone" className="text-purple" />
              <h3 className="text-2xl font-medium tracking-tight md:text-3xl">{s.title}</h3>
              <p className="max-w-[48ch] text-muted">{s.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
