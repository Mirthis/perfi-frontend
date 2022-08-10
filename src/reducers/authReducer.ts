import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, AuthState, LoginState } from '../types/types';
import { LOC_STORAGE_KEY } from '../utils/config';

const initialState: AuthState = {
  state: LoginState.PENDING,
  user: null,
};

const loggedOutState = { state: LoginState.LOGGEDOUT, user: null };

const userSlice = createSlice({
  name: 'auth',
  initialState: initialState as AuthState,
  reducers: {
    setUser(_state, action: PayloadAction<User>) {
      window.localStorage.setItem(
        LOC_STORAGE_KEY,
        JSON.stringify(action.payload),
      );
      return { state: LoginState.LOGGEDIN, user: action.payload };
    },
    clearUser() {
      window.localStorage.removeItem(LOC_STORAGE_KEY);
      return loggedOutState;
    },
    initializeAuthState() {
      const loggedUserJSON = window.localStorage.getItem(LOC_STORAGE_KEY);
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        return { state: LoginState.LOGGEDIN, user };
      }
      return loggedOutState;
    },
  },
});

export const { setUser, clearUser, initializeAuthState } = userSlice.actions;

export default userSlice.reducer;
