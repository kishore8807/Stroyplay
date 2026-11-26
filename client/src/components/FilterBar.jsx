export default function FilterBar({ label, options, active, onChange, allLabel = 'All' }) {
  return (
    <div className="filters" role="group" aria-label={`Filter by ${label.toLowerCase()}`}>
      <span className="filters-label">{label}</span>
      <div className="filters-scroll">
        {[allLabel, ...options].map((option) => (
          <button key={option} type="button" className={`chip ${active === option ? 'is-active' : ''}`} onClick={() => onChange(option)} aria-pressed={active === option}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
