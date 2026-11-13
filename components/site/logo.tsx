import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export type LogoProps = { className?: string };

/**
 * The site name as a link home: the cup-ring mark (two concentric circles and
 * a handle) beside the wordmark, both drawn in `currentColor`, so the header
 * shows it in espresso and the footer, which passes `className="text-cream"`,
 * in cream. Used by `SiteHeader` and `SiteFooter`. The mark is decorative;
 * the link's accessible name is the site name followed by "home". It is a
 * plain `<a href="/#top">` and not a `Link`: a `Link` to the address the
 * visitor is already on does not scroll, so `Link` to `/` did nothing on this
 * one-page site and `Link` to `/#top` worked once and then stopped. A plain
 * anchor scrolls to the top on every click, and from any other address, such
 * as the 404 page, it loads the home page. Browsers treat `#top` as the top
 * of the page, so no element needs that id.
 */
export function Logo({ className }: LogoProps) {
  return (
    // A plain anchor on purpose; see the JSDoc. The rule ignores the fragment.
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a
      href="/#top"
      aria-label={`${siteConfig.name}, home`}
      className={cn("inline-flex items-center gap-2 font-semibold tracking-tight", className)}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        aria-hidden="true"
        className="size-6"
      >
        <circle cx="11" cy="12" r="8" />
        <circle cx="11" cy="12" r="4" />
        <path d="M19 9a3 3 0 0 1 0 6" />
      </svg>
      <span>{siteConfig.name}</span>
    </a>
  );
}
