import { cn } from "@/lib/utils";

export type SectionHeadingProps = {
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

/**
 * The title and optional one-line description that open a landing page
 * section: an `h2` at the section title size, with the description beneath it
 * at 80% opacity so it follows whatever text colour the `Section` tone set
 * (graphite `text-muted-foreground` would vanish on the espresso band). Used
 * by the features, stats, pricing and FAQ sections in `components/sections/`;
 * the hero and the closing call to action write their own headings. The
 * heading is always an `h2`, because section titles sit directly under the
 * hero's `h1`. `align="center"` centres the block and its text; `className`
 * is merged last onto the wrapper, for a margin or a different max width. A
 * blank `title` renders nothing, description included, so a section never
 * ships an empty heading; a blank `description` leaves out the paragraph.
 */
export function SectionHeading({
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  if (!title.trim()) return null;

  return (
    <div className={cn("max-w-2xl break-words", align === "center" && "mx-auto text-center", className)}>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-lg opacity-80">{description}</p> : null}
    </div>
  );
}
