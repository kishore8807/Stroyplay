import { useRef } from 'react';
import VideoPlayer from './VideoPlayer';
import { CheckIcon, CloseIcon, PlusIcon } from './Icons';
import { useProgress } from '../context/ProgressContext';
import { useWatchlist } from '../context/WatchlistContext';
import { PREVIEW_VIDEO } from '../lib/constants';
import { trailerSearchUrl } from '../lib/format';
import useModal from '../hooks/useModal';

export default function PlayerModal({ movie, onClose }) {
  const dialogRef = useRef(null);
  const { saveProgress, progress } = useProgress();
  const { has, toggle } = useWatchlist();
  const saved = has(movie.id);
  const resumeAt = progress[movie.id]?.seconds ?? 0;

  useModal(onClose, dialogRef);

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="player-modal" role="dialog" aria-modal="true" aria-labelledby="player-title" ref={dialogRef} tabIndex={-1} onClick={(e) => e.stopPropagation()}>
        <div className="player-modal__head">
          <div>
            <p className="player-modal__eyebrow">{resumeAt > 0 ? 'Resuming preview' : 'Now playing'}</p>
            <h2 className="player-modal__title" id="player-title">
              {movie.title}
            </h2>
            <p className="player-modal__meta">{[movie.year, movie.language, movie.duration, movie.genres?.join(', ')].filter(Boolean).join(' · ')}</p>
          </div>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Close player">
            <CloseIcon size={20} />
          </button>
        </div>
        <VideoPlayer
          key={movie.id}
          src={PREVIEW_VIDEO}
          poster={movie.backdrop || movie.backdropFallback}
          title={movie.title}
          startAt={resumeAt}
          onProgress={(seconds, duration) => saveProgress(movie.id, seconds, duration)}
        />
        <div className="player-modal__foot">
          <p className="player-modal__note">
            Licensed demo preview. Full-length streaming of <strong>{movie.title}</strong> is not available; this plays a short sample clip.
          </p>
          <div className="player-modal__actions">
            <a className="btn btn-ghost btn-sm" href={movie.trailer?.watchUrl || trailerSearchUrl(movie.title)} target="_blank" rel="noreferrer noopener">
              {movie.trailer?.watchUrl ? 'Watch official trailer' : 'Find the official trailer'}
            </a>
            <button className={`btn btn-ghost btn-sm ${saved ? 'is-saved' : ''}`} type="button" onClick={() => toggle(movie.id)} aria-pressed={saved}>
              {saved ? <CheckIcon size={16} /> : <PlusIcon size={16} />}
              {saved ? 'In watchlist' : 'Add to watchlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
