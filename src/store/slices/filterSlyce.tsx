import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export enum SortBy {
  RATING_ASC = '-rating',
  RATING_DESC = 'rating',
  PRICE_ASC = 'price',
  PRICE_DESC = '-price',
  TITLE_ASC = 'title',
  TITLE_DESC = '-title',
}

type FilterType = {
  name: string;
  sortProperty: SortBy;
};

export interface IFilterSlyce {
  sortType: FilterType;
  categoryId: number;
  currentPage: number;
  searchValue?: string;
}

const initialState: IFilterSlyce = {
  sortType: {
    name: 'популярности(по убыванию)',
    sortProperty: SortBy.RATING_DESC,
  },
  categoryId: 0,
  currentPage: 1,
  searchValue: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    changeSortType: (state, action: PayloadAction<FilterType>) => {
      state.sortType = action.payload;
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    changeSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },

    changeFilters: (state, action) => {
      state.sortType = action.payload.sortType;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { changeCategoryId, changeSortType, changePage, changeFilters, changeSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
