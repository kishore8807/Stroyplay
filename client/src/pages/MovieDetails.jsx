import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SmartImage from '../components/SmartImage';
import Row from '../components/Row';
import Skeleton from '../components/Skeleton';
import ErrorState from '../components/ErrorState';
import FreshnessBar from '../components/FreshnessBar';
import { ArrowLeftIcon, CheckIcon, FilmIcon, PlayIcon, PlusIcon, StarIcon, TvIcon } from '../components/Icons';
import { getTitle, rememberTitle, rememberTitles } from '../lib/api';
import { FALLBACK } from '../lib/constants';
import { ratingText, trailerSearchUrl } from '../lib/format';
import { useUi } from '../context/UiContext';
import { useWatchlist } from '../context/WatchlistContext';
import useRemote from '../hooks/useRemote';

const initials = (name) => name.split(' ').slice(0, 2).map((w) => w[0]).join('');

export default function MovieDetails() {
  const { id } = useParams();
  const { has, toggle } = useWatchlist();
  const { openPlayer } = useUi();

  const { data, loading, error, reload } = useRemote(
    async ({ signal }) => {
      const res = await getTitle(id, { signal });
      if (res?.title) {
        rememberTitle(res.title);
        rememberTitles(res.title.similar);
        rememberTitles(res.title.recommendations);
      }
      return res;
    },
    [id],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [id]);

  const title = data?.title;
  if (loading && !title) {
    return (
      <div className="page page--catalog">
        <Skeleton cards={6} rows={2} />
      </div>
    );
  }
  if (error || !title) {
    return (
      <div className="page page--catalog">
        <ErrorState title={error?.status === 404 ? 'Title not found' : 'Unable to load title details'} error={error} onRetry={reload} />
      </div>
    );
  }

  const isSeries = title.type === 'series';
  const saved = has(title.id);
  const cast = title.cast || [];
  const similar = title.similar || [];
  const recommended = title.recommendations || [];
  const backTo = isSeries ? '/series' : '/movies';

  return (
    <div className="detail">
      <section className="detail-hero" aria-labelledby="detail-heading">
        <div className="detail-hero__media" aria-hidden="true">
          <SmartImage src={title.backdrop} secondaryFallback={title.backdropFallback} fallback={FALLBACK.backdrop} alt="" wrapperClassName="detail-hero__img" />
        </div>
        <div className="detail-hero__shade" aria-hidden="true" />
        <div className="detail-hero__inner">
          <div className="detail-poster">
            <SmartImage src={title.poster} secondaryFallback={title.posterFallback} fallback={FALLBACK.poster} alt={`${title.title} poster`} width="420" height="630" />
          </div>
          <div className="detail-copy">
            <p className="eyebrow">
              {isSeries ? <TvIcon size={15} /> : <FilmIcon size={15} />}
              {isSeries ? 'Web series' : 'Feature film'} · {title.language}
            </p>
            <h1 id="detail-heading">{title.title}</h1>
            {title.tagline && <p className="detail-tagline">{title.tagline}</p>}
            <div className="detail-meta">
              <span className="detail-rating">
                <StarIcon size={14} />
                {ratingText(title.rating)}
                <span className="detail-rating__max">/10</span>
              </span>
              {title.releaseDate && <span>{title.releaseDate}</span>}
              {title.duration && <span>{title.duration}</span>}
              <span>{title.language}</span>
              {title.genres?.length > 0 && <span className="detail-genres">{title.genres.join(' · ')}</span>}
            </div>
            <p className="detail-desc">{title.description}</p>
            <div className="detail-actions">
              <button className="btn btn-primary" type="button" onClick={() => openPlayer(title)}>
                <PlayIcon size={18} />
                Watch Preview
              </button>
              <button className="btn btn-ghost" type="button" onClick={() => document.getElementById('trailer-panel')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>
                <PlayIcon size={17} />
                Watch Trailer
              </button>
              <button className={`btn btn-ghost ${saved ? 'is-saved' : ''}`} type="button" onClick={() => toggle(title.id)} aria-pressed={saved}>
                {saved ? <CheckIcon size={17} /> : <PlusIcon size={17} />}
                {saved ? 'In Watchlist' : 'Add to Watchlist'}
              </button>
              <Link className="btn btn-quiet" to={backTo}>
                <ArrowLeftIcon size={17} />
                Back to {isSeries ? 'Series' : 'Movies'}
              </Link>
            </div>
            <dl className="detail-facts">
              <div>
                <dt>{isSeries ? 'Creator' : 'Director'}</dt>
                <dd>{title.director || 'Unknown'}</dd>
              </div>
              <div>
                <dt>Cast</dt>
                <dd>{cast.length > 0 ? cast.slice(0, 5).map((c) => c.name).join(', ') : 'Not listed'}</dd>
              </div>
              <div>
                <dt>Language</dt>
                <dd>{title.language}</dd>
              </div>
              {title.duration && (
                <div>
                  <dt>Runtime</dt>
                  <dd>{title.duration}</dd>
                </div>
              )}
              {title.releaseDate && (
                <div>
                  <dt>Release Date</dt>
                  <dd>{title.releaseDate}</dd>
                </div>
              )}
              {title.seasonsCount && (
                <div>
                  <dt>Seasons</dt>
                  <dd>
                    {title.seasonsCount} {title.seasonsCount === 1 ? 'Season' : 'Seasons'}
                    {title.episodesCount ? ` (${title.episodesCount} episodes)` : ''}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </section>

      <div className="page-body">
        <FreshnessBar fetchedAt={data?.fetchedAt} onRefresh={reload} />

        <section className="trailer-panel" id="trailer-panel" aria-labelledby="trailer-title">
          <div className="trailer-panel__head">
            <div>
              <h2 id="trailer-title">Official trailer</h2>
              <p>{title.trailer ? `${title.trailer.name} — provided via video metadata.` : 'An official trailer link appears here when one is available.'}</p>
            </div>
            <a className="btn btn-ghost btn-sm" href={title.trailer?.watchUrl || trailerSearchUrl(title.title)} target="_blank" rel="noreferrer noopener">
              {title.trailer ? 'Open on YouTube' : 'Search on YouTube'}
            </a>
          </div>
          {title.trailer ? (
            <div className="trailer-embed">
              <iframe
                src={title.trailer.embedUrl}
                title={`${title.title} — ${title.trailer.name}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="trailer-panel__empty">
              <span className="trailer-panel__badge">Trailer unavailable</span>
              <p>
                No official trailer is listed for <strong>{title.title}</strong>. You can still watch the licensed preview clip in the player.
              </p>
              <button className="btn btn-primary btn-sm" type="button" onClick={() => openPlayer(title)}>
                <PlayIcon size={16} />
                Open preview player
              </button>
            </div>
          )}
        </section>

        <section className="cast" aria-labelledby="cast-title">
          <h2 id="cast-title">Cast &amp; crew</h2>
          <div className="cast-grid">
            {cast.map((person) => (
              <figure key={`${person.id}-${person.name}`} className="cast-card">
                <SmartImage src={person.photo} secondaryFallback={person.photoFallback} fallback={FALLBACK.actor} alt={person.name} wrapperClassName="cast-card__img" />
                <figcaption>
                  <strong>{person.name}</strong>
                  <span>{person.character || 'Cast'}</span>
                </figcaption>
              </figure>
            ))}
            {title.director && title.director !== 'Unknown' && (
              <figure className="cast-card cast-card--crew">
                <span className="cast-card__monogram" aria-hidden="true">
                  {initials(title.director)}
                </span>
                <figcaption>
                  <strong>{title.director}</strong>
                  <span>{isSeries ? 'Creator' : 'Director'}</span>
                </figcaption>
              </figure>
            )}
          </div>
        </section>

        {similar.length > 0 && <Row title="More like this" items={similar} seeAllTo="/movies" />}
        {recommended.length > 0 && <Row title="Recommended next" items={recommended} seeAllTo="/movies" />}
      </div>
    </div>
  );
}

