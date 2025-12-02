# swarmAg Website Guide

## Overview

The swarmAg website is a modern single-page marketing site for a North Texas ag services company. It showcases drone spraying/spreading services and mesquite & brush mitigation treatments with interactive galleries, a contact form, and an engaging bee swarm animation system. Everything runs as static files—no build step or package install required.

## Quick Start

- Install a recent browser and a local HTTP server (`python -m http.server` or `npx serve`).
- From the repo root, run a static server (examples in Local Development) and open `http://localhost:8080` (or your chosen port).
- Edit `index.html`, `styles/*.css`, or `modules/*.js`; reload to see changes.

## Project Shape

- Single-page site: `index.html` loads ES modules directly—no bundler.
- Styling: `styles/index.css` (design system, layout), `styles/Carousel.css`, `styles/normalize.css`.
- Behavior: ES modules in `modules/` (`Website.js` orchestrates; see key modules below).
- Assets: `assets/` (video, fonts, logos) and `galleries/` (service photos).

```text
swarmag-website/
├── README.md                 # This guide (onboarding + architecture)
├── index.html                # Main HTML document with semantic structure
├── styles/                   # CSS stylesheets and design system
├── modules/                  # JavaScript modules (bootstrap + features)
├── assets/                   # Static assets (optimized & self-hosted)
└── galleries/                # Photo gallery assets by service type
```

## Local Development

- Prereqs: Python 3 or Node.js for a static server; no package install needed.
- Start a server (pick one):
  - `python -m http.server 8080`
  - `npx serve . -l 8080`
  - VS Code Live Server or any static host works.
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
  - Add photos to `galleries/aerial/` or `galleries/ground/` (prefer optimized `.webp`).
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

## Deployment

- Static site—deploy the root directory to any HTTPS-capable static host (S3+CloudFront, Netlify, GitHub Pages, etc.).
- No build artifacts; ensure `assets/` and `galleries/` directories are published as-is.
- HTTPS is required for ES6 module loading and EmailJS; HTTP/2 is recommended for parallel module requests.
- Set cache headers if configurable (long-lived for assets, shorter for `index.html`).
- After deploy, smoke test the contact form against production EmailJS keys.

## Contributing Workflow

- Branch naming suggestion: `feature/<short-desc>` or `chore/<short-desc>`.
- Keep changes small and scoped (copy, styles, animations, form).
- Add short comments only for non-obvious logic; prefer clear naming elsewhere.
- Run a quick manual pass of the QA checklist above before opening a PR.

## Architecture & Design Reference

### Technology Stack

- **Vanilla JavaScript (ES6+)** - No framework dependencies for maximum performance and control.
- **HTML5** - Semantic markup with accessibility features and structured data.
- **CSS3** - Custom design system with fluid typography, responsive layouts, and advanced animations.
- **EmailJS** - Client-side email service for contact form submissions.
- **Local Font Hosting** - Self-hosted Lexend (primary), Inter (supporting UI), and Playfair Display (headings).
- **Normalize.css** - CSS reset linked in `index.html` for cross-browser consistency.

### Architecture Patterns

- **Singleton**: `Website` ensures a single application instance through `bootstrap()` and `Website.the`.
- **Module**: ES6 modules with clear separation of concerns (`page-*`, `utils.js`, components).
- **Component**: Interactive pieces like `Carousel` and `Swarm` encapsulate their own state and lifecycle.

### Core Components

- **Website**: Bootstraps modules, manages shared references, coordinates galleries and swarm animation.
- **Swarm Animation**: Boid-style bee animation with scatter/home cycling, pointer interaction, and reduced-motion guardrails.
- **Carousel**: Accessible gallery slideshow with keyboard support, autoplay, and indicator dots.
- **Photo Catalog**: Immutable gallery data with shuffle support; organized by service type.

### Design System

- **Typography**: Lexend (body/UI), Inter (supporting UI), Playfair Display (headings), system monospace for code/SKUs; fluid scale via CSS clamp variables.
- **Color Tokens**: OKLCH custom properties for primaries, neutrals, borders, placeholders, and shadows.
- **Layout**: Spacing and size scales (`--sa-size-*`, `--sa-space-*`), grid/flex patterns, rounded cards, tables, and illustrated dividers.
- **Animation & Effects**: Hardware-accelerated transforms, carousel transitions, hover/focus states, and prefers-reduced-motion handling.

### Performance Practices

- Self-hosted fonts with `font-display: swap`.
- Optimized `.webp` gallery assets with lazy loading and responsive sizing.
- Minimal JS dependencies; efficient DOM queries and event delegation.
- CSS tokens for reuse; GPU-friendly transforms and `will-change`.

### Accessibility

- Semantic headings and landmarks; JSON-LD schema markup.
- Keyboard-accessible carousels and forms; logical tab order and skip-link-friendly anchors.
- High-contrast focus indicators and color-independent cues.
- Honors `prefers-reduced-motion` for animations.

### Development Notes

- Module bootstrap happens in `index.html` via `Website.bootstrap([...])`.
- Error handling uses try/catch in critical paths with console logging and graceful states.
- No build step; static serving works for dev and prod. HTTP/2 helps parallel module fetches.

### Browser Support

- Modern browsers with ES6 module support (Chrome 61+, Firefox 60+, Safari 10.1+); mobile-first responsive design with progressive enhancement.

### Content Management

- Galleries organized by service type and randomized for variety.
- Structured data for services/equipment; tables and cards are responsive for mobile.
