import { useEffect, useId, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CloseIcon, SearchIcon } from './Icons';
import { rememberTitles, searchTitles } from '../lib/api';
import { FALLBACK } from '../lib/constants';

export default function SearchBox({ variant = 'desktop', onNavigate }) {
  const navigate = useNavigate();
  const location = useLocation();
  const listId = useId();
  const wrapRef = useRef(null);
  const [draft, setDraft] = useState(null); // null = mirror the URL's ?q=
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(false);

  const urlQuery = location.pathname === '/search' ? (new URLSearchParams(location.search).get('q') ?? '') : '';
  const value = draft ?? urlQuery;
  const query = value.trim();

  useEffect(() => {
    if (!open || query.length < 2) {
      setHits([]);
      setLoading(false);
      return undefined;
    }
    const controller = new AbortController();
    setLoading(true);
    const timer = window.setTimeout(() => {
      searchTitles({ q: query, type: 'all', page: 1, signal: controller.signal })
        .then((res) => {
          const top = (res.items || []).slice(0, 6);
          rememberTitles(top);
          setHits(top);
        })
        .catch((err) => err.name !== 'AbortError' && setHits([]))
        .finally(() => !controller.signal.aborted && setLoading(false));
    }, 240);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query, open]);

  useEffect(() => {
    const onPointerDown = (e) => !wrapRef.current?.contains(e.target) && setOpen(false);
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!query) return;
    setOpen(false);
    setActive(-1);
    setDraft(null);
    onNavigate?.();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const choose = (hit) => {
    setOpen(false);
    setActive(-1);
    setDraft('');
    onNavigate?.();
    navigate(`/movie/${hit.id}`);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
      setActive(-1);
    } else if (open && hits.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((i) => (i + 1) % hits.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((i) => (i <= 0 ? hits.length - 1 : i - 1));
      } else if (e.key === 'Enter' && active >= 0) {
        e.preventDefault();
        choose(hits[active]);
      }
    }
  };

  return (
    <div className={`search search--${variant}`} ref={wrapRef} role="search">
      <form className="search__form" onSubmit={submit}>
        <SearchIcon size={18} aria-hidden="true" />
        <input
          type="search"
          value={value}
          onChange={(e) => {
            setDraft(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search movies, series, actors"
          aria-label="Search movies, TV shows or actors"
          aria-autocomplete="list"
          aria-controls={listId}
          aria-expanded={open && hits.length > 0}
          autoComplete="off"
        />
        {value && (
          <button
            className="search__clear"
            type="button"
            onClick={() => {
              setDraft('');
              setHits([]);
              setOpen(false);
            }}
            aria-label="Clear search"
          >
            <CloseIcon size={15} />
          </button>
        )}
      </form>
      {open && query.length >= 2 && (
        <div className="search__panel" id={listId} role="listbox">
          {loading && hits.length === 0 ? (
            <p className="search__empty">Searching…</p>
          ) : hits.length === 0 ? (
            <p className="search__empty">No matches for “{query}”.</p>
          ) : (
            <ul>
              {hits.map((hit, i) => (
                <li key={hit.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active === i}
                    className={`search__hit ${active === i ? 'is-active' : ''}`}
                    onPointerDown={(e) => e.preventDefault()}
                    onClick={() => choose(hit)}
                    onMouseEnter={() => setActive(i)}
                  >
                    <img src={hit.poster || hit.posterFallback || FALLBACK.poster} alt="" width="34" height="51" loading="lazy" onError={(e) => (e.currentTarget.src = FALLBACK.poster)} />
                    <span className="search__hit-text">
                      <strong>{hit.title}</strong>
                      <span>{[hit.year, hit.language, hit.genre].filter(Boolean).join(' · ')}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          <button className="search__all" type="button" onClick={submit}>
            See all results for “{query}”
          </button>
        </div>
      )}
    </div>
  );
}
