'use client';

import React, { type ReactNode } from 'react';
import { AppProviders } from '@repo/config';
import { appConfig } from '../config/app.config';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AppProviders
      appConfig={appConfig}
      routes={{
        login: '/srms/login',
        forbidden: '/srms/unauthorized',
        notFound: '/srms',
      }}
    >
      {children}
    </AppProviders>
  );
}
