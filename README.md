# Olympia Fitness Center website

Static Astro website with project-local unit, browser, accessibility, and SEO validation.

## Requirements

- Node.js 22.12.0 or newer
- npm 9.6.5 or newer

The project was initialized with Node.js 24.12.0 and npm 11.6.2. The minimum versions follow Astro's package requirements.

## Setup

```sh
npm ci
npx playwright install chromium
```

## Commands

```sh
npm run dev
npm run format:check
npm run lint
npm run check
npm run test
npm run build
npm run preview
npm run test:e2e
npm run test:a11y
npm run test:seo
```

Run `npm run format` to apply repository formatting. Use `npm run test:watch` while working on unit tests.

The browser suites build the production site automatically, start a local production preview, and use Playwright's managed Chromium installation. Re-run `npx playwright install chromium` after updating Playwright.
