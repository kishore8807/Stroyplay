export default function ErrorState({ title = 'Unable to load titles', error, onRetry }) {
  return (
    <div className="empty-state empty-state--wide" role="alert">
      <h2>{title}</h2>
      <p>{error?.message || 'Something went wrong while loading data.'}</p>
      {onRetry && (
        <div className="empty-state__actions">
          <button className="btn btn-primary" type="button" onClick={onRetry}>
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
