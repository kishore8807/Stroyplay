import { useState } from 'react';
import MovieCard from '../components/MovieCard';
import FilterBar from '../components/FilterBar';
import FreshnessBar from '../components/FreshnessBar';
import Skeleton from '../components/Skeleton';
import ErrorState from '../components/ErrorState';
import { FilmIcon, TvIcon } from '../components/Icons';
import { getCatalog, rememberTitles } from '../lib/api';
import { DEFAULT_GENRES, LANGUAGES } from '../lib/constants';
import useRemote from '../hooks/useRemote';

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'rating', label: 'Top rated' },
  { id: 'newest', label: 'Newest' },
  { id: 'az', label: 'A to Z' },
];
const INITIAL = { language: 'All', genre: 'All', sort: 'featured', page: 1 };

export default function Catalog({ type = 'movie' }) {
  const isSeries = type === 'series';
  const [filters, setFilters] = useState(INITIAL);
  const { language, genre, sort, page } = filters;
  const update = (patch) => setFilters((f) => ({ ...f, page: 1, ...patch }));

  const { data, loading, error, reload } = useRemote(
    async ({ signal }) => {
      const res = await getCatalog({ type: isSeries ? 'tv' : 'movie', language, genre, sort, page, signal });
      rememberTitles(res.items);
      return res;
    },
    [isSeries, language, genre, sort, page],
  );

  const items = data?.items ?? [];
  const total = data?.totalResults ?? 0;
  const pages = data?.totalPages ?? 1;
  const genres = data?.availableGenres?.length ? data.availableGenres : DEFAULT_GENRES;
  const filtered = language !== 'All' || genre !== 'All' || sort !== 'featured';
  const reset = () => setFilters(INITIAL);

  return (
    <div className="page page--catalog">
      <header className="page-head">
        <p className="eyebrow">
          {isSeries ? <TvIcon size={15} /> : <FilmIcon size={15} />}
          {isSeries ? 'Episodic' : 'Feature films'}
        </p>
        <h1>{isSeries ? 'Web Series' : 'Movies'}</h1>
        <p className="page-head__lede">{isSeries ? 'Popular and acclaimed series across five languages.' : 'Discover films in Tamil, Telugu, Malayalam, Hindi and English.'}</p>
      </header>

      <div className="catalog-controls">
        <FilterBar label="Language" options={LANGUAGES} active={language} onChange={(v) => update({ language: v })} />
        <FilterBar label="Genre" options={genres} active={genre} onChange={(v) => update({ genre: v })} />
        <div className="catalog-sort">
          <label htmlFor="catalog-sort">Sort by</label>
          <select id="catalog-sort" value={sort} onChange={(e) => update({ sort: e.target.value })}>
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="catalog-summary">
        <p>
          <strong>{total.toLocaleString()}</strong> {total === 1 ? 'title' : 'titles'}
          {language !== 'All' && ` in ${language}`}
          {genre !== 'All' && ` · ${genre}`}
        </p>
        <div className="catalog-summary__right">
          <FreshnessBar fetchedAt={data?.fetchedAt} refreshing={loading} onRefresh={reload} />
          {filtered && (
            <button className="link-btn" type="button" onClick={reset}>
              Reset filters
            </button>
          )}
        </div>
      </div>

      {loading && !data ? (
        <Skeleton cards={6} rows={2} />
      ) : error ? (
        <ErrorState title="Could not load catalogue" error={error} onRetry={reload} />
      ) : items.length === 0 ? (
        <div className="empty-state">
          <h2>No titles match those filters</h2>
          <p>Try a different language or genre.</p>
          <button className="btn btn-primary" type="button" onClick={reset}>
            Reset filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid">
            {items.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
          {pages > 1 && (
            <div className="catalog-pagination">
              <button className="btn btn-ghost btn-sm" type="button" disabled={page <= 1} onClick={() => setFilters((f) => ({ ...f, page: Math.max(1, f.page - 1) }))}>
                Previous
              </button>
              <span>
                Page {page} of {pages}
              </span>
              <button className="btn btn-ghost btn-sm" type="button" disabled={page >= pages} onClick={() => setFilters((f) => ({ ...f, page: Math.min(pages, f.page + 1) }))}>
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
