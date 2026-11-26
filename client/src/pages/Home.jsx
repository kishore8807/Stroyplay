import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Row from '../components/Row';
import Skeleton from '../components/Skeleton';
import ErrorState from '../components/ErrorState';
import FreshnessBar from '../components/FreshnessBar';
import { SparkleIcon } from '../components/Icons';
import { getHome, rememberTitles } from '../lib/api';
import { LANGUAGES } from '../lib/constants';
import { recommend } from '../lib/format';
import { useProgress } from '../context/ProgressContext';
import { useUi } from '../context/UiContext';
import { useWatchlist } from '../context/WatchlistContext';
import useTitles from '../hooks/useTitles';

const AUTO_REFRESH_MS = 5 * 60 * 1000;
const LANGUAGE_IDS = LANGUAGES.map((l) => l.toLowerCase());
const seeAllFor = (id) => (id === 'series' ? '/series' : LANGUAGE_IDS.includes(id) ? `/language/${id}` : '/movies');

export default function Home() {
  const { openPlayer } = useUi();
  const { ids: savedIds } = useWatchlist();
  const { entries, getProgress } = useProgress();
  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async ({ refresh = false, signal } = {}) => {
    if (refresh) setRefreshing(true);
    setError(null);
    try {
      const data = await getHome({ refresh, signal });
      rememberTitles([...(data.hero || []), ...(data.rows || []).flatMap((r) => r.items || [])]);
      setHome(data);
    } catch (err) {
      if (err.name !== 'AbortError') setError(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    load({ signal: controller.signal });
    const timer = window.setInterval(() => load(), AUTO_REFRESH_MS);
    return () => {
      controller.abort();
      window.clearInterval(timer);
    };
  }, [load]);

  const { items: continueItems } = useTitles(useMemo(() => entries.map((e) => e.id), [entries]));

  const recommended = useMemo(() => {
    if (!home?.rows) return [];
    const seen = new Set();
    const pool = [];
    for (const row of home.rows) {
      for (const item of row.items || []) {
        if (!seen.has(item.id)) {
          seen.add(item.id);
          pool.push(item);
        }
      }
    }
    return recommend(pool, savedIds, 14);
  }, [home, savedIds]);

  if (loading && !home) {
    return (
      <div className="page page--home">
        <div className="page-body page-body--loading">
          <Skeleton cards={6} rows={4} />
        </div>
      </div>
    );
  }
  if (error && !home) {
    return (
      <div className="page page--catalog">
        <ErrorState title="Unable to load the catalogue" error={error} onRetry={() => load({ refresh: true })} />
      </div>
    );
  }

  return (
    <div className="page page--home">
      <Hero movies={home?.hero || []} onPlay={openPlayer} />
      <div className="page-body">
        <FreshnessBar fetchedAt={home?.fetchedAt} refreshing={refreshing} onRefresh={() => load({ refresh: true })} />
        {error && <ErrorState title="Refresh failed" error={error} onRetry={() => load({ refresh: true })} />}
        <Row id="continue-watching" title="Continue Watching" items={continueItems} progressOf={getProgress} emptyState={<p>Nothing in progress yet. Press play on any title and your place is saved on this device.</p>} />
        {recommended.length > 0 && <Row id="recommended" title="Recommended For You" items={recommended} seeAllTo="/movies" />}
        {(home?.rows || []).map((row) => (
          <Row key={row.id} id={row.id} title={row.title} items={row.items} seeAllTo={seeAllFor(row.id)} />
        ))}
        <section className="edit-band" aria-labelledby="edit-band-title">
          <img className="edit-band__img" src="/images/banners/spotlight-01.webp" alt="" loading="lazy" decoding="async" />
          <div className="edit-band__body">
            <p className="eyebrow">
              <SparkleIcon size={15} />
              The StoryPlay Edit
            </p>
            <h2 id="edit-band-title">Live cinema across five languages.</h2>
            <p>Film and series metadata across Tamil, Telugu, Malayalam, Hindi and English — complete with cast, ratings and trailers.</p>
            <Link className="btn btn-primary" to="/movies">
              Browse the collection
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
