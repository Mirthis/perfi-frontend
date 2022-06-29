import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, AuthState } from '../types/types';

const LOC_STORAGE_KEY = 'perfi:loggedUser';

const initialState: AuthState = null;

const userSlice = createSlice({
  name: 'auth',
  initialState: initialState as AuthState,
  reducers: {
    setUser(_state, action: PayloadAction<User>) {
      window.localStorage.setItem(
        LOC_STORAGE_KEY,
        JSON.stringify(action.payload),
      );
      return action.payload;
    },
    clearUser() {
      window.localStorage.removeItem(LOC_STORAGE_KEY);
      return initialState;
    },
    initializeLoggedUser() {
      const loggedUserJSON = window.localStorage.getItem(LOC_STORAGE_KEY);
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        return user;
      }
      return initialState;
    },
  },
});

export const { setUser, clearUser, initializeLoggedUser } = userSlice.actions;

export default userSlice.reducer;
