import { useEffect, useRef } from 'react'
import { Check, Close, Play, Plus, Star } from './Icons'

export default function DetailModal({ movie, saved, onClose, onPlay, onToggleSave }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-media" style={{ backgroundImage: `url(${movie.backdrop})` }}>
          <span className="modal-media-shade" aria-hidden="true" />
          <button
            className="modal-close"
            type="button"
            onClick={onClose}
            aria-label="Close details"
            ref={closeRef}
          >
            <Close size={20} />
          </button>
          <button
            className="modal-play"
            type="button"
            onClick={() => onPlay(movie)}
            aria-label={`Play ${movie.title}`}
          >
            <Play size={26} />
          </button>
        </div>

        <div className="modal-body">
          <h2 className="modal-title" id="detail-title">
            {movie.title}
          </h2>

          <div className="modal-meta">
            <span className="modal-rating">
              <Star size={14} />
              {movie.rating.toFixed(1)}
            </span>
            <span className="modal-sep" aria-hidden="true" />
            <span>{movie.year}</span>
            <span className="modal-sep" aria-hidden="true" />
            <span>{movie.language}</span>
            <span className="modal-sep" aria-hidden="true" />
            <span>{movie.genre}</span>
            <span className="modal-sep" aria-hidden="true" />
            <span>{movie.duration}</span>
          </div>

          <p className="modal-desc">{movie.description}</p>

          <div className="modal-actions">
            <button className="btn btn-primary" type="button" onClick={() => onPlay(movie)}>
              <Play size={18} />
              Watch Now
            </button>
            <button
              className={`btn btn-ghost ${saved ? 'is-saved' : ''}`}
              type="button"
              onClick={() => onToggleSave(movie.id)}
            >
              {saved ? <Check size={18} /> : <Plus size={18} />}
              {saved ? 'In Watchlist' : 'Add to Watchlist'}
            </button>
          </div>

          <p className="modal-note">
            Rated {movie.rating.toFixed(1)} | {movie.type === 'series' ? 'Series' : 'Feature film'} | Available in{' '}
            {movie.language}
          </p>
        </div>
      </div>
    </div>
  )
}
