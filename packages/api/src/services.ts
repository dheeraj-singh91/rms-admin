import { useMutation, useQuery, useQueryClient, type UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query';
import { getApiClient } from './client';
import { handleApiError } from './errors';
import type { ApiResponse, PaginatedResponse } from '@repo/types';

type ApiQueryKey = readonly (string | object | undefined)[];

/**
 * Generic GET query hook
 */
export function useGetQuery<T>(
  key: ApiQueryKey,
  url: string,
  options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const client = getApiClient();
      const response = await client.get<ApiResponse<T>>(url);
      return response.data.data as T;
    },
    ...options,
  });
}

/**
 * Generic POST mutation hook
 */
export function usePostMutation<TData, TRequest = unknown>(
  url: string,
  options?: Omit<UseMutationOptions<TData, Error, TRequest>, 'mutationFn'>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TRequest) => {
      const client = getApiClient();
      const response = await client.post<ApiResponse<TData>>(url, data);
      return response.data.data as TData;
    },
    onError: (error: Error) => {
      handleApiError(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    ...options,
  });
}

/**
 * Generic PUT mutation hook
 */
export function usePutMutation<TData, TRequest = unknown>(
  url: string,
  options?: Omit<UseMutationOptions<TData, Error, TRequest>, 'mutationFn'>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TRequest) => {
      const client = getApiClient();
      const response = await client.put<ApiResponse<TData>>(url, data);
      return response.data.data as TData;
    },
    onError: (error: Error) => {
      handleApiError(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    ...options,
  });
}

/**
 * Generic DELETE mutation hook
 */
export function useDeleteMutation<TData = unknown, TRequest = unknown>(
  url: string,
  options?: Omit<UseMutationOptions<TData, Error, TRequest | undefined>, 'mutationFn'>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data?: TRequest) => {
      const client = getApiClient();
      const response = await client.delete<ApiResponse<TData>>(url, {
        data,
      });
      return response.data.data as TData;
    },
    onError: (error: Error) => {
      handleApiError(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    ...options,
  });
}

/**
 * Generic paginated query hook
 */
export function usePaginatedQuery<T>(
  key: ApiQueryKey,
  url: string,
  params?: Record<string, unknown>,
  options?: Omit<UseQueryOptions<PaginatedResponse<T>>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: [...key, params],
    queryFn: async () => {
      const client = getApiClient();
      const response = await client.get<ApiResponse<PaginatedResponse<T>>>(url, {
        params,
      });
      return response.data.data as PaginatedResponse<T>;
    },
    ...options,
  });
}

/**
 * Create service hooks for a specific resource
 */
export function createResourceService<T, CreateRequest = T, UpdateRequest = Partial<T>>(
  resourceName: string,
  basePath: string
) {
  return {
    /**
     * Get single resource by ID
     */
    useGet: (id: string, options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>) =>
      useGetQuery<T>(
        [resourceName, 'detail', id],
        `${basePath}/${id}`,
        options
      ),

    /**
     * Get all resources with pagination
     */
    useList: (
      params?: Record<string, unknown>,
      options?: Omit<UseQueryOptions<PaginatedResponse<T>>, 'queryKey' | 'queryFn'>
    ) =>
      usePaginatedQuery<T>(
        [resourceName, 'list'],
        basePath,
        params,
        options
      ),

    /**
     * Create new resource
     */
    useCreate: (
      options?: Omit<UseMutationOptions<T, Error, CreateRequest>, 'mutationFn'>
    ) => usePostMutation<T, CreateRequest>(basePath, options),

    /**
     * Update existing resource
     */
    useUpdate: (
      id: string,
      options?: Omit<UseMutationOptions<T, Error, UpdateRequest>, 'mutationFn'>
    ) => usePutMutation<T, UpdateRequest>(`${basePath}/${id}`, options),

    /**
     * Delete resource
     */
    useDelete: (
      id: string,
      options?: Omit<UseMutationOptions<void, Error, unknown>, 'mutationFn'>
    ) => useDeleteMutation<void>(`${basePath}/${id}`, options),
  };
}
