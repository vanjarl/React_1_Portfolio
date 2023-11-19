import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

type FetchParams = {
  category: string;
  sortBy: string;
  order: string;
  search: string;
  currentPage: number;
};

export type FetchedItem = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

export enum StatusOfFetch {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface IItemSlyce {
  items: FetchedItem[];
  status: StatusOfFetch;
}

export const fetchItems = createAsyncThunk(
  'itemsFromBack/fetchByStatus',
  async (params: FetchParams) => {
    const { category, sortBy, order, search, currentPage } = params;
    const { data } = await axios.get<FetchedItem[]>(
      `https://6453758ee9ac46cedf25d56d.mockapi.io/items?page=${currentPage}&limit=4${category}${sortBy}${order}${search}`,
    );
    return data;
  },
);

const initialState: IItemSlyce = {
  items: [],
  status: StatusOfFetch.LOADING,
};

export const itemsSlice = createSlice({
  name: 'itemsFromBack',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.status = StatusOfFetch.LOADING;
      state.items = [];
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = StatusOfFetch.SUCCESS;
    });
    builder.addCase(fetchItems.rejected, (state) => {
      state.items = [];
      state.status = StatusOfFetch.ERROR;
    });
  },
});

export default itemsSlice.reducer;
