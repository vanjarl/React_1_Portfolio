import { createSlice } from '@reduxjs/toolkit';
import { CartSlyceItem } from '../../components/CartItem/CartItem';

export interface ICartSlyce {
  items: CartSlyceItem[];
  totalPrice: number;
  totalAmount: number;
}

const initialState: ICartSlyce = {
  items: [],
  totalPrice: 0,
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state: ICartSlyce, action) => {
      const item = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size,
      );
      if (!item) {
        state.items.push({ ...action.payload, amount: 1 });
      } else {
        item.amount++;
      }
      state.totalPrice = state.items.reduce((sum, item) => {
        return sum + item.price * item.amount;
      }, 0);
      state.totalAmount = state.items.reduce((sum, item) => {
        return sum + item.amount;
      }, 0);
    },
    minusItem: (state: ICartSlyce, action) => {
      const item = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size,
      );
      if (item) item.amount--;
      state.totalPrice -= action.payload.price;
      state.totalAmount--;
    },
    deleteItem: (state: ICartSlyce, action) => {
      state.items = state.items.filter(
        (item) =>
          item.id !== action.payload.id ||
          item.type !== action.payload.type ||
          item.size !== action.payload.size,
      );
      state.totalPrice -= action.payload.price * action.payload.amount;
      state.totalAmount -= action.payload.amount;
    },
    deleteAll: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addItem, minusItem, deleteItem, deleteAll } = cartSlice.actions;

export default cartSlice.reducer;
