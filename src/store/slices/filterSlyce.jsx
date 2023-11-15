import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortType: {
    name: 'популярности(по убыванию)',
    sortProperty: '-rating',
  },
  categoryId: 0,
  currentPage: 1,
  searchValue: '',
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
    changeSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },

    changeParams: (state, action) => {
      state.sortType = action.payload.sortType;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { changeCategoryId, changeSortType, changePage, changeParams, changeSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
