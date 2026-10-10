# Authentic Coffee landing page: a Builder Code practice repo

Plan written 2026-10-08. Execution target: a later session. Nothing here needs re-deciding; where a choice was open, the choice is made and the reason is given.

## Context

Rob is learning Builder.io Projects. Builder renamed Fusion to "Builder Code" on 2026-09-10 (docs URLs still use `fusion` slugs); "Projects" remains the feature name. The workflow to learn: connect a GitHub repo as a Builder Project, edit it through the Visual Editor and AI prompts, receive the edits as pull requests. The free plan allows 15 agent credits a day and 60 a month, so the repo must boot in Builder's cloud fast, need no secrets or backend, and contain reusable components Builder can learn from. The repo at `/Users/robjberryhill/Desktop/BuilderIO/landing-page-builder/` is a fresh `create-next-app` scaffold (one commit, no remote).

What is already there and verified:

| Item | Value |
|---|---|
| Next.js | 16.4.0, App Router, `app/` at repo root, no `src/` |
| React | 19.3.0 |
| Tailwind | 4.3.3 wired through `@tailwindcss/turbopack` in `next.config.ts` (no PostCSS config) |
| TypeScript | 5.x, strict, alias `@/*` to `./*` |
| Package manager | npm (package-lock.json present), npm 11.17 |
| Node | 24.19.0 locally; Builder's `builderio/fusion-base` image has a `node24` tag |
| Lint | ESLint 9 flat config with `eslint-config-next`; script is `eslint` |
| next.config.ts | `cacheComponents: true`, `partialPrefetching: true`, `experimental.agentFeedback: true` |
| GitHub | `gh` 2.96 logged in as robjberryhill over SSH; no remote on the repo yet; the name `landing-page-builder` is free |
| shadcn CLI | latest on npm today is 4.21.4; it defaults to Base UI |

Decisions fixed by this plan (reasons inline below): npm, no `src/` dir, no dark mode, no images beyond SVG, one font family loaded with `next/font/google`, Base UI flavour of shadcn, copy lives inside the section files, phases commit straight to `main`, AGENTS.md is the project guide and `.builder/rules/` holds only what AGENTS.md does not.

Builder facts this plan relies on (all from Builder's own docs unless marked):

- Commit mode defaults to Direct Commits; "Pull Requests" and "Draft Pull Requests" are the other modes. A Builder video says existing branches must be deleted before the mode can change, so set it before creating any branch.
- Builder reads `AGENTS.md`, `.builder/rules/*.mdc` (or `.md`), `.builderrules`, and `.cursor/rules`, and processes them "very similarly". It does not document reading `CLAUDE.md`, `.nvmrc`, or `engines`. The AI never edits rule files. Keep rules under 500 lines.
- Connecting a GitHub repo creates a `.builderrules` file; the Project Rules panel in the app edits that file.
- Design System Intelligence (component indexing) is not on the free plan, so the AI learns components by reading the repo, and components must be used in real pages.
- Credits are usage based (input and output tokens). Free users always use the "Auto" model. Auto Setup is free. Applying a visual edit still runs the agent to write the code, so visual edits cost credits too (forum answer, not docs). Each AI response's three-dot menu shows the credits it used.
- The agent's default command restrictions block `curl` and `npx`, so every command Builder runs must be an npm script.
- "Automatic refresh preview" must be off for apps with hot module replacement, which Next.js has.
- Next.js is listed on the Builder Code product page; App Router is not mentioned anywhere in the Builder Code docs, and Builder's own templates are Vite based. Section 7 lists the two failure modes this could cause and their fixes.

## 1. Goal and success criteria

Goal: a small Next.js landing page for the fictional roaster "Authentic Coffee", pushed to GitHub, connected as a Builder Project, with a proven round trip from a Builder edit to a merged pull request.

"Connected and working in Builder" means all of these are true:

1. The repo is on GitHub under `robjberryhill/landing-page-builder`, default branch `main`, and the Builder.io Integration GitHub App has access to it.
2. A Builder Project exists for the repo with the values from section 5 entered, and commit mode set to Pull Requests before any branch was created.
3. Builder's sandbox installs dependencies and starts the dev server without any environment variable, the Dev server URL is detected, and the preview renders every section with the brand palette.
4. In the Visual Editor, a text element in each section can be selected, and the Style tab edits land as Tailwind class changes in the right file.
5. A visual-only edit creates a pull request against `main`, the GitHub Action `validate` passes on it, and after merging on GitHub, Builder's dashboard shows the branch under Merged.
6. A prompt-driven change reuses existing components rather than inventing new markup (checked by reading the diff).
7. Adding a rule file visibly changes what the AI produces for the same kind of request.

Out of scope on purpose: Builder Content (CMS) or SDK integration, Builder hosting, any backend or form submission, dark mode, analytics, deployment. Each would add install time or secrets and none teaches the Projects workflow.

## 2. Repo structure

Final tree after all phases (scaffold files kept are marked "keep"):

```
landing-page-builder/
├── .builder/
│   └── rules/
│       ├── brand.mdc            alwaysApply: palette tokens, type, voice
│       ├── components.mdc       globs components/**: how components are built
│       └── sections.mdc         globs components/sections/**, app/**: how pages compose
├── .builderrules                two lines pointing at AGENTS.md (Builder's Project Rules panel edits this file)
├── .github/
│   └── workflows/
│       └── validate.yml         npm ci, validate, build on pull requests and pushes to main
├── .nvmrc                       "24" (for local nvm; Builder gets Node 24 from Runtime dependencies)
├── AGENTS.md                    Next.js block (keep, auto-managed) + project guide
├── CLAUDE.md                    one line: follow AGENTS.md
├── README.md                    purpose, commands, Builder Project Settings table
├── app/
│   ├── favicon.ico              keep until icon.svg lands in phase 7, then delete
│   ├── globals.css              Tailwind import, shadcn tokens, brand tokens
│   ├── icon.svg                 cup-ring mark in brand colors (phase 7)
│   ├── layout.tsx               font, metadata, skip link, header, main, footer
│   └── page.tsx                 composes the six sections in order
├── components/
│   ├── ui/                      shadcn: button, badge, card, accordion, separator, sheet
│   ├── site/                    reusable building blocks
│   │   ├── bag-label.tsx
│   │   ├── cta-group.tsx
│   │   ├── feature-card.tsx
│   │   ├── logo.tsx
│   │   ├── mobile-nav.tsx       "use client" (wraps Sheet)
│   │   ├── nav-links.tsx
│   │   ├── pricing-tier.tsx
│   │   ├── section-heading.tsx
│   │   ├── section.tsx
│   │   ├── site-footer.tsx
│   │   ├── site-header.tsx
│   │   └── stat.tsx
│   └── sections/                one file per landing page section, copy lives here
│       ├── closing-cta.tsx
│       ├── faq.tsx
│       ├── features.tsx
│       ├── hero.tsx
│       ├── pricing.tsx
│       └── stats.tsx
├── content/
│   └── site.ts                  site name, tagline, email, nav items (shared by header, mobile nav, footer)
├── documents/
│   └── plans/
│       └── 2026-10-08-builder-landing-page-plan.md
├── lib/
│   └── utils.ts                 cn() from shadcn init
├── public/                      absent after phase 1: the scaffold SVGs are deleted and git keeps no empty directory; Next.js does not need it
├── components.json              shadcn config
├── eslint.config.mjs            keep
├── next.config.ts               keep scaffold options; see phase 1 for the one change
├── next-env.d.ts                keep (gitignored by scaffold)
├── package.json                 scripts: dev, build, start, lint, typecheck, validate
├── package-lock.json
└── tsconfig.json                keep
```

Why `components/site` and `components/sections` are separate: with no component indexing on the free plan, the AI learns "reusable blocks" from `site/` and "page composition" from `sections/` by reading them. A prompt like "add a section" should land in `sections/` and use what is in `site/`. The rule files say exactly this.

## 3. Component inventory

All components are TypeScript function components with an exported props type, no `forwardRef`, Tailwind classes only (no inline styles, no hex values), and a one-paragraph JSDoc saying what the component is for and where it is used. Server Components by default; only `mobile-nav.tsx`, `components/ui/sheet.tsx`, and `components/ui/separator.tsx` carry `"use client"` (the accordion wrapper is server-safe and its Base UI primitive is a client module).

### shadcn/ui primitives (`components/ui/`)

| Component | Added with | Used by |
|---|---|---|
| Button (and `buttonVariants`) | `npx shadcn@latest add button` | MobileNav (real button); `buttonVariants` styles the links in CtaGroup, PricingTier, SiteHeader |
| Badge | `add badge` | PricingTier (highlight badge), BagLabel (roast date) |
| Card (+ CardHeader, CardTitle, CardContent, CardFooter) | `add card` | FeatureCard, PricingTier |
| Accordion (+ AccordionItem, AccordionTrigger, AccordionContent) | `add accordion` | Faq |
| Separator | `add separator` | BagLabel rows, SiteFooter |
| Sheet (+ SheetTrigger, SheetContent, SheetTitle) | `add sheet` | MobileNav |

### Site building blocks (`components/site/`)

| Component | Props | Used in |
|---|---|---|
| `Section` | `id?: string; tone?: "cream" \| "white" \| "espresso" \| "gold"; className?: string; children` | Hero (cream), Features (white), Stats (espresso), Pricing (cream), Faq (white), ClosingCta (gold) |
| `SectionHeading` | `title: string; description?: string; align?: "left" \| "center"; className?: string` | Features, Stats, Pricing, Faq |
| `FeatureCard` | `icon: LucideIcon; title: string; description: string; variant?: "card" \| "inline"` | Features (4 cards), Pricing "every plan includes" (3 inline) |
| `Stat` | `value: string; label: string` | Stats (4) |
| `PricingTier` | `name: string; price: string; cadence?: string; description: string; features: string[]; ctaLabel: string; ctaHref: string; highlighted?: boolean; badge?: string` | Pricing (3) |
| `BagLabel` | `title: string; origin: string; producer: string; process: string; elevation: string; roastLevel: 1 \| 2 \| 3 \| 4 \| 5; notes: string; roastedOn: string` | Hero (this week's bag), ClosingCta (next week's bag) |
| `CtaGroup` | `primary: { label: string; href: string }; secondary?: { label: string; href: string }; align?: "left" \| "center"` | Hero, ClosingCta |
| `Logo` | `className?: string` | SiteHeader, SiteFooter |
| `NavLinks` | `items: { label: string; href: string }[]; orientation?: "row" \| "column"; onNavigate?: () => void` | SiteHeader (row), MobileNav (column), SiteFooter (row) |
| `MobileNav` | `items: { label: string; href: string }[]` | SiteHeader (below `md`) |
| `SiteHeader` | none (reads `siteConfig`) | `app/layout.tsx` |
| `SiteFooter` | none (reads `siteConfig`) | `app/layout.tsx` |

Section tone map lives in `section.tsx` as a single object so a prompt can add a tone in one place:

| tone | classes |
|---|---|
| cream | `bg-background text-foreground` |
| white | `bg-card text-card-foreground` |
| espresso | `bg-espresso text-cream [--ring:var(--cream)]` |
| gold | `bg-gold text-espresso` |

Every `Section` renders `<section id={id} className="py-16 sm:py-24">` with an inner `<div className="mx-auto w-full max-w-6xl px-5 sm:px-8">`. Sections never set their own horizontal padding.

### Shared content (`content/site.ts`)

```ts
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
```

Repeated items inside a section (feature list, tiers, FAQ entries, stats) are `const` arrays at the top of that section's file, not in `content/`. Reason: a Visual Editor text edit then maps to one file, and a prompt to "add a tier" touches one file.

## 4. Design tokens and copy

### Palette (brief colors mapped to tokens)

| Brief role | Token name | Hex | Where |
|---|---|---|---|
| Background, secondary | cream | `#FAF5EC` | page background, text on espresso |
| Background | white | `#FFFFFF` | cards, alternating sections |
| Primary | espresso | `#2A1A12` | headings, body text, primary buttons, stats band, focus ring |
| Tertiary, light gold | gold | `#D7A84B` | closing band, highlighted tier border |
| Tertiary, light brown | tan | `#CBAE88` | secondary button background |
| Tertiary, yellow | butter | `#F3D27A` | badge on the highlighted tier |
| Quaternary, blacks | ink | `#141110` | footer background |
| Quaternary, greys | graphite | `#5B534E` | muted text (6.9:1 on cream) |
| Quaternary, greys | ash | `#8A837E` | decorative only, never text (3.4:1 on cream) |
| Quaternary, greys | line | `#E6DED2` | borders, dividers |

shadcn semantic mapping in `app/globals.css` `:root`: `--background: cream`, `--foreground: espresso`, `--card: white`, `--card-foreground: espresso`, `--primary: espresso`, `--primary-foreground: cream`, `--secondary: tan`, `--secondary-foreground: espresso`, `--muted: #F1EBE0`, `--muted-foreground: graphite`, `--accent: #F4E9CD` (a butter tint for hover states), `--accent-foreground: espresso`, `--border: line`, `--input: line`, `--ring: espresso`, `--radius: 0.375rem`. Brand names are also exposed as Tailwind colors (`bg-espresso`, `text-cream`, `bg-gold`, `bg-tan`, `bg-butter`, `bg-ink`, `text-graphite`, `border-line`) through `@theme inline` so prompts can use either vocabulary. Exact CSS is in phase 2. No `.dark` block anywhere.

Contrast ratios computed during planning: espresso on cream 15.4, espresso on white 16.7, graphite on cream 6.9, cream on espresso 15.4, cream on ink 17.3, espresso on gold 7.6, espresso on tan 7.9, espresso on butter 11.4. Gold on cream is 2.0, which is why the focus ring is espresso (cream on the dark bands), not gold.

### Type

One family: Bricolage Grotesque (Google Fonts, variable, with the `opsz` axis so the same file renders text and display sizes). Loaded in `app/layout.tsx` with `next/font/google` as `--font-sans`; the fallback is the size-adjusted `Bricolage Grotesque Fallback` face that `next/font` generates from Arial, not the system sans. Headline scale: hero `text-5xl sm:text-6xl lg:text-7xl` at `font-semibold tracking-tight leading-[0.95]`; section titles `text-3xl sm:text-4xl`; card titles `text-xl`; body `text-base sm:text-lg leading-relaxed`; measure capped at `max-w-prose`. Reason for the choice: the brief fixes a cream and dark brown palette, and the usual pairing of that palette with a high-contrast serif is the most recognisable AI-generated look. A warm grotesque with real character reads as "comedic and sincere" instead.

### Layout principles

- One memorable element, the `BagLabel`: a coffee bag label built from rules, type, and roast dots. It carries the "real" tone without a photo. Everything else stays plain.
- Cards get a 1px `border-line` border, no shadow, 6px radius. The highlighted pricing tier gets a `border-gold` border and the butter badge, nothing else.
- No scroll animations. Only the accordion and sheet animate, and both are user-triggered.
- Numbered markers nowhere (nothing on the page is a sequence).
- No all-caps labels and no eyebrow tags. Section headings carry the information.
- Mobile first: single column below `md`, grids at `md` and up, header collapses to the sheet below `md`.

### Copy, section by section

Voice: real, authentic, comedic, poetic. Sentence case everywhere. Specific nouns and numbers beat adjectives. The joke sits at the end of a sentence, never in the headline alone. No exclamation marks.

**Metadata (`app/layout.tsx`)**
- title: `Authentic Coffee | Roasted on Tuesdays, shipped the same day`
- description: `Small-batch coffee from six farms we can name, roasted the week it ships. Single bags or a subscription you can cancel without a phone call.`

**Header (`site-header.tsx`)**
- Logo wordmark: "Authentic Coffee" with a cup-ring mark.
- Nav: Why us, Numbers, Pricing, FAQ.
- Button: "Order beans" (links to `#pricing`).
- Skip link in layout: "Skip to content".

**Hero (`hero.tsx`, tone cream, two columns at `lg`)**
- h1: `Coffee that tastes like someone was paying attention.`
- Lead: `We buy from six farms we can name, roast in small batches on Tuesdays, and ship the same day. Nothing sits on a shelf getting philosophical.`
- CtaGroup: primary "Order beans" to `#pricing`; secondary "See how we roast" to `#why-us`.
- Small line under the buttons: `Roasted this week. Flat-rate shipping. No subscription required, though we do have one.`
- BagLabel (right column):
  - title: `This week's bag`
  - origin: `Huila, Colombia`
  - producer: `Finca La Esperanza`
  - process: `Washed`
  - elevation: `1,750 m`
  - roastLevel: 3
  - notes: `Red apple, caramel, the good kind of quiet.`
  - roastedOn: `Tuesday`

**Features (`features.tsx`, id `why-us`, tone white, 2x2 grid at `md`)**
- SectionHeading title: `What we do differently. It is not complicated.`
- description: `Most coffee is roasted far away, far in advance, by nobody in particular. Ours is not.`
- Cards (icon from lucide-react):
  1. Flame. `Roasted on Tuesdays`. `Every bag is roasted the week it ships. If the label says Tuesday, it was Tuesday.`
  2. MapPin. `Six farms, first-name basis`. `We buy from the same growers every year and pay above the fair-trade floor. We visit. We text. They send photos of their dogs.`
  3. PenLine. `Tasting notes written by a person`. `No algorithm says "hints of stone fruit." A human named Dana does, after her third cup.`
  4. Package. `Shipped flat, never flat-tasting`. `Four dollars to ship anywhere in the country. Bags are nitrogen flushed and one-way valved, so day nine tastes like day two.`

**Stats (`stats.tsx`, id `numbers`, tone espresso, 4 columns at `md`)**
- SectionHeading title: `A few honest numbers.` description: `Rounded where rounding was kind to us.`
- Stats:
  1. value `48 hours`, label `roaster to porch, on average`
  2. value `6`, label `farms, the same ones every year`
  3. value `11 years`, label `in the same brick building`
  4. value `1`, label `roast day a week. It is Tuesday.`

**Pricing (`pricing.tsx`, id `pricing`, tone cream, 3 columns at `lg`)**
- SectionHeading title: `Three ways to buy. All of them are fine.` description: `Every option ships flat-rate. Cancel the subscription whenever you like. We will not send a sad email.`
- Tiers:
  1. name `One bag`, price `$18`, cadence none, description `A single 12 oz bag, roasted this week.`, features: `Pick any origin`, `Ships Tuesday`, `No account needed`, cta `Buy one bag` to `#faq` (there is no shop; the FAQ explains ordering)
  2. name `The Regular`, price `$32`, cadence `per month`, highlighted, badge `Most people pick this`, description `Two bags a month, chosen by Dana or by you.`, features: `Two 12 oz bags`, `Skip or swap any month`, `First dibs on rare lots`, `Free shipping`, cta `Start the subscription` to `#faq`
  3. name `The Household`, price `$58`, cadence `per month`, description `Four bags. For big houses, small offices, or one very committed person.`, features: `Four 12 oz bags`, `Whole bean or ground`, `Free shipping`, `A mug, once, as a thank you`, cta `Feed the household` to `#faq`
- Below the grid, "Every plan includes" as three inline FeatureCards: CalendarCheck `Roast date on every bag` / `Printed, not stickered. You can tell.`; RefreshCw `Replacement if it arrives stale` / `Email a photo of the label. New bag goes out Tuesday.`; Mail `A human on email` / `Usually Dana. Occasionally Dana's brother, who is also fine.`

**FAQ (`faq.tsx`, id `faq`, tone white, single column `max-w-3xl`)**
- SectionHeading title: `Questions people actually ask.` description: `If yours is missing, email us. We answer in the order received, after coffee.`
- Items (one open at a time, first item open by default):
  1. `When do you roast?` / `Tuesdays. Orders placed by Monday at noon go into that week's roast. Anything after that waits a week, which is still faster than the grocery store.`
  2. `Whole bean or ground?` / `Both. Whole bean stays fresh longer. If you do not own a grinder, choose ground and tell us how you brew. We will match it.`
  3. `How long does coffee stay fresh?` / `Peak is days 4 to 21 after roast. The date is on the bag. After a month it is still coffee, just quieter.`
  4. `Do you have decaf?` / `Yes, and it is not a punishment. Swiss Water process, same farms, roasted with the same care and slightly less sleep.`
  5. `Can I pause or cancel?` / `Any time, from your account page. No phone call, no retention specialist, no guilt.`
  6. `Where do you ship?` / `Anywhere in the US for a flat four dollars, free on subscriptions. International is on the list, right after we fix the roof.`

**Closing CTA (`closing-cta.tsx`, tone gold, two columns at `lg`)**
- h2: `Tuesday is coming.`
- Lead: `Order by Monday at noon and it is roasted Tuesday and on your porch by Thursday. Probably Wednesday. We are not allowed to promise Wednesday.`
- CtaGroup: primary `Order beans` to `#pricing`; secondary `Read the FAQ` to `#faq`.
- BagLabel: title `Next week's bag`, origin `Sidama, Ethiopia`, producer `Bombe washing station`, process `Natural`, elevation `2,100 m`, roastLevel 2, notes `Blueberry, honey, a little drama.`, roastedOn `Next Tuesday`.

**Footer (`site-footer.tsx`, tone ink)**
- Logo and line: `Roasted in a brick building in Grand Rapids, Michigan, since 2015.`
- NavLinks (row) repeating the four nav items, plus `Email us` to `mailto:hello@authentic.coffee`.
- Bottom line: `© 2026 Authentic Coffee. Made with beans, patience, and a website builder.` (literal year; `new Date()` in a Server Component fails the build under Cache Components)

## 5. Builder setup

### 5a. AGENTS.md

`next dev` manages the block between `<!-- BEGIN:nextjs-agent-rules -->` and `<!-- END:nextjs-agent-rules -->`; leave it in place at the top. Append this project guide below it (verbatim; it is short on purpose because Builder loads it on every prompt and rules are input tokens, which are credits):

```markdown
# Authentic Coffee landing page

A practice repo for Builder.io Projects: one static marketing page for a fictional coffee roaster. No backend, no environment variables, no dark mode, no images except SVG.

## Commands

- `npm ci` installs. `npm run dev` serves http://localhost:3000.
- `npm run validate` runs `next typegen`, `tsc --noEmit`, and `eslint .`. A change is done only when it passes.
- `npm run build` is the full check; it downloads the Google font, so it needs network.

## Layout

- `app/page.tsx` renders the sections in order; `app/layout.tsx` holds the font, metadata, header, and footer.
- `components/sections/` has one file per page section. Copy and the arrays of repeated items (features, tiers, FAQ entries, stats) sit at the top of each file.
- `components/site/` has the reusable blocks: `Section`, `SectionHeading`, `FeatureCard`, `Stat`, `PricingTier`, `BagLabel`, `CtaGroup`, `Logo`, `NavLinks`, `MobileNav`, `SiteHeader`, `SiteFooter`.
- `components/ui/` is generated by shadcn (Base UI flavour). Compose these files; leave their contents alone. If a primitive is missing, ask a human to run `npx shadcn@latest add <name>`.
- `content/site.ts` has the site name, nav items, CTA, and email. `app/globals.css` has every color token.
- `.builder/rules/` has the detailed rules: `brand.mdc` (palette and voice), `components.mdc`, `sections.mdc`.

## Rules of the road

- Styling is Tailwind classes using the semantic tokens (`bg-background`, `text-muted-foreground`, `border-line`) or the brand tokens (`bg-espresso`, `text-cream`, `bg-gold`, `bg-tan`, `bg-butter`, `bg-ink`, `text-graphite`). A hex value belongs only in `app/globals.css`.
- A link that looks like a button uses `buttonVariants` from `components/ui/button`. `Button` is for real buttons. Base UI components take a `render` prop; `asChild` does not exist here.
- Files are Server Components unless they use hooks or event handlers; those start with `"use client"`.
- The page is prerendered. `Date`, `Math.random`, `cookies()`, `headers()`, and `fetch` inside a component fail the build.
- Keep the dependency list as it is. Add a package only when a human asks for it by name.
- Copy follows `.builder/rules/brand.mdc`: sentence case, no exclamation marks, specific nouns and numbers, the joke at the end of the sentence.

## Done means

`npm run validate` passes, the page still has exactly one `h1` and one `h2` per section, every new section has an `id` that matches its nav href, and the diff touches only the files the task needed.
```

`CLAUDE.md` holds one line, `Strictly follow the rules in ./AGENTS.md.`, which is Builder's own recommendation for Claude Code users and keeps local sessions on the same guide.

### 5b. Rule files

Format, from Builder's docs: a `.mdc` file in `.builder/rules/` with YAML front matter `description`, `globs`, `alwaysApply`. With `alwaysApply: true` the AI always applies the rule; otherwise it decides from the description and globs. Builder does not document the `globs` syntax (its example leaves it empty), so the files below use the common comma-separated glob form and carry a description precise enough to trigger on its own. There is no `project.mdc`: AGENTS.md already plays that role, and duplicating it would cost tokens on every prompt.

`.builder/rules/brand.mdc`:

```markdown
---
description: Authentic Coffee palette tokens, type scale, and copy voice. Apply to any change that touches colors, text styles, or words.
globs:
alwaysApply: true
---

# Brand: Authentic Coffee

Tone in four words: real, authentic, comedic, poetic.

## Colors

Use token classes. Tokens are defined once in `app/globals.css`; a hex value belongs nowhere else.

| Token | Use for |
|---|---|
| `bg-background` (cream) | page background, hero and pricing sections |
| `bg-card` (white) | cards, features and FAQ sections |
| `bg-espresso` with `text-cream` | the stats band, primary buttons |
| `bg-gold` with `text-espresso` | the closing band only |
| `bg-tan` | secondary button background |
| `bg-butter` | the badge on the highlighted pricing tier |
| `bg-ink` with `text-cream` | the footer |
| `text-muted-foreground` (graphite) | supporting text on cream or white |
| `border-line` | card borders and dividers; `border-gold` marks the highlighted tier; `border-espresso` outlines the bag label |

Gold and ash fail contrast as text on cream, so text is espresso, cream, or graphite only. Section tones come from the `tones` map in `components/site/section.tsx`.

## Type

One family, Bricolage Grotesque, loaded in `app/layout.tsx` as `--font-sans`. Headlines are `font-semibold tracking-tight`. Scale: h1 `text-5xl sm:text-6xl lg:text-7xl leading-[0.95]`; h2 `text-3xl sm:text-4xl`; h3 `text-xl`; body `text-base sm:text-lg leading-relaxed`; long text capped with `max-w-prose`. Headings are plain sentences: no all-caps labels, no eyebrow tags above them, no single highlighted word.

## Voice

- Sentence case for every heading, label, and button.
- Specific nouns and numbers beat adjectives: "six farms we can name", not "carefully sourced". Numbers over nine are digits; prices look like `$18`; cadence is "per month".
- The joke lands at the end of the sentence, after the fact: "Nothing sits on a shelf getting philosophical."
- Buttons say what happens: "Order beans", "Start the subscription", "Read the FAQ".
- Periods end sentences. Exclamation marks do not appear on this site.
- Marketing words to leave out: elevate, crafted, journey, unlock, premium, artisanal, experience, passion.
- The facts stay consistent: Dana writes the tasting notes, the roaster is in Grand Rapids, roast day is Tuesday, shipping is a flat four dollars.
```

`.builder/rules/components.mdc`:

```markdown
---
description: How components in components/site and components/ui are built. Apply when creating or editing any component file.
globs: components/**/*.tsx
alwaysApply: false
---

# Components

- `components/ui/` is generated by shadcn. Compose it; leave the files as generated.
- A new file in `components/site/` is justified only when two sections need the same block. Otherwise the markup stays in the section file.
- Each component is a plain function with an exported `XProps` type, a one-paragraph JSDoc stating what it is for and where it is used, and no `forwardRef`.
- Class names are joined with `cn` from `@/lib/utils`; a `className` prop, when present, is merged last.
- Variants live in one object near the top of the file (`tones` in `section.tsx`, the `variant` branches in `feature-card.tsx`) so a new variant is a one-line addition.
- Links styled as buttons: `<a href="..." className={buttonVariants({ size: "lg" })}>`. Real buttons: `<Button>`. Base UI components take `render` props (`render={<a href="..." />}`), never `asChild`.
- Icons come from `lucide-react`, passed as the component (`icon: LucideIcon`) and rendered with `aria-hidden`.
- Accessibility: headings keep their level (`h2` for section titles, `h3` inside cards), decorative SVGs are `aria-hidden`, icon-only buttons carry an `sr-only` label, and every interactive element keeps the shadcn focus ring.
- Server Component by default. `"use client"` appears only in a file with hooks or event handlers; `mobile-nav.tsx` is the example.
```

`.builder/rules/sections.mdc`:

```markdown
---
description: How page sections are composed in components/sections and rendered from app/page.tsx. Apply when adding, reordering, or editing a section.
globs: components/sections/**/*.tsx, app/**/*.tsx
alwaysApply: false
---

# Sections

- One section per file in `components/sections/`, named after the section (`hero.tsx`, `pricing.tsx`). The default export is the section component; `app/page.tsx` renders them in page order.
- Every section returns `<Section id="..." tone="...">`. The `id` matches the nav `href` in `content/site.ts` when the section is in the nav. Neighbouring sections use different tones; today the order is cream, white, espresso, cream, white, gold.
- Every section except the hero opens with `<SectionHeading title description />`; the hero has the page's only `h1`.
- Copy lives in the file. Repeated items are a `const` array at the top (`features`, `stats`, `tiers`, `faqs`) mapped over the matching block from `components/site/`.
- Grids: `grid gap-6 md:grid-cols-2` for two columns, `lg:grid-cols-3` for three, `sm:grid-cols-2 md:grid-cols-4` for stats. Mobile is single column.
- A new section also gets a nav item in `content/site.ts` when people should be able to jump to it, and `npm run validate` must pass.
- Numbered markers appear only for a real sequence, such as steps in time. Everything else is unnumbered.
```

`.builderrules` (pre-created so Builder's connect step has nothing to invent; the Project Rules panel in the app edits this file):

```
Read AGENTS.md first. The rules in .builder/rules/ apply alongside it.
```

If Builder still rewrites `.builderrules` during setup, keep Builder's version and commit it with the first pull request.

### 5c. Project Settings values

Where fields live follows Builder's settings reference (`builder.io/c/docs/fusion-project-settings`). Two of its pages disagree on whether Commit mode is under Git or Advanced; look in Git first.

| Setting | Tab | Value | Why |
|---|---|---|---|
| Framework preset (setup form) | Setup | leave unset | the only documented option is Storybook |
| Environment variables | Setup | none | the app reads no env vars |
| Runtime dependencies | Setup | Node 24 | Builder's base image has `node24`; `.nvmrc` is not documented as read |
| Dependency install script | Setup | `npm ci` | lockfile install, deterministic, includes the Linux native binaries |
| Dev command | Setup | `npm run dev` | `next dev` on port 3000 |
| Dev server URL | Setup | Auto-Detect on | `next dev` prints `Local: http://localhost:3000`; if detection fails, untick Auto-Detect and enter `http://localhost:3000` |
| Dev server patterns | Setup | empty | only if auto-detect fails and the manual URL also fails |
| Validation command | Setup | `npm run validate` | runs after every AI task; npm script because the agent sandbox blocks `npx` |
| Design systems | Setup | none | not on the free plan |
| Automatic refresh preview | Workspace | off | Next.js has hot module replacement |
| Workspace instructions | Workspace / Agent | empty | AGENTS.md covers it |
| Commit mode | Git (or Advanced) | Pull Requests | set before creating any branch; default is Direct Commits |
| Main branch name | Git | `main` | |
| Git branch naming | Git | `builder/{friendlyName}-{createdAt}` | recognisable branches on GitHub; default names are random |
| Enable merging PRs | Git | off | merge on GitHub after the `validate` check passes |
| Default branch visibility | Git | leave default | single-person space |
| Peer review | Review | off | not on the free plan |
| Enforce default command restrictions | Agent | on (default) | |
| Browser automation | Agent | off | costs extra credits |
| AI usage | Hosting | Use Builder Agent (default) | free users always get the Auto model |
| Build command, output directory, Node version (Hosting) | Hosting | untouched | no Builder hosting |

### 5d. Connect procedure (phase 9)

1. Open `builder.io/app/projects`, click Connect Repo, choose GitHub, install the "Builder.io Integration" GitHub App for the `landing-page-builder` repo (grant only that repo), and select it.
2. If the flow offers Setup Visual Editing, click Start Auto Setup (free). If it opens the Project Settings dialog instead, enter the Setup tab values from 5c and Save. Do not make code changes while setup runs.
3. Open Project Settings and fill in every row of 5c, finishing with Commit mode = Pull Requests and the branch naming template.
4. Run the Builder boot check from section 7.
5. Check the file tree in Code mode for files Builder added (`.builderrules` is expected). Anything added becomes part of the first pull request.

Reference pages: `builder.io/c/docs/get-started-fusion`, `builder.io/c/docs/fusion-project-settings`, `builder.io/c/docs/configuration-builder-rules`, `builder.io/c/docs/ai-instruction-best-practices`, `builder.io/c/docs/fusion-create-a-pull-request`, `builder.io/c/docs/fusion-style-tab`, `builder.io/c/docs/context-to-projects`, `builder.io/c/docs/agent-credits`, `builder.io/c/docs/projects-best-practices`.

## 6. Build phases

One commit per phase, committed straight to `main` and pushed after each. Pull requests per phase are not worth it here: there is no reviewer, and the pull request practice comes from Builder in phase 9. Every commit message ends with the `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>` line. Run every command from the repo root.

Facts from the Next.js 16.4 docs that shape the phases (doc paths are under `node_modules/next/dist/docs/01-app/`):

- A page with no dynamic APIs is prerendered as static under `cacheComponents`; no Suspense or `"use cache"` needed (`01-getting-started/08-caching.md`). Keep `cacheComponents` and `partialPrefetching` as scaffolded. Do not add `output: "export"`: the source throws "PPR cannot be enabled in export mode".
- `new Date()`, `Math.random()` and request APIs in a Server Component fail the build (`02-guides/migrating-to-cache-components.md`). The footer year is a literal.
- `next typegen` generates the global `LayoutProps` and `PageProps` types into `.next/types`, which is gitignored, so `tsc` on a fresh clone needs `next typegen` first (`03-api-reference/06-cli/next.md`).
- `next lint` is gone; `eslint` runs directly (`03-api-reference/05-config/03-eslint.md`). `next/image` `priority` is deprecated for `preload`; the scaffold page uses `priority`, and phase 1 deletes that page.
- `next dev` with `experimental.agentFeedback: true` appends a feedback block to `AGENTS.md` when it detects a coding agent, Next.js telemetry is enabled, and the environment is not CI, and `experimental.agentUpgrade` (default `security`) can stop `next dev` with exit code 1 when an agent is detected and an advisory applies (`03-api-reference/05-config/01-next-config-js/agentFeedback.md`, `agentUpgrade.md`). Builder's sandbox is an unattended agent, so phase 1 sets both to `false`. `agentRules` stays on; its block is already committed, and `next dev` rewrites it only when the text between the markers differs from the installed version's block (for example after a Next.js upgrade).
- `allowedDevOrigins` is a top-level config key taking hostnames without scheme or port; `*` matches one label, `**` matches one or more (`allowedDevOrigins.md`). A blocked origin loads HTML but returns 403 for `/_next/*`, and the terminal prints the hostname to add. Section 7 covers when to set it.
- Fonts from `next/font/google` download at compile time; if the network is blocked, `next dev` logs an error and uses the fallback, and `next build` fails (`compiled/@next/font/dist/google/loader.js`). The validation command therefore does not run `next build`; CI does.
- `scroll-behavior: smooth` is no longer overridden by Next during navigation, and anchor targets need `scroll-padding-top` under a sticky header (`02-guides/upgrading/version-16.md`, `link.md`).

Facts from the shadcn CLI 4.21.4 research that shape phase 2:

- `init` defaults to Base UI with the `nova` preset (`-b base -p nova`); Radix is `-b radix`. Styles are named `base-nova`. Base UI has no `asChild`; a link styled as a button is `<a className={buttonVariants({ ... })}>`, and `buttonVariants` can be called from Server Components.
- `init` installs `shadcn`, `cn`, `class-variance-authority`, `tw-animate-css`, `@base-ui/react`, `lucide-react` as dependencies; `lib/utils.ts` becomes `export { cn } from "cn"`. No PostCSS config is created or needed; the `@tailwindcss/turbopack` loader resolves the `shadcn/tailwind.css` and `tw-animate-css` imports (if it ever does not, `npx shadcn@latest eject` inlines them).
- `init` rewrites `app/globals.css`: adds the two imports, `@custom-variant dark (&:is(.dark *))`, `@theme inline` color and radius mappings plus `--font-heading: var(--font-sans)`, `:root` and `.dark` oklch blocks, and an `@layer base` block that ends with `html { @apply font-sans; }`. It removes the scaffold's `:root` values and its `prefers-color-scheme` block, but the `body { font-family: var(--font-sans); }` rule survives; phase 2 step 5 removes it. Known bug (shadcn-ui/ui#10391): it sets `--font-sans: var(--font-sans)` in `@theme inline`, so the `next/font` variable must be named `--font-sans` or the page falls back to Times. Phase 1 names it that way before `init` runs, and phase 2 confirmed the font survives.
- `init` also runs an "Updating fonts" step that rewrites `app/layout.tsx`: it swaps the Bricolage Grotesque loader for `Geist({subsets:['latin'],variable:'--font-sans'})` and adds a `cn` import. Discard that file's change with `git checkout -- app/layout.tsx` before committing. Nothing else depends on it.
- Keep the `@custom-variant dark` line even with no dark mode; without it, Tailwind's `dark:` follows the OS and the components' built-in `dark:` classes would switch on for OS-dark visitors.
- `card`, `button`, `badge` need no `"use client"`; `accordion` (Base UI) is a client primitive wrapped by a server-safe file; `sheet` and `separator` carry `"use client"`. All can be rendered from Server Components as long as no function props cross the boundary.

### Phase 0: commit the plan, create the GitHub repo

```bash
git add documents && git commit -m "docs: add Builder landing page plan"
```
```bash
gh repo create landing-page-builder --public --source=. --remote=origin --push
```

Public because the free Builder plan's handling of private repos is not something this plan verified, and the repo holds no secrets. If private is preferred, swap `--public` for `--private` and expect to grant the Builder GitHub App access to that repo during phase 9.

Verify: `git remote -v` shows `origin` pointing at `github.com:robjberryhill/landing-page-builder.git` and `gh repo view` shows the repo with two commits.

### Phase 1: project hygiene, scripts, font, config

1. Create `.nvmrc` containing `24`.
2. `package.json` scripts become:
   ```json
   "dev": "next dev",
   "build": "next build",
   "start": "next start",
   "lint": "eslint .",
   "typecheck": "next typegen && tsc --noEmit",
   "validate": "npm run typecheck && npm run lint"
   ```
3. `next.config.ts`: keep `cacheComponents`, `partialPrefetching`, and the `turbopack` rule exactly as scaffolded; change `experimental` to `{ agentFeedback: false, agentUpgrade: false }`.
4. `app/layout.tsx`: replace both Geist imports with
   ```ts
   import { Bricolage_Grotesque } from "next/font/google";
   const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-sans", axes: ["opsz"] });
   ```
   apply `bricolage.variable` on `<html>` (keep `h-full antialiased`), keep `LayoutProps<"/">`, and set the `metadata` title and description from section 4. Verified during planning: `next/font` knows Bricolage Grotesque with `opsz`, `wdth`, and `wght` axes and a latin subset.
5. `app/globals.css`: change `--font-sans: var(--font-geist-sans)` to `--font-sans: var(--font-sans)`, delete the `--font-mono` line, and replace `font-family: Arial, Helvetica, sans-serif` with `font-family: var(--font-sans)`. Leave the rest for phase 2.
6. Replace `app/page.tsx` with a placeholder: a `<div className="p-10">` containing `<h1 className="text-5xl font-semibold tracking-tight">Authentic Coffee</h1>` and `<p>Roasted on Tuesdays. Shipped the same day.</p>`. This removes the deprecated `priority` prop and the Vercel links.
7. Delete `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`.
8. Rewrite `README.md` to three short parts: what the repo is (practice repo for Builder Code Projects, fictional brand), commands (`npm ci`, `npm run dev`, `npm run validate`, `npm run build`), and a "Builder" heading with the sentence "Settings are listed in section 5 of documents/plans/2026-10-08-builder-landing-page-plan.md" (phase 8 replaces that sentence with the real table).

Verify:
```bash
npm run validate
```
passes (typegen creates `.next/types`, tsc and eslint exit 0). Then
```bash
npm run dev
```
and open http://localhost:3000: the placeholder renders in Bricolage Grotesque (DevTools computed `font-family` on the `h1` starts with `Bricolage Grotesque`), the terminal shows no font download error, and `git status` shows no change to `AGENTS.md` after the dev server ran.

Commit: `chore: scripts, Bricolage Grotesque, agent-safe next config`

### Phase 2: shadcn (Base UI) and brand tokens

```bash
npx shadcn@latest init -b base -p nova
```
If it still prompts, answer Base UI and nova. Then
```bash
npx shadcn@latest add button badge card accordion separator sheet
```

Expected after both commands: `components.json` with `"style": "base-nova"`, `"tailwind.css": "app/globals.css"`, `"rsc": true`, aliases under `@/`; `lib/utils.ts`; six files in `components/ui/`; `package.json` gains `shadcn`, `cn`, `class-variance-authority`, `tw-animate-css`, `@base-ui/react`, `lucide-react`. `init` also rewrites `app/layout.tsx` to load Geist (see the facts above); restore it with `git checkout -- app/layout.tsx` before going on.

Edit `app/globals.css`, keeping everything `init` generated except as follows:

1. Delete the whole `.dark { ... }` block. Keep the `@custom-variant dark (&:is(.dark *));` line.
2. Replace the generated `:root` values with the brand values. Keep the generated `--chart-*` and `--sidebar*` lines as they are (unused, harmless). The `:root` block becomes:
   ```css
   :root {
     --cream: #FAF5EC;
     --espresso: #2A1A12;
     --gold: #D7A84B;
     --tan: #CBAE88;
     --butter: #F3D27A;
     --ink: #141110;
     --graphite: #5B534E;
     --ash: #8A837E;
     --line: #E6DED2;

     --radius: 0.375rem;
     --background: var(--cream);
     --foreground: var(--espresso);
     --card: #FFFFFF;
     --card-foreground: var(--espresso);
     --popover: #FFFFFF;
     --popover-foreground: var(--espresso);
     --primary: var(--espresso);
     --primary-foreground: var(--cream);
     --secondary: var(--tan);
     --secondary-foreground: var(--espresso);
     --muted: #F1EBE0;
     --muted-foreground: var(--graphite);
     --accent: #F4E9CD;
     --accent-foreground: var(--espresso);
     --destructive: #B3261E;
     --border: var(--line);
     --input: var(--line);
     --ring: var(--espresso);
     /* generated --chart-* and --sidebar* lines stay here */
   }
   ```
3. Inside the generated `@theme inline { ... }` block add the brand color utilities:
   ```css
   --color-cream: var(--cream);
   --color-espresso: var(--espresso);
   --color-gold: var(--gold);
   --color-tan: var(--tan);
   --color-butter: var(--butter);
   --color-ink: var(--ink);
   --color-graphite: var(--graphite);
   --color-ash: var(--ash);
   --color-line: var(--line);
   ```
   and confirm `--font-sans: var(--font-sans);` is present.
4. Inside the generated `@layer base { ... }` add:
   ```css
   html {
     scroll-behavior: smooth;
     scroll-padding-top: 5rem;
   }
   @media (prefers-reduced-motion: reduce) {
     html {
       scroll-behavior: auto;
     }
   }
   ```
5. Remove any leftover `body { ... }` or `@media (prefers-color-scheme: dark)` rule from the scaffold if `init` did not already remove it.

Update the phase 1 placeholder page to also render `<a href="#" className={buttonVariants({ size: "lg" })}>Order beans</a>` importing `buttonVariants` from `@/components/ui/button`.

Verify: `npm run validate` passes; dev server shows a cream page, espresso text, an espresso button with cream text, and the button's focus ring is espresso when tabbed to; the terminal shows no CSS resolution error for `shadcn/tailwind.css` or `tw-animate-css`.

Commit: `feat: add shadcn (Base UI, nova) and Authentic Coffee tokens`

### Phase 3: site shell

Create `content/site.ts` (section 3), then in `components/site/`:

- `section.tsx`: `Section` as specified in section 3. The tone map object is `const tones = { cream: "bg-background text-foreground", white: "bg-card text-card-foreground", espresso: "bg-espresso text-cream [--ring:var(--cream)]", gold: "bg-gold text-espresso" }`. Default tone `cream`.
- `logo.tsx`: `Link` to `/` with `aria-label="Authentic Coffee, home"`, an inline SVG cup-ring mark (two concentric circles plus a handle arc, `stroke="currentColor"`, `aria-hidden`), and the wordmark in `font-semibold tracking-tight`. Color comes from `currentColor`, so the footer passes `className="text-cream"`.
- `nav-links.tsx`: `<ul>` of `<a>` items; `orientation="row"` gives `flex gap-6 text-sm font-medium`, `column` gives `flex flex-col gap-4 text-lg`; each link calls `onNavigate` on click when provided. No `"use client"`: the file has no hooks, so it works on both sides.
- `mobile-nav.tsx` (`"use client"`): `useState` for `open`; `Sheet` with `open`/`onOpenChange`; the trigger is the generated sheet's trigger pattern wrapping `Button` `variant="ghost" size="icon"` with the lucide `Menu` icon and `<span className="sr-only">Open menu</span>`; `SheetContent side="right"` holds `SheetTitle` "Menu", `NavLinks orientation="column" onNavigate={() => setOpen(false)}`, and the CTA link. Follow the API in the generated `components/ui/sheet.tsx` (Base UI uses a `render` prop, not `asChild`).
- `site-header.tsx`: `<header className="sticky top-0 z-40 border-b border-line bg-background/95 backdrop-blur">`, container `mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8`; `Logo`; `<nav aria-label="Main" className="hidden md:block">` with `NavLinks`; CTA `<a href={siteConfig.cta.href} className={cn(buttonVariants({ size: "sm" }), "hidden md:inline-flex")}>`; `<MobileNav items={siteConfig.nav} />` with `md:hidden`.
- `site-footer.tsx`: `<footer className="bg-ink text-cream [--ring:var(--cream)]">`, container with `Logo className="text-cream"`, the "Roasted in a brick building..." line, `<nav aria-label="Footer">` with `NavLinks orientation="row"` plus the `mailto:` link, a `Separator` (`bg-cream/20`), and the copyright line with the literal year 2026.
- `app/layout.tsx`: body keeps `min-h-full flex flex-col`; inside: skip link `<a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-4 focus:py-2">Skip to content</a>`, `<SiteHeader />`, `<main id="content" className="flex-1">{children}</main>`, `<SiteFooter />`.
- `app/page.tsx`: `<Section>` wrapping the phase 2 placeholder (replaced in phase 4).

Verify: `npm run validate`; at 1280px wide the header shows logo, four links, and the button; at 375px (built-in browser, mobile preset) the links hide, the menu button opens the sheet, a link click closes it; the footer renders in ink with cream text; Tab from the top reveals the skip link first.

Commit: `feat: site shell with header, mobile nav, footer, and Section`

### Phase 4: hero and features

Create `components/site/section-heading.tsx`, `cta-group.tsx`, `bag-label.tsx`, `feature-card.tsx`, and `components/sections/hero.tsx`, `features.tsx`. `app/page.tsx` renders `<Hero />` then `<Features />`.

- `SectionHeading`: `<div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>` with `<h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">` and an optional `<p className="mt-4 text-lg opacity-80">`. It uses `opacity` rather than `text-muted-foreground` so it reads correctly on every tone.
- `CtaGroup`: `<div className={cn("flex flex-col gap-3 sm:flex-row", align === "center" && "justify-center")}>`; primary `<a className={buttonVariants({ size: "lg" })}>`, secondary `buttonVariants({ size: "lg", variant: "outline" })`.
- `BagLabel`: `<div className="rounded-md border border-espresso bg-card p-6 text-card-foreground">`; top row with `<p className="font-semibold">{title}</p>` and `<Badge variant="outline">Roasted {roastedOn}</Badge>`; a `<dl>` with rows Origin, Producer, Process, Elevation (each `flex justify-between py-2`, divided by `Separator`); a roast row showing five `size-2.5 rounded-full` dots, filled `bg-espresso` for `i < roastLevel` and `bg-line` otherwise, inside a `<div role="img" aria-label={`Roast level ${roastLevel} of 5`}>`; `<p className="mt-4 text-lg">{notes}</p>`.
- `FeatureCard`: `variant="card"` renders `Card` with `CardHeader` holding the icon in `size-10 rounded-md bg-accent text-accent-foreground` and `CardTitle` as `<h3>`, then `CardContent` with the description; `variant="inline"` renders `<div className="flex gap-3">` with the icon `size-5 mt-1 shrink-0` and a `<div>` holding `<h3 className="font-semibold">` and `<p className="text-muted-foreground">`.
- `Hero`: `<Section tone="cream">` with `grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center`; left: `<h1 className="text-5xl font-semibold tracking-tight leading-[0.95] sm:text-6xl lg:text-7xl">`, lead paragraph `mt-6 max-w-prose text-lg sm:text-xl`, `CtaGroup` at `mt-8`, small line `mt-4 text-sm text-muted-foreground`; right: `BagLabel` with the section 4 data.
- `Features`: `<Section id="why-us" tone="white">`, `SectionHeading`, then `grid gap-6 md:grid-cols-2` of four `FeatureCard`s from a `const features = [...]` at the top of the file with the section 4 copy; icons `Flame`, `MapPin`, `PenLine`, `Package` from `lucide-react`.

Verify: `npm run validate`; screenshot at 375px and 1280px; the `h1` is the only `h1`; the four cards are `h3` under the section `h2`; "See how we roast" scrolls to the features section with the heading visible below the sticky header.

Commit: `feat: hero and features sections`

### Phase 5: stats and pricing

Create `components/site/stat.tsx`, `pricing-tier.tsx`, and `components/sections/stats.tsx`, `pricing.tsx`. `app/page.tsx` renders Hero, Features, Stats, Pricing.

- `Stat`: `<div><p className="text-4xl font-semibold tracking-tight sm:text-5xl">{value}</p><p className="mt-2 opacity-80">{label}</p></div>`.
- `PricingTier`: `Card` with `cn("flex h-full flex-col", highlighted && "border-gold")`; if `badge`, `<Badge className="bg-butter text-espresso">` at the top of the header; `CardTitle` as `<h3>` with `name`; price row `<p><span className="text-4xl font-semibold tracking-tight">{price}</span>{cadence && <span className="ml-1 text-muted-foreground">{cadence}</span>}</p>`; description `text-muted-foreground`; `CardContent` with `<ul className="space-y-2">` and a lucide `Check` icon `size-4` before each feature; `CardFooter` with the CTA link, `buttonVariants({ variant: highlighted ? "default" : "outline" })` plus `w-full`.
- `Stats`: `<Section id="numbers" tone="espresso">`, `SectionHeading`, then `mt-12 grid gap-10 sm:grid-cols-2 md:grid-cols-4` of four `Stat`s from a `const stats` array.
- `Pricing`: `<Section id="pricing" tone="cream">`, `SectionHeading` centered, `mt-12 grid gap-6 lg:grid-cols-3` of three `PricingTier`s from `const tiers`, then `<h3 className="mt-16 text-xl font-semibold">Every plan includes</h3>` and `mt-6 grid gap-6 sm:grid-cols-3` of three inline `FeatureCard`s (icons `CalendarCheck`, `RefreshCw`, `Mail`).

Verify: `npm run validate`; the stats band is espresso with cream text; the middle tier has the gold border and butter badge; at 375px the tiers stack; tier links show espresso focus rings (they sit on cream; cream rings appear only on the espresso and ink bands, and the only links there are in the footer).

Commit: `feat: stats band and pricing`

### Phase 6: FAQ and closing call to action

Create `components/sections/faq.tsx` and `closing-cta.tsx`. `app/page.tsx` renders all six sections in order.

- `Faq`: `<Section id="faq" tone="white">`, `SectionHeading`, then `<div className="mx-auto mt-12 max-w-3xl">` with the generated `Accordion` opened on the first item by default. Base UI's accordion API differs from Radix (no `type="single"`); use the `defaultValue` and item `value` props as the generated `components/ui/accordion.tsx` defines them, and give items the values `roast`, `grind`, `fresh`, `decaf`, `cancel`, `ship`.
- `ClosingCta`: `<Section tone="gold">` with the same two-column grid as the hero; left: `<h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">`, lead paragraph, `CtaGroup`; right: `BagLabel` with the "Next week's bag" data.

Verify: `npm run validate`; the first FAQ item is open on load, Enter and Space toggle items from the keyboard, only one item is open at a time; the gold band has espresso text and both buttons are readable; the full page screenshot at 375px shows no horizontal scroll.

Commit: `feat: FAQ and closing call to action`

### Phase 7: polish and build check

1. Add `app/icon.svg`: a 64x64 SVG, cream background rounded, espresso cup-ring mark (same shapes as the logo). Delete `app/favicon.ico`.
2. Run the accessibility pass: one `h1`, every section has an `h2`, every landmark present (`header`, `nav` x2 with labels, `main`, `footer`), all links have visible text, decorative SVGs are `aria-hidden`, focus is visible on every interactive element.
3. Run
   ```bash
   npm run build
   ```
   Expected: exits 0 and the route table shows `/` as prerendered static (`○`). If it reports anything dynamic, a component is calling a request API or `Date`; fix it rather than wrapping in Suspense.
4. Run `npm run validate` one more time.

Commit: `chore: icon, accessibility pass, build check`

### Phase 8: files for Builder

1. Append the section 5a project guide to `AGENTS.md` below the managed Next.js block. Create `CLAUDE.md` with its one line.
2. Create `.builder/rules/brand.mdc`, `components.mdc`, `sections.mdc` and `.builderrules` with the section 5b contents.
3. Replace the README "Builder" sentence with the section 5c table (Setting, Tab, Value columns are enough) and a four-line "How a change flows" list: new branch in Builder, edit, Send PR, merge on GitHub after the `validate` check.
4. Create `.github/workflows/validate.yml`:

```yaml
name: validate
on:
  pull_request:
  push:
    branches: [main]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version-file: .nvmrc
          cache: npm
      - run: npm ci
      - run: npm run validate
      - run: npm run build
```

(`actions/checkout` and `actions/setup-node` are both at v7 as of today.)

5. Optional, local only: `npx builder-doctor rules` from Builder's `builder-agent-skills` repo audits rule files. It is an unfamiliar package; run it only if curious, never in CI.

Verify: `npm run validate` still passes (the new files are not TypeScript, so this is a no-change check); push, then `gh run watch` shows the workflow green on `main`.

Commit: `docs: AGENTS.md, Builder rules, project settings, CI`

### Phase 9: connect in Builder

Follow section 5d, then the Builder boot check in section 7, then section 8.

## 7. Verification

Local, after every phase:

```bash
npm run validate
```
Expected: `next typegen` prints nothing or a one-line success, `tsc` prints nothing, `eslint` prints nothing, exit code 0.

```bash
npm run dev
```
Expected in the terminal: `▲ Next.js 16.4.0 (Turbopack)`, `Local: http://localhost:3000`, `Ready in` under a few seconds, no red error lines. Expected in the browser: the page compiles on first request without the dev overlay; the console has no hydration warnings.

```bash
npm run build
```
Expected: exit 0, `/` shown as static (prerendered), `.next/` produced. Note that the build downloads Bricolage Grotesque from Google Fonts, so it needs network.

Visual checks use the built-in browser pane: desktop width and the 375px mobile preset, screenshots of every section, keyboard tab order from the skip link through the footer.

Fresh-clone check before connecting Builder (proves install and boot without local state):
```bash
cd "$(mktemp -d)" && git clone git@github.com:robjberryhill/landing-page-builder.git && cd landing-page-builder && npm ci && npm run validate && npm run dev
```
Expected: `npm ci` completes in well under two minutes, validate passes, dev serves the page.

### Builder boot check

After setup finishes, switch to Code mode (the mode that shows files, a terminal, dev server status, and the Send PR button) and read the terminal:

1. The install log ends with npm's `added N packages` line and no `ERR!` lines. If it says `npm ci` is unavailable or the lockfile is out of sync, run `npm install` locally, commit the lockfile, and retry.
2. The dev log shows `▲ Next.js 16.4.0 (Turbopack)` and `Ready`. If it shows a Node version error, Runtime dependencies is not set to Node 24. If it shows a font download error, the sandbox has no route to Google Fonts; the preview then uses the fallback font and everything else works. Switching to `next/font/local` with a committed woff2 is the fix, as a follow-up outside this plan.
3. The Dev server URL field shows the detected `http://localhost:3000`. If not, untick Auto-Detect and type it.
4. Switch back to Interact mode. The preview shows the hero in cream with the bag label, and clicking "See how we roast" scrolls to the features section. Click into the hero headline: the selection shows `components/sections/hero.tsx` as its source.
5. If the preview is unstyled, or the browser console shows 403 responses for `/_next/...`, the preview origin is blocked by Next's dev server. The dev terminal prints the blocked hostname. Add it locally to `next.config.ts` as `allowedDevOrigins: ["<that hostname>"]` (hostname only, no scheme or port; use `*.` for a changing subdomain), commit to `main`, and start a fresh branch in Builder so it clones the fix.
6. Open the three-dot menu on any AI response later to confirm credits are being counted, and keep the daily total under 12 to leave room for a retry.

## 8. First five practice tasks in Builder

Before the first task, confirm Commit mode is Pull Requests (section 5c). Every task starts with "+ New Branch" in Builder (each branch is a fresh clone of `main`, so merged work and new rules are picked up), ends with "Send PR", a green `validate` check on GitHub, and a merge on GitHub. Builder deletes the working branch after the merge and lists it under Merged. After each merge run `git pull` locally. Credits: check the three-dot menu on each AI response; the free pool is 15 a day and 60 a month, shared across the space.

### Task 1: a text change through the Visual Editor only

- In the preview, select the hero headline, change the text to `Coffee that tastes like somebody was paying attention.` (one word), and apply the change. Builder runs the agent to write the code even for a visual edit, so expect a small credit cost.
- Expected diff: one line in `components/sections/hero.tsx`, nothing else. If the diff touches any other file, reject it and redo the edit with the element selected more precisely.
- Send PR. On GitHub, wait for `validate`, read the diff, merge. Confirm the branch moves to Merged in Builder.

### Task 2: a style change through the Style tab

- Select the features grid (the `div` under the "What we do differently" heading). In the Style tab, increase the gap between cards one step.
- Expected diff: `gap-6` becomes `gap-8` on the grid in `components/sections/features.tsx`. The lesson is in where the diff lands. If it lands in `components/site/section.tsx` instead, Builder treated the shared component as the target, and that change would hit all six sections. Reject it and prompt: "Apply the larger gap only to the features grid in components/sections/features.tsx."
- Send PR, check, merge.

### Task 3: a small prompt-driven change

- Prompt, verbatim: `In components/sections/faq.tsx add a seventh FAQ item after "Can I pause or cancel?": question "Do you do gift subscriptions?", answered in the brand voice in two sentences. Touch no other file.`
- Expected diff: one new object in the `faqs` array in `faq.tsx`. Check the answer against `brand.mdc`: sentence case, no exclamation mark, a fact first and the aside last, and the Tuesday or Dana facts kept consistent if mentioned.
- Send PR, check, merge.

### Task 4: a structural prompt-driven change

- Prompt, verbatim: `Add a "How it works" section between Features and Stats. Three steps: order by Monday at noon, we roast on Tuesday, it is on your porch by Thursday. Reuse Section, SectionHeading, and FeatureCard from components/site; put the copy in a const array at the top of the new file; give the section id "how-it-works" and add a nav item for it in content/site.ts; add no dependencies.`
- Expected diff: new `components/sections/how-it-works.tsx`, an import and render line in `app/page.tsx`, one nav entry in `content/site.ts`. Check: no new file in `components/site/`, no hex colors, tones still alternate (the new section should be cream or white between white and espresso; white next to white is a legitimate thing to send back), and `validate` is green.
- Optional bot practice: on the GitHub pull request, add a single comment (not a review) mentioning `@builder-bot` (some Builder pages write `@builderio-bot`; use the one GitHub autocompletes) asking for the section tone to be cream. Builder pushes a new commit to the same branch. This costs credits.
- Merge.

### Task 5: a change after adding a rule

- Locally, create `.builder/rules/pricing.mdc`:
  ```markdown
  ---
  description: Rules for pricing tier copy in components/sections/pricing.tsx
  globs: components/sections/pricing.tsx
  alwaysApply: true
  ---

  # Pricing copy

  - Each tier description is exactly two sentences: the first says what arrives, the second is the dry aside.
  - Each tier lists exactly four features, each starting with a noun or a verb, never with "Free".
  - Every CTA label starts with a verb and names the thing: "Buy one bag", "Start the subscription".
  ```
  Commit it to `main` and push (`docs: add pricing copy rule`).
- In Builder, "+ New Branch" (the fresh clone includes the rule). Prompt, verbatim: `Rewrite the three tier descriptions and feature lists in components/sections/pricing.tsx. Keep prices and names.`
- Check the result against the rule: two sentences per description, four features per tier, no feature starting with "Free", every CTA starting with a verb. That compliance is the proof the rule was read; the tier that previously had three features ("One bag") must now have four.
- Second half of the lesson, optional: edit the rule to `alwaysApply: false`, push, start another branch, and run the same prompt. If the output still complies, Builder applied the rule from its description and globs; if not, globs-scoped rules need a stronger description. Both outcomes are useful to know before writing more rules.
- Send PR, check, merge.

After the five tasks, the remaining credits for the month go to whatever is most interesting; the Visual Editor's Layers tab (reordering sections by drag and drop) and a prompt that asks for a new `Section` tone are the two next things to try.
