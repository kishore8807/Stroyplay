import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Skeleton from '../components/Skeleton';
import { BookmarkIcon, TrashIcon } from '../components/Icons';
import { useWatchlist } from '../context/WatchlistContext';
import useTitles from '../hooks/useTitles';

export default function Watchlist() {
  const { ids, clear } = useWatchlist();
  const { items, loading } = useTitles(ids);

  return (
    <div className="page page--catalog">
      <header className="page-head">
        <p className="eyebrow">
          <BookmarkIcon size={15} />
          Saved on this device
        </p>
        <h1>My Watchlist</h1>
        <p className="page-head__lede">
          {ids.length === 0 ? 'Your watchlist is empty.' : `${ids.length} ${ids.length === 1 ? 'title' : 'titles'} saved. Nothing here needs an account — it lives in this browser.`}
        </p>
      </header>

      {ids.length === 0 ? (
        <div className="empty-state empty-state--wide">
          <h2>Save something for later</h2>
          <p>
            Tap the <span className="inline-icon">+</span> on any poster and it will appear here, even after you refresh.
          </p>
          <div className="empty-state__actions">
            <Link className="btn btn-primary" to="/movies">
              Browse movies
            </Link>
            <Link className="btn btn-ghost" to="/series">
              Browse series
            </Link>
          </div>
        </div>
      ) : loading && items.length === 0 ? (
        <Skeleton cards={6} rows={1} />
      ) : (
        <>
          <div className="catalog-summary">
            <p>
              <strong>{items.length}</strong> saved
            </p>
            <button className="link-btn link-btn--danger" type="button" onClick={clear}>
              <TrashIcon size={15} />
              Clear watchlist
            </button>
          </div>
          <div className="grid">
            {items.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
