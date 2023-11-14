import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortType: {
    name: 'популярности(по убыванию)',
    sortProperty: '-rating',
  },
  categoryId: 0,
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    changeSortType: (state, action) => {
      state.sortType = action.payload;
    },
    changePage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { changeCategoryId, changeSortType, changePage } = filterSlice.actions;

export default filterSlice.reducer;
