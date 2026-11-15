import { Hero } from "@/components/Hero";
import { Showcase } from "@/components/Showcase";
import { Explore } from "@/components/Explore";
import { Founder } from "@/components/Founder";
import { CtaBand } from "@/components/Cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Showcase />
      <Explore />
      <Founder />
      <CtaBand />
    </>
  );
}
