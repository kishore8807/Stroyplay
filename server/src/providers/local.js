import { CATALOG, GENRES, PEOPLE } from '../../data/catalog.js';
import { HttpError } from '../lib/errors.js';
import { paginate } from '../lib/params.js';

const ROLES = ['Lead', 'Co-lead', 'Supporting', 'Supporting'];
const nowIso = () => new Date().toISOString();

const SORTERS = {
  featured: (a, b) => b.popularity - a.popularity,
  popular: (a, b) => b.popularity - a.popularity,
  rating: (a, b) => b.rating - a.rating || b.popularity - a.popularity,
  newest: (a, b) => b.releaseDate.localeCompare(a.releaseDate),
  az: (a, b) => a.title.localeCompare(b.title),
};

const strip = ({ castIds, popularity, ...card }) => ({ ...card, trailer: null });
const cards = (list) => list.map(strip);

const castOf = (item) =>
  item.castIds.map((slug, i) => ({
    id: slug,
    name: PEOPLE[slug],
    character: ROLES[i] ?? 'Supporting',
    photo: `/images/actors/${slug}.webp`,
  }));

const overlap = (a, b) => a.genres.filter((g) => b.genres.includes(g)).length;

function filterItems(items, { type = 'all', language = 'All', genre = 'All' }) {
  return items.filter(
    (item) =>
      (type === 'all' || (type === 'tv' ? item.type === 'series' : item.type === 'movie')) &&
      (language === 'All' || item.language === language) &&
      (genre === 'All' || item.genres.includes(genre)),
  );
}

export const localProvider = {
  name: 'local',

  async home() {
    const byPopularity = [...CATALOG].sort(SORTERS.featured);
    const row = (id, title, list) => ({ id, title, items: cards(list.slice(0, 14)) });
    const languageRows = ['Tamil', 'Telugu', 'Malayalam', 'Hindi', 'English'].map((language) =>
      row(language.toLowerCase(), `${language} Cinema`, byPopularity.filter((i) => i.language === language)),
    );
    return {
      hero: cards(byPopularity.slice(0, 5)),
      rows: [
        row('trending', 'Trending Now', byPopularity),
        row('top-rated', 'Top Rated', [...CATALOG].sort(SORTERS.rating)),
        row('series', 'Web Series', byPopularity.filter((i) => i.type === 'series')),
        ...languageRows,
      ].filter((r) => r.items.length > 0),
      fetchedAt: nowIso(),
    };
  },

  async catalog({ type, language, genre, sort, page }) {
    const kind = type === 'tv' || type === 'series' ? 'tv' : 'movie';
    const pool = filterItems(CATALOG, { type: kind, language });
    const availableGenres = GENRES.filter((g) => pool.some((i) => i.genres.includes(g)));
    const sorted = filterItems(pool, { genre }).sort(SORTERS[sort] ?? SORTERS.featured);
    const { items, totalResults, totalPages } = paginate(sorted, page);
    return { items: cards(items), totalResults, totalPages, availableGenres, fetchedAt: nowIso() };
  },

  async title(id) {
    const item = CATALOG.find((i) => i.id === id);
    if (!item) throw new HttpError(404, 'NOT_FOUND', 'That title is not in the library.');
    const related = CATALOG.filter((i) => i.id !== item.id)
      .map((i) => ({ i, score: overlap(item, i) * 3 + (i.language === item.language ? 2 : 0) + i.rating / 10 }))
      .sort((a, b) => b.score - a.score)
      .map(({ i }) => i);
    return {
      title: {
        ...strip(item),
        cast: castOf(item),
        similar: cards(related.filter((i) => i.type === item.type).slice(0, 12)),
        recommendations: cards(related.slice(0, 12)),
      },
      fetchedAt: nowIso(),
    };
  },

  async search({ q, type, language, genre }) {
    const needle = q.toLowerCase();
    const people = Object.entries(PEOPLE)
      .filter(([, name]) => name.toLowerCase().includes(needle))
      .map(([id, name]) => ({ id, name }));
    const personIds = new Set(people.map((p) => p.id));
    const matches = CATALOG.filter((item) => {
      const text = [item.title, item.language, ...item.genres].join(' ').toLowerCase();
      const byTitle = text.includes(needle);
      const byPerson = item.castIds.some((id) => personIds.has(id));
      return type === 'person' ? byPerson : byTitle || byPerson;
    });
    const items = filterItems(matches, { type: type === 'person' ? 'all' : type, language, genre }).sort(SORTERS.featured);
    return { items: cards(items.slice(0, 40)), actors: people, totalResults: items.length, fetchedAt: nowIso() };
  },
};
