import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchItems = createAsyncThunk('itemsFromBack/fetchByStatus', async (params) => {
  const { category, sortBy, order, search, currentPage } = params;
  const { data } = await axios.get(
    `https://6453758ee9ac46cedf25d56d.mockapi.io/items?page=${currentPage}&limit=4${category}${sortBy}${order}${search}`,
  );
  return data;
});

const initialState = {
  items: [],
  status: 'loading',
};

export const itemsSlice = createSlice({
  name: 'itemsFromBack',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchItems.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchItems.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchItems.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

// export const { } = itemsSlice.actions;

export default itemsSlice.reducer;
