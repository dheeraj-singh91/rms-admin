import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title?: string;
  message: string;
  duration?: number;
  closeable?: boolean;
  timestamp: number;
}

export interface NotificationState {
  items: NotificationItem[];
  maxNotifications: number;
}

const initialState: NotificationState = {
  items: [],
  maxNotifications: 5,
};

let notificationIdCounter = 0;

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    // Add notification
    addNotification: (
      state,
      action: PayloadAction<Omit<NotificationItem, 'id' | 'timestamp'>>
    ) => {
      const notification: NotificationItem = {
        ...action.payload,
        id: `notification-${notificationIdCounter++}`,
        timestamp: Date.now(),
        duration: action.payload.duration ?? 5000,
        closeable: action.payload.closeable ?? true,
      };

      state.items.push(notification);

      // Keep only maxNotifications
      if (state.items.length > state.maxNotifications) {
        state.items = state.items.slice(-state.maxNotifications);
      }
    },

    // Remove notification
    removeNotification: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // Clear all notifications
    clearNotifications: (state) => {
      state.items = [];
    },

    // Update notification
    updateNotification: (state, action: PayloadAction<{ id: string; data: Partial<NotificationItem> }>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload.data };
      }
    },

    // Set max notifications
    setMaxNotifications: (state, action: PayloadAction<number>) => {
      state.maxNotifications = action.payload;
    },

    // Helper actions for common notification types
    addSuccessNotification: (state, action: PayloadAction<{ title?: string; message: string }>) => {
      const notification: NotificationItem = {
        ...action.payload,
        id: `notification-${notificationIdCounter++}`,
        type: 'success',
        timestamp: Date.now(),
        duration: 5000,
        closeable: true,
      };
      state.items.push(notification);
    },

    addErrorNotification: (state, action: PayloadAction<{ title?: string; message: string }>) => {
      const notification: NotificationItem = {
        ...action.payload,
        id: `notification-${notificationIdCounter++}`,
        type: 'error',
        timestamp: Date.now(),
        duration: 7000,
        closeable: true,
      };
      state.items.push(notification);
    },

    addWarningNotification: (state, action: PayloadAction<{ title?: string; message: string }>) => {
      const notification: NotificationItem = {
        ...action.payload,
        id: `notification-${notificationIdCounter++}`,
        type: 'warning',
        timestamp: Date.now(),
        duration: 6000,
        closeable: true,
      };
      state.items.push(notification);
    },

    addInfoNotification: (state, action: PayloadAction<{ title?: string; message: string }>) => {
      const notification: NotificationItem = {
        ...action.payload,
        id: `notification-${notificationIdCounter++}`,
        type: 'info',
        timestamp: Date.now(),
        duration: 5000,
        closeable: true,
      };
      state.items.push(notification);
    },
  },
});

export const {
  addNotification,
  removeNotification,
  clearNotifications,
  updateNotification,
  setMaxNotifications,
  addSuccessNotification,
  addErrorNotification,
  addWarningNotification,
  addInfoNotification,
} = notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;
