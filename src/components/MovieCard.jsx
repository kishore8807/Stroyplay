import { Check, Play, Plus } from './Icons'

export default function MovieCard({ movie, saved, onToggleSave, onOpen }) {
  return (
    <article className="card">
      <div className="card-poster">
        <img
          src={movie.poster}
          alt={`${movie.title} poster`}
          width="420"
          height="630"
          loading="lazy"
          decoding="async"
        />
        <span className="card-scrim" aria-hidden="true" />

        <button
          className="card-open"
          type="button"
          onClick={() => onOpen(movie)}
          aria-label={`More about ${movie.title}`}
        />

        <button
          className={`card-save ${saved ? 'is-saved' : ''}`}
          type="button"
          onClick={() => onToggleSave(movie.id)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${movie.title} from watchlist` : `Add ${movie.title} to watchlist`}
        >
          {saved ? <Check size={16} /> : <Plus size={16} />}
        </button>

        <div className="card-actions">
          <button
            className="card-play"
            type="button"
            onClick={() => onOpen(movie)}
            aria-label={`Play ${movie.title}`}
          >
            <Play size={20} />
          </button>
        </div>
      </div>

      <div className="card-info">
        <h3 className="card-title" title={movie.title}>
          {movie.title}
        </h3>
        <p className="card-sub">
          <span>{movie.year}</span>
          <span className="card-sep" aria-hidden="true" />
          <span className="card-lang">{movie.language}</span>
          <span className="card-sep" aria-hidden="true" />
          <span>{movie.genre}</span>
        </p>
      </div>
    </article>
  )
}
