# Entice HR Solutions — Website

An Apple-style minimal B2B marketing website for **Entice HR Solutions**, covering recruitment, executive search, payroll, and HR consulting for growing companies.

Built with **React 19 + TypeScript + Vite + Tailwind CSS v4 + Motion (Framer Motion)**.

## Tech Stack

- **React 19** — UI library
- **TypeScript** — type safety
- **Vite 6** — dev server & bundler
- **Tailwind CSS v4** — styling (via `@tailwindcss/vite` plugin)
- **Motion** — animations
- **lucide-react** — icons

## Project Structure

```
├── index.html                # HTML entry point
├── src/
│   ├── main.tsx               # React entry point
│   ├── App.tsx                # Root component (page switcher)
│   ├── index.css              # Tailwind import
│   ├── types.ts                # Shared TypeScript types
│   ├── data/
│   │   └── content.ts          # Static site content (services, jobs, blog, testimonials)
│   ├── components/
│   │   ├── Logo.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── CounterAnimation.tsx
│   │   ├── ROICalculator.tsx
│   │   ├── LeadModal.tsx
│   │   ├── WhatsAppWidget.tsx
│   │   └── ErrorBoundary.tsx
│   └── pages/
│       ├── HomePage.tsx
│       ├── AboutPage.tsx
│       ├── ServicesPage.tsx
│       ├── CareersPage.tsx
│       ├── BlogsPage.tsx
│       └── ContactPage.tsx
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Running in VS Code

**Prerequisites:** [Node.js](https://nodejs.org/) v18 or later (v20+ recommended).

1. Open this folder in VS Code (`File > Open Folder…`).
2. Open a terminal in VS Code (`` Ctrl+` `` / `` Cmd+` ``).
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```
5. The site opens automatically at **http://localhost:3000**.

### Other commands

| Command           | Purpose                                        |
|--------------------|------------------------------------------------|
| `npm run dev`       | Start local dev server with hot reload          |
| `npm run build`     | Type-check and build for production (`dist/`)   |
| `npm run preview`   | Preview the production build locally            |
| `npm run lint`      | Run TypeScript type-checking only               |

### Recommended VS Code extensions
- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **Prettier** (optional, for formatting)

## Notes

- This is a fully client-side, static single-page app — no backend/server or API keys required.
- Page navigation is handled with local React state (`PageType` in `src/types.ts`), not a router library.
- All site copy (services, job listings, blog posts, testimonials, company details) lives in `src/data/content.ts` — edit that file to update content without touching component code.
