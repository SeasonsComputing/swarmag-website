# swarmAg Website Onboarding

This guide gets you productive quickly and explains how to work on the swarmAg marketing site. Keep this alongside the architecture reference in `README.md`.

## Quick Start

- Install a recent browser (Chrome/Edge/Safari/Firefox) and a local HTTP server (`python -m http.server` or `npx serve`).
- From the repo root, run a static server (examples below) and open `http://localhost:8080` (or your chosen port).
- Edit `index.html`, `styles/*.css`, or `modules/*.js`; reload to see changes.

## Project Shape

- Single-page site: `index.html` loads ES modules directly—no build step.
- Styling: `styles/index.css` (design system, layout), `styles/Carousel.css`, `styles/normalize.css`.
- Behavior: ES modules in `modules/` (`Website.js` orchestrates; see module notes below).
- Assets: `assets/` (video, fonts, logos) and `galleries/` (service photos).
- Documentation: `README.md` (architecture) and this onboarding guide.

## Local Development

- Prereqs: Python 3 or Node.js for a static server; no bundler or package install required.
- Start a server (pick one):
  - Python: `python -m http.server 8080` (serves current directory).
  - Node (serve): `npx serve . -l 8080`.
  - VS Code Live Server or any static host works too.
- Open the served URL; modules load via relative paths, so avoid `file://` (use HTTP).
- For reduced-motion testing, enable the OS/browser “reduce motion” setting—the site honors it.

## Working With Modules

- Bootstrap: `index.html` imports `Website.bootstrap([...])` with module names.
- Conventions:
  - Use `$` / `$$` from `modules/utils.js` for DOM queries.
  - Keep module exports small: each page module exports `init`.
  - `Website.the` stores shared references (e.g., galleries map).
- Key modules:
  - `page-galleries.js`: builds carousels from `PhotoCatalog.byGallery`.
  - `page-contact.js`: EmailJS form wiring and validation.
  - `page-dynamics.js`: scroll/sticky behavior (header, animations).
  - `Swarm.js`: bee swarm animation; initialized in `Website.js`.

## Content & Media Updates

- Copy: Edit directly in `index.html`. Keep semantic headings/sections intact for accessibility/SEO.
- Icons/logos/video: Replace files in `assets/`. Keep filenames if possible to avoid HTML updates.
- Fonts: Self-hosted in `assets/`; updates require matching `@font-face` in `styles/index.css`.
- Galleries:
  - Add photos to `galleries/aerial/` or `galleries/ground/` (use optimized `.webp` where possible).
  - Register new filenames in `modules/PhotoCatalog.js` under the appropriate gallery ID.
  - Keep alt text generic (“swarmAg”) unless a specific description is required.
- Animations: Swarm toggle is wired to `#swarm-toggle`; avoid removing unless you also adjust `Swarm.js` init.

## Contact Form & EmailJS

- Keys: Public key/account/template are defined at the top of `modules/page-contact.js` (`ejsKey`, `ejsAcct`, `ejsForm`).
- To change credentials:
  - Create/update the EmailJS service/template.
  - Replace the constants with the new public key, service ID, and template ID.
  - Match template variables: `name`, `email`, `phone`, `service`, `property`, `message`.
- Validation: Inline errors show on blur/input; submit is blocked until required fields pass.
- Testing:
  - Use EmailJS dashboard “Test” template to confirm deliveries.
  - In local dev, submit the form and watch the console for success/fail logs.

## QA Checklist Before Shipping

- Load on desktop & mobile widths; verify header stickiness and section spacing.
- Galleries: Slides advance via arrows, dots, autoplay; lazy-loaded images gain the `loaded` class.
- Swarm animation: Toggle button works; no console errors when disabled by reduced motion.
- Contact form: Required fields show errors; valid submission returns “Message Sent!”; error path recovers the button state.
- Lighthouse or similar: Check core vitals; ensure HTTPS is used in the target environment (EmailJS requires it).

## Deployment Notes

- Static site—deploy the root directory to any HTTPS-capable static host (S3+CloudFront, Netlify, GitHub Pages, etc.).
- No build artifacts; ensure assets and galleries directories are published as-is.
- Set appropriate cache headers (long-lived for assets, shorter for `index.html`) on your host if configurable.
- After deploy, smoke test the contact form against production EmailJS keys.

## Contributing Workflow

- Branch naming suggestion: `feature/<short-desc>` or `chore/<short-desc>`.
- Keep changes small and scoped (copy, styles, animations, form).
- Add short comments only for non-obvious logic; prefer clear naming elsewhere.
- Run a quick manual pass of the QA checklist above before opening a PR.
