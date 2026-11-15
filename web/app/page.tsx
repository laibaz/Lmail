import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Features } from "@/components/Features";
import { AiDemo } from "@/components/AiDemo";
import { HowItWorks } from "@/components/HowItWorks";
import { Audience } from "@/components/Audience";
import { Faq } from "@/components/Faq";
import { Cta, Footer } from "@/components/Cta";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Features />
        <AiDemo />
        <HowItWorks />
        <Audience />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
