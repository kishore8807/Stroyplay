import { Check, Info, Play, Plus, Star } from './Icons'

export default function Hero({ movie, saved, onWatch, onInfo, onToggleSave }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div
        className="hero-media"
        style={{ backgroundImage: `url(${movie.backdrop})` }}
        aria-hidden="true"
      />
      <div className="hero-shade" aria-hidden="true" />

      <div className="hero-inner">
        <h1 className="hero-title" id="hero-title">
          {movie.title}
        </h1>

        <div className="hero-meta">
          <span className="hero-rating">
            <Star size={15} />
            {movie.rating.toFixed(1)}
          </span>
          <span className="hero-sep" aria-hidden="true" />
          <span>{movie.year}</span>
          <span className="hero-sep" aria-hidden="true" />
          <span>{movie.genre}</span>
          <span className="hero-sep" aria-hidden="true" />
          <span>{movie.language}</span>
          <span className="hero-sep" aria-hidden="true" />
          <span>{movie.duration}</span>
          <span className="hero-tag">{movie.type === 'series' ? 'Series' : 'Film'}</span>
        </div>

        <p className="hero-desc">{movie.description}</p>

        <div className="hero-actions">
          <button className="btn btn-primary" type="button" onClick={onWatch}>
            <Play size={19} />
            Watch Now
          </button>
          <button className="btn btn-ghost" type="button" onClick={onInfo}>
            <Info size={19} />
            More Info
          </button>
          <button
            className={`hero-save ${saved ? 'is-saved' : ''}`}
            type="button"
            onClick={() => onToggleSave(movie.id)}
            aria-pressed={saved}
            aria-label={saved ? `Remove ${movie.title} from watchlist` : `Add ${movie.title} to watchlist`}
          >
            {saved ? <Check size={20} /> : <Plus size={20} />}
          </button>
        </div>
      </div>
    </section>
  )
}
