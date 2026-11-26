import { LANGUAGES, GENRES } from '../../data/catalog.js';

export const PAGE_SIZE = 20;
export const SORTS = ['featured', 'rating', 'newest', 'az', 'popular'];

const pick = (value, allowed, fallback) => {
  const match = allowed.find((item) => item.toLowerCase() === String(value ?? '').toLowerCase());
  return match ?? fallback;
};

/** Normalises and validates query-string input so providers can trust it. */
export function parseCatalogQuery(query = {}) {
  const page = Math.max(1, Math.min(500, Number.parseInt(query.page, 10) || 1));
  return {
    language: pick(query.language, LANGUAGES, 'All'),
    genre: pick(query.genre, GENRES, 'All'),
    sort: pick(query.sort, SORTS, 'featured'),
    page,
  };
}

export function parseSearchQuery(query = {}) {
  const base = parseCatalogQuery(query);
  return {
    ...base,
    q: String(query.q ?? '').trim().slice(0, 100),
    type: pick(query.type, ['all', 'movie', 'tv', 'person'], 'all'),
  };
}

export const paginate = (items, page, size = PAGE_SIZE) => ({
  items: items.slice((page - 1) * size, page * size),
  totalResults: items.length,
  totalPages: Math.max(1, Math.ceil(items.length / size)),
});
