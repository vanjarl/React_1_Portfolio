import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlyce';
import cart from './slices/cartSlyce';
import itemsFromBack from './slices/itemsSlyce';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    itemsFromBack,
  },
});
