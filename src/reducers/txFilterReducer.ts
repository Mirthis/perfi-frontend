import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { queryDateFormatter, selectDateFormatter } from '../utils/formatters';
import { TxFilter, TxFilterMode } from '../types/types';

const getFirstDayOfMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const getLastDayOfMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0);

const getStartEndDate = (month: string) => {
  const startDate = queryDateFormatter.format(
    getFirstDayOfMonth(new Date(month)),
  );
  const endDate = queryDateFormatter.format(getLastDayOfMonth(new Date(month)));
  return { startDate, endDate };
};

const initMonth = selectDateFormatter.format(new Date());

const initialState: TxFilter = {
  month: initMonth,
  ...getStartEndDate(initMonth),
  mode: TxFilterMode.Summary,
};

const txFilterSlice = createSlice({
  name: 'txFilter',
  initialState: initialState as TxFilter,
  reducers: {
    setMonthFilter(state, action: PayloadAction<string>) {
      const month = action.payload;
      const { startDate, endDate } = getStartEndDate(month);
      return { ...state, month, startDate, endDate };
    },
    setModeFilter(state, action: PayloadAction<TxFilterMode>) {
      return { ...state, mode: action.payload };
    },
    setCategoryFilter(state, action: PayloadAction<number>) {
      const newCategory = action.payload;
      const newMode = newCategory !== -1 ? TxFilterMode.List : state.mode;
      const newState: TxFilter = {
        ...state,
        mode: newMode,
        category: newCategory,
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
      return { ...state, account: action.payload };
    },
    clearAccountFilter(state) {
      const newState = { ...state };
      delete newState.account;
      return newState;
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
} = txFilterSlice.actions;
export default txFilterSlice.reducer;
