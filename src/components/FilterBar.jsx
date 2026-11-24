export default function FilterBar({ languages, active, onChange }) {
  return (
    <div className="filters" role="group" aria-label="Filter by language">
      <span className="filters-label">Language</span>
      {languages.map((language) => (
        <button
          key={language}
          type="button"
          className={`chip ${active === language ? 'is-active' : ''}`}
          onClick={() => onChange(language)}
          aria-pressed={active === language}
        >
          {language}
        </button>
      ))}
    </div>
  )
}
