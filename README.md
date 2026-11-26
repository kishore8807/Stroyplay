# StoryPlay

A cinematic streaming homepage built with React and Vite, paired with an Express API for an offline catalogue or optional live TMDB data.

## Features

- Fixed glass navbar, cinematic hero, and seven title carousels
- Search, language filtering, watchlist in local storage, and title details
- Responsive layout, reduced-motion support, keyboard focus, and semantic landmarks
- Express API with offline catalogue; optional TMDB integration

## Tech Stack

- React 19 and Vite 8
- Express API with CORS and compression
- oxlint

## Getting Started

Requires Node.js 18 or newer.

```bash
npm run install:all
npm run dev
```

Open the Vite URL printed in the terminal (typically http://localhost:5173). The API runs at http://localhost:4000 and is available through the Vite `/api` proxy.

## Production

```bash
npm run build
npm start
```

The production server runs at http://localhost:4000 and serves the built homepage and API.

## Available Scripts

| Script | Description |
|---|---|
| `npm run install:all` | Install root, server, and legacy client dependencies |
| `npm run dev` | Start the API and Vite development server |
| `npm run build` | Build the homepage into `dist/` |
| `npm start` | Start the API and serve `dist/` |
| `npm test` | Run the API tests |
| `npm run lint` | Run oxlint |

## Live TMDB Data (Optional)

To use live TMDB data, set either `TMDB_API_KEY` or `TMDB_READ_TOKEN` in `server/.env`. Without credentials the API uses its offline catalogue.

## API

| Route | Purpose |
|---|---|
| `GET /api/health` | API status and active data source |
| `GET /api/home` | Hero titles and catalogue rows |
| `GET /api/movies`, `/api/series` | Searchable and filterable catalogues |
| `GET /api/title/:id` | Details, cast, trailer, similar and recommended titles |
| `GET /api/search` | Search titles and people |

## Project Structure

```
src/       React + Vite homepage
server/    Express API, offline catalogue, TMDB provider, and API tests
client/    Previous React client retained in the repository
```
