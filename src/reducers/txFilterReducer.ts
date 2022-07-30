import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getFirstDayOfMonth,
  getStartEndDate,
  queryDateFormatter,
} from '../utils/formatters';
import { TxFilter, TxFilterMode } from '../types/types';

const initMonth = getFirstDayOfMonth(new Date());

const initialState: TxFilter = {
  month: queryDateFormatter.format(initMonth),
  ...getStartEndDate(initMonth),
  mode: TxFilterMode.Summary,
  page: 1,
  hasMore: false,
};

const txFilterSlice = createSlice({
  name: 'txFilter',
  initialState: initialState as TxFilter,
  reducers: {
    setMonthFilter(state, action: PayloadAction<string>) {
      const month = action.payload;
      const { startDate, endDate } = getStartEndDate(new Date(month));
      return { ...state, month, startDate, endDate, page: 1 };
    },
    setModeFilter(state, action: PayloadAction<TxFilterMode>) {
      return { ...state, mode: action.payload, page: 1 };
    },
    setCategoryFilter(state, action: PayloadAction<number>) {
      const newCategory = action.payload;
      const newMode = newCategory !== -1 ? TxFilterMode.List : state.mode;
      const newState: TxFilter = {
        ...state,
        mode: newMode,
        category: newCategory,
        page: 1,
      };
      if (newCategory === -1) {
        delete newState.category;
      }
      return newState;
    },
    clearCategoryFilter(state) {
      const newState = { ...state };
      delete newState.category;
      return newState;
    },
    setAccountFilter(state, action: PayloadAction<number>) {
      return { ...state, account: action.payload, page: 1 };
    },
    clearAccountFilter(state) {
      const newState = { ...state };
      delete newState.account;
      return newState;
    },
    setPageFilter(state, action: PayloadAction<number>) {
      return { ...state, page: action.payload };
    },
    clearPageFilter(state) {
      return { ...state, page: 1 };
    },
    setHasMore(state, action: PayloadAction<boolean>) {
      return { ...state, hasMore: action.payload };
    },
  },
});

export const {
  setMonthFilter,
  setModeFilter,
  setCategoryFilter,
  clearCategoryFilter,
  setAccountFilter,
  clearAccountFilter,
  setPageFilter,
  clearPageFilter,
  setHasMore,
} = txFilterSlice.actions;
export default txFilterSlice.reducer;
