import { Hero } from "@/components/Hero";
import { Ownership } from "@/components/Ownership";
import { Showcase } from "@/components/Showcase";
import { Explore } from "@/components/Explore";
import { Founder } from "@/components/Founder";
import { CtaBand } from "@/components/Cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Ownership />
      <Showcase />
      <Explore />
      <Founder />
      <CtaBand />
    </>
  );
}
