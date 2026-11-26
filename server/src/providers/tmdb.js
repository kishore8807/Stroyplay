import { GENRES } from '../../data/catalog.js';
import { HttpError } from '../lib/errors.js';
import { TtlCache } from '../lib/cache.js';
import { PAGE_SIZE } from '../lib/params.js';

const API = 'https://api.themoviedb.org/3';
const IMG = 'https://image.tmdb.org/t/p';
const LANG_CODES = { Tamil: 'ta', Telugu: 'te', Malayalam: 'ml', Hindi: 'hi', English: 'en' };
const LANG_NAMES = Object.fromEntries(Object.entries(LANG_CODES).map(([name, code]) => [code, name]));

const GENRE_NAMES = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
  14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV Movie',
  53: 'Thriller', 10752: 'War', 37: 'Western', 10759: 'Action & Adventure', 10762: 'Kids', 10763: 'News', 10764: 'Reality',
  10765: 'Sci-Fi & Fantasy', 10766: 'Soap', 10767: 'Talk', 10768: 'War & Politics',
};

// UI genre -> TMDB genre ids. TV has no Romance/Horror/Thriller genre, so the closest ones are used.
const GENRE_IDS = {
  movie: { Action: 28, Comedy: 35, Drama: 18, Thriller: 53, Romance: 10749, Horror: 27, 'Sci-Fi': 878, Crime: 80, Mystery: 9648, Fantasy: 14, Family: 10751, Animation: 16, Documentary: 99, Political: 36 },
  tv: { Action: 10759, Comedy: 35, Drama: 18, Thriller: 9648, Romance: 18, Horror: 9648, 'Sci-Fi': 10765, Crime: 80, Mystery: 9648, Fantasy: 10765, Family: 10751, Animation: 16, Documentary: 99, Political: 10768 },
};

const SORT_BY = {
  movie: { featured: 'popularity.desc', popular: 'popularity.desc', rating: 'vote_average.desc', newest: 'primary_release_date.desc', az: 'original_title.asc' },
  tv: { featured: 'popularity.desc', popular: 'popularity.desc', rating: 'vote_average.desc', newest: 'first_air_date.desc', az: 'name.asc' },
};

const img = (path, size) => (path ? `${IMG}/${size}${path}` : null);
const year = (date) => (date ? Number.parseInt(date.slice(0, 4), 10) || null : null);
const minutes = (m) => (m ? (m >= 60 ? `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, '0')}m` : `${m}m`) : null);

/** Maps a TMDB movie/tv record (list or detail shape) to the card shape the web app expects. */
export function toCard(raw, kind) {
  const isTv = kind === 'tv';
  const genreNames = raw.genres
    ? raw.genres.map((g) => GENRE_NAMES[g.id] ?? g.name)
    : (raw.genre_ids ?? []).map((id) => GENRE_NAMES[id]).filter(Boolean);
  const date = isTv ? raw.first_air_date : raw.release_date;
  const runtime = isTv ? raw.episode_run_time?.[0] : raw.runtime;
  return {
    id: `${kind}-${raw.id}`,
    title: raw.title ?? raw.name ?? 'Untitled',
    type: isTv ? 'series' : 'movie',
    language: LANG_NAMES[raw.original_language] ?? String(raw.original_language ?? '').toUpperCase(),
    genres: genreNames,
    genre: genreNames[0] ?? (isTv ? 'Series' : 'Film'),
    year: year(date),
    releaseDate: date || undefined,
    rating: Math.round((raw.vote_average ?? 0) * 10) / 10,
    duration: minutes(runtime),
    description: raw.overview || 'No synopsis is available for this title yet.',
    poster: img(raw.poster_path, 'w500'),
    backdrop: img(raw.backdrop_path, 'w1280'),
    trailer: null,
  };
}

function pickTrailer(videos = []) {
  const yt = videos.filter((v) => v.site === 'YouTube');
  const best = yt.find((v) => v.type === 'Trailer' && v.official) ?? yt.find((v) => v.type === 'Trailer') ?? yt.find((v) => v.type === 'Teaser');
  return best
    ? { name: best.name, embedUrl: `https://www.youtube.com/embed/${best.key}`, watchUrl: `https://www.youtube.com/watch?v=${best.key}` }
    : null;
}

export function toDetail(raw, kind) {
  const isTv = kind === 'tv';
  const crew = raw.credits?.crew ?? [];
  return {
    ...toCard(raw, kind),
    tagline: raw.tagline || undefined,
    director: isTv ? raw.created_by?.[0]?.name : crew.find((c) => c.job === 'Director')?.name,
    seasonsCount: isTv ? raw.number_of_seasons : undefined,
    episodesCount: isTv ? raw.number_of_episodes : undefined,
    cast: (raw.credits?.cast ?? []).slice(0, 12).map((c) => ({ id: c.id, name: c.name, character: c.character, photo: img(c.profile_path, 'w185') })),
    trailer: pickTrailer(raw.videos?.results),
    similar: (raw.similar?.results ?? []).slice(0, 12).map((r) => toCard(r, kind)),
    recommendations: (raw.recommendations?.results ?? []).slice(0, 12).map((r) => toCard(r, kind)),
  };
}

export function createTmdbProvider({ apiKey, readToken, fetchImpl = fetch, ttlMs } = {}) {
  if (!apiKey && !readToken) throw new Error('TMDB credentials are required');
  const cache = new TtlCache(ttlMs);

  async function call(path, params = {}, { refresh = false } = {}) {
    const url = new URL(API + path);
    for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v));
    if (!readToken) url.searchParams.set('api_key', apiKey);
    const key = url.pathname + url.search.replace(/api_key=[^&]+&?/, '');
    if (!refresh) {
      const hit = cache.get(key);
      if (hit) return hit;
    }
    let res;
    try {
      res = await fetchImpl(url, { headers: readToken ? { Authorization: `Bearer ${readToken}` } : {} });
    } catch {
      throw new HttpError(502, 'UPSTREAM_UNREACHABLE', 'Could not reach TMDB.');
    }
    if (res.status === 404) throw new HttpError(404, 'NOT_FOUND', 'That title was not found on TMDB.');
    if (res.status === 401) throw new HttpError(502, 'UPSTREAM_AUTH', 'TMDB rejected the configured credentials.');
    if (!res.ok) throw new HttpError(502, 'UPSTREAM_ERROR', `TMDB responded with status ${res.status}.`);
    return cache.set(key, await res.json());
  }

  const discover = (kind, { language, genre, sort, page, refresh }) =>
    call(
      `/discover/${kind}`,
      {
        with_original_language: LANG_CODES[language],
        with_genres: genre === 'All' ? undefined : GENRE_IDS[kind][genre],
        sort_by: SORT_BY[kind][sort] ?? 'popularity.desc',
        'vote_count.gte': sort === 'rating' ? 100 : undefined,
        include_adult: false,
        page,
      },
      { refresh },
    );

  // Merges several already-ordered result lists into one page of the requested order.
  const mergeLists = (lists, sort) => {
    const by = { rating: (a, b) => b.rating - a.rating, newest: (a, b) => (b.releaseDate ?? '').localeCompare(a.releaseDate ?? ''), az: (a, b) => a.title.localeCompare(b.title) }[sort];
    if (by) return lists.flat().sort(by);
    const out = [];
    for (let i = 0; i < Math.max(...lists.map((l) => l.length)); i++) for (const l of lists) if (l[i]) out.push(l[i]);
    return out; // "featured"/"popular": round-robin keeps every language represented
  };

  return {
    name: 'tmdb',

    async home({ refresh = false } = {}) {
      const langRows = Object.keys(LANG_CODES).map((language) => ({
        id: language.toLowerCase(),
        title: `${language} Cinema`,
        load: () => discover('movie', { language, genre: 'All', sort: 'popular', page: 1, refresh }),
        kind: 'movie',
      }));
      const defs = [
        { id: 'trending', title: 'Trending Now', kind: 'movie', load: () => call('/trending/movie/week', {}, { refresh }) },
        { id: 'top-rated', title: 'Top Rated', kind: 'movie', load: () => call('/movie/top_rated', {}, { refresh }) },
        { id: 'series', title: 'Web Series', kind: 'tv', load: () => discover('tv', { language: 'All', genre: 'All', sort: 'popular', page: 1, refresh }) },
        ...langRows,
      ];
      const settled = await Promise.allSettled(defs.map((d) => d.load()));
      const rows = defs
        .map((d, i) => ({ id: d.id, title: d.title, items: settled[i].status === 'fulfilled' ? settled[i].value.results.slice(0, 14).map((r) => toCard(r, d.kind)) : [] }))
        .filter((r) => r.items.length > 0);
      if (rows.length === 0) {
        const failure = settled.find((s) => s.status === 'rejected');
        throw failure?.reason ?? new HttpError(502, 'UPSTREAM_ERROR', 'TMDB returned no titles.');
      }
      const hero = (rows.find((r) => r.id === 'trending') ?? rows[0]).items.filter((i) => i.backdrop).slice(0, 5);
      return { hero, rows, fetchedAt: new Date().toISOString() };
    },

    async catalog({ type, language, genre, sort, page }) {
      const kind = type === 'tv' || type === 'series' ? 'tv' : 'movie';
      const availableGenres = GENRES;
      if (language !== 'All') {
        const data = await discover(kind, { language, genre, sort, page });
        return {
          items: data.results.map((r) => toCard(r, kind)),
          totalResults: data.total_results,
          totalPages: Math.min(data.total_pages, 500),
          availableGenres,
          fetchedAt: new Date().toISOString(),
        };
      }
      // "All" merges the five supported languages, then sorts the merged page.
      const pages = await Promise.all(Object.keys(LANG_CODES).map((l) => discover(kind, { language: l, genre, sort, page })));
      const merged = mergeLists(pages.map((d) => d.results.map((r) => toCard(r, kind))), sort);
      return {
        items: merged.slice(0, PAGE_SIZE * 2),
        totalResults: pages.reduce((sum, d) => sum + d.total_results, 0),
        totalPages: Math.min(Math.max(...pages.map((d) => d.total_pages)), 500),
        availableGenres,
        fetchedAt: new Date().toISOString(),
      };
    },

    async title(id) {
      const match = /^(movie|tv)-(\d+)$/.exec(id);
      if (!match) throw new HttpError(404, 'NOT_FOUND', 'Unknown title id.');
      const [, kind, tmdbId] = match;
      const raw = await call(`/${kind}/${tmdbId}`, { append_to_response: 'credits,videos,similar,recommendations' });
      return { title: toDetail(raw, kind), fetchedAt: new Date().toISOString() };
    },

    async search({ q, type, language, genre }) {
      const data = await call(type === 'all' ? '/search/multi' : `/search/${type}`, { query: q, include_adult: false });
      const actors = [];
      const items = [];
      for (const r of data.results) {
        const kind = (r.media_type ?? (type === 'tv' ? 'tv' : 'movie')) === 'tv' ? 'tv' : 'movie';
        if (r.media_type === 'person' || type === 'person') {
          actors.push({ id: r.id, name: r.name });
          for (const known of r.known_for ?? []) if (known.media_type === 'movie' || known.media_type === 'tv') items.push(toCard(known, known.media_type));
        } else items.push(toCard(r, kind));
      }
      const seen = new Set();
      const filtered = items.filter((i) => {
        if (seen.has(i.id)) return false;
        seen.add(i.id);
        return (language === 'All' || i.language === language) && (genre === 'All' || i.genres.includes(genre));
      });
      return { items: filtered, actors, totalResults: filtered.length, fetchedAt: new Date().toISOString() };
    },
  };
}
