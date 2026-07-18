import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MenuItem } from '@repo/types';

export interface MenuState {
  items: MenuItem[];
  selectedMenuId: string | null;
  isCollapsed: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  items: [],
  selectedMenuId: null,
  isCollapsed: false,
  isLoading: false,
  error: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    // Menu loading
    setMenuLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Menu items actions
    setMenu: (state, action: PayloadAction<MenuItem[]>) => {
      state.items = action.payload;
      state.error = null;
    },
    addMenuItem: (state, action: PayloadAction<MenuItem>) => {
      state.items.push(action.payload);
    },
    removeMenuItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateMenuItem: (state, action: PayloadAction<{ id: string; item: Partial<MenuItem> }>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload.item };
      }
    },
    clearMenu: (state) => {
      state.items = [];
      state.selectedMenuId = null;
    },

    // Selection actions
    selectMenuItem: (state, action: PayloadAction<string>) => {
      state.selectedMenuId = action.payload;
    },
    clearMenuSelection: (state) => {
      state.selectedMenuId = null;
    },

    // UI state actions
    toggleMenuCollapse: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
    setMenuCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isCollapsed = action.payload;
    },

    // Error handling
    setMenuError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearMenuError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setMenuLoading,
  setMenu,
  addMenuItem,
  removeMenuItem,
  updateMenuItem,
  clearMenu,
  selectMenuItem,
  clearMenuSelection,
  toggleMenuCollapse,
  setMenuCollapsed,
  setMenuError,
  clearMenuError,
} = menuSlice.actions;

export const menuReducer = menuSlice.reducer;
