# StoryPlay

A streaming-site demo: **React + Vite** front end and an **Express** API.
The API serves a built-in offline catalogue (41 titles, all artwork included) or, if you add TMDB credentials, live TMDB data.

## Quick start

```bash
npm run install:all     # installs root, client and server dependencies
npm run dev             # API on :4000, web app on http://localhost:5173
```

## Production

```bash
npm run build           # builds client/dist
npm start               # one server on :4000 serves the API and the built site
```

## Live TMDB data (optional)

```bash
cp server/.env.example server/.env   # then fill in ONE of TMDB_API_KEY or TMDB_READ_TOKEN
```

Without credentials the server logs `source: offline catalogue`. With them it logs `source: TMDB`.
Title ids look like `movie-123` / `tv-456` in TMDB mode and like `kaalam` in offline mode.

## Layout

```
client/   React app (src/pages, components, context, hooks, lib) + public/ (images, sample video)
server/   Express API (src/app.js, providers/local.js, providers/tmdb.js) + data/catalog.js + tests
```

## API

| Route | Purpose |
|---|---|
| `GET /api/health` | status and active data source |
| `GET /api/home` | hero titles and rows (`?refresh=true` bypasses cache) |
| `GET /api/movies`, `/api/series` | `language`, `genre`, `sort` (featured, rating, newest, az), `page` |
| `GET /api/title/:id` | full details, cast, trailer, similar and recommended |
| `GET /api/search` | `q`, `type` (all, movie, tv, person), `language`, `genre` |

## Tests

`npm test` runs the API tests (offline provider, route behaviour, TMDB mapping, caching and error handling with a mocked fetch).

## Notes

- Watchlist and "Continue Watching" are stored in `localStorage`; there are no accounts.
- "Watch Now" plays a short licensed sample clip (Big Buck Bunny, CC BY 3.0), not full titles.
- TMDB mode was tested with mocked responses only; check it once with your real key.
