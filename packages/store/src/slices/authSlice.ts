import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User, Permission } from '@repo/types';

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  accessToken: string | null;
  mfaStatus: number; // 0 = none, 1 = otp pending, 2 = singleID pending, 3 = verified
  application: string | null;
  permissions: Permission[];
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  accessToken: null,
  mfaStatus: 0,
  application: null,
  permissions: [],
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setApplication: (state, action: PayloadAction<string>) => {
      state.application = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setMfaStatus: (state, action: PayloadAction<number>) => {
      state.mfaStatus = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; accessToken: string; mfaStatus: number; permissions: Permission[] }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.mfaStatus = action.payload.mfaStatus;
      state.permissions = action.payload.permissions;
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.mfaStatus = 0;
      state.permissions = [];
      state.error = null;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setApplication,
  setAccessToken,
  setMfaStatus,
  loginSuccess,
  logout,
  setError,
  clearError,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
