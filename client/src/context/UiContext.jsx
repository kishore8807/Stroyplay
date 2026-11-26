import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import QuickView from '../components/QuickView';
import PlayerModal from '../components/PlayerModal';

const UiContext = createContext(null);

export function UiProvider({ children }) {
  const [playing, setPlaying] = useState(null);
  const [quick, setQuick] = useState(null);

  const openPlayer = useCallback((movie) => {
    setQuick(null);
    setPlaying(movie);
  }, []);
  const openQuickView = useCallback((movie) => setQuick(movie), []);
  const value = useMemo(() => ({ openPlayer, openQuickView }), [openPlayer, openQuickView]);

  return (
    <UiContext.Provider value={value}>
      {children}
      {quick && <QuickView movie={quick} onClose={() => setQuick(null)} onPlay={openPlayer} />}
      {playing && <PlayerModal movie={playing} onClose={() => setPlaying(null)} />}
    </UiContext.Provider>
  );
}

export function useUi() {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error('useUi must be used inside UiProvider');
  return ctx;
}
