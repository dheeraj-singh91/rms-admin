import type { User } from '@repo/types';

const USER_SESSION_KEY = 'authUser';

export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;

  const rawUser = sessionStorage.getItem(USER_SESSION_KEY);
  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser) as User;
  } catch {
    sessionStorage.removeItem(USER_SESSION_KEY);
    return null;
  }
}

export function setStoredUser(user: User): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
}

export function clearStoredUser(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(USER_SESSION_KEY);
}

export function clearSession(): void {
  clearStoredUser();
}
