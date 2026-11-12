import { BagLabel } from "@/components/site/bag-label";
import { CtaGroup } from "@/components/site/cta-group";
import { Section } from "@/components/site/section";
import { siteConfig } from "@/content/site";

/**
 * The first section of the landing page and the home of its only `h1`: the
 * headline, a lead paragraph, the two calls to action and a line of small
 * print on the left, and this week's `BagLabel` on the right. The columns sit
 * side by side from `lg` up and stack below it, text first. Rendered first in
 * `app/page.tsx`. The primary link is `siteConfig.cta`, shared with the
 * header; the rest of the copy lives in this file.
 */
export default function Hero() {
  return (
    <Section tone="cream">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <h1
            className="text-5xl font-semibold tracking-tight leading-[0.95] sm:text-6xl lg:text-7xl"
          >
            Coffee that tastes like someone was paying attention.
          </h1>
          <p className="mt-6 max-w-prose text-lg sm:text-xl">
            We buy from six farms we can name, roast in small batches on Tuesdays, and ship the
            same day. Nothing sits on a shelf getting philosophical.
          </p>
          <div className="mt-8">
            <CtaGroup
              primary={siteConfig.cta}
              secondary={{ label: "See how we roast", href: "#why-us" }}
            />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Roasted this week. Flat-rate shipping. No subscription required, though we do have one.
          </p>
        </div>
        <BagLabel
          title="This week's bag"
          origin="Huila, Colombia"
          producer="Finca La Esperanza"
          process="Washed"
          elevation="1,750 m"
          roastLevel={3}
          notes="Red apple, caramel, the good kind of quiet."
          roastedOn="Tuesday"
        />
      </div>
    </Section>
  );
}
