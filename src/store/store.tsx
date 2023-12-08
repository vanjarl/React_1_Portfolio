import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlyce';
import cart from './slices/cartSlyce';
import itemsFromBack from './slices/itemsSlyce';
import postsFromBack from './slices/postSlyce';
import auth from './slices/authSlyce';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    itemsFromBack,
    postsFromBack,
    auth,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
