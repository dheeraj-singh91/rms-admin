import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';
import { clearAllTokens, getAccessToken } from '@repo/auth';

export interface CreateApiClientOptions {
  baseURL?: string;
  onUnauthorized?: () => void;
  onForbidden?: () => void;
  onNotFound?: () => void;
}

const getDefaultBaseURL = () => process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000';

const resolveOptions = (options?: string | CreateApiClientOptions): Required<Pick<CreateApiClientOptions, 'baseURL'>> &
  Omit<CreateApiClientOptions, 'baseURL'> => {
  if (typeof options === 'string') {
    return {
      baseURL: options,
    };
  }

  return {
    baseURL: options?.baseURL ?? getDefaultBaseURL(),
    onUnauthorized: options?.onUnauthorized,
    onForbidden: options?.onForbidden,
    onNotFound: options?.onNotFound,
  };
};

const setBearerToken = (config: InternalAxiosRequestConfig, token: string) => {
  const headers = AxiosHeaders.from(config.headers);
  headers.set('Authorization', `Bearer ${token}`);
  config.headers = headers;
};

/**
 * Create API client with interceptors
 */
export function createApiClient(options?: string | CreateApiClientOptions): AxiosInstance {
  const { baseURL, onUnauthorized, onForbidden, onNotFound } = resolveOptions(options);
  const client = axios.create({
    baseURL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // For HTTP-only refresh cookies
  });

  /**
   * Request Interceptor - Add auth token
   */
  client.interceptors.request.use(
    (config) => {
      const token = getAccessToken();
      if (token) {
        setBearerToken(config, token);
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  /**
   * Response Interceptor - Handle errors
   */
  client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        clearAllTokens();
        onUnauthorized?.();
      }

      if (error.response?.status === 403) {
        onForbidden?.();
      }

      if (error.response?.status === 404) {
        onNotFound?.();
      }

      return Promise.reject(error);
    }
  );

  return client;
}

/**
 * Get or create singleton API client instance
 */
let apiClientInstance: AxiosInstance | null = null;

export function getApiClient(options?: string | CreateApiClientOptions): AxiosInstance {
  if (!apiClientInstance) {
    apiClientInstance = createApiClient(options);
  }
  return apiClientInstance;
}

/**
 * Reset API client (useful for testing)
 */
export function resetApiClient(): void {
  apiClientInstance = null;
}
