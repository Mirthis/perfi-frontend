import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlaidState {
  linkToken: string | null;
}

const initialState: PlaidState = {
  linkToken: null,
};

const plaidSlice = createSlice({
  name: 'plaid',
  initialState: initialState as PlaidState,
  reducers: {
    setLinkToken(state, action: PayloadAction<string | null>) {
      return { ...state, linkToken: action.payload };
    },
    clearLinkToken(state) {
      return { ...state, linkToken: null };
    },
  },
});

export const { setLinkToken, clearLinkToken } = plaidSlice.actions;

export default plaidSlice.reducer;
