import { hasText } from "@/lib/text";

export type StatProps = {
  value: string;
  label: string;
};

/**
 * One number with the line that explains it: the value at a display size and
 * the label beneath it at 80% opacity. Used four times by the stats section
 * in `components/sections/stats.tsx`. The block sets no colour, so it takes
 * the text colour of the `Section` it sits in (cream on the espresso band),
 * and the label dims with it, as the description in `SectionHeading` does. A
 * blank `value` or `label` leaves out its line, and with both blank the block
 * renders nothing. A word too long for the column wraps instead of
 * overflowing.
 */
export function Stat({ value, label }: StatProps) {
  const hasValue = hasText(value);
  const hasLabel = hasText(label);
  if (!hasValue && !hasLabel) return null;

  return (
    <div className="min-w-0 wrap-anywhere">
      {hasValue ? (
        <p className="text-4xl font-semibold tracking-tight sm:text-5xl">{value}</p>
      ) : null}
      {hasLabel ? <p className={hasValue ? "mt-2 opacity-80" : "opacity-80"}>{label}</p> : null}
    </div>
  );
}
