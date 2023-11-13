import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlyce';
import cart from './slices/cartSlyce';

export const store = configureStore({
  reducer: {
    filter,
    cart,
  },
});
