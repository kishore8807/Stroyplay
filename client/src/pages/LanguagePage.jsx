import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import FilterBar from '../components/FilterBar';
import FreshnessBar from '../components/FreshnessBar';
import Skeleton from '../components/Skeleton';
import ErrorState from '../components/ErrorState';
import { GlobeIcon } from '../components/Icons';
import { getCatalog, rememberTitles } from '../lib/api';
import { DEFAULT_GENRES, LANGUAGES } from '../lib/constants';
import useRemote from '../hooks/useRemote';

export default function LanguagePage() {
  const { language: param } = useParams();
  const language = LANGUAGES.find((l) => l.toLowerCase() === String(param).toLowerCase());
  const [genre, setGenre] = useState('All');

  useEffect(() => {
    setGenre('All');
  }, [language]);

  const { data, loading, error, reload } = useRemote(
    async ({ signal }) => {
      const res = await getCatalog({ type: 'movie', language, genre, sort: 'featured', page: 1, signal });
      rememberTitles(res.items);
      return res;
    },
    [language, genre],
    { enabled: Boolean(language) },
  );

  if (!language) {
    return (
      <div className="page page--catalog">
        <div className="empty-state">
          <h1>Language not found</h1>
          <p>We could not find that language in the library.</p>
          <Link className="btn btn-primary" to="/movies">
            Browse all movies
          </Link>
        </div>
      </div>
    );
  }

  const items = data?.items ?? [];
  const total = data?.totalResults ?? 0;
  const genres = data?.availableGenres?.length ? data.availableGenres : DEFAULT_GENRES;

  return (
    <div className="page page--catalog">
      <header className="page-head">
        <p className="eyebrow">
          <GlobeIcon size={15} />
          Language
        </p>
        <h1>{language} cinema</h1>
        <p className="page-head__lede">{language} titles, ordered by popularity.</p>
      </header>
      <div className="catalog-controls">
        <FilterBar label="Genre" options={genres} active={genre} onChange={setGenre} />
      </div>
      <div className="catalog-summary">
        <p>
          <strong>{total.toLocaleString()}</strong> {total === 1 ? 'title' : 'titles'}
        </p>
        <div className="catalog-summary__right">
          <FreshnessBar fetchedAt={data?.fetchedAt} refreshing={loading} onRefresh={reload} />
          <Link className="link-btn" to="/movies">
            All movies
          </Link>
        </div>
      </div>
      {loading && !data ? (
        <Skeleton cards={6} rows={2} />
      ) : error ? (
        <ErrorState title={`Could not load ${language} cinema`} error={error} onRetry={reload} />
      ) : items.length === 0 ? (
        <div className="empty-state">
          <h2>Nothing here yet</h2>
          <p>
            No {genre.toLowerCase()} titles in {language} right now.
          </p>
          <button className="btn btn-primary" type="button" onClick={() => setGenre('All')}>
            Show everything
          </button>
        </div>
      ) : (
        <div className="grid">
          {items.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      )}
    </div>
  );
}
