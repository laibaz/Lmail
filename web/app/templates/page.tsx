import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { TemplateWall } from "@/components/TemplateWall";
import { CtaBand } from "@/components/Cta";

export const metadata: Metadata = { title: "Email templates | LMAIL", description: "Ready-made email designs for welcomes, newsletters, sales and launches." };

export default function Page() {
  return (
    <>
      <PageHeader title="Email templates, ready to send." lead="Ten complete emails for four different businesses, each shown in full. The businesses are made up; the emails are real and ready to adapt." />
      <TemplateWall />
      <CtaBand />
    </>
  );
}
