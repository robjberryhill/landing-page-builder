import { BagLabel } from "@/components/site/bag-label";
import { CtaGroup } from "@/components/site/cta-group";
import { Section } from "@/components/site/section";
import { siteConfig } from "@/content/site";

/**
 * The closing call to action: the page's last section, a gold band above the
 * footer with a headline, a lead paragraph and two links on the left and next
 * week's `BagLabel` on the right. The columns sit side by side from `lg` up
 * and stack below it, text first, the same grid as the hero. Rendered sixth
 * in `app/page.tsx`. It has no `id`, because nothing links to it, and it
 * writes its own `h2`, larger than a section title, so it does not use
 * `SectionHeading`. The primary link is `siteConfig.cta`, shared with the
 * header and the hero; "Read the FAQ" goes back up to the FAQ section. Text
 * on gold is espresso; there is no small print here, because graphite is not
 * for gold.
 */
export default function ClosingCta() {
  return (
    <Section tone="gold">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Tuesday is coming.</h2>
          <p className="mt-6 max-w-prose text-lg sm:text-xl">
            Order by Monday at noon and it is roasted Tuesday and on your porch by Thursday.
            Probably Wednesday. We are not allowed to promise Wednesday.
          </p>
          <div className="mt-8">
            <CtaGroup
              primary={siteConfig.cta}
              secondary={{ label: "Read the FAQ", href: "#faq" }}
            />
          </div>
        </div>
        <BagLabel
          title="Next week's bag"
          origin="Sidama, Ethiopia"
          producer="Bombe washing station"
          process="Natural"
          elevation="2,100 m"
          roastLevel={2}
          notes="Blueberry, honey, a little drama."
          roastedOn="next Tuesday"
        />
      </div>
    </Section>
  );
}
