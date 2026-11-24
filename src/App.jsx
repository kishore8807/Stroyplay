import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MovieRow from './components/MovieRow'
import MovieCard from './components/MovieCard'
import FilterBar from './components/FilterBar'
import DetailModal from './components/DetailModal'
import Footer from './components/Footer'
import { Bookmark, Check, Search } from './components/Icons'
import {
  allMovieRows,
  heroMovie,
  homeRows,
  languages,
  movies,
  seriesRows,
} from './data/movies'

const VIEW_META = {
  movies: {
    title: 'Movies',
    sub: 'Blockbusters, cult classics, and everything in between.',
  },
  series: {
    title: 'Web Series',
    sub: 'Binge-worthy stories, one episode at a time.',
  },
}

function EmptyState({ icon, title, body, actionLabel, onAction }) {
  return (
    <div className="empty">
      <span className="empty-icon" aria-hidden="true">
        {icon}
      </span>
      <h2 className="empty-title">{title}</h2>
      <p className="empty-body">{body}</p>
      <button className="btn btn-primary" type="button" onClick={onAction}>
        {actionLabel}
      </button>
    </div>
  )
}

export default function App() {
  const [view, setView] = useState('home')
  const [query, setQuery] = useState('')
  const [language, setLanguage] = useState('All')
  const [focusedRow, setFocusedRow] = useState(null)
  const [modal, setModal] = useState(null)
  const [toast, setToast] = useState('')
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const stored = localStorage.getItem('storyplay.watchlist')
      const parsed = stored ? JSON.parse(stored) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('storyplay.watchlist', JSON.stringify(watchlist))
    } catch {
      /* storage can be unavailable in private windows */
    }
  }, [watchlist])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [view, focusedRow])

  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(''), 2800)
    return () => clearTimeout(timer)
  }, [toast])

  const trimmedQuery = query.trim()
  const searching = trimmedQuery.length > 0
  const showResults = searching || language !== 'All'
  const heroShown = view === 'home' && !showResults && !focusedRow

  const results = useMemo(() => {
    const needle = trimmedQuery.toLowerCase()
    const source =
      view === 'watchlist'
        ? movies.filter((movie) => watchlist.includes(movie.id))
        : movies
    return source.filter((movie) => {
      const matchesLanguage = language === 'All' || movie.language === language
      const matchesQuery =
        !needle ||
        movie.title.toLowerCase().includes(needle) ||
        movie.genre.toLowerCase().includes(needle) ||
        movie.language.toLowerCase().includes(needle)
      return matchesLanguage && matchesQuery
    })
  }, [trimmedQuery, language, view, watchlist])

  const isSaved = (id) => watchlist.includes(id)

  const toggleSave = (id) => {
    const movie = movies.find((item) => item.id === id)
    if (!movie) return
    const alreadySaved = watchlist.includes(id)
    setWatchlist((list) =>
      list.includes(id) ? list.filter((entry) => entry !== id) : [...list, id],
    )
    setToast(
      alreadySaved
        ? `Removed ${movie.title} from your watchlist`
        : `Added ${movie.title} to your watchlist`,
    )
  }

  const navigate = (id) => {
    setView(id)
    setFocusedRow(null)
    setQuery('')
    setLanguage('All')
  }

  const openDetails = (movie) => setModal({ movie })

  const handlePlay = (movie) => {
    setModal(null)
    setToast(`Playback for ${movie.title} is coming soon`)
  }

  const seeAll = (row) => {
    setFocusedRow(row)
    setQuery('')
    setLanguage('All')
  }

  const clearFilters = () => {
    setQuery('')
    setLanguage('All')
  }

  const handleFooterLink = (label) => {
    setToast(`${label} page is coming soon`)
  }

  const savedMovies = movies.filter((movie) => watchlist.includes(movie.id))
  const watchlistResults = savedMovies.filter((movie) => {
    const matchesLanguage = language === 'All' || movie.language === language
    const matchesQuery =
      !searching || movie.title.toLowerCase().includes(trimmedQuery.toLowerCase())
    return matchesLanguage && matchesQuery
  })

  const browseRows = view === 'movies' ? allMovieRows : view === 'series' ? seriesRows : homeRows

  const renderRows = (rows) => (
    <div className="rows">
      {rows.map((row) => (
        <MovieRow
          key={row.id}
          title={row.title}
          items={row.items}
          savedIds={watchlist}
          onToggleSave={toggleSave}
          onOpen={openDetails}
          onSeeAll={() => seeAll(row)}
        />
      ))}
    </div>
  )

  const renderGrid = (items) => (
    <div className="grid">
      {items.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          saved={isSaved(movie.id)}
          onToggleSave={toggleSave}
          onOpen={openDetails}
        />
      ))}
    </div>
  )

  let content

  if (focusedRow) {
    content = (
      <>
        <div className="view-head">
          <div>
            <h1 className="view-title">{focusedRow.title}</h1>
            <p className="view-sub">
              {focusedRow.items.length} {focusedRow.items.length === 1 ? 'title' : 'titles'}
            </p>
          </div>
          <button className="text-btn" type="button" onClick={() => setFocusedRow(null)}>
            Back to browse
          </button>
        </div>
        {renderGrid(focusedRow.items)}
      </>
    )
  } else if (showResults) {
    const resultsTitle = searching ? `Results for “${trimmedQuery}”` : `${language} titles`
    const resultsSub = `${results.length} ${results.length === 1 ? 'title' : 'titles'} found`
    content = results.length ? (
      <>
        <div className="view-head">
          <div>
            <h1 className="view-title">{resultsTitle}</h1>
            <p className="view-sub">{resultsSub}</p>
          </div>
          <button className="text-btn" type="button" onClick={clearFilters}>
            Clear filters
          </button>
        </div>
        {renderGrid(results)}
      </>
    ) : (
      <EmptyState
        icon={<Search size={30} />}
        title="No titles found"
        body="Try a different spelling, or clear the language filter to widen the search."
        actionLabel="Clear filters"
        onAction={clearFilters}
      />
    )
  } else if (view === 'watchlist') {
    content = watchlistResults.length ? (
      <>
        <div className="view-head">
          <div>
            <h1 className="view-title">My Watchlist</h1>
            <p className="view-sub">
              {watchlistResults.length}{' '}
              {watchlistResults.length === 1 ? 'title saved' : 'titles saved'}
            </p>
          </div>
        </div>
        {renderGrid(watchlistResults)}
      </>
    ) : (
      <EmptyState
        icon={<Bookmark size={30} />}
        title="Your watchlist is empty"
        body="Save films and series as you browse, and they will wait for you here."
        actionLabel="Browse movies"
        onAction={() => navigate('movies')}
      />
    )
  } else if (view === 'home') {
    content = renderRows(browseRows)
  } else {
    content = (
      <>
        <div className="view-head">
          <div>
            <h1 className="view-title">{VIEW_META[view].title}</h1>
            <p className="view-sub">{VIEW_META[view].sub}</p>
          </div>
        </div>
        {renderRows(browseRows)}
      </>
    )
  }

  return (
    <div className="app">
      <Navbar
        active={view}
        onNavigate={navigate}
        query={query}
        onQueryChange={setQuery}
        watchlistCount={watchlist.length}
      />

      <main>
        {heroShown && (
          <Hero
            movie={heroMovie}
            saved={isSaved(heroMovie.id)}
            onWatch={() => openDetails(heroMovie)}
            onInfo={() => openDetails(heroMovie)}
            onToggleSave={toggleSave}
          />
        )}

        <div className={`content ${heroShown ? '' : 'page-content'}`}>
          {!focusedRow && (
            <FilterBar languages={languages} active={language} onChange={setLanguage} />
          )}
          {content}
        </div>
      </main>

      <Footer onLink={handleFooterLink} />

      {modal && (
        <DetailModal
          movie={modal.movie}
          saved={isSaved(modal.movie.id)}
          onClose={() => setModal(null)}
          onPlay={handlePlay}
          onToggleSave={toggleSave}
        />
      )}

      {toast && (
        <div className="toast" role="status">
          <Check size={16} />
          <span>{toast}</span>
        </div>
      )}
    </div>
  )
}
