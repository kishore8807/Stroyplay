import { formatClock } from '../lib/format';

export default function FreshnessBar({ fetchedAt, refreshing = false, onRefresh }) {
  const time = formatClock(fetchedAt);
  if (!time && !onRefresh) return null;
  return (
    <div className="freshness-bar" aria-live="polite">
      {time && (
        <span className="freshness-bar__time">
          <span className="freshness-bar__dot" aria-hidden="true" />
          Updated at {time}
        </span>
      )}
      {onRefresh && (
        <button className="link-btn" type="button" onClick={onRefresh} disabled={refreshing}>
          {refreshing ? 'Refreshing…' : 'Refresh'}
        </button>
      )}
    </div>
  );
}
