import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Demo } from "@/components/Demo";

export const metadata: Metadata = { title: "Get a demo | LMAIL", description: "Book a short call to see LMAIL in action." };

export default function Page() {
  return (
    <>
      <PageHeader title="See LMAIL in action." lead="Pick a time for a short call. Bring your questions." />
      <Demo />
    </>
  );
}
