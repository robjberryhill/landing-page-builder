import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { hasText } from "@/lib/text";
import { cn } from "@/lib/utils";

export type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  variant?: "card" | "inline";
};

/**
 * One feature: an icon, an `h3` title and a sentence or two of description.
 * `variant="card"` (the default) is a bordered white card with the icon in a
 * tinted tile, used four times in the features section. `variant="inline"` is
 * the icon beside the text with no box, used under the pricing tiers for
 * "Every plan includes". Both are in `components/sections/`. The icon is a
 * `lucide-react` component passed as a prop and is hidden from screen readers,
 * because the title already names the feature. The card overrides the
 * generated `Card`'s ring, radius and padding through `className`, so
 * `components/ui/card.tsx` stays as generated. A blank title or description is
 * left out, and with both blank the block renders nothing.
 */
export function FeatureCard({
  icon: Icon,
  title,
  description,
  variant = "card",
}: FeatureCardProps) {
  const showTitle = hasText(title);
  const showDescription = hasText(description);
  if (!showTitle && !showDescription) return null;

  if (variant === "inline") {
    return (
      <div className="flex gap-3">
        <Icon aria-hidden className="mt-1 size-5 shrink-0" />
        <div className="min-w-0 wrap-anywhere">
          {showTitle ? <h3 className="font-semibold">{title}</h3> : null}
          {showDescription ? <p className="text-muted-foreground">{description}</p> : null}
        </div>
      </div>
    );
  }

  return (
    <Card
      className={cn(
        "rounded-lg border border-line ring-0",
        "gap-2 wrap-anywhere [--card-spacing:--spacing(6)]",
      )}
    >
      <CardHeader className="gap-4">
        <div className="flex size-10 items-center justify-center rounded-md bg-accent">
          <Icon aria-hidden className="size-5 text-accent-foreground" />
        </div>
        {showTitle ? (
          <CardTitle className="text-xl font-semibold">
            <h3>{title}</h3>
          </CardTitle>
        ) : null}
      </CardHeader>
      {showDescription ? (
        <CardContent>
          <p className="text-base text-muted-foreground">{description}</p>
        </CardContent>
      ) : null}
    </Card>
  );
}
