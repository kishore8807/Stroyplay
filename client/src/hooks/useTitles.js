import { useEffect, useState } from 'react';
import { getTitle, recallTitle, rememberTitle } from '../lib/api';

/** Resolves a list of title ids to title objects, fetching any that were never seen before. */
export default function useTitles(ids = []) {
  const key = ids.join(',');
  const resolve = () => ids.map(recallTitle).filter(Boolean);
  const [items, setItems] = useState(resolve);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const missing = ids.filter((id) => !recallTitle(id));
    if (missing.length === 0) {
      setItems(resolve());
      setLoading(false);
      return undefined;
    }
    const controller = new AbortController();
    setLoading(true);
    Promise.allSettled(missing.map((id) => getTitle(id, { signal: controller.signal })))
      .then((results) => {
        if (controller.signal.aborted) return;
        for (const r of results) if (r.status === 'fulfilled' && r.value?.title) rememberTitle(r.value.title);
        setItems(resolve());
      })
      .finally(() => !controller.signal.aborted && setLoading(false));
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { items, loading };
}
