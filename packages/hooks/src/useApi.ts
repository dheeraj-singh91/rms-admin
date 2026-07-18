import { useMemo } from 'react';
import { createApiClient } from '@repo/api';

export function useApi() {
  return useMemo(() => createApiClient(), []);
}
