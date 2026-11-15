import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { HowItWorks } from "@/components/HowItWorks";
import { Inbox } from "@/components/Inbox";
import { CtaBand } from "@/components/Cta";

export const metadata: Metadata = { title: "How it works | LMAIL", description: "Bring your contacts, write the email, send and measure." };

export default function Page() {
  return (
    <>
      <PageHeader title="Sending in three moves." lead="From a list of contacts to an email in their inbox. We set up your account and sending domain with you." />
      <HowItWorks />
      <Inbox />
      <div className="h-20 md:h-28" />
      <CtaBand />
    </>
  );
}
