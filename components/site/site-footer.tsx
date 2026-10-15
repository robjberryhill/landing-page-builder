import { Logo } from "@/components/site/logo";
import { NavLinks } from "@/components/site/nav-links";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/content/site";

const footerLinks = [
  ...siteConfig.nav,
  { label: "Email us", href: `mailto:${siteConfig.email}` },
];

/**
 * The site footer: the logo in cream on an ink band, the one-line story,
 * the nav links plus an email link under a "Footer" landmark, a separator
 * and the copyright line. Takes no props and reads `siteConfig`. Used once,
 * in `app/layout.tsx`, below `<main>`; `[--ring:var(--cream)]` turns every
 * focus outline inside it cream, since the espresso default would vanish
 * on ink. The year is a literal: reading the clock in a Server Component fails
 * the build under Cache Components.
 */
export function SiteFooter() {
  return (
    <footer className="bg-ink text-cream [--ring:var(--cream)]">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8">
        <Logo className="text-cream" />
        <p className="mt-4 max-w-prose">
          Roasted in a brick building in Grand Rapids, Michigan, since 2015.
        </p>
        <nav aria-label="Footer" className="mt-8">
          <NavLinks items={footerLinks} orientation="row" />
        </nav>
        <Separator className="my-8 bg-cream/20" />
        <p className="text-sm">
          © 2026 {siteConfig.name}. Made with beans, patience, and a website builder.
        </p>
      </div>
    </footer>
  );
}
