import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import FilterBar from '../components/FilterBar';
import FreshnessBar from '../components/FreshnessBar';
import Skeleton from '../components/Skeleton';
import ErrorState from '../components/ErrorState';
import { ArrowLeftIcon, SearchIcon } from '../components/Icons';
import { getCatalog, rememberTitles, searchTitles } from '../lib/api';
import { DEFAULT_GENRES, LANGUAGES } from '../lib/constants';
import useRemote from '../hooks/useRemote';

const TYPES = [
  { id: 'all', label: 'All' },
  { id: 'movie', label: 'Movies' },
  { id: 'tv', label: 'TV Shows' },
  { id: 'person', label: 'Actors' },
];

export default function SearchResults() {
  const [params] = useSearchParams();
  const q = params.get('q')?.trim() ?? '';
  const hasQuery = q.length > 0;
  const [type, setType] = useState('all');
  const [language, setLanguage] = useState('All');
  const [genre, setGenre] = useState('All');

  const { data, loading, error, reload } = useRemote(
    async ({ signal }) => {
      if (hasQuery) {
        const res = await searchTitles({ q, type, language, genre, page: 1, signal });
        rememberTitles(res.items);
        return { items: res.items || [], actors: res.actors || [], fetchedAt: res.fetchedAt };
      }
      const res = await getCatalog({ type: 'movie', sort: 'popular', page: 1, signal });
      const items = (res.items || []).slice(0, 12);
      rememberTitles(items);
      return { items, actors: [], fetchedAt: res.fetchedAt };
    },
    [hasQuery, q, type, language, genre],
  );

  const items = data?.items ?? [];
  const actors = data?.actors ?? [];
  const filtered = type !== 'all' || language !== 'All' || genre !== 'All';
  const reset = () => {
    setType('all');
    setLanguage('All');
    setGenre('All');
  };

  return (
    <div className="page page--catalog">
      <header className="page-head">
        <p className="eyebrow">
          <SearchIcon size={15} />
          Search
        </p>
        <h1>
          {hasQuery ? (
            <>
              Results for <span className="page-head__query">“{q}”</span>
            </>
          ) : (
            'Search StoryPlay'
          )}
        </h1>
        <p className="page-head__lede">{hasQuery ? 'Results across movies, TV shows and actors. Filter by type, language or genre.' : 'Search by movie title, TV show, or actor name.'}</p>
        {hasQuery && (
          <Link className="link-btn" to="/search">
            <ArrowLeftIcon size={14} />
            Clear search
          </Link>
        )}
      </header>

      {hasQuery && (
        <>
          <div className="catalog-controls">
            <div className="filters" role="group" aria-label="Filter by type">
              <span className="filters-label">Type</span>
              <div className="filters-scroll">
                {TYPES.map((t) => (
                  <button key={t.id} type="button" className={`chip ${type === t.id ? 'is-active' : ''}`} aria-pressed={type === t.id} onClick={() => setType(t.id)}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <FilterBar label="Language" options={LANGUAGES} active={language} onChange={setLanguage} />
            <FilterBar label="Genre" options={DEFAULT_GENRES} active={genre} onChange={setGenre} />
          </div>
          <div className="catalog-summary">
            <p>
              <strong>{items.length}</strong> {items.length === 1 ? 'result' : 'results'}
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
        </>
      )}

      {loading && !data ? (
        <Skeleton cards={6} rows={2} />
      ) : error ? (
        <ErrorState title="Search failed" error={error} onRetry={reload} />
      ) : hasQuery ? (
        items.length === 0 ? (
          <div className="empty-state">
            <h2>Nothing matched “{q}”</h2>
            <p>Check the spelling, or loosen the type, language or genre filter.</p>
            <div className="empty-state__actions">
              <Link className="btn btn-primary" to="/movies">
                Browse everything
              </Link>
              {filtered && (
                <button className="btn btn-ghost" type="button" onClick={reset}>
                  Reset filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {actors.length > 0 && (
              <div className="actor-pills" aria-label="Matching people">
                <span className="filters-label">Matching</span>
                <div className="filters-scroll">
                  {actors.map((a) => (
                    <span key={a.id} className="chip">
                      {a.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="grid">
              {items.map((m) => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          </>
        )
      ) : (
        <section className="search-prompt">
          <h2>Popular right now</h2>
          <div className="grid">
            {items.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
