import { AxiosError } from 'axios';
import type { ApiErrorResponse } from '@repo/types';

interface ApiErrorPayload {
  message?: string;
  errors?: Record<string, string[]>;
}

/**
 * API Error class for standardized error handling
 */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly errors?: Record<string, string[]>;
  public readonly path?: string;

  constructor(
    message: string,
    statusCode: number = 500,
    errors?: Record<string, string[]>,
    path?: string
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
    this.path = path;
  }

  toJSON(): ApiErrorResponse {
    return {
      message: this.message,
      statusCode: this.statusCode,
      errors: this.errors,
      timestamp: new Date().toISOString(),
      path: this.path,
    };
  }
}

/**
 * Handle API errors and convert to standardized format
 */
export function handleApiError(error: unknown): ApiError {
  // Already an ApiError
  if (error instanceof ApiError) {
    return error;
  }

  // Axios error
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorPayload | undefined;
    const statusCode = error.response?.status ?? 500;
    const message = data?.message ?? error.message ?? 'An unknown API error occurred';
    const errors = data?.errors;
    const path = error.config?.url;

    return new ApiError(message, statusCode, errors, path);
  }

  // Standard Error
  if (error instanceof Error) {
    return new ApiError(error.message, 500);
  }

  // Unknown error
  return new ApiError('An unknown error occurred', 500);
}

/**
 * Get user-friendly error message
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorPayload | undefined;
    if (data?.message) {
      return data.message;
    }

    if (error.response?.status === 404) {
      return 'Resource not found';
    }

    if (error.response?.status === 403) {
      return 'You do not have permission to access this resource';
    }

    if (error.response?.status === 401) {
      return 'Your session has expired. Please login again';
    }

    if (error.response?.status === 500) {
      return 'An error occurred on the server. Please try again later';
    }

    return error.message ?? 'An unknown API error occurred';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unknown error occurred';
}

/**
 * Check if error is network error
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    return !error.response;
  }
  return false;
}

/**
 * Check if error is 401 Unauthorized
 */
export function isUnauthorizedError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    return error.response?.status === 401;
  }
  return false;
}

/**
 * Check if error is 403 Forbidden
 */
export function isForbiddenError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    return error.response?.status === 403;
  }
  return false;
}

/**
 * Check if error is 404 Not Found
 */
export function isNotFoundError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    return error.response?.status === 404;
  }
  return false;
}

/**
 * Check if error is 500 Server Error
 */
export function isServerError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    return status ? status >= 500 : false;
  }
  return false;
}
