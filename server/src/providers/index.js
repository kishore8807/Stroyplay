import { localProvider } from './local.js';
import { createTmdbProvider } from './tmdb.js';

/** Uses TMDB when credentials exist, otherwise the offline catalogue. */
export function selectProvider(env = process.env) {
  const apiKey = env.TMDB_API_KEY?.trim();
  const readToken = env.TMDB_READ_TOKEN?.trim();
  return apiKey || readToken ? createTmdbProvider({ apiKey, readToken }) : localProvider;
}
