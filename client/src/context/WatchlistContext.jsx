import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '../lib/constants';
import { readJson, writeJson } from '../lib/storage';

const WatchlistContext = createContext(null);
const load = () => readJson(STORAGE_KEYS.watchlist, [], (v) => Array.isArray(v)).filter((id) => typeof id === 'string');

export function WatchlistProvider({ children }) {
  const [ids, setIds] = useState(load);

  useEffect(() => {
    writeJson(STORAGE_KEYS.watchlist, ids);
  }, [ids]);
  useEffect(() => {
    const onStorage = (e) => e.key === STORAGE_KEYS.watchlist && setIds(load());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const has = useCallback((id) => ids.includes(id), [ids]);
  const toggle = useCallback((id) => setIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [id, ...cur])), []);
  const remove = useCallback((id) => setIds((cur) => cur.filter((x) => x !== id)), []);
  const clear = useCallback(() => setIds([]), []);

  const value = useMemo(() => ({ ids, has, toggle, remove, clear, count: ids.length }), [ids, has, toggle, remove, clear]);
  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error('useWatchlist must be used inside WatchlistProvider');
  return ctx;
}
