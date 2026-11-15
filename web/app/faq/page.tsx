import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/Cta";

export const metadata: Metadata = { title: "FAQ | LMAIL", description: "Answers about LMAIL: pricing, setup, deliverability and the AI writer." };

export default function Page() {
  return (
    <>
      <PageHeader title="Questions, answered." lead="If yours is not here, book a demo and ask us directly." />
      <Faq />
      <CtaBand />
    </>
  );
}
