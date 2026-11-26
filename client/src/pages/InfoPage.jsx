import { Link, useLocation } from 'react-router-dom';

const PAGES = {
  '/about': {
    eyebrow: 'About Us',
    title: 'A quieter home for great stories',
    intro: 'StoryPlay is a demonstration streaming site built to show how a calm, cinematic library can feel. There are no accounts, no payments, and no licensed streaming catalogue behind it.',
    sections: [
      { heading: 'What this is', body: 'A React + Vite web app with an Express API. The API serves a built-in offline catalogue or, when TMDB credentials are configured, live TMDB data. It includes a custom video player, search, filters, watchlists and continue-watching state stored in your browser.' },
      { heading: 'What this is not', body: 'It is not a commercial streaming service. It does not host, stream or link to full-length films, and it ships no unlicensed artwork or footage.' },
      { heading: 'The design', body: 'Deep navy surfaces, a single blue accent, Sora for display type and Manrope for reading. Every row, card and control is built on the same token set so the interface stays consistent from a 390px phone to a 1440px desktop.' },
    ],
  },
  '/contact': {
    eyebrow: 'Contact Us',
    title: 'Tell us what to build next',
    intro: 'This demo has no mail backend, so the form below is a mock-up. In a production build it would post to a support endpoint with rate limiting and spam protection.',
    sections: [
      { heading: 'Support', body: 'support@storyplay.example — playback, accounts, accessibility and billing questions.' },
      { heading: 'Partnerships', body: 'partners@storyplay.example — licensing, co-productions and catalogue submissions.' },
      { heading: 'Press', body: 'press@storyplay.example — screeners, assets and interview requests.' },
    ],
    form: true,
  },
  '/privacy': {
    eyebrow: 'Privacy Policy',
    title: 'Your data stays in your browser',
    intro: 'StoryPlay stores two things locally: your watchlist and your playback position. Both live in localStorage on your device and are never transmitted anywhere by this demo.',
    sections: [
      { heading: 'What we store', body: 'storyplay.watchlist holds the ids of titles you saved. storyplay.progress holds a playback position and timestamp per title. Clearing site data removes both.' },
      { heading: 'What we do not store', body: 'No names, no email addresses, no payment details, no analytics identifiers, no advertising cookies. There is no authentication in this build.' },
      { heading: 'Third parties', body: 'The site loads web fonts from Google Fonts. When TMDB is enabled, poster and backdrop images load from the TMDB image CDN, and trailers embed from YouTube.' },
    ],
  },
  '/terms': {
    eyebrow: 'Terms and Conditions',
    title: 'A demo, on plain terms',
    intro: 'By using this build you accept that it is a demonstration provided as-is, without warranty, and without any streaming rights.',
    sections: [
      { heading: 'Licence', body: 'The application code is provided for evaluation. Stand-in artwork is used under the Unsplash License. The preview clip is Big Buck Bunny by the Blender Foundation, licensed CC BY 3.0.' },
      { heading: 'No streaming rights', body: 'No full-length film or series is hosted, embedded or linked. "Watch Now" plays a licensed demo clip and states clearly that the full title is unavailable.' },
      { heading: 'Acceptable use', body: 'Do not present this demo as a licensed catalogue, and do not add unlicensed artwork or footage to it without the rights to do so.' },
    ],
  },
};

const QUICK_LINKS = [
  ['/movies', 'Movies'],
  ['/series', 'Web Series'],
  ['/watchlist', 'My Watchlist'],
  ['/about', 'About Us'],
  ['/privacy', 'Privacy Policy'],
  ['/terms', 'Terms and Conditions'],
];

export default function InfoPage() {
  const { pathname } = useLocation();
  const page = PAGES[pathname] ?? PAGES['/about'];

  return (
    <div className="page page--info">
      <header className="page-head">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p className="page-head__lede">{page.intro}</p>
      </header>
      <div className="info-grid">
        <div className="info-body">
          {page.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              <p>{s.body}</p>
            </section>
          ))}
          {page.form && (
            <form className="contact-form" onSubmit={(e) => e.preventDefault()} aria-label="Contact form (demo)">
              <div className="field">
                <label htmlFor="contact-name">Name</label>
                <input id="contact-name" name="name" type="text" placeholder="Your name" />
              </div>
              <div className="field">
                <label htmlFor="contact-email">Email</label>
                <input id="contact-email" name="email" type="email" placeholder="you@example.com" />
              </div>
              <div className="field field--full">
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" name="message" rows="4" placeholder="How can we help?" />
              </div>
              <p className="field__note">Demo form — nothing is submitted or stored.</p>
              <button className="btn btn-primary" type="submit">
                Send message
              </button>
            </form>
          )}
        </div>
        <aside className="info-aside">
          <h2>Quick links</h2>
          <ul>
            {QUICK_LINKS.map(([to, label]) => (
              <li key={to}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
