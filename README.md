<!-- update:auto:start -->
# Vokerr.com

Personal portfolio for Vokerr: a React + Vite SPA with a sliced wordmark hero, then an angled project index with a live preview stage on desktop and stacked project cards on phones. Live at [vokerr.com](https://vokerr.com/) on Cloudflare Pages (`vokerrcom`).

## Quick Start

1. Clone this repo and open it.
2. Install Node **20** (see `.node-version`) and run `npm install`.
3. Run `npm run dev` and open the printed local URL.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server |
| `npm run build` | `tsc` then Vite production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | ESLint on `.ts`/`.tsx` |
| `npm run deploy` | Build, then `wrangler pages deploy dist --project-name=vokerrcom` |

## Directory overview

- `src/projects.ts` — the `PROJECTS` list (GitHub, MTG Keywords, Commander Quest, MapleStory Sim, InfinityV, Fishing Game, Mineral-Z)
- `src/App.tsx` — UI (hero, filters, desktop index + stage, mobile cards)
- `src/main.tsx` / `src/index.css` — React mount and global styles
- `public/previews/` — card screenshots as WebP (`<id>-800.webp` and `<id>-lg.webp`) plus the MTG Keywords MP4 clip and its poster
- `public/_headers` / `public/_redirects` / `public/404.html` — Cloudflare Pages caching and SPA fallback
- `wrangler.jsonc` — Cloudflare project name `vokerrcom` (Pages deploy still uses `--project-name=vokerrcom`; this file has no `pages_build_output_dir`)
- `index.html` — app shell

## Prerequisites

- Node.js 20.10+ (repo pins `20.10.0`)
- npm
- Cloudflare Wrangler via `npx` for deploys (authenticated Wrangler account)

## Configuration

No env files. Deploy target is Cloudflare Pages project **vokerrcom**. Custom domain: **vokerr.com**.

## Architecture

Single-page React 18 app (Vite 5, TypeScript, Tailwind base styles, plain CSS in `src/index.css`). Animations are CSS-only and limited to `transform`/`opacity`; `prefers-reduced-motion` turns them off. Fonts (Big Shoulders, Archivo, JetBrains Mono) are self-hosted via Fontsource. Cards are data in `PROJECTS`. Hashed JS/CSS live under `/assets/`. `_redirects` serves `index.html` for unknown routes but **404s missing `/assets/*` and `/previews/*`** so a cache miss cannot return HTML with status 200 at a `.js` URL (browsers then refuse `type="module"` and the page stays blank). Immutable `Cache-Control` applies only to `/assets/*`.
<!-- update:auto:end -->
