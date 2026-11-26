import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { HttpError } from './lib/errors.js';
import { parseCatalogQuery, parseSearchQuery } from './lib/params.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const wrap = (fn) => (req, res, next) => fn(req, res).then((data) => res.json(data)).catch(next);

export function createApp(provider, { staticDir = path.resolve(here, '../../client/dist') } = {}) {
  const app = express();
  app.disable('x-powered-by');
  app.use(cors());
  app.use(compression());

  app.get('/api/health', (_req, res) => res.json({ ok: true, provider: provider.name }));
  app.get('/api/home', wrap((req) => provider.home({ refresh: req.query.refresh === 'true' })));
  app.get('/api/movies', wrap((req) => provider.catalog({ ...parseCatalogQuery(req.query), type: 'movie' })));
  app.get('/api/series', wrap((req) => provider.catalog({ ...parseCatalogQuery(req.query), type: 'tv' })));
  app.get('/api/title/:id', wrap((req) => provider.title(req.params.id)));
  app.get(
    '/api/search',
    wrap(async (req) => {
      const query = parseSearchQuery(req.query);
      if (query.q.length < 1) return { items: [], actors: [], totalResults: 0, fetchedAt: new Date().toISOString() };
      return provider.search(query);
    }),
  );
  app.use('/api', (_req, _res, next) => next(new HttpError(404, 'NOT_FOUND', 'Unknown API route.')));

  // Serve the built web app (single-page app fallback) when it exists.
  if (fs.existsSync(path.join(staticDir, 'index.html'))) {
    app.use(express.static(staticDir, { maxAge: '1h', index: false }));
    app.get('*', (_req, res) => res.sendFile(path.join(staticDir, 'index.html')));
  }

  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    const status = err instanceof HttpError ? err.status : 500;
    if (status === 500) console.error(err);
    res.status(status).json({ error: { code: err.code ?? 'INTERNAL_ERROR', message: status === 500 ? 'Something went wrong on the server.' : err.message } });
  });

  return app;
}
