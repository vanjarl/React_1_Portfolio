import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getCartItemsFromLS } from '../../utils/getCartItemsFromLS';
import { getTotalAmount } from '../../utils/getTotalAmount';
import { getTotalPrice } from '../../utils/getTotalPrice';

export type CartSlyceItem = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  size: number;
  type: string;
  amount: number;
};
export interface ICartSlyce {
  items: CartSlyceItem[];
  totalPrice: number;
  totalAmount: number;
}

const initialState: ICartSlyce = getCartItemsFromLS() || {
  items: [],
  totalPrice: 0,
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state: ICartSlyce, action: PayloadAction<CartSlyceItem>) => {
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
      state.totalPrice = getTotalPrice(state.items);
      state.totalAmount = getTotalAmount(state.items);
    },
    minusItem: (state: ICartSlyce, action: PayloadAction<CartSlyceItem>) => {
      const item = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size,
      );
      if (item) item.amount--;
      state.totalPrice = getTotalPrice(state.items);
      state.totalAmount = getTotalAmount(state.items);
    },
    deleteItem: (state: ICartSlyce, action: PayloadAction<CartSlyceItem>) => {
      state.items = state.items.filter(
        (item) =>
          item.id !== action.payload.id ||
          item.type !== action.payload.type ||
          item.size !== action.payload.size,
      );
      state.totalPrice = getTotalPrice(state.items);
      state.totalAmount = getTotalAmount(state.items);
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
