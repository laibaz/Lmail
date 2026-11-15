import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { TemplatesGrid } from "@/components/TemplatesGrid";
import { CtaBand } from "@/components/Cta";

export const metadata: Metadata = { title: "Email templates | LMAIL", description: "Ready-made email designs for welcomes, newsletters, sales and launches." };

export default function Page() {
  return (
    <>
      <PageHeader title="Email templates, ready to send." lead="Four starting points for the emails most businesses send. Change the words and colours, then send. The brands shown are examples." />
      <TemplatesGrid />
      <CtaBand />
    </>
  );
}
