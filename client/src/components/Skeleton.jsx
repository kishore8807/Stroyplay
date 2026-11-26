function CardSkeleton() {
  return (
    <div className="card card--skeleton" aria-hidden="true">
      <div className="card-poster skeleton" />
      <div className="card-info">
        <div className="skeleton skeleton--line" />
        <div className="skeleton skeleton--line skeleton--short" />
      </div>
    </div>
  );
}

export default function Skeleton({ cards = 6, rows = 1 }) {
  return (
    <div className="skeleton-rows" role="status" aria-live="polite">
      <span className="sr-only">Loading titles…</span>
      {Array.from({ length: rows }, (_, r) => (
        <div key={r} className="row">
          <div className="row-head">
            <div className="skeleton skeleton--title" />
          </div>
          <div className="rail rail--skeleton">
            {Array.from({ length: cards }, (_, c) => (
              <CardSkeleton key={c} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
