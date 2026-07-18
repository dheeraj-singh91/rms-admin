'use client';

import React, { useEffect, type ReactNode } from 'react';
import { useGetTokenMutation } from '../hooks/useAuthMutations';
import { saltStore } from '../crypto/saltStore';
import type { AppConfig } from '@repo/types';
import { useAuth } from '@repo/hooks';

interface AuthProviderProps {
  children: ReactNode;
  appConfig: AppConfig;
}

export function AuthProvider({ children, appConfig }: AuthProviderProps) {
  const { dispatchSetApplication } = useAuth();
  const getTokenMutation = useGetTokenMutation();

  useEffect(() => {
    // Set the application name in Redux store
    dispatchSetApplication(appConfig.appName);

    // Call /auth/getToken on boot
    const initToken = async () => {
      try {
        const res = await getTokenMutation.mutateAsync({
          username: appConfig.appName,
          accesskey: appConfig.accessKey,
          clientIP: '127.0.0.1', // Mock IP
        });

        if (res.success && res.saltkey) {
          saltStore.set(res.saltkey);
          // Note: The HTTP-only refresh cookie is handled automatically by the browser
        }
      } catch (err) {
        console.error('Failed to initialize auth token', err);
      }
    };

    initToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appConfig.appName, appConfig.accessKey]);

  return <>{children}</>;
}
