import { Logo } from "@/components/site/logo";
import { MobileNav } from "@/components/site/mobile-nav";
import { NavLinks } from "@/components/site/nav-links";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The sticky site header: the logo, the main navigation and the "Order
 * beans" link at `md` and up; the logo and the menu button below it. Reads
 * everything from `siteConfig` and takes no props. Used once, in
 * `app/layout.tsx`, above `<main>`; the 5rem `scroll-padding-top` on `html`
 * keeps hash targets clear of its 4rem height.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo />
        <nav aria-label="Main" className="hidden md:block">
          <NavLinks items={siteConfig.nav} />
        </nav>
        <a
          href={siteConfig.cta.href}
          className={cn(buttonVariants({ size: "sm" }), "hidden md:inline-flex")}
        >
          {siteConfig.cta.label}
        </a>
        <MobileNav items={siteConfig.nav} />
      </div>
    </header>
  );
}
