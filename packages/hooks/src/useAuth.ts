import { useAppSelector, useAppDispatch } from '@repo/store';
import { loginSuccess, logout, setApplication, setMfaStatus, setError, clearError } from '@repo/store';
import type { AuthState } from '@repo/store';

export function useAuth() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  return {
    ...authState,
    dispatchLoginSuccess: (payload: any) => dispatch(loginSuccess(payload)),
    dispatchLogout: () => dispatch(logout()),
    logout: () => dispatch(logout()), // Alias for backward compatibility
    dispatchSetApplication: (app: string) => dispatch(setApplication(app)),
    dispatchSetMfaStatus: (status: number) => dispatch(setMfaStatus(status)),
    dispatchSetError: (err: string) => dispatch(setError(err)),
    dispatchClearError: () => dispatch(clearError()),
  };
}
