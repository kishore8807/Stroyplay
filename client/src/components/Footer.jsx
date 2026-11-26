import { Link } from 'react-router-dom';
import { PlayIcon } from './Icons';
import { COMPANY_LINKS, LANGUAGE_LINKS, NAV_LINKS } from '../lib/constants';

const COLUMNS = [
  { label: 'Explore', links: NAV_LINKS },
  { label: 'Languages', links: LANGUAGE_LINKS },
  { label: 'Company', links: COMPANY_LINKS },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link className="footer-logo" to="/" aria-label="StoryPlay home">
            <span className="brand-mark" aria-hidden="true">
              <PlayIcon size={14} />
            </span>
            <span className="brand-name">
              Story<span>Play</span>
            </span>
          </Link>
          <p className="footer-tagline">Cinema from every corner of India, and the world, in one quiet place.</p>
        </div>
        {COLUMNS.map((col) => (
          <nav key={col.label} className="footer-col" aria-label={col.label}>
            <h3>{col.label}</h3>
            <ul>
              {col.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} StoryPlay Media. All rights reserved.</p>
        <p className="footer-fineprint">
          Movie metadata and artwork may be provided by the TMDB API. This product uses the TMDB API but is not endorsed or certified by TMDB. Preview clip: Big Buck Bunny, Blender Foundation (CC BY
          3.0).
        </p>
      </div>
    </footer>
  );
}
