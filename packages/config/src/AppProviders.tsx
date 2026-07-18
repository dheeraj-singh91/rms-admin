'use client';

import React, { useMemo, type ReactNode } from 'react';
import { QueryProvider, getApiClient } from '@repo/api';
import { AuthProvider } from '@repo/auth';
import { StoreProvider } from '@repo/store';
import type { AppConfig } from '@repo/types';

interface AppProviderRoutes {
  login: string;
  forbidden: string;
  notFound: string;
}

interface AppProvidersProps {
  children: ReactNode;
  appConfig: AppConfig;
  routes?: Partial<AppProviderRoutes>;
}

const defaultRoutes: AppProviderRoutes = {
  login: '/login',
  forbidden: '/403',
  notFound: '/404',
};

export function AppProviders({ children, appConfig, routes }: AppProvidersProps) {
  const resolvedRoutes = { ...defaultRoutes, ...routes };



  useMemo(() => {
    getApiClient({
      onUnauthorized: () => window.location.assign(resolvedRoutes.login),
      onForbidden: () => window.location.assign(resolvedRoutes.forbidden),
      onNotFound: () => window.location.assign(resolvedRoutes.notFound),
    });
  }, [resolvedRoutes.forbidden, resolvedRoutes.login, resolvedRoutes.notFound]);


  return (
    <StoreProvider>
      <QueryProvider>
        <AuthProvider appConfig={appConfig}>{children}</AuthProvider>
      </QueryProvider>
    </StoreProvider>
  );
}
