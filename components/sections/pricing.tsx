import { CalendarCheck, Mail, RefreshCw } from "lucide-react";
import { FeatureCard } from "@/components/site/feature-card";
import { PricingTier, type PricingTierProps } from "@/components/site/pricing-tier";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";

const tiers: PricingTierProps[] = [
  {
    name: "One bag",
    price: "$18",
    description: "A single 12 oz bag, roasted this week.",
    features: ["Pick any origin", "Ships Tuesday", "No account needed"],
    ctaLabel: "Buy one bag",
    ctaHref: "#faq",
  },
  {
    name: "The Regular",
    price: "$32",
    cadence: "per month",
    highlighted: true,
    badge: "Most people pick this",
    description: "Two bags a month, chosen by Dana or by you.",
    features: [
      "Two 12 oz bags",
      "Skip or swap any month",
      "First dibs on rare lots",
      "Free shipping",
    ],
    ctaLabel: "Start the subscription",
    ctaHref: "#faq",
  },
  {
    name: "The Household",
    price: "$58",
    cadence: "per month",
    description: "Four bags. For big houses, small offices, or one very committed person.",
    features: [
      "Four 12 oz bags",
      "Whole bean or ground",
      "Free shipping",
      "A mug, once, as a thank you",
    ],
    ctaLabel: "Feed the household",
    ctaHref: "#faq",
  },
];

const included = [
  {
    icon: CalendarCheck,
    title: "Roast date on every bag",
    description: "Printed, not stickered. You can tell.",
  },
  {
    icon: RefreshCw,
    title: "Replacement if it arrives stale",
    description: "Email a photo of the label. New bag goes out Tuesday.",
  },
  {
    icon: Mail,
    title: "A human on email",
    description: "Usually Dana. Occasionally Dana's brother, who is also fine.",
  },
];

/**
 * The "Pricing" section: a centred heading, three tiers and, under them, the
 * three things every plan includes. The tiers stack below `lg` and sit three
 * across from `lg` up; the included items stack below `sm` and sit three
 * across from `sm` up. Rendered fourth in `app/page.tsx`, after the stats
 * band. Its `id` is the target of the "Pricing" nav link and of every "Order
 * beans" link (`siteConfig.cta` in `content/site.ts`). The tier links go to
 * `#faq`, because there is no shop and the FAQ explains ordering. To change a
 * price, a feature or a button, edit the `tiers` array at the top of this
 * file; the `included` array holds the items under "Every plan includes".
 */
export default function Pricing() {
  return (
    <Section id="pricing" tone="cream">
      <SectionHeading
        align="center"
        title="Three ways to buy. All of them are fine."
        description="Every option ships flat-rate. Cancel the subscription whenever you like. We will not send a sad email."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {tiers.map((tier) => (
          <PricingTier key={tier.name} {...tier} />
        ))}
      </div>
      <h3 className="mt-16 text-xl font-semibold">Every plan includes</h3>
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        {included.map((item) => (
          <FeatureCard key={item.title} variant="inline" {...item} />
        ))}
      </div>
    </Section>
  );
}
