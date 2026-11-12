import { Flame, MapPin, Package, PenLine } from "lucide-react";
import { FeatureCard } from "@/components/site/feature-card";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";

const features = [
  {
    icon: Flame,
    title: "Roasted on Tuesdays",
    description:
      "Every bag is roasted the week it ships. If the label says Tuesday, it was Tuesday.",
  },
  {
    icon: MapPin,
    title: "Six farms, first-name basis",
    description:
      "We buy from the same growers every year and pay above the fair-trade floor. We visit. We text. They send photos of their dogs.",
  },
  {
    icon: PenLine,
    title: "Tasting notes written by a person",
    description:
      'No algorithm says "hints of stone fruit." A human named Dana does, after her third cup.',
  },
  {
    icon: Package,
    title: "Shipped flat, never flat-tasting",
    description:
      "Four dollars to ship anywhere in the country. Bags are nitrogen flushed and one-way valved, so day nine tastes like day two.",
  },
];

/**
 * The "Why us" section: a heading and four feature cards in a two-by-two grid
 * from `md` up, one column below. Rendered second in `app/page.tsx`, after the
 * hero. Its `id` is the target of the "Why us" nav link in `content/site.ts`
 * and of the hero's "See how we roast" link. To add, remove or reword a
 * feature, edit the `features` array at the top of this file; icons come from
 * `lucide-react`.
 */
export default function Features() {
  return (
    <Section id="why-us" tone="white">
      <SectionHeading
        title="What we do differently. It is not complicated."
        description="Most coffee is roasted far away, far in advance, by nobody in particular. Ours is not."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </Section>
  );
}
