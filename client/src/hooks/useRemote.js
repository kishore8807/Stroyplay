import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Runs `load({ signal })` whenever `deps` change (aborting the previous call) and exposes
 * { data, loading, error, reload }. `enabled: false` skips loading.
 */
export default function useRemote(load, deps, { enabled = true } = {}) {
  const [state, setState] = useState({ data: null, loading: enabled, error: null });
  const loadRef = useRef(load);
  loadRef.current = load;

  const run = useCallback((signal) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    return loadRef
      .current({ signal })
      .then((data) => !signal?.aborted && setState({ data, loading: false, error: null }))
      .catch((error) => error.name !== 'AbortError' && setState((s) => ({ ...s, loading: false, error })));
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const controller = new AbortController();
    run(controller.signal);
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, run, ...deps]);

  const reload = useCallback(() => run(undefined), [run]);
  return { ...state, reload };
}
