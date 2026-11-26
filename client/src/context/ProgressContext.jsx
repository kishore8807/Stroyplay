import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '../lib/constants';
import { readJson, writeJson } from '../lib/storage';

const ProgressContext = createContext(null);
const FINISHED_RATIO = 0.92; // past this the title counts as watched and leaves "Continue Watching"
const MIN_SECONDS = 5; // ignore accidental plays

const load = () => readJson(STORAGE_KEYS.progress, {}, (v) => typeof v === 'object' && !Array.isArray(v));
const without = (map, id) => {
  const { [id]: _removed, ...rest } = map;
  return rest;
};

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(load);

  useEffect(() => {
    writeJson(STORAGE_KEYS.progress, progress);
  }, [progress]);
  useEffect(() => {
    const onStorage = (e) => e.key === STORAGE_KEYS.progress && setProgress(load());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const saveProgress = useCallback((id, seconds, duration) => {
    if (!duration || !Number.isFinite(seconds)) return;
    setProgress((cur) => {
      if (seconds / duration >= FINISHED_RATIO) return cur[id] ? without(cur, id) : cur;
      if (seconds < MIN_SECONDS) return cur;
      return { ...cur, [id]: { seconds, duration, updatedAt: Date.now() } };
    });
  }, []);

  const getProgress = useCallback(
    (id) => {
      const p = progress[id];
      return p?.duration ? Math.min(1, Math.max(0, p.seconds / p.duration)) : 0;
    },
    [progress],
  );

  const entries = useMemo(
    () => Object.entries(progress).map(([id, p]) => ({ id, ...p })).sort((a, b) => b.updatedAt - a.updatedAt),
    [progress],
  );

  const value = useMemo(() => ({ progress, entries, saveProgress, getProgress }), [progress, entries, saveProgress, getProgress]);
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider');
  return ctx;
}
