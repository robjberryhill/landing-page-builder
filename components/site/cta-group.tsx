import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CtaLink = { label: string; href: string };

export type CtaGroupProps = {
  primary: CtaLink;
  secondary?: CtaLink;
  align?: "left" | "center";
};

/** A link needs both a label to read and somewhere to go. */
function isUsable(link: CtaLink | undefined): link is CtaLink {
  return Boolean(link?.label.trim() && link.href.trim());
}

/**
 * The pair of links styled as buttons that ends the hero and the closing call
 * to action in `components/sections/`: a primary link in the default button
 * style and an optional secondary link in the outline style. Both are `<a>`
 * elements with `buttonVariants`, because they navigate rather than act. The
 * links stack at full width on phones and sit side by side from `sm` up, where
 * `align="center"` centres the pair. There is no `className`; a caller that
 * needs a margin wraps the group. A link with a blank label or a blank href is
 * left out, so the group never renders a button with no name or no target, and
 * with no usable link it renders nothing.
 */
export function CtaGroup({ primary, secondary, align = "left" }: CtaGroupProps) {
  const showPrimary = isUsable(primary);
  const showSecondary = isUsable(secondary);
  if (!showPrimary && !showSecondary) return null;

  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row", align === "center" && "justify-center")}>
      {showPrimary ? (
        <a href={primary.href} className={cn(buttonVariants({ size: "lg" }))}>
          {primary.label}
        </a>
      ) : null}
      {showSecondary ? (
        <a href={secondary.href} className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>
          {secondary.label}
        </a>
      ) : null}
    </div>
  );
}
