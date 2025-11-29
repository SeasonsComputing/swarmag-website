# swarmAg Website Architecture

## Overview

The swarmAg website is a modern, single-page web application built for a North Texas ag services company. The application showcases drone spraying/spreading services and mesquite & brush mitigation treatments, featuring interactive photo galleries, contact forms, and an engaging bee swarm animation system.

## Technology Stack

### Frontend Framework

- **Vanilla JavaScript (ES6+)** - No framework dependencies for maximum performance and control
- **HTML5** - Semantic markup with accessibility features and structured data
- **CSS3** - Custom design system with fluid typography, responsive layouts, and advanced animations

### Build Tools & Dependencies

- **EmailJS** - Client-side email service for contact form submissions
- **Local Font Hosting** - Self-hosted Lexend (primary), Inter (supporting UI), and Playfair Display (headings)
- **Normalize.css** - CSS reset for consistent cross-browser rendering
  (fonts and reset are loaded via CSS, not linked in HTML)

## Project Structure

```text
swarmag-website/
├── README.md                 # Project architecture documentation
├── index.html                # Main HTML document with semantic structure
├── styles/                   # CSS stylesheets and design system
│   ├── normalize.css         # Cross-browser CSS reset
│   ├── Carousel.css          # Carousel component styles
│   └── index.css             # Main stylesheet with design tokens
├── modules/                  # JavaScript modules
│   ├── Website.js            # Main application singleton & orchestration
│   ├── Swarm.js              # Bee swarm animation system (Bee class)
│   ├── Carousel.js           # Photo carousel component
│   ├── PhotoCatalog.js       # Immutable gallery data management
│   ├── page-contact.js       # Contact form initialization & EmailJS integration
│   ├── page-dynamics.js      # Scroll animations & sticky header behavior
│   ├── page-errors.js        # Error handling & logging utilities
│   ├── page-galleries.js     # Gallery setup & carousel integration
│   └── utils.js              # Utility functions ($/$$, immutable, shuffle)
├── assets/                   # Static assets (optimized & self-hosted)
│   ├── hero.mp4              # Hero background video
│   ├── swarmag-logo-*.png    # Logo variants (tree, wordmark)
│   ├── clipart-*.png         # Service illustrations (drones, mesquite, skidsteer)
│   ├── apple-touch-icon*.png # PWA touch icons (57x57 to 180x180)
│   └── *.ttf                 # Self-hosted fonts (Lexend, Inter, Playfair Display)
├── galleries/                # Photo gallery organized by service type
│   ├── aerial/               # Aerial drone photos
│   │   └── aerial-*.webp
│   └── ground/               # Ground machinery photos
│       └── ground-*.webp
```

## Architecture Patterns

### Singleton Pattern

The `Website` class implements a singleton pattern to ensure only one application instance exists throughout the lifecycle:

```javascript
export default class Website {
  static #the = null;

  static get the() {
    if (!Website.#the) throw new Error('bootstrap() must be completed first!');
    return Website.#the;
  }

  static bootstrap(modules = []) {
    if (Website.#the) throw new Error("bootstrap() already completed!");
    Website.#the = new Website();
    // ... initialization logic
  }
}
```

### Module Pattern

The application uses ES6 modules with clear separation of concerns:

- **Website.js** - Application orchestration and singleton management
- **page-*.js** - Feature-specific initialization modules
- **utils.js** - Shared utility functions and DOM helpers

### Component Pattern

Interactive components like `Carousel` and `Swarm` are self-contained classes with their own state management, DOM manipulation, and lifecycle methods.

## Core Components

### Website (Main Application)

**Purpose**: Application bootstrap and module orchestration.

**Key Responsibilities:**

- Initialize all page modules dynamically.
- Manage gallery collections and references.
- Coordinate swarm animation system.
- Provide singleton access pattern.

**Technical Details:**

- Uses DOMContentLoaded event for initialization.
- Dynamic module loading with error handling.
- Manages application state and references.

### Swarm Animation System

**Purpose**: Interactive bee swarm visual effect using flocking algorithms.

**Features:**

- Craig Reynolds' boid algorithm implementation.
- Mouse/touch interaction for swarm targeting.
- Automatic scatter/home cycling with screen-size adaptive timing.
- Hardware-accelerated CSS transforms.

**Technical Details:**

- RequestAnimationFrame for smooth 60fps animation.
- Flocking behaviors: separation, alignment, cohesion.
- Boundary wrapping for seamless movement.
- Screen size-based duration calculation using linear interpolation.

### Carousel Component

**Purpose**: Photo gallery slideshow with accessibility features.

**Features:**

- Manual navigation (prev/next buttons).
- Indicator dots for direct slide access.
- Auto-play with configurable timing.
- Full keyboard and screen reader support.

**Technical Details:**

- CSS transforms for smooth transitions.
- Event delegation for indicator interactions.
- Circular navigation with bounds checking.
- ARIA labels and roles for accessibility.

### Photo Catalog

**Purpose**: Immutable gallery data management with randomization.

**Features:**

- Predefined gallery collections by service type.
- Random shuffling for dynamic presentation.
- Immutable data structures for safety.

**Technical Details:**

- Frozen objects prevent accidental mutation.
- Shuffle utility with configurable subset selection.
- Path-based photo organization.

## Design System

### Typography

- `--sa-family-main`: Lexend primary for body and UI.
- `--sa-family-info`: Inter supporting UI text.
- `--sa-family-heading`: Playfair Display for headings.
- `--sa-family-mono`: System monospace for code/SKUs.
- Scale via `--sa-font-base`, `--sa-font-normal`, and `--sa-font-button` clamp values in CSS (fluid type).

### Color Palette

Using OKLCH color tokens for consistency and future-proofing.

```css
:root {
  /* Colors - Fundamental */
  --sa-color-dark: 44.4385% 0.0096 73.6332;
  --sa-color-darker: 21.6115% 0.0061 56.0435;
  --sa-color-white: 99.1042% 0 0;
  --sa-color-bright: 100% 0 0;

  /* Colors - Primary */
  --sa-color-green: 70.9546% 0.1015 123.2667;
  --sa-color-orange: 76.885% 0.1231 80.8277;
  --sa-color-eggshell: 99.0925% 0.0122 91.5145;
  --sa-color-mint: 98.1943% 0.018 155.8257;
  --sa-color-sky: 92.2565% 0.0419 239.4217;

  /* Colors - Other */
  --sa-color-border: 92.758% 0.0058 264.5313;
  --sa-color-placeholder: 71.3651% 0.0192 261.3174;

  /* Colors - Footer */
  --sa-color-footer-border: 31.4868% 0.0094 39.3496;
  --sa-color-footer-text: 71.6071% 0.009 56.2591;

  /* Shadows */
  --sa-shadow-hard: 0 10px 15px -3px oklch(0% 0 0 / 0.1), 0 4px 6px -2px oklch(0% 0 0 / 0.35);
  --sa-shadow-soft: 0 10px 15px -3px oklch(0% 0 0 / 0.1), 0 4px 6px -2px oklch(0% 0 0 / 0.05);
  --sa-shadow-press: 0 6px 12px oklch(0% 0 0 / 0.3), 0 3px 6px oklch(0% 0 0 / 0.2);
  --sa-shadow-text: 0 0 1px oklch(var(--sa-color-white) / 0.15);
  --sa-shadow-focus: 0 0 0 2px oklch(72.2746% 0.192 149.5793 / 0.5);
}
```

### Layout System

- **Size scale**: `--sa-size-lg`, `--sa-size-md`, `--sa-size-sm`, `--sa-size-xs` for layout breakpoints.
- **Spacing scale**: `--sa-space-xs` through `--sa-space-4xl`; gaps use `--sa-space-gap` for consistent inter-element spacing.
- **Flexbox/Grid**: Section layouts with two-column options and centered stacks.
- **Cards/Tables**: Rounded cards, equipment and services tables with section rows.
- **Dividers**: Illustrated dividers separating major sections.

### Animation & Effects

- **Swarm Animation**: Boid-based bees with scatter/home cycling.
- **Carousel Transitions**: Hardware-accelerated transforms with swipe and hover pause.
- **Hover/Focus Effects**: Buttons and icons with transitions and shadows.
- **Reduced Motion**: `prefers-reduced-motion` guardrails.

## Performance Optimizations

### Font Loading Strategy

- Self-hosted fonts defined via `@font-face` in CSS (no external font CDNs).
- `font-display: swap` for immediate text rendering.
- Variable Lexend TTF for flexible weights; Inter and Playfair Display as supporting faces.

### Image Optimization

- Lazy loading for gallery images with loading states.
- Optimized `.webp` gallery assets.
- Responsive sizing via CSS and container layout.

### JavaScript Optimization

- ES6 modules with no bundler overhead.
- Minimal dependencies (EmailJS for forms).
- Efficient DOM queries with cached selectors.
- Event delegation for dynamic content.

### CSS Optimization

- Utility-style tokens via CSS custom properties.
- Hardware acceleration with `transform` and `will-change`.

## Accessibility Features

### Semantic HTML

- Proper heading hierarchy for screen readers.
- Semantic landmarks (header, main, footer).
- Structured data with JSON-LD schema markup.
- ARIA labels and roles throughout.

### Keyboard Navigation

- Focus management for interactive elements.
- Keyboard-accessible carousels and forms.
- Skip-link-friendly anchor structure.
- Logical tab order.

### Motion Preferences

- `prefers-reduced-motion` media query support.
- Respects user motion preferences.
- Graceful degradation for animation preferences.

### Color & Contrast

- WCAG-conscious color choices.
- High-contrast focus indicators.
- Color-independent navigation cues.

## Development Workflow

### Module Loading

The application uses a bootstrap pattern with dynamic ES6 module loading:

```javascript
// index.html
<script type="module">
  import Website from "./modules/Website.js";
  Website.bootstrap([
    "page-errors",
    "page-dynamics",
    "page-galleries",
    "page-contact",
  ]);
</script>
```

### Error Handling

- Try-catch blocks in critical paths.
- Graceful degradation for failed module loads.
- Console error logging for debugging.
- User-friendly error states.

### Build Process

- **No build step required**; direct ES6 module loading in modern browsers.
- **Development server** can serve modules directly.
- **Production ready** with HTTP/2 module serving.
- **Hot reloading** support in development.

## Browser Support

### Target Browsers

- **Modern browsers** with ES6 module support (Chrome 61+, Firefox 60+, Safari 10.1+).
- **Progressive enhancement** for older browsers.
- **Mobile-first responsive design**.

## Deployment Considerations

### Hosting Requirements

- **HTTPS required** for ES6 module loading.
- **HTTP/2 recommended** for multiple module requests.
- **CDN optional** for asset delivery.

### Performance Monitoring

- **Core Web Vitals** tracking recommended.
- **Lighthouse audits** for ongoing optimization.
- **Real User Monitoring** for performance insights.

### SEO & Discovery

- **Structured data** with Schema.org markup.
- **Meta tags** for social sharing and search engines.
- **Canonical URLs** for duplicate content prevention.
- **XML sitemap** potential.

## Content Management

### Gallery System

- **Organized by service type** (aerial, ground).
- **Randomized display** for dynamic user experience.
- **Lazy loading** for performance.
- **Accessibility compliant** image presentation.

### Service Catalog

- **Structured data format** for services and equipment.
- **SKU-based organization** for inventory management.
- **Responsive table design** for mobile compatibility.
