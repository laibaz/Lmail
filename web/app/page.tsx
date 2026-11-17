import { Hero } from "@/components/Hero";
import { Ownership } from "@/components/Ownership";
import { Gallery } from "@/components/Gallery";
import { Explore } from "@/components/Explore";
import { Founder } from "@/components/Founder";
import { CtaBand } from "@/components/Cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Gallery />
      <Ownership />
      <Explore />
      <Founder />
      <CtaBand />
    </>
  );
}
