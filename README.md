# Olympia Fitness Center

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Built with Astro](https://img.shields.io/badge/Built_with-Astro-BC52EE?style=flat-square&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Tested_with-Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white)](https://playwright.dev/)
[![Vitest](https://img.shields.io/badge/Unit_Tests-Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Deployed on GitHub Pages](https://img.shields.io/badge/Deployment-GitHub_Pages-222222?style=flat-square&logo=githubpages&logoColor=white)](https://sankalpa-kmcp.github.io/olympia-fitness-center/)

A high-performance static website for Olympia Fitness Center in Wadduwa, Sri Lanka. Built with Astro, TypeScript, and modern web standards with automated accessibility, SEO validation, and end-to-end testing suites.

Live Production Site: [https://sankalpa-kmcp.github.io/olympia-fitness-center/](https://sankalpa-kmcp.github.io/olympia-fitness-center/)

---

## Technical Highlights

- **Static Content Architecture** — Zero-runtime JavaScript delivery for static marketing routes, ensuring instant First Contentful Paint (FCP) and optimal Core Web Vitals.
- **Local Business Structured Data** — Automated Schema.org JSON-LD generation (`LocalBusiness`, `ExerciseGym`) for enhanced local search engine discovery and Google Maps entity resolution.
- **Multi-Tier Testing Suite** — Unit tests covering business data models and SEO helpers via Vitest; end-to-end smoke, SEO tag conformance, and accessibility (a11y) audits via Playwright.
- **Automated CI/CD Deployment** — Pushes to the `main` branch run formatting checks, typechecks, linters, unit tests, and Playwright suites before deploying static build artifacts to GitHub Pages.

---

## Project Structure

```
/ (Repository Root)
+-- public/              # Static public assets, favicons, robots.txt
+-- src/
|   +-- assets/          # Editorial imagery and local assets
|   +-- components/      # Modular Astro components (brand, business, shell, SEO)
|   +-- config/          # Centralized route definitions and business configuration
|   +-- data/            # Structured business, services, and schedule datasets
|   +-- layouts/         # Base HTML layout shell and OpenGraph metadata
|   +-- pages/           # Astro file-based routing (Index, Services, Zumba, Contact, 404)
|   +-- styles/          # Design tokens, CSS effects, and utilities
|   +-- utils/           # SEO helpers, contact link generators, and JSON-LD builders
+-- tests/
|   +-- e2e/             # Playwright browser integration tests (a11y, SEO, smoke)
|   +-- unit/            # Vitest unit test suites
+-- astro.config.mjs     # Astro configuration
+-- playwright.config.ts # Playwright browser test harness configuration
+-- vitest.config.ts     # Vitest unit configuration
```

---

## Prerequisites

- **Node.js**: v22.12.0 or newer (v24.x recommended)
- **npm**: v9.6.5 or newer

---

## Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sankalpa-KMCP/olympia-fitness-center.git
   cd olympia-fitness-center
   ```

2. **Install project dependencies:**
   ```bash
   npm ci
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install chromium
   ```

4. **Start local development server:**
   ```bash
   npm run dev
   ```

---

## Verification & Build Commands

| Command | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run check` | Execute Astro type-checking and component validation |
| `npm run lint` | Run ESLint checks across codebase |
| `npm run format:check` | Verify Prettier formatting compliance |
| `npm run test` | Execute all Vitest unit tests |
| `npm run test:watch` | Run unit tests in interactive watch mode |
| `npm run test:e2e` | Run Playwright end-to-end browser integration tests |
| `npm run test:a11y` | Run automated accessibility tests |
| `npm run test:seo` | Validate production SEO meta tags and schema markup |
| `npm run build` | Compile optimized static production bundle to `dist/` |
| `npm run preview` | Serve production build locally for verification |

---

## Automated Deployment

Pushes to `main` automatically trigger the GitHub Actions workflow (`.github/workflows/deploy.yml`). The pipeline executes:

1. Code formatting validation (`npm run format:check`)
2. Static typecheck and schema validation (`npm run check`)
3. Unit tests (`npm run test`)
4. Static production build (`npm run build`)
5. Playwright headless browser tests (`npm run test:e2e`)
6. Artifact upload and GitHub Pages deployment

---

## License

This project is licensed under the [MIT License](LICENSE).
