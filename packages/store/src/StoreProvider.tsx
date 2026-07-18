'use client';

import React, { useRef, type ReactNode } from 'react';
import { Provider, useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import { createAppStore, type AppDispatch, type AppStore, type RootState } from './store';

interface StoreProviderProps {
  children: ReactNode;
  store?: AppStore;
}

export function StoreProvider({ children, store }: StoreProviderProps) {
  const storeRef = useRef<AppStore | null>(store ?? null);

  if (!storeRef.current) {
    storeRef.current = createAppStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
