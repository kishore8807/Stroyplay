# StoryPlay

A premium OTT streaming homepage built with React + Vite. Dark navy/black cinematic theme with blue accents, inspired by the Amazon Prime Video browse experience.

![StoryPlay Screenshot](public/screenshot.png#gh-light-mode-only)
![StoryPlay Dark Screenshot](public/screenshot-dark.png#gh-dark-mode-only)

## Features

- ✅ Fixed glass navbar with logo, section links, search, profile, and a mobile menu
- ✅ Full-bleed cinematic hero with Ken Burns backdrop, rating/meta, Watch Now and More Info
- ✅ Seven horizontal carousels: Trending, Tamil, Telugu, Hindi, English, Web Series, Recently Added
- ✅ Poster cards with hover play + watchlist actions
- ✅ Live title search, language filter, and a persistent watchlist (localStorage)
- ✅ Detail modal, toast feedback, and a responsive layout for mobile, tablet, and desktop
- ✅ Reduced-motion support, visible keyboard focus, and semantic landmarks

## Tech Stack

- **React 19** with **Vite 8** for fast dev server and HMR
- **oxlint** for ultra-fast linting
- **CSS-first** styling with responsive design
- Poster/backdrop art via **Lorem Picsum** (Unsplash-licensed, no API keys needed)
- No backend, database, or API required — completely client-side

## Getting Started

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite (typically http://localhost:5173).

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Produce production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run oxlint |

## Project Structure

```
src/
├── App.jsx                 # Shell, view state, search/filter/watchlist logic
├── App.css                 # Design system + layout + responsive styles
├── index.css               # Tokens, reset, typography, a11y primitives
├── data/movies.js          # Sample catalogue + row definitions
└── components/
    ├── Navbar.jsx
    ├── Hero.jsx
    ├── MovieRow.jsx
    ├── MovieCard.jsx
    ├── FilterBar.jsx
    ├── DetailModal.jsx
    ├── Footer.jsx
    └── Icons.jsx
```

## Notes

- This is the homepage UI only — no backend, database, authentication, payments, or admin panel
- Poster and backdrop art uses **Lorem Picsum** (Unsplash-licensed photos), so the demo needs no paid API and no copyrighted film assets
- Watchlist persists to browser `localStorage` — data survives page refreshes
- Designed to work with the `opencode-token-optimizer` plugin for reduced token consumption

## Token Optimizer

This project uses the [opencode-token-optimizer](https://github.com/opencode-ai/opencode-token-optimizer) plugin (v0.1.0). It automatically routes trivial prompts to fast models and reduces token waste across the workflow.

At startup you'll see:

```
[token-optimizer] Loaded 3 categories from oh-my-openagent.json
[token-optimizer] Injected quick routing rules (maxPromptChars=100, 4 patterns)
```

## License

MIT