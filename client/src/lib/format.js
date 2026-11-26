export function formatClock(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const t = Math.floor(seconds);
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = String(t % 60).padStart(2, '0');
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${s}` : `${m}:${s}`;
}

export const trailerSearchUrl = (title) => `https://www.youtube.com/results?search_query=${encodeURIComponent(`${title} official trailer`)}`;

export const ratingText = (rating) => Number(rating || 0).toFixed(1);

/** Ranks `candidates` by overlap with the genres/languages of the user's saved titles. */
export function recommend(candidates = [], savedIds = [], limit = 14) {
  if (candidates.length === 0) return [];
  const saved = candidates.filter((c) => savedIds.includes(c.id));
  if (saved.length === 0) return [...candidates].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, limit);
  const genres = new Set(saved.flatMap((c) => c.genres || []));
  const languages = new Set(saved.map((c) => c.language));
  return candidates
    .filter((c) => !savedIds.includes(c.id))
    .map((c) => ({ c, score: (c.genres || []).filter((g) => genres.has(g)).length * 3 + (languages.has(c.language) ? 1 : 0) + (c.rating || 0) / 10 }))
    .sort((a, b) => b.score - a.score || (b.c.rating || 0) - (a.c.rating || 0))
    .slice(0, limit)
    .map(({ c }) => c);
}
