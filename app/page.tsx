import ClosingCta from "@/components/sections/closing-cta";
import Faq from "@/components/sections/faq";
import Features from "@/components/sections/features";
import Hero from "@/components/sections/hero";
import Pricing from "@/components/sections/pricing";
import Stats from "@/components/sections/stats";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Stats />
      <Pricing />
      <Faq />
      <ClosingCta />
    </>
  );
}
