export const LANGUAGES = ['Tamil', 'Telugu', 'Malayalam', 'Hindi', 'English'];

export const DEFAULT_GENRES = ['Action', 'Comedy', 'Drama', 'Thriller', 'Romance', 'Horror', 'Sci-Fi', 'Crime', 'Mystery', 'Fantasy', 'Family', 'Animation', 'Documentary', 'Political'];

export const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/movies', label: 'Movies' },
  { to: '/series', label: 'Web Series' },
  { to: '/watchlist', label: 'My Watchlist' },
];

export const LANGUAGE_LINKS = LANGUAGES.map((l) => ({ to: `/language/${l.toLowerCase()}`, label: l }));

export const COMPANY_LINKS = [
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Us' },
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms and Conditions' },
];

export const FALLBACK = {
  poster: '/images/movies/posters/fallback-poster.webp',
  backdrop: '/images/movies/backdrops/fallback-backdrop.webp',
  actor: '/images/actors/fallback-actor.webp',
};

export const PREVIEW_VIDEO = '/videos/storyplay-sample.mp4';
export const STORAGE_KEYS = { watchlist: 'storyplay.watchlist', progress: 'storyplay.progress' };
