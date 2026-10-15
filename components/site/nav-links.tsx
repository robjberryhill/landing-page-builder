const orientations = {
  row: "flex flex-wrap gap-6 text-sm font-medium",
  column: "flex flex-col gap-4 text-lg",
} as const;

export type NavItem = { label: string; href: string };

export type NavLinksProps = {
  items: readonly NavItem[];
  orientation?: keyof typeof orientations;
  onNavigate?: () => void;
};

/**
 * The list of site navigation links, one `<a>` per item from
 * `content/site.ts`, laid out as a row (`SiteHeader`, `SiteFooter`) or a
 * column (`MobileNav`). The caller supplies the `<nav>` landmark and its
 * label, since the same list appears in three places. `onNavigate` runs on
 * every link click, which lets the mobile sheet close itself; the file has no
 * hooks or handlers of its own, so it renders on the server and the client
 * alike. Renders nothing for an empty list rather than an empty landmark.
 */
export function NavLinks({ items, orientation = "row", onNavigate }: NavLinksProps) {
  if (items.length === 0) return null;
  return (
    <ul className={orientations[orientation]}>
      {items.map((item) => (
        <li key={item.href}>
          <a href={item.href} onClick={onNavigate}>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
