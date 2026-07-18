import type { JwtPayload } from '@repo/types';

const REFRESH_TOKEN_KEY = 'refreshToken';
const TOKEN_EXPIRY_KEY = 'tokenExpiry';

let accessToken: string | null = null;

/**
 * Create token storage configuration
 * Keeps the access token in memory and isolates refresh-token persistence so
 * the browser strategy can later move to HttpOnly cookies behind this adapter.
 */
export function createAuthTokenStorage() {
  return {
    getAccessToken: () => getAccessToken(),
    setAccessToken: (token: string) => setAccessToken(token),
    clearAccessToken: () => clearAccessToken(),
    getRefreshToken: () => getRefreshToken(),
    setRefreshToken: (token: string) => setRefreshToken(token),
    clearRefreshToken: () => clearRefreshToken(),
    getTokenExpiry: () => getTokenExpiry(),
    setTokenExpiry: (expiry: number) => setTokenExpiry(expiry),
    isTokenExpired: () => isTokenExpired(),
    clear: () => clearAllTokens(),
  };
}

/**
 * Get access token from memory (server-safe)
 */
export function getAccessToken(): string | null {
  return accessToken;
}

/**
 * Set access token in memory
 */
export function setAccessToken(token: string): void {
  accessToken = token;
}

/**
 * Clear access token from memory
 */
export function clearAccessToken(): void {
  accessToken = null;
}

/**
 * Get refresh token from storage
 */
export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(REFRESH_TOKEN_KEY);
}

/**
 * Set refresh token in storage
 */
export function setRefreshToken(token: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
}

/**
 * Clear refresh token from storage
 */
export function clearRefreshToken(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
}

/**
 * Get token expiry timestamp
 */
export function getTokenExpiry(): number | null {
  if (typeof window === 'undefined') return null;
  const expiry = sessionStorage.getItem(TOKEN_EXPIRY_KEY);
  return expiry ? parseInt(expiry, 10) : null;
}

/**
 * Set token expiry timestamp
 */
export function setTokenExpiry(expiry: number): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(TOKEN_EXPIRY_KEY, expiry.toString());
}

/**
 * Clear token expiry
 */
export function clearTokenExpiry(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(TOKEN_EXPIRY_KEY);
}

/**
 * Clear all authentication tokens
 */
export function clearAllTokens(): void {
  if (typeof window === 'undefined') return;
  clearAccessToken();
  clearRefreshToken();
  clearTokenExpiry();
}

/**
 * Decode JWT token (without verification)
 * Use only for reading payload, never trust the data for security-critical operations
 */
export function decodeToken(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const decoded = JSON.parse(atob(parts[1]));
    return decoded as JwtPayload;
  } catch {
    return null;
  }
}

/**
 * Check if token is expired
 */
export function isTokenExpired(token?: string | null): boolean {
  const tokenToCheck = token || getAccessToken();
  if (!tokenToCheck) return true;

  const decoded = decodeToken(tokenToCheck);
  if (!decoded || !decoded.exp) return true;

  // Check if token expires within 5 minutes (buffer time)
  const expiryTime = decoded.exp * 1000;
  const bufferTime = 5 * 60 * 1000;
  return Date.now() >= expiryTime - bufferTime;
}

/**
 * Get token expiry in seconds
 */
export function getTokenExpiryInSeconds(token?: string | null): number | null {
  const tokenToCheck = token || getAccessToken();
  if (!tokenToCheck) return null;

  const decoded = decodeToken(tokenToCheck);
  if (!decoded || !decoded.exp) return null;

  return Math.floor((decoded.exp * 1000 - Date.now()) / 1000);
}

/**
 * Get token expiry time as Date
 */
export function getTokenExpiryDate(token?: string | null): Date | null {
  const tokenToCheck = token || getAccessToken();
  if (!tokenToCheck) return null;

  const decoded = decodeToken(tokenToCheck);
  if (!decoded || !decoded.exp) return null;

  return new Date(decoded.exp * 1000);
}
