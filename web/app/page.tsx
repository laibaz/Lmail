import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Band } from "@/components/Band";
import { Features } from "@/components/Features";
import { AiWriter } from "@/components/AiWriter";
import { HowItWorks } from "@/components/HowItWorks";
import { Inbox } from "@/components/Inbox";
import { Faq } from "@/components/Faq";
import { Cta, Footer } from "@/components/Cta";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Band />
        <Features />
        <AiWriter />
        <HowItWorks />
        <Inbox />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
