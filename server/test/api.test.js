import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.js';
import { localProvider } from '../src/providers/local.js';
import { createTmdbProvider, toCard, toDetail } from '../src/providers/tmdb.js';

async function withServer(provider, fn) {
  const server = createApp(provider, { staticDir: '/nonexistent' }).listen(0);
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    await fn(async (p) => {
      const res = await fetch(base + p);
      return { status: res.status, body: await res.json() };
    });
  } finally {
    server.close();
  }
}

test('offline API: home, catalogue, title, search, errors', async () => {
  await withServer(localProvider, async (get) => {
    const home = await get('/api/home');
    assert.equal(home.status, 200);
    assert.equal(home.body.hero.length, 5);
    assert.ok(home.body.rows.length >= 6);
    for (const row of home.body.rows) assert.ok(row.items.length > 0);

    const movies = await get('/api/movies?language=Tamil&genre=Drama&sort=rating&page=1');
    assert.ok(movies.body.items.every((i) => i.type === 'movie' && i.language === 'Tamil' && i.genres.includes('Drama')));
    const ratings = movies.body.items.map((i) => i.rating);
    assert.deepEqual(ratings, [...ratings].sort((a, b) => b - a));
    assert.ok(movies.body.availableGenres.includes('Drama'));

    const series = await get('/api/series');
    assert.equal(series.body.totalResults, 8);
    assert.ok(series.body.items.every((i) => i.type === 'series'));

    const all = await get('/api/movies');
    assert.equal(all.body.totalResults, 33);
    assert.equal(all.body.items.length, 20);
    assert.equal((await get('/api/movies?page=2')).body.items.length, 13);

    const detail = await get('/api/title/kaalam');
    assert.equal(detail.body.title.director, 'Kavin Raj');
    assert.ok(detail.body.title.cast.length > 0 && detail.body.title.similar.length > 0);

    const byActor = await get('/api/search?q=nora%20hale&type=all');
    assert.ok(byActor.body.actors.some((a) => a.name === 'Nora Hale'));
    assert.ok(byActor.body.items.length > 0);
    assert.equal((await get('/api/search?q=zzzzzz')).body.items.length, 0);
    assert.equal((await get('/api/search?q=')).body.items.length, 0);

    const missing = await get('/api/title/does-not-exist');
    assert.equal(missing.status, 404);
    assert.equal(missing.body.error.code, 'NOT_FOUND');
    assert.equal((await get('/api/nope')).status, 404);
    // Bad input is normalised, never a crash.
    assert.equal((await get('/api/movies?page=-5&sort=%00&genre=<script>')).status, 200);
  });
});

test('TMDB mapping produces the card/detail shape the web app expects', () => {
  const card = toCard({ id: 7, title: 'X', original_language: 'ta', genre_ids: [18, 878], release_date: '2024-05-01', vote_average: 7.46, poster_path: '/p.jpg', backdrop_path: '/b.jpg', overview: 'Hi' }, 'movie');
  assert.deepEqual([card.id, card.language, card.genres, card.year, card.rating, card.type], ['movie-7', 'Tamil', ['Drama', 'Sci-Fi'], 2024, 7.5, 'movie']);
  assert.equal(card.poster, 'https://image.tmdb.org/t/p/w500/p.jpg');
  const detail = toDetail({ id: 9, name: 'S', original_language: 'en', genres: [{ id: 18, name: 'Drama' }], first_air_date: '2023-01-01', number_of_seasons: 2, number_of_episodes: 16, created_by: [{ name: 'Maker' }], videos: { results: [{ site: 'YouTube', type: 'Trailer', official: true, key: 'abc', name: 'Trailer' }] }, credits: { cast: [{ id: 1, name: 'A', character: 'B', profile_path: null }] } }, 'tv');
  assert.equal(detail.type, 'series');
  assert.equal(detail.director, 'Maker');
  assert.equal(detail.trailer.embedUrl, 'https://www.youtube.com/embed/abc');
  assert.equal(detail.cast[0].photo, null);
});

test('TMDB provider: caching, auth header, error mapping', async () => {
  let calls = 0;
  const fake = async (url, init) => {
    calls += 1;
    assert.equal(init.headers.Authorization, 'Bearer tok');
    if (String(url).includes('/movie/404')) return { ok: false, status: 404, json: async () => ({}) };
    return { ok: true, status: 200, json: async () => ({ id: 5, title: 'T', original_language: 'hi', genres: [], credits: {}, videos: {} }) };
  };
  const provider = createTmdbProvider({ readToken: 'tok', fetchImpl: fake });
  const a = await provider.title('movie-5');
  await provider.title('movie-5');
  assert.equal(calls, 1, 'second call served from cache');
  assert.equal(a.title.language, 'Hindi');
  await assert.rejects(() => provider.title('movie-404'), { status: 404 });
  await assert.rejects(() => provider.title('nonsense'), { status: 404 });
  const broken = createTmdbProvider({ apiKey: 'k', fetchImpl: async () => { throw new Error('offline'); } });
  await assert.rejects(() => broken.home(), { status: 502 });
});
