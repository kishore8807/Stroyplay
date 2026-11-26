export class ApiError extends Error {
  constructor(message, code = 'API_ERROR', status = 500) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }
}

async function request(url, { signal } = {}) {
  let res;
  try {
    res = await fetch(url, { signal });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new ApiError('Unable to reach the StoryPlay API server. Make sure the backend is running.', 'NETWORK_ERROR', 0);
  }
  let data = null;
  try {
    data = await res.json();
  } catch {
    /* non-JSON body */
  }
  if (!res.ok) throw new ApiError(data?.error?.message || `Request failed with status ${res.status}`, data?.error?.code || 'API_ERROR', res.status);
  return data;
}

const qs = (params) => new URLSearchParams(params).toString();

export const getHome = ({ refresh = false, signal } = {}) => request(`/api/home${refresh ? '?refresh=true' : ''}`, { signal });

export const getCatalog = ({ type = 'movie', language = 'All', genre = 'All', sort = 'featured', page = 1, signal } = {}) =>
  request(`/api/${type === 'series' || type === 'tv' ? 'series' : 'movies'}?${qs({ language, genre, sort, page })}`, { signal });

export const getTitle = (id, { signal } = {}) => request(`/api/title/${encodeURIComponent(id)}`, { signal });

export const searchTitles = ({ q = '', type = 'all', language = 'All', genre = 'All', page = 1, signal } = {}) =>
  request(`/api/search?${qs({ q, type, language, genre, page })}`, { signal });

// Titles seen in any response, so the watchlist and quick-view can render without refetching.
const seen = new Map();
export const rememberTitles = (list = []) => {
  for (const t of list) if (t?.id) seen.set(t.id, { ...seen.get(t.id), ...t });
};
export const rememberTitle = (t) => rememberTitles([t]);
export const recallTitle = (id) => seen.get(id) ?? null;
