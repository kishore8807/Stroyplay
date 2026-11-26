import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SmartImage from './SmartImage';
import { CheckIcon, CloseIcon, InfoIcon, PlayIcon, PlusIcon, StarIcon } from './Icons';
import { useWatchlist } from '../context/WatchlistContext';
import { getTitle, rememberTitle } from '../lib/api';
import { FALLBACK } from '../lib/constants';
import { ratingText } from '../lib/format';
import useModal from '../hooks/useModal';

export default function QuickView({ movie, onClose, onPlay }) {
  const closeRef = useRef(null);
  const { has, toggle } = useWatchlist();
  const [data, setData] = useState(movie);
  const saved = has(movie.id);

  useModal(onClose, closeRef);

  // Cards only carry summary fields; fetch director/cast once for the dialog.
  useEffect(() => {
    setData(movie);
    if (movie.director && Array.isArray(movie.cast)) return undefined;
    const controller = new AbortController();
    getTitle(movie.id, { signal: controller.signal })
      .then((res) => {
        if (res?.title) {
          rememberTitle(res.title);
          setData(res.title);
        }
      })
      .catch(() => {});
    return () => controller.abort();
  }, [movie]);

  const cast = Array.isArray(data.cast) ? (data.cast.length > 0 ? data.cast.slice(0, 6).map((c) => c.name).join(', ') : 'Not listed') : 'Loading…';

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="detail-title" onClick={(e) => e.stopPropagation()}>
        <div className="modal-media">
          <SmartImage src={data.backdrop} secondaryFallback={data.backdropFallback} fallback={FALLBACK.backdrop} alt="" wrapperClassName="modal-media__img" />
          <span className="modal-media-shade" aria-hidden="true" />
          <button className="modal-close" type="button" onClick={onClose} aria-label="Close details" ref={closeRef}>
            <CloseIcon size={20} />
          </button>
          <button className="modal-play" type="button" onClick={() => onPlay(data)} aria-label={`Watch ${data.title}`}>
            <PlayIcon size={26} />
          </button>
        </div>
        <div className="modal-body">
          <h2 className="modal-title" id="detail-title">
            {data.title}
          </h2>
          <div className="modal-meta">
            <span className="modal-rating">
              <StarIcon size={13} />
              {ratingText(data.rating)}
            </span>
            {data.year && <span>{data.year}</span>}
            <span>{data.language}</span>
            {data.duration && <span>{data.duration}</span>}
            {data.genres?.length > 0 && <span>{data.genres.join(' · ')}</span>}
          </div>
          <p className="modal-desc">{data.description}</p>
          <dl className="modal-facts">
            <div>
              <dt>{data.type === 'series' ? 'Creator' : 'Director'}</dt>
              <dd>{data.director || (Array.isArray(data.cast) ? 'Unknown' : 'Loading…')}</dd>
            </div>
            <div>
              <dt>Starring</dt>
              <dd>{cast}</dd>
            </div>
          </dl>
          <div className="modal-actions">
            <button className="btn btn-primary" type="button" onClick={() => onPlay(data)}>
              <PlayIcon size={18} />
              Watch Preview
            </button>
            <Link className="btn btn-ghost" to={`/movie/${data.id}`} onClick={onClose}>
              <InfoIcon size={18} />
              Full details
            </Link>
            <button
              className={`btn btn-icon ${saved ? 'is-saved' : ''}`}
              type="button"
              onClick={() => toggle(data.id)}
              aria-pressed={saved}
              aria-label={saved ? 'Remove from watchlist' : 'Add to watchlist'}
            >
              {saved ? <CheckIcon size={18} /> : <PlusIcon size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
