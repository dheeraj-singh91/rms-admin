import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@repo/store';
import {
  addNotification,
  addSuccessNotification,
  addErrorNotification,
  addWarningNotification,
  addInfoNotification,
  removeNotification,
  clearNotifications,
} from '@repo/store';
import type { NotificationType } from '@repo/store';

/**
 * useToast - Toast notification hook
 */
export function useToast() {
  const dispatch = useDispatch<AppDispatch>();

  const show = useCallback(
    (
      message: string,
      options?: {
        type?: NotificationType;
        title?: string;
        duration?: number;
      }
    ) => {
      dispatch(
        addNotification({
          type: options?.type || 'info',
          message,
          title: options?.title,
          duration: options?.duration,
        })
      );
    },
    [dispatch]
  );

  const success = useCallback(
    (message: string, title?: string) => {
      dispatch(addSuccessNotification({ message, title }));
    },
    [dispatch]
  );

  const error = useCallback(
    (message: string, title?: string) => {
      dispatch(addErrorNotification({ message, title }));
    },
    [dispatch]
  );

  const warning = useCallback(
    (message: string, title?: string) => {
      dispatch(addWarningNotification({ message, title }));
    },
    [dispatch]
  );

  const info = useCallback(
    (message: string, title?: string) => {
      dispatch(addInfoNotification({ message, title }));
    },
    [dispatch]
  );

  const remove = useCallback(
    (id: string) => {
      dispatch(removeNotification(id));
    },
    [dispatch]
  );

  const clear = useCallback(() => {
    dispatch(clearNotifications());
  }, [dispatch]);

  return {
    show,
    success,
    error,
    warning,
    info,
    remove,
    clear,
  };
}
