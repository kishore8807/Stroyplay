// Offline catalogue. Artwork lives in client/public/images and is served by the web app.
// Row format: [slug, title, type, language, genres, year, rating, runtime, director, cast[], description]
// runtime: minutes for movies, [seasons, episodes] for series.

export const GENRES = ['Action', 'Comedy', 'Drama', 'Thriller', 'Romance', 'Horror', 'Sci-Fi', 'Crime', 'Mystery', 'Fantasy', 'Family', 'Animation', 'Documentary', 'Political'];
export const LANGUAGES = ['Tamil', 'Telugu', 'Malayalam', 'Hindi', 'English'];

export const PEOPLE = {
  'aditya-verma': 'Aditya Verma',
  'ananya-iyer': 'Ananya Iyer',
  'arjun-dev': 'Arjun Dev',
  'daniel-roy': 'Daniel Roy',
  'faisal-nazeer': 'Faisal Nazeer',
  'kavin-raj': 'Kavin Raj',
  'leela-krishnan': 'Leela Krishnan',
  'meera-raman': 'Meera Raman',
  'nithya-varma': 'Nithya Varma',
  'nora-hale': 'Nora Hale',
  'rahul-menon': 'Rahul Menon',
  'sam-whitaker': 'Sam Whitaker',
  'surya-prakash': 'Surya Prakash',
  'tanvi-desai': 'Tanvi Desai',
  'vikrant-sethi': 'Vikrant Sethi',
  'zoya-khan': 'Zoya Khan',
};

const ROWS = [
  ['aakasha', 'Aakasha', 'movie', 'Malayalam', ['Drama', 'Fantasy'], 2024, 8.1, 128, 'Leela Krishnan', ['meera-raman', 'rahul-menon', 'nithya-varma'], 'A retired pilot teaches a village girl to build a glider and chase a childhood promise across the monsoon sky.'],
  ['aandhi', 'Aandhi', 'movie', 'Hindi', ['Political', 'Drama'], 2023, 7.6, 141, 'Vikrant Sethi', ['zoya-khan', 'aditya-verma', 'tanvi-desai'], 'A young district officer faces a storm of pressure when a flood-relief scandal reaches the state capital.'],
  ['afterhours', 'After Hours', 'movie', 'English', ['Thriller', 'Crime'], 2022, 7.2, 109, 'Sam Whitaker', ['nora-hale', 'daniel-roy'], 'A night-shift pharmacist gets one phone call that turns a quiet city block into a long, dangerous night.'],
  ['aruvi', 'Aruvi', 'movie', 'Tamil', ['Family', 'Drama'], 2021, 7.9, 122, 'Ananya Iyer', ['kavin-raj', 'meera-raman'], 'Three generations of a hill-town family reunite for a harvest festival and unpack the secrets they carry.'],
  ['bhoomi', 'Bhoomi', 'movie', 'Telugu', ['Action', 'Drama'], 2024, 7.4, 150, 'Surya Prakash', ['arjun-dev', 'tanvi-desai', 'faisal-nazeer'], 'A farmer-turned-surveyor stands against a land syndicate that is quietly buying a whole valley.'],
  ['blueharbor', 'Blue Harbor', 'movie', 'English', ['Romance', 'Drama'], 2023, 7.0, 114, 'Nora Hale', ['daniel-roy', 'nora-hale'], 'Two strangers keep missing each other across a foggy seaside town until the last ferry of the season.'],
  ['capital', 'Capital', 'series', 'English', ['Political', 'Drama'], 2024, 8.4, [2, 16], 'Sam Whitaker', ['nora-hale', 'sam-whitaker', 'daniel-roy'], 'Inside a fictional parliament, a junior aide discovers the vote that will decide a government was never clean.'],
  ['chakravyuh', 'Chakravyuh', 'movie', 'Hindi', ['Action', 'Thriller'], 2022, 7.3, 147, 'Vikrant Sethi', ['aditya-verma', 'faisal-nazeer'], 'An ex-officer re-enters a labyrinth of old alliances to rescue a witness before dawn.'],
  ['dilse', 'Dilse', 'movie', 'Hindi', ['Romance', 'Drama'], 2021, 7.5, 133, 'Zoya Khan', ['tanvi-desai', 'aditya-verma'], 'A radio host and a touring musician trade letters on air and slowly fall for a voice they have never seen.'],
  ['ember', 'Ember', 'movie', 'English', ['Fantasy', 'Family'], 2023, 7.7, 104, 'Nora Hale', ['daniel-roy', 'nora-hale'], 'A girl who can talk to fire is sent to guard the last lantern in a city that has forgotten the dark.'],
  ['gullynights', 'Gully Nights', 'series', 'Hindi', ['Crime', 'Drama'], 2024, 8.0, [1, 8], 'Faisal Nazeer', ['faisal-nazeer', 'zoya-khan', 'rahul-menon'], 'After sundown, three friends in an old-city lane run the only tea stall that never closes — and hear everything.'],
  ['halftruths', 'Half Truths', 'series', 'English', ['Mystery', 'Thriller'], 2023, 7.8, [2, 14], 'Daniel Roy', ['nora-hale', 'sam-whitaker'], 'A fact-checker begins to doubt the one story she has never questioned: her own.'],
  ['kaalam', 'Kaalam', 'movie', 'Tamil', ['Sci-Fi', 'Drama'], 2024, 8.2, 138, 'Kavin Raj', ['kavin-raj', 'nithya-varma', 'surya-prakash'], 'A clockmaker finds a watch that lets him revisit one hour of his life — only one hour, only once.'],
  ['kaanal', 'Kaanal', 'series', 'Tamil', ['Mystery', 'Thriller'], 2023, 7.9, [1, 10], 'Meera Raman', ['meera-raman', 'kavin-raj'], 'A coastal town keeps seeing a light on the water that no boat has ever reached.'],
  ['kadalnila', 'Kadal Nila', 'movie', 'Tamil', ['Romance', 'Family'], 2022, 7.1, 118, 'Ananya Iyer', ['kavin-raj', 'nithya-varma'], 'A fisherman and a visiting marine biologist learn each other’s tides over a single monsoon.'],
  ['kanavu', 'Kanavu', 'movie', 'Tamil', ['Drama', 'Fantasy'], 2021, 7.4, 126, 'Kavin Raj', ['meera-raman', 'surya-prakash'], 'A night-school teacher dreams the same village every night and sets out to find it in daylight.'],
  ['lasttake', 'Last Take', 'movie', 'English', ['Comedy', 'Drama'], 2023, 7.3, 107, 'Sam Whitaker', ['daniel-roy', 'nora-hale', 'sam-whitaker'], 'A struggling film crew has one day and one borrowed camera to finish the movie that could save their studio.'],
  ['longweekend', 'Long Weekend', 'movie', 'English', ['Comedy', 'Family'], 2022, 6.9, 98, 'Daniel Roy', ['sam-whitaker', 'nora-hale'], 'Four relatives, one cabin, no signal — and a weekend that refuses to go to plan.'],
  ['maranam', 'Maranam', 'movie', 'Malayalam', ['Horror', 'Mystery'], 2023, 7.0, 119, 'Rahul Menon', ['rahul-menon', 'nithya-varma'], 'A night-watchman at a closed railway station hears a train that is not on any timetable.'],
  ['meridian', 'Meridian', 'movie', 'English', ['Sci-Fi', 'Thriller'], 2024, 7.8, 125, 'Nora Hale', ['nora-hale', 'daniel-roy'], 'A surveying team on a polar base finds a signal that is counting down to something below the ice.'],
  ['metro', 'Metro', 'movie', 'English', ['Action', 'Crime'], 2022, 7.1, 112, 'Sam Whitaker', ['sam-whitaker', 'daniel-roy'], 'A transit cop has until the last train to stop a heist that was designed to look like a power cut.'],
  ['nagaram', 'Nagaram', 'movie', 'Tamil', ['Crime', 'Drama'], 2022, 7.6, 136, 'Surya Prakash', ['surya-prakash', 'kavin-raj', 'meera-raman'], 'One night, one city, and four strangers whose choices quietly connect them.'],
  ['neevu', 'Neevu', 'movie', 'Telugu', ['Romance', 'Drama'], 2023, 7.2, 129, 'Tanvi Desai', ['arjun-dev', 'tanvi-desai'], 'Two college rivals reunite at a wedding a decade later and have one evening to be honest.'],
  ['nightfall', 'Nightfall', 'movie', 'English', ['Horror', 'Thriller'], 2023, 6.8, 101, 'Daniel Roy', ['nora-hale', 'sam-whitaker'], 'When the sun fails to rise over a mountain lodge, the guests discover what the dark has been waiting for.'],
  ['orbit', 'Orbit', 'movie', 'English', ['Sci-Fi', 'Drama'], 2024, 8.0, 132, 'Nora Hale', ['nora-hale', 'daniel-roy', 'sam-whitaker'], 'An astronaut on a long solo mission begins to receive messages from a crew that has not launched yet.'],
  ['oruyathra', 'Oru Yathra', 'movie', 'Malayalam', ['Drama', 'Family'], 2022, 7.7, 121, 'Leela Krishnan', ['rahul-menon', 'meera-raman'], 'A father and son drive the length of Kerala to deliver one ordinary parcel and finally talk.'],
  ['pookkal', 'Pookkal', 'series', 'Malayalam', ['Family', 'Drama'], 2024, 8.3, [1, 10], 'Leela Krishnan', ['nithya-varma', 'rahul-menon', 'meera-raman'], 'A flower-market family argues, laughs and rebuilds across one festival season.'],
  ['pranam', 'Pranam', 'movie', 'Malayalam', ['Drama', 'Romance'], 2021, 7.5, 124, 'Rahul Menon', ['rahul-menon', 'nithya-varma'], 'A temple musician and a returning engineer find a shared language in a forgotten raga.'],
  ['quietroom', 'Quiet Room', 'movie', 'English', ['Drama', 'Mystery'], 2023, 7.4, 106, 'Nora Hale', ['nora-hale', 'sam-whitaker'], 'A sound engineer is hired to restore a recording from a room where something was never meant to be said.'],
  ['raaz', 'Raaz', 'movie', 'Hindi', ['Mystery', 'Thriller'], 2022, 7.3, 131, 'Zoya Khan', ['zoya-khan', 'faisal-nazeer'], 'A journalist inherits a locked diary and a list of names that someone still wants kept secret.'],
  ['raktha', 'Raktha', 'series', 'Telugu', ['Action', 'Crime'], 2023, 7.8, [2, 18], 'Surya Prakash', ['arjun-dev', 'faisal-nazeer', 'tanvi-desai'], 'Two rival families in a port town are forced into an uneasy peace when a third power moves in.'],
  ['safar', 'Safar', 'movie', 'Hindi', ['Drama', 'Romance'], 2021, 7.6, 127, 'Vikrant Sethi', ['aditya-verma', 'zoya-khan'], 'A long train ride across the country brings two travelers closer than either planned.'],
  ['signallost', 'Signal Lost', 'series', 'English', ['Sci-Fi', 'Mystery'], 2024, 8.1, [1, 9], 'Sam Whitaker', ['nora-hale', 'daniel-roy', 'sam-whitaker'], 'When a deep-space relay goes quiet, a small crew on Earth tries to work out who stopped answering.'],
  ['simha', 'Simha', 'movie', 'Telugu', ['Action', 'Drama'], 2024, 7.7, 154, 'Surya Prakash', ['arjun-dev', 'faisal-nazeer'], 'A retired wrestler returns to his village to defend the akhara that raised him.'],
  ['thearchive', 'The Archive', 'series', 'English', ['Mystery', 'Fantasy'], 2023, 7.9, [2, 12], 'Daniel Roy', ['nora-hale', 'daniel-roy'], 'Every document in a city archive records a day that has not happened yet; the new clerk starts to read ahead.'],
  ['theeram', 'Theeram', 'movie', 'Telugu', ['Family', 'Drama'], 2022, 7.2, 123, 'Tanvi Desai', ['arjun-dev', 'tanvi-desai'], 'A seaside guesthouse and the family who runs it face their last summer before the highway arrives.'],
  ['thirai', 'Thirai', 'movie', 'Tamil', ['Drama', 'Comedy'], 2021, 7.5, 130, 'Surya Prakash', ['surya-prakash', 'kavin-raj'], 'The last single-screen cinema in town gets one more season — and a projectionist with a plan.'],
  ['udaan', 'Udaan', 'movie', 'Hindi', ['Drama', 'Family'], 2023, 7.8, 125, 'Zoya Khan', ['zoya-khan', 'tanvi-desai', 'aditya-verma'], 'A girl from a small town trains in secret for a national athletics trial.'],
  ['vajram', 'Vajram', 'movie', 'Telugu', ['Action', 'Thriller'], 2023, 7.1, 143, 'Surya Prakash', ['arjun-dev', 'faisal-nazeer'], 'A bomb-disposal expert races a clock that someone from his past has set.'],
  ['velicham', 'Velicham', 'movie', 'Malayalam', ['Drama', 'Fantasy'], 2024, 7.9, 117, 'Leela Krishnan', ['nithya-varma', 'rahul-menon'], 'A village without electricity makes a pact with a lamp-maker to bring light for one night of the festival.'],
  ['vetri', 'Vetri', 'movie', 'Tamil', ['Action', 'Drama'], 2024, 7.6, 140, 'Kavin Raj', ['kavin-raj', 'surya-prakash', 'meera-raman'], 'A kabaddi coach rebuilds a broken team in a district that has stopped believing in winning.'],
];

const fmtRuntime = (m) => `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, '0')}m`;

export const CATALOG = ROWS.map(([slug, title, type, language, genres, year, rating, runtime, director, cast, description], index) => {
  const isSeries = type === 'series';
  const month = String((index % 12) + 1).padStart(2, '0');
  const day = String((index % 27) + 1).padStart(2, '0');
  return {
    id: slug,
    title,
    type,
    language,
    genres,
    genre: genres[0],
    year,
    releaseDate: `${year}-${month}-${day}`,
    rating,
    duration: isSeries ? '45m / episode' : fmtRuntime(runtime),
    seasonsCount: isSeries ? runtime[0] : undefined,
    episodesCount: isSeries ? runtime[1] : undefined,
    description,
    director,
    castIds: cast,
    popularity: Math.round((rating * 10 + (2025 - year) * -1.5 + ((index * 37) % 17)) * 10) / 10,
    poster: `/images/movies/posters/${slug}-poster.webp`,
    backdrop: `/images/movies/backdrops/${slug}-backdrop.webp`,
  };
});
