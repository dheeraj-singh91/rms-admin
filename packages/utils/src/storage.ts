export function readStorage(key: string) {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(key);
}

export function writeStorage(key: string, value: string) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, value);
  }
}

export function removeStorage(key: string) {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(key);
  }
}
