import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { Stat } from "@/components/site/stat";

const stats = [
  { value: "48 hours", label: "roaster to porch, on average" },
  { value: "6", label: "farms, the same ones every year" },
  { value: "11 years", label: "in the same brick building" },
  { value: "1", label: "roast day a week. It is Tuesday." },
];

/**
 * The "Numbers" section: a heading and four stats on the espresso band, the
 * page's first dark section. The stats sit in one column on phones, two from
 * `sm` up and four from `lg` up; four start at `lg` because "48 hours" does
 * not fit a four-column cell below it. Rendered third in `app/page.tsx`,
 * after the features section, and the target of the "Numbers" nav link
 * (`#numbers` in `content/site.ts`). The copy lives in the `stats` array
 * above; add a stat by adding an object to it.
 */
export default function Stats() {
  return (
    <Section id="numbers" tone="espresso">
      <SectionHeading
        title="A few honest numbers."
        description="Rounded where rounding was kind to us."
      />
      <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Stat key={stat.label} {...stat} />
        ))}
      </div>
    </Section>
  );
}
