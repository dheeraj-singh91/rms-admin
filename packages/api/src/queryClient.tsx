'use client';

import React, { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}

interface QueryProviderProps {
  children: ReactNode;
  client?: QueryClient;
}

export function QueryProvider({ children, client }: QueryProviderProps) {
  const [queryClient] = useState(() => client ?? createQueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
