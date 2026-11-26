import { Link } from 'react-router-dom';
import SmartImage from './SmartImage';
import { CheckIcon, InfoIcon, PlayIcon, PlusIcon, StarIcon } from './Icons';
import { useWatchlist } from '../context/WatchlistContext';
import { useUi } from '../context/UiContext';
import { FALLBACK } from '../lib/constants';
import { ratingText } from '../lib/format';


export default function MovieCard({ movie, progress = 0 }) {
  const { has, toggle } = useWatchlist();
  const { openPlayer, openQuickView } = useUi();
  const saved = has(movie.id);

  return (
    <article className="card">
      <div className="card-poster">
        <SmartImage
          src={movie.poster}
          secondaryFallback={movie.posterFallback}
          fallback={FALLBACK.poster}
          alt={`${movie.title} poster`}
          className="card-img"
          wrapperClassName="card-img-wrap"
          width="420"
          height="630"
        />
        <span className="card-scrim" aria-hidden="true" />
        <span className="card-rating" aria-label={`Rated ${ratingText(movie.rating)} out of 10`}>
          <StarIcon size={11} />
          {ratingText(movie.rating)}
        </span>
        <button
          className={`card-save ${saved ? 'is-saved' : ''}`}
          type="button"
          onClick={() => toggle(movie.id)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${movie.title} from watchlist` : `Add ${movie.title} to watchlist`}
        >
          {saved ? <CheckIcon size={15} /> : <PlusIcon size={15} />}
        </button>
        <Link className="card-link" to={`/movie/${movie.id}`} aria-label={`View details for ${movie.title}`} />
        <div className="card-actions">
          <button className="card-action card-action--play" type="button" onClick={() => openPlayer(movie)} aria-label={`Watch ${movie.title}`}>
            <PlayIcon size={17} />
          </button>
          <button className="card-action" type="button" onClick={() => openQuickView(movie)} aria-label={`Quick details for ${movie.title}`}>
            <InfoIcon size={17} />
          </button>
        </div>
        {progress > 0 && (
          <span className="card-progress" aria-hidden="true">
            <span style={{ width: `${Math.round(progress * 100)}%` }} />
          </span>
        )}
      </div>
      <div className="card-info">
        <h3 className="card-title" title={movie.title}>
          {movie.title}
        </h3>
        <p className="card-sub">
          {movie.year && (
            <>
              <span>{movie.year}</span>
              <span className="card-sep" aria-hidden="true" />
            </>
          )}
          <span>{movie.language}</span>
          <span className="card-sep" aria-hidden="true" />
          <span>{movie.type === 'series' ? 'Series' : movie.genre}</span>
        </p>
      </div>
    </article>
  );
}
