import { Play } from './Icons'

const explore = ['Home', 'Movies', 'Web Series', 'My Watchlist']
const company = ['About Us', 'Contact Us', 'Privacy Policy', 'Terms and Conditions']
const year = new Date().getFullYear()

export default function Footer({ onLink }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="brand-mark" aria-hidden="true">
              <Play size={15} />
            </span>
            <span className="brand-name">
              Story<span>Play</span>
            </span>
          </div>
          <p className="footer-tagline">
            Cinema from every corner of India, and the world, in one quiet place.
          </p>
        </div>

        <div className="footer-col">
          <h3>Explore</h3>
          <ul>
            {explore.map((label) => (
              <li key={label}>
                <button type="button" onClick={() => onLink(label)}>
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3>Company</h3>
          <ul>
            {company.map((label) => (
              <li key={label}>
                <button type="button" onClick={() => onLink(label)}>
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3>Support</h3>
          <ul>
            <li>
              <button type="button" onClick={() => onLink('Help Centre')}>
                Help Centre
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onLink('Supported Devices')}>
                Supported Devices
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onLink('Accessibility')}>
                Accessibility
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} StoryPlay Media. All rights reserved.</p>
        <p className="footer-fineprint">
          Sample catalogue for demonstration. Artwork courtesy of Lorem Picsum.
        </p>
      </div>
    </footer>
  )
}
