import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@repo/types';

export interface UserState {
  profile: User | null;
  preferences: {
    language: string;
    timezone: string;
    notifications: boolean;
  } | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  preferences: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Profile actions
    setUser: (state, action: PayloadAction<User>) => {
      state.profile = action.payload;
      state.error = null;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    clearUser: (state) => {
      state.profile = null;
    },

    // Preferences actions
    setUserPreferences: (state, action: PayloadAction<UserState['preferences']>) => {
      state.preferences = action.payload;
    },
    updateUserPreferences: (state, action: PayloadAction<Partial<UserState['preferences']>>) => {
      if (state.preferences) {
        state.preferences = { ...state.preferences, ...action.payload };
      }
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      if (state.preferences) {
        state.preferences.language = action.payload;
      }
    },
    setTimezone: (state, action: PayloadAction<string>) => {
      if (state.preferences) {
        state.preferences.timezone = action.payload;
      }
    },
    toggleNotifications: (state) => {
      if (state.preferences) {
        state.preferences.notifications = !state.preferences.notifications;
      }
    },

    // Loading & Error states
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUserError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearUserError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setUser,
  updateUserProfile,
  clearUser,
  setUserPreferences,
  updateUserPreferences,
  setLanguage,
  setTimezone,
  toggleNotifications,
  setUserLoading,
  setUserError,
  clearUserError,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
