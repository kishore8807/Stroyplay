// Sample catalogue for the StoryPlay homepage.
// Poster/backdrop art uses Lorem Picsum (Unsplash-licensed photos) so the
// demo ships without any paid API or copyrighted film assets.

const poster = (id) => `https://picsum.photos/seed/sp-${id}/420/630`
const backdrop = (id) => `https://picsum.photos/seed/sp-${id}-wide/1680/945`

const raw = [
  // ---------- Tamil ----------
  {
    id: 'kaalam',
    title: 'Kaalam',
    year: 2024,
    language: 'Tamil',
    genre: 'Thriller',
    rating: 8.4,
    type: 'movie',
    duration: '2h 18m',
    trending: true,
    recent: true,
    description:
      'A disgraced inspector races against a citywide blackout to catch a killer who never seems to sleep.',
  },
  {
    id: 'vetri',
    title: 'Vetri',
    year: 2023,
    language: 'Tamil',
    genre: 'Action',
    rating: 7.9,
    type: 'movie',
    duration: '2h 6m',
    description:
      "A fisherman's son takes on the smuggling cartel that owns the harbour and everyone in it.",
  },
  {
    id: 'nagaram',
    title: 'Nagaram',
    year: 2024,
    language: 'Tamil',
    genre: 'Crime',
    rating: 8.1,
    type: 'movie',
    duration: '2h 22m',
    trending: true,
    description:
      'Three strangers, one stolen ledger, and a single night that rewrites the balance of power in Chennai.',
  },
  {
    id: 'pookkal',
    title: 'Pookkal',
    year: 2022,
    language: 'Tamil',
    genre: 'Drama',
    rating: 7.6,
    type: 'movie',
    duration: '1h 58m',
    description:
      "A flower seller's quiet life unravels when her son returns home with a secret and a stranger.",
  },
  {
    id: 'aruvi',
    title: 'Aruvi',
    year: 2023,
    language: 'Tamil',
    genre: 'Mystery',
    rating: 8.0,
    type: 'movie',
    duration: '2h 10m',
    description:
      'A waterfall, a missing trekker, and a village that tells the same lie seven different ways.',
  },
  {
    id: 'thirai',
    title: 'Thirai',
    year: 2021,
    language: 'Tamil',
    genre: 'Romance',
    rating: 7.3,
    type: 'movie',
    duration: '1h 52m',
    description:
      'Two projectionists fall in love through the films they screen and the words they never say.',
  },
  {
    id: 'kanavu',
    title: 'Kanavu',
    year: 2024,
    language: 'Tamil',
    genre: 'Fantasy',
    rating: 8.2,
    type: 'movie',
    duration: '2h 14m',
    recent: true,
    description:
      'A cartographer discovers a town that only appears on maps drawn while dreaming.',
  },

  // ---------- Telugu ----------
  {
    id: 'vajram',
    title: 'Vajram',
    year: 2024,
    language: 'Telugu',
    genre: 'Action',
    rating: 8.5,
    type: 'movie',
    duration: '2h 24m',
    trending: true,
    recent: true,
    description:
      'A retired commando is pulled back into the underworld when a smuggling ring threatens his coastal town.',
  },
  {
    id: 'neevu',
    title: 'Neevu',
    year: 2023,
    language: 'Telugu',
    genre: 'Romance',
    rating: 7.8,
    type: 'movie',
    duration: '2h 2m',
    description:
      'A letter delivered thirty years late sends a widower searching for the woman he never forgot.',
  },
  {
    id: 'raktha',
    title: 'Raktha',
    year: 2024,
    language: 'Telugu',
    genre: 'Thriller',
    rating: 8.1,
    type: 'movie',
    duration: '2h 12m',
    description:
      'A forensic artist sketches a suspect from a witness who can only describe him in nightmares.',
  },
  {
    id: 'simha',
    title: 'Simha',
    year: 2022,
    language: 'Telugu',
    genre: 'Drama',
    rating: 7.5,
    type: 'movie',
    duration: '2h 30m',
    description:
      'An ageing wrestler trains his granddaughter to fight the men who ruined his family name.',
  },
  {
    id: 'aakasha',
    title: 'Aakasha',
    year: 2023,
    language: 'Telugu',
    genre: 'Sci-Fi',
    rating: 8.3,
    type: 'movie',
    duration: '2h 16m',
    trending: true,
    description:
      'When the sky above Hyderabad starts repeating yesterday, one engineer decides to break the loop.',
  },
  {
    id: 'bhoomi',
    title: 'Bhoomi',
    year: 2024,
    language: 'Telugu',
    genre: 'Crime',
    rating: 7.9,
    type: 'movie',
    duration: '2h 8m',
    description:
      "A land broker's empire cracks when a survey reveals a body buried under his biggest deal.",
  },
  {
    id: 'pranam',
    title: 'Pranam',
    year: 2021,
    language: 'Telugu',
    genre: 'Family',
    rating: 7.2,
    type: 'movie',
    duration: '1h 56m',
    description:
      'Three generations share one crumbling house and a promise none of them can keep.',
  },

  // ---------- Hindi ----------
  {
    id: 'safar',
    title: 'Safar',
    year: 2024,
    language: 'Hindi',
    genre: 'Drama',
    rating: 8.0,
    type: 'movie',
    duration: '2h 12m',
    trending: true,
    description:
      'A night-train journey forces six strangers to confront the lives they left on the platform.',
  },
  {
    id: 'raaz',
    title: 'Raaz',
    year: 2023,
    language: 'Hindi',
    genre: 'Horror',
    rating: 7.7,
    type: 'movie',
    duration: '2h 4m',
    description:
      'A family moves into a hill house where every mirror remembers a different tragedy.',
  },
  {
    id: 'dilse',
    title: 'Dil Se',
    year: 2024,
    language: 'Hindi',
    genre: 'Romance',
    rating: 8.2,
    type: 'movie',
    duration: '2h 18m',
    trending: true,
    recent: true,
    description:
      "A radio host and a shy architect fall for each other's voices before they ever meet.",
  },
  {
    id: 'chakravyuh',
    title: 'Chakravyuh',
    year: 2022,
    language: 'Hindi',
    genre: 'Thriller',
    rating: 8.1,
    type: 'movie',
    duration: '2h 20m',
    description:
      'A whistleblower trapped in a corporate maze has one night to expose the man who built it.',
  },
  {
    id: 'udaan',
    title: 'Udaan',
    year: 2023,
    language: 'Hindi',
    genre: 'Drama',
    rating: 7.9,
    type: 'movie',
    duration: '1h 48m',
    description:
      'A grounded pilot teaches a terrified boy to fly a paper plane and, slowly, to trust again.',
  },
  {
    id: 'metro',
    title: 'Metro',
    year: 2024,
    language: 'Hindi',
    genre: 'Comedy',
    rating: 7.6,
    type: 'movie',
    duration: '2h 2m',
    description:
      "Four commuters miss the same last train and accidentally become the city's unlikeliest gang.",
  },
  {
    id: 'aandhi',
    title: 'Aandhi',
    year: 2021,
    language: 'Hindi',
    genre: 'Mystery',
    rating: 7.4,
    type: 'movie',
    duration: '2h 6m',
    description:
      'A storm cuts off a desert motel, and the guest list starts to look like a confession.',
  },

  // ---------- English ----------
  {
    id: 'nightfall',
    title: 'Nightfall',
    year: 2024,
    language: 'English',
    genre: 'Thriller',
    rating: 8.3,
    type: 'movie',
    duration: '2h 8m',
    trending: true,
    description:
      'A hostage negotiator takes a call from a voice she buried ten years ago.',
  },
  {
    id: 'orbit',
    title: 'Orbit',
    year: 2023,
    language: 'English',
    genre: 'Sci-Fi',
    rating: 8.6,
    type: 'movie',
    duration: '1h 58m',
    trending: true,
    description:
      "Two astronauts wake to find their station empty and Earth answering in someone else's voice.",
  },
  {
    id: 'quietroom',
    title: 'The Quiet Room',
    year: 2024,
    language: 'English',
    genre: 'Drama',
    rating: 8.0,
    type: 'movie',
    duration: '2h 12m',
    recent: true,
    description:
      'A sound engineer who has never heard silence must mix the last record of a dying friend.',
  },
  {
    id: 'ember',
    title: 'Ember',
    year: 2022,
    language: 'English',
    genre: 'Fantasy',
    rating: 7.8,
    type: 'movie',
    duration: '2h 6m',
    description:
      "A blacksmith's daughter inherits a fire that remembers everyone who ever warmed their hands.",
  },
  {
    id: 'signallost',
    title: 'Signal Lost',
    year: 2023,
    language: 'English',
    genre: 'Mystery',
    rating: 8.2,
    type: 'movie',
    duration: '1h 54m',
    description:
      'A lighthouse keeper receives a distress call dated three days in the future.',
  },
  {
    id: 'blueharbor',
    title: 'Blue Harbor',
    year: 2024,
    language: 'English',
    genre: 'Crime',
    rating: 7.9,
    type: 'movie',
    duration: '2h 16m',
    description:
      'A small-town detective returns home to bury her father and reopen the case that made her leave.',
  },
  {
    id: 'lasttake',
    title: 'The Last Take',
    year: 2021,
    language: 'English',
    genre: 'Comedy',
    rating: 7.5,
    type: 'movie',
    duration: '1h 46m',
    description:
      'A failed director reunites his cast for one final scene, and nobody remembers their lines.',
  },

  // ---------- Series ----------
  {
    id: 'longweekend',
    title: 'The Long Weekend',
    year: 2024,
    language: 'English',
    genre: 'Drama',
    rating: 8.4,
    type: 'series',
    duration: '6 episodes',
    recent: true,
    description:
      'Five friends rent a lake house for three days. On the fourth, one of them is still missing.',
  },
  {
    id: 'meridian',
    title: 'Meridian',
    year: 2023,
    language: 'English',
    genre: 'Sci-Fi',
    rating: 8.7,
    type: 'series',
    duration: '8 episodes',
    description:
      'A cartographer maps a city that shifts every night and finds her own address inside it.',
  },
  {
    id: 'gullynights',
    title: 'Gully Nights',
    year: 2024,
    language: 'Hindi',
    genre: 'Crime',
    rating: 8.2,
    type: 'series',
    duration: '10 episodes',
    recent: true,
    description:
      'Two rival rappers run the same street and discover the same body in the same alley.',
  },
  {
    id: 'halftruths',
    title: 'Half Truths',
    year: 2022,
    language: 'English',
    genre: 'Mystery',
    rating: 8.0,
    type: 'series',
    duration: '6 episodes',
    description:
      'A therapist records her sessions. One of her patients is describing a murder — hers.',
  },
  {
    id: 'capital',
    title: 'Capital',
    year: 2023,
    language: 'Hindi',
    genre: 'Political',
    rating: 8.5,
    type: 'series',
    duration: '9 episodes',
    description:
      'A rookie minister inherits a scandal, a mentor, and a city that wants her gone.',
  },
  {
    id: 'afterhours',
    title: 'After Hours',
    year: 2024,
    language: 'English',
    genre: 'Romance',
    rating: 7.9,
    type: 'series',
    duration: '8 episodes',
    description:
      'A night-shift nurse and a late-night baker trade notes through the window between them.',
  },
  {
    id: 'thearchive',
    title: 'The Archive',
    year: 2021,
    language: 'English',
    genre: 'Thriller',
    rating: 7.8,
    type: 'series',
    duration: '6 episodes',
    description:
      'A librarian discovers that every book in her basement records something that has not happened yet.',
  },
]

export const movies = raw.map((movie) => ({
  ...movie,
  poster: poster(movie.id),
  backdrop: backdrop(movie.id),
}))

export const heroMovie =
  movies.find((movie) => movie.id === 'vajram') ?? movies[0]

export const languages = ['All', 'Tamil', 'Telugu', 'Hindi', 'English']

const moviesIn = (language) =>
  movies.filter((movie) => movie.type === 'movie' && movie.language === language)

const movieRows = [
  {
    id: 'trending',
    title: 'Trending Movies',
    items: movies.filter((movie) => movie.type === 'movie' && movie.trending),
  },
  { id: 'tamil', title: 'Popular Tamil Movies', items: moviesIn('Tamil') },
  { id: 'telugu', title: 'Telugu Movies', items: moviesIn('Telugu') },
  { id: 'hindi', title: 'Hindi Movies', items: moviesIn('Hindi') },
  { id: 'english', title: 'English Movies', items: moviesIn('English') },
]

export const homeRows = [
  ...movieRows,
  {
    id: 'series',
    title: 'Popular Web Series',
    items: movies.filter((movie) => movie.type === 'series'),
  },
  {
    id: 'new',
    title: 'Recently Added',
    items: movies.filter((movie) => movie.recent),
  },
]

export const allMovieRows = [
  ...movieRows,
  {
    id: 'new-movies',
    title: 'Recently Added Movies',
    items: movies.filter((movie) => movie.type === 'movie' && movie.recent),
  },
]

export const seriesRows = [
  {
    id: 'series',
    title: 'Popular Web Series',
    items: movies.filter((movie) => movie.type === 'series'),
  },
  {
    id: 'new-series',
    title: 'Recently Added Series',
    items: movies.filter((movie) => movie.type === 'series' && movie.recent),
  },
]
