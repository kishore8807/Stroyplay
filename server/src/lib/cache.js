// Tiny in-memory TTL cache. `get` returns undefined when missing or expired.
export class TtlCache {
  constructor(ttlMs = 5 * 60 * 1000, maxEntries = 500) {
    this.ttlMs = ttlMs;
    this.maxEntries = maxEntries;
    this.store = new Map();
  }

  get(key) {
    const hit = this.store.get(key);
    if (!hit) return undefined;
    if (hit.expires < Date.now()) {
      this.store.delete(key);
      return undefined;
    }
    return hit.value;
  }

  set(key, value) {
    if (this.store.size >= this.maxEntries) this.store.delete(this.store.keys().next().value);
    this.store.set(key, { value, expires: Date.now() + this.ttlMs });
    return value;
  }

  clear() {
    this.store.clear();
  }
}
