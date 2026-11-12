import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type BagLabelProps = {
  title: string;
  origin: string;
  producer: string;
  process: string;
  elevation: string;
  roastLevel: 1 | 2 | 3 | 4 | 5;
  notes: string;
  roastedOn: string;
};

const ROAST_DOTS = [1, 2, 3, 4, 5] as const;

/**
 * A coffee bag label drawn with type, rules and roast dots: the bag's name and
 * roast day, a description list of where the coffee comes from, a five-dot
 * roast scale and the tasting notes. It is the page's one decorative element
 * and stands in for a product photo. Used by the hero (this week's bag) and
 * the closing call to action (next week's bag) in `components/sections/`. The
 * label sets its own white background and espresso text, so it looks the same
 * on the cream and gold bands. The dots are one image named "Roast level N of
 * 5" for screen readers. A blank string leaves out its line (the title, the
 * badge, a detail row or the notes), so the label never shows a term with no
 * value.
 */
export function BagLabel({
  title,
  origin,
  producer,
  process,
  elevation,
  roastLevel,
  notes,
  roastedOn,
}: BagLabelProps) {
  const rows = [
    { term: "Origin", detail: origin },
    { term: "Producer", detail: producer },
    { term: "Process", detail: process },
    { term: "Elevation", detail: elevation },
  ].filter((row) => Boolean(row.detail.trim()));
  const hasTitle = Boolean(title.trim());
  const hasRoastedOn = Boolean(roastedOn.trim());
  const hasNotes = Boolean(notes.trim());

  return (
    <div className="rounded-md border border-espresso bg-card p-6 text-card-foreground">
      {hasTitle || hasRoastedOn ? (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          {hasTitle ? <p className="font-semibold">{title}</p> : null}
          {hasRoastedOn ? <Badge variant="outline">Roasted {roastedOn}</Badge> : null}
        </div>
      ) : null}
      <dl className="divide-y divide-line">
        {rows.map((row) => (
          <div key={row.term} className="flex justify-between gap-4 py-2">
            <dt className="text-muted-foreground">{row.term}</dt>
            <dd className="text-right font-medium">{row.detail}</dd>
          </div>
        ))}
        <div className="flex items-center justify-between gap-4 py-2">
          <dt className="text-muted-foreground">Roast</dt>
          <dd>
            <div role="img" aria-label={`Roast level ${roastLevel} of 5`} className="flex gap-1.5">
              {ROAST_DOTS.map((dot) => (
                <span
                  key={dot}
                  className={cn(
                    "size-2.5 rounded-full",
                    dot <= roastLevel ? "bg-espresso" : "bg-line",
                  )}
                />
              ))}
            </div>
          </dd>
        </div>
      </dl>
      {hasNotes ? <p className="mt-4 text-lg">{notes}</p> : null}
    </div>
  );
}
