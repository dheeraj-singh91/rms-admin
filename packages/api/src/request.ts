import type { AxiosRequestConfig } from 'axios';
import { getApiClient } from './client';
import { handleApiError } from './errors';
import type { ApiResponse, RequestConfig } from '@repo/types';

export async function withRetry<T>(
  operation: () => Promise<T>,
  retryCount = 0,
  delayMs = 300
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (retryCount <= 0) {
      throw error;
    }

    await new Promise((resolve) => {
      setTimeout(resolve, delayMs);
    });

    return withRetry(operation, retryCount - 1, delayMs * 2);
  }
}

export async function apiRequest<T>(
  config: AxiosRequestConfig,
  requestConfig: RequestConfig = {}
): Promise<T> {
  const client = getApiClient();

  try {
    const response = await withRetry(
      () =>
        client.request<ApiResponse<T>>({
          ...config,
          timeout: requestConfig.timeout ?? config.timeout,
        }),
      requestConfig.retryCount ?? 0
    );

    return response.data.data as T;
  } catch (error) {
    throw handleApiError(error);
  }
}
