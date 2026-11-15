import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { TemplatesGrid } from "@/components/TemplatesGrid";
import { CtaBand } from "@/components/Cta";

export const metadata: Metadata = { title: "Email templates | LMAIL", description: "Ready-made email designs for welcomes, newsletters, sales and launches." };

export default function Page() {
  return (
    <>
      <PageHeader title="Email templates, ready to send." lead="Four campaign designs you can make your own. They are shown here with Solenne, a made-up skincare brand." />
      <TemplatesGrid />
      <CtaBand />
    </>
  );
}
