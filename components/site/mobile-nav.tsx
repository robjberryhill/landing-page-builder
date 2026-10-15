"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NavLinks, type NavItem } from "@/components/site/nav-links";
import { siteConfig } from "@/content/site";

export type MobileNavProps = { items: readonly NavItem[] };

/**
 * The navigation below the `md` breakpoint: a menu button that opens the
 * site links and the "Order beans" link in a sheet from the right. Used by
 * `SiteHeader` only; the trigger hides itself at `md` and up, where the
 * header shows the links inline. This is the one file under
 * `components/site/` with state, which is why it carries `"use client"`:
 * every link in the sheet closes it through `onNavigate` or `onClick`
 * before the browser follows the hash.
 */
export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
        <Menu aria-hidden="true" />
        <span className="sr-only">Open menu</span>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6 px-4">
          <NavLinks items={items} orientation="column" onNavigate={close} />
          <a href={siteConfig.cta.href} className={buttonVariants({ size: "lg" })} onClick={close}>
            {siteConfig.cta.label}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
