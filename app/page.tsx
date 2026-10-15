import { Section } from "@/components/site/section";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <Section>
      <h1 className="text-5xl font-semibold tracking-tight">Authentic Coffee</h1>
      <p>Roasted on Tuesdays. Shipped the same day.</p>
      <a href="#" className={buttonVariants({ size: "lg" })}>
        Order beans
      </a>
    </Section>
  );
}
