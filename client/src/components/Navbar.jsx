import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation } from 'react-router-dom';
import SearchBox from './SearchBox';
import { BookmarkIcon, ChevronDownIcon, CloseIcon, FilmIcon, MenuIcon, PlayIcon, TvIcon, UserIcon } from './Icons';
import { useWatchlist } from '../context/WatchlistContext';
import { LANGUAGE_LINKS, NAV_LINKS } from '../lib/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { pathname } = useLocation();
  const { count } = useWatchlist();
  const langRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setLangOpen(false);
        setProfileOpen(false);
      }
    };
    const onPointerDown = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  // Close menus after any navigation.
  useEffect(() => {
    setMobileOpen(false);
    setLangOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  const onLanguagePage = pathname.startsWith('/language/');
  const mainLinks = NAV_LINKS.filter((l) => l.to !== '/watchlist');

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-inner">
        <Link className="brand" to="/" aria-label="StoryPlay home">
          <span className="brand-mark" aria-hidden="true">
            <PlayIcon size={14} />
          </span>
          <span className="brand-name">
            Story<span>Play</span>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {mainLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => `nav-link ${isActive || (link.to === '/movies' && pathname.startsWith('/movie/')) ? 'is-active' : ''}`}>
              {link.label}
            </NavLink>
          ))}
          <div className="nav-dropdown" ref={langRef}>
            <button type="button" className={`nav-link nav-link--button ${onLanguagePage ? 'is-active' : ''}`} onClick={() => setLangOpen((o) => !o)} aria-expanded={langOpen} aria-haspopup="true">
              Languages
              <ChevronDownIcon size={14} />
            </button>
            {langOpen && (
              <div className="nav-menu" role="menu">
                {LANGUAGE_LINKS.map((link) => (
                  <NavLink key={link.to} to={link.to} role="menuitem" className={({ isActive }) => `nav-menu__item ${isActive ? 'is-active' : ''}`}>
                    {link.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
          <NavLink to="/watchlist" className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}>
            My Watchlist
            {count > 0 && (
              <span className="nav-badge" aria-label={`${count} titles saved`}>
                {count}
              </span>
            )}
          </NavLink>
        </nav>

        <div className="nav-tools">
          <SearchBox variant="desktop" />
          <div className="nav-dropdown" ref={profileRef}>
            <button type="button" className="profile" aria-label="Profile menu" aria-expanded={profileOpen} onClick={() => setProfileOpen((o) => !o)}>
              <UserIcon size={18} />
            </button>
            {profileOpen && (
              <div className="nav-menu nav-menu--right" role="menu">
                <div className="profile-card">
                  <span className="profile-card__avatar" aria-hidden="true">
                    SP
                  </span>
                  <span>
                    <strong>Guest viewer</strong>
                    <small>Local profile · no sign-in</small>
                  </span>
                </div>
                <Link to="/watchlist" className="nav-menu__item" role="menuitem">
                  <BookmarkIcon size={16} /> My Watchlist
                </Link>
                <Link to="/movies" className="nav-menu__item" role="menuitem">
                  <FilmIcon size={16} /> Browse movies
                </Link>
                <Link to="/series" className="nav-menu__item" role="menuitem">
                  <TvIcon size={16} /> Browse series
                </Link>
              </div>
            )}
          </div>
          <button className="burger" type="button" onClick={() => setMobileOpen((o) => !o)} aria-expanded={mobileOpen} aria-controls="mobile-menu" aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>
            {mobileOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      <div className="nav-search-mobile">
        <SearchBox variant="mobile" onNavigate={() => setMobileOpen(false)} />
      </div>

      {createPortal(
        <div id="mobile-menu" className={`mobile-menu ${mobileOpen ? 'is-open' : ''}`}>
          <nav aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => `mobile-link ${isActive ? 'is-active' : ''}`} onClick={() => setMobileOpen(false)}>
                <span>{link.label}</span>
                {link.to === '/watchlist' && count > 0 && <span className="nav-badge">{count}</span>}
              </NavLink>
            ))}
            <p className="mobile-menu__label">Languages</p>
            <div className="mobile-menu__langs">
              {LANGUAGE_LINKS.map((link) => (
                <NavLink key={link.to} to={link.to} className={({ isActive }) => `chip chip--menu ${isActive ? 'is-active' : ''}`} onClick={() => setMobileOpen(false)}>
                  {link.label}
                </NavLink>
              ))}
            </div>
          </nav>
        </div>,
        document.body,
      )}
    </header>
  );
}
