export function readJson(key, fallback, validate = () => true) {
  try {
    const value = JSON.parse(window.localStorage.getItem(key) ?? 'null');
    return value !== null && validate(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or blocked: keep working in memory */
  }
}
