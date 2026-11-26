import { useEffect, useState } from 'react'
import { Close, Menu, Play, Search } from './Icons'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'movies', label: 'Movies' },
  { id: 'series', label: 'Web Series' },
  { id: 'watchlist', label: 'My Watchlist' },
]

export default function Navbar({ active, onNavigate, query, onQueryChange, watchlistCount }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (id) => {
    setOpen(false)
    onNavigate(id)
  }

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-inner">
        <button className="brand" type="button" onClick={() => go('home')} aria-label="StoryPlay home">
          <span className="brand-mark" aria-hidden="true">
            <Play size={15} />
          </span>
          <span className="brand-name">
            Story<span>Play</span>
          </span>
        </button>

        <nav className="nav-links" aria-label="Primary">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              className={`nav-link ${active === link.id ? 'is-active' : ''}`}
              onClick={() => go(link.id)}
              aria-current={active === link.id ? 'page' : undefined}
            >
              {link.label}
              {link.id === 'watchlist' && watchlistCount > 0 && (
                <span className="nav-badge" aria-hidden="true">
                  {watchlistCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="nav-tools">
          <label className="search search-desktop">
            <Search size={18} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search titles"
              aria-label="Search titles"
            />
          </label>
          <button className="profile" type="button" aria-label="Your profile">
            SP
          </button>
          <button
            className="burger"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <Close size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className="nav-search-mobile">
        <label className="search">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search titles"
            aria-label="Search titles"
          />
        </label>
      </div>

      <div className={`mobile-menu ${open ? 'is-open' : ''}`}>
        <nav aria-label="Mobile">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              className={`mobile-link ${active === link.id ? 'is-active' : ''}`}
              onClick={() => go(link.id)}
            >
              <span>{link.label}</span>
              {link.id === 'watchlist' && watchlistCount > 0 && (
                <span className="nav-badge">{watchlistCount}</span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
