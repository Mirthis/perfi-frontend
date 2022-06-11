/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/indent */
// import { Action, ActionCreator, Dispatch } from 'redux';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import plaidService from '../services/plaid';

interface PlaidState {
  linkToken: string | null;
}

const initialState: PlaidState = {
  linkToken: null,
};

export const getLinkToken = createAsyncThunk<string>(
  'plaid/get_link_token',
  async () => {
    const data = await plaidService.getLinkToken();
    return data.link_token;
  },
);

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
  extraReducers: (builder) => {
    builder.addCase(getLinkToken.fulfilled, (state, { payload }) => ({
      ...state,
      linkToken: payload,
    }));
  },
});

export const { setLinkToken, clearLinkToken } = plaidSlice.actions;

// export const loginUserThink =
//   (userData: LoginData) =>
//   async (dispatch: ThunkDispatch<void, void, typeof setUser>) => {
//     const user = await loginService.login(userData);
//     dispatch(setUser(user));
//     return true;
//   };

// export const logoutUser = () => async (dispatch) => {
//   // window.localStorage.removeItem('perfi:loggedUser');
//   dispatch(clearUser());
// };

// export const initializeLoggedUser = () => async (dispatch) => {
//   const loggedUserJSON = window.localStorage.getItem('perfi:loggedUser');
//   if (loggedUserJSON) {
//     const user = JSON.parse(loggedUserJSON);
//     dispatch(setUser(user));
//   }
// };

export default plaidSlice.reducer;
