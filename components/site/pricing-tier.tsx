import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { hasText } from "@/lib/text";
import { cn } from "@/lib/utils";

export type PricingTierProps = {
  name: string;
  price: string;
  cadence?: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  highlighted?: boolean;
  badge?: string;
};

/**
 * One way to buy, as a white card: an optional badge, the tier's name as an
 * `h3`, the price with an optional cadence ("per month"), a one-line
 * description, a checked list of what is included and a full-width link.
 * Used three times by the pricing section in
 * `components/sections/pricing.tsx`. `highlighted` gives the card a gold
 * border and a solid button; the other tiers get the `line` border and an
 * outline button. The card overrides the generated `Card`'s ring, radius and
 * padding and the generated footer's tint and rule through `className`, so
 * `components/ui/card.tsx` stays as generated. The footer is pushed to the
 * bottom, so the buttons of tiers in one row line up whatever the length of
 * their lists. A blank string leaves out its line, a blank feature leaves out
 * its list item, the link needs both a label and an `href`, and with nothing
 * to show the block renders nothing. The check icons are hidden from screen
 * readers; the list itself announces the items.
 */
export function PricingTier({
  name,
  price,
  cadence,
  description,
  features,
  ctaLabel,
  ctaHref,
  highlighted = false,
  badge,
}: PricingTierProps) {
  const hasBadge = hasText(badge);
  const hasName = hasText(name);
  const hasPrice = hasText(price);
  const hasDescription = hasText(description);
  const hasHeader = hasBadge || hasName || hasPrice || hasDescription;
  const listed = features.filter((feature) => hasText(feature));
  const hasCta = hasText(ctaLabel) && hasText(ctaHref);
  if (!hasHeader && listed.length === 0 && !hasCta) return null;

  return (
    <Card
      className={cn(
        "rounded-lg border border-line ring-0",
        "h-full text-base wrap-anywhere [--card-spacing:--spacing(6)]",
        highlighted && "border-gold",
      )}
    >
      {hasHeader ? (
        <CardHeader className="gap-3">
          {hasBadge ? <Badge className="bg-butter text-espresso">{badge}</Badge> : null}
          {hasName ? (
            <CardTitle className="text-xl font-semibold">
              <h3>{name}</h3>
            </CardTitle>
          ) : null}
          {hasPrice ? (
            <p>
              <span className="text-4xl font-semibold tracking-tight">{price}</span>
              {hasText(cadence) ? (
                <>
                  {" "}
                  <span className="text-muted-foreground">{cadence}</span>
                </>
              ) : null}
            </p>
          ) : null}
          {hasDescription ? <p className="text-muted-foreground">{description}</p> : null}
        </CardHeader>
      ) : null}
      {listed.length > 0 ? (
        <CardContent>
          <ul className="space-y-2">
            {listed.map((feature) => (
              <li key={feature} className="flex gap-2">
                <Check aria-hidden className="mt-1 size-4 shrink-0" />
                <span className="min-w-0">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      ) : null}
      {hasCta ? (
        <CardFooter className="mt-auto border-t-0 bg-transparent pt-0">
          <a
            href={ctaHref}
            className={cn(
              buttonVariants({ variant: highlighted ? "default" : "outline" }),
              "w-full",
            )}
          >
            {ctaLabel}
          </a>
        </CardFooter>
      ) : null}
    </Card>
  );
}
