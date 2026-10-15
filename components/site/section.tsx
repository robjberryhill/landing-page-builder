import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones = {
  cream: "bg-background text-foreground",
  white: "bg-card text-card-foreground",
  espresso: "bg-espresso text-cream [--ring:var(--cream)]",
  gold: "bg-gold text-espresso",
} as const;

export type SectionProps = {
  id?: string;
  tone?: keyof typeof tones;
  className?: string;
  children: ReactNode;
};

/**
 * The full-width band every landing page section sits in: a background and
 * text colour from the `tones` map, the vertical padding, and a centred
 * container that carries the side padding, so sections never set their own.
 * Used by every file in `components/sections/` (hero, features, stats,
 * pricing, FAQ, closing call to action) and by the placeholder page until
 * Phase 4. `className` is merged onto the `<section>`; a grid or a narrower
 * column goes on a child element inside the container. To change the vertical
 * padding, pass both breakpoints (`py-8 sm:py-12`): `cn` replaces `py-16` and
 * keeps `sm:py-24` otherwise.
 */
export function Section({ id, tone = "cream", className, children }: SectionProps) {
  return (
    <section id={id} className={cn("py-16 sm:py-24", tones[tone], className)}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}
