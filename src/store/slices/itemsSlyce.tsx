import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export enum StatusOfFetch {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type FetchParams = {
  category: string;
  sortBy: string;
  order: string;
  search: string;
  currentPage: number;
  limitOfItemsOnPage: number;
};

export type FetchedItem = {
  _id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};
interface IItemSlyce {
  items: FetchedItem[];
  amountOfItems: number;
  status: StatusOfFetch;
}

interface IDataFromBack {
  items: FetchedItem[];
  amount: number;
}

export const fetchItems = createAsyncThunk(
  'itemsFromBack/fetchByStatus',
  async (params: FetchParams) => {
    const { category, sortBy, order, search, currentPage, limitOfItemsOnPage } = params;
    const { data } = await axios.get<IDataFromBack>(
      `http://localhost:4444/items?page=${currentPage}&limit=${limitOfItemsOnPage}${category}${sortBy}${order}${search}`,
    );
    return data;
  },
);

const initialState: IItemSlyce = {
  items: [],
  amountOfItems: 0,
  status: StatusOfFetch.LOADING,
};

export const itemsSlice = createSlice({
  name: 'itemsFromBack',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload.items;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.status = StatusOfFetch.LOADING;
      state.items = [];
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.amountOfItems = action.payload.amount;

      state.status = StatusOfFetch.SUCCESS;
    });
    builder.addCase(fetchItems.rejected, (state) => {
      state.items = [];
      state.status = StatusOfFetch.ERROR;
    });
  },
});

export default itemsSlice.reducer;
