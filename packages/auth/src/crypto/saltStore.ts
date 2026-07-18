/**
 * In-memory storage for salt key.
 * NEVER store this in localStorage or cookies.
 */
let memorySaltKey: string | null = null;

export const saltStore = {
  get: () => memorySaltKey,
  set: (key: string) => {
    memorySaltKey = key;
  },
  clear: () => {
    memorySaltKey = null;
  },
};
