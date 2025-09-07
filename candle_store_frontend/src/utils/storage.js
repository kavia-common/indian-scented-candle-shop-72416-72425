/**
 * Lightweight persistent storage using localStorage, with namespacing.
 */
const NS = 'candle_shop_v1';

function key(name) { return `${NS}:${name}`; }

// PUBLIC_INTERFACE
export function save(keyName, data) {
  /** Save JSON-serializable data under namespaced key. */
  localStorage.setItem(key(keyName), JSON.stringify(data));
}

// PUBLIC_INTERFACE
export function load(keyName, fallback = null) {
  /** Load JSON data from namespaced key, returning fallback on parse error/missing. */
  try {
    const raw = localStorage.getItem(key(keyName));
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

// PUBLIC_INTERFACE
export function remove(keyName) {
  /** Remove namespaced key from storage. */
  localStorage.removeItem(key(keyName));
}
