# Authentic Coffee landing page

A practice repo for Builder.io Projects (Builder Code): one static Next.js landing page for the fictional roaster Authentic Coffee. The point is the workflow, not the coffee: connect the repo as a Builder Project, edit it in the Visual Editor or by prompt, and receive the edits as pull requests.

No backend, no environment variables, no dark mode, no images except SVG.

## Commands

| Command | What it does |
|---|---|
| `npm ci` | Installs dependencies from the lockfile. |
| `npm run dev` | Serves the site at http://localhost:3000. |
| `npm run validate` | Runs `next typegen`, `tsc --noEmit`, and `eslint .`. A change is done when this passes. |
| `npm run build` | The full production build. It downloads the Google font, so it needs network. |

Node 24. `.nvmrc` is set for nvm users.

## Builder

Settings are listed in section 5 of [documents/plans/2026-10-08-builder-landing-page-plan.md](documents/plans/2026-10-08-builder-landing-page-plan.md).
