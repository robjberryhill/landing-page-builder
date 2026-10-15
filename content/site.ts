// Shared by SiteHeader, MobileNav and SiteFooter. Repeated items inside a
// section (features, tiers, FAQ entries, stats) live in that section's file.
export const siteConfig = {
  name: "Authentic Coffee",
  tagline: "Roasted on Tuesdays. Shipped the same day.",
  email: "hello@authentic.coffee",
  nav: [
    { label: "Why us", href: "#why-us" },
    { label: "Numbers", href: "#numbers" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: { label: "Order beans", href: "#pricing" },
} as const;
