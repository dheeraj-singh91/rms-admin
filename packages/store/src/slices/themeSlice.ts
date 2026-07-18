import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark';
export type ColorScheme = 'blue' | 'green' | 'purple' | 'orange';

export interface ThemeState {
  mode: ThemeMode;
  colorScheme: ColorScheme;
  fontSize: 'small' | 'medium' | 'large';
  borderRadius: 'small' | 'medium' | 'large';
  sidebarCollapsed: boolean;
}

const initialState: ThemeState = {
  mode: 'light',
  colorScheme: 'blue',
  fontSize: 'medium',
  borderRadius: 'medium',
  sidebarCollapsed: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // Theme mode actions
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },

    // Color scheme actions
    setColorScheme: (state, action: PayloadAction<ColorScheme>) => {
      state.colorScheme = action.payload;
    },

    // Font size actions
    setFontSize: (state, action: PayloadAction<ThemeState['fontSize']>) => {
      state.fontSize = action.payload;
    },

    // Border radius actions
    setBorderRadius: (state, action: PayloadAction<ThemeState['borderRadius']>) => {
      state.borderRadius = action.payload;
    },

    // Sidebar actions
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
    toggleSidebarCollapsed: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },

    // Reset theme
    resetTheme: () => initialState,
  },
});

export const {
  setTheme,
  toggleTheme,
  setColorScheme,
  setFontSize,
  setBorderRadius,
  setSidebarCollapsed,
  toggleSidebarCollapsed,
  resetTheme,
} = themeSlice.actions;

export const themeReducer = themeSlice.reducer;
