import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SmartImage from './SmartImage';
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, InfoIcon, PauseIcon, PlayIcon, PlusIcon, StarIcon } from './Icons';
import { useWatchlist } from '../context/WatchlistContext';
import { FALLBACK } from '../lib/constants';
import { ratingText } from '../lib/format';

const ROTATE_MS = 9000;

export default function Hero({ movies, onPlay }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const { has, toggle } = useWatchlist();
  const reducedMotion = useMemo(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const total = movies.length;
  const current = movies[index] ?? movies[0];
  const stopped = paused || hovering || reducedMotion;

  useEffect(() => {
    if (stopped || total < 2) return undefined;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % total), ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [stopped, total, index]);

  if (!current) return null;
  const step = (delta) => setIndex((i) => (i + delta + total) % total);
  const saved = has(current.id);

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Featured titles"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={() => setHovering(false)}
    >
      <div className="hero-media" aria-hidden="true">
        {movies.map((m, i) => (
          <div key={m.id} className={`hero-frame ${i === index ? 'is-active' : ''}`}>
            <SmartImage src={m.backdrop} secondaryFallback={m.backdropFallback} fallback={FALLBACK.backdrop} alt="" wrapperClassName="hero-frame__img" />
          </div>
        ))}
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-inner">
        <div key={current.id} className="hero-copy">
          <p className="hero-kicker">
            <span className="hero-kicker__dot" aria-hidden="true" />
            StoryPlay spotlight
          </p>
          <h1 className="hero-title">{current.title}</h1>
          <div className="hero-meta">
            <span className="hero-rating">
              <StarIcon size={14} />
              {ratingText(current.rating)}
            </span>
            {current.year && <span>{current.year}</span>}
            {current.duration && <span>{current.duration}</span>}
            <span>{current.language}</span>
            {current.genres?.length > 0 && <span className="hero-genre">{current.genres.join(' · ')}</span>}
            <span className="hero-tag">{current.type === 'series' ? 'Series' : 'Film'}</span>
          </div>
          <p className="hero-desc">{current.description}</p>
          <div className="hero-actions">
            <button className="btn btn-primary" type="button" onClick={() => onPlay(current)}>
              <PlayIcon size={18} />
              Watch Now
            </button>
            <Link className="btn btn-ghost" to={`/movie/${current.id}`}>
              <InfoIcon size={18} />
              More Details
            </Link>
            <button
              className={`btn btn-icon ${saved ? 'is-saved' : ''}`}
              type="button"
              onClick={() => toggle(current.id)}
              aria-pressed={saved}
              aria-label={saved ? `Remove ${current.title} from watchlist` : `Add ${current.title} to watchlist`}
            >
              {saved ? <CheckIcon size={18} /> : <PlusIcon size={18} />}
            </button>
          </div>
        </div>
      </div>
      <div className="hero-controls">
        <button className="hero-arrow" type="button" onClick={() => step(-1)} aria-label="Previous featured title">
          <ChevronLeftIcon size={18} />
        </button>
        <div className="hero-dots" role="tablist" aria-label="Featured titles">
          {movies.map((m, i) => (
            <button key={m.id} type="button" role="tab" aria-selected={i === index} aria-label={`Show ${m.title}`} className={`hero-dot ${i === index ? 'is-active' : ''}`} onClick={() => setIndex(i)}>
              <span key={`${m.id}-${i === index}`} className="hero-dot__fill" />
            </button>
          ))}
        </div>
        <button className="hero-arrow" type="button" onClick={() => step(1)} aria-label="Next featured title">
          <ChevronRightIcon size={18} />
        </button>
        <button className="hero-pause" type="button" onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Resume automatic rotation' : 'Pause automatic rotation'} aria-pressed={paused}>
          {paused ? <PlayIcon size={14} /> : <PauseIcon size={14} />}
        </button>
      </div>
    </section>
  );
}
