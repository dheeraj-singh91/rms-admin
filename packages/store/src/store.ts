import {
  configureStore,
  type Reducer,
  type ReducersMapObject,
} from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { menuReducer } from './slices/menuSlice';
import { notificationReducer } from './slices/notificationSlice';
import { themeReducer } from './slices/themeSlice';
import { userReducer } from './slices/userSlice';

const sharedReducers = {
  auth: authReducer,
  user: userReducer,
  menu: menuReducer,
  theme: themeReducer,
  notification: notificationReducer,
};

export const createAppStore = <TExtraReducers extends ReducersMapObject = ReducersMapObject>(
  extraReducers?: TExtraReducers
) =>
  configureStore({
    reducer: {
      ...sharedReducers,
      ...extraReducers,
    } as typeof sharedReducers & TExtraReducers,
  });

export type AppStore = ReturnType<typeof createAppStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppReducer = Reducer<RootState>;
