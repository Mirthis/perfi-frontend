/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/indent */
// import { Action, ActionCreator, Dispatch } from 'redux';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import loginService from '../services/auth';
import { LoginData } from '../types/types';
// import { ThunkAction, ThunkDispatch } from 'redux-thunk';
// import RootState from './store';

const LOC_STORAGE_KEY = 'perfi:loggedUser';

type AuthState = User | null;

interface User {
  id: string;
  email: string;
}

const initialState: AuthState = null;

export const loginUser = createAsyncThunk<User, LoginData>(
  'auth/login',
  async (loginData: LoginData) => {
    const user = await loginService.login(loginData);
    return user;
  },
);

// TODO: remove coockie
export const logoutUser = createAsyncThunk<boolean>('auth/logout', async () => {
  await loginService.logout();
  return true;
});

const userSlice = createSlice({
  name: 'auth',
  initialState: initialState as AuthState,
  reducers: {
    setUser(_state, action: PayloadAction<User>) {
      return action.payload;
    },
    clearUser() {
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
  extraReducers: (builder) => {
    // When we send a request,
    // `fetchTodos.pending` is being fired:
    // builder.addCase(fetchTodos.pending, (state) => {
    // At that moment,
    // we change status to `loading`
    // and clear all the previous errors:
    //   state.status = 'loading';
    //   state.error = null;
    // });

    // When a server responses with the data,
    // `fetchTodos.fulfilled` is fired:
    builder.addCase(loginUser.fulfilled, (_state, { payload }) => {
      // We add all the new todos into the state
      // and change `status` back to `idle`:
      // state.id = payload.id;
      window.localStorage.setItem(LOC_STORAGE_KEY, JSON.stringify(payload));
      return payload;
    });

    builder.addCase(logoutUser.fulfilled, () => {
      window.localStorage.removeItem(LOC_STORAGE_KEY);
      return initialState;
    });

    // When a server responses with an error:
    // builder.addCase(fetchTodos.rejected, (state, { payload }) => {
    // We show the error message
    //   // and change `status` back to `idle` again.
    //   if (payload) state.error = payload.message;
    //   state.status = 'idle';
    // });
  },
});

export const { setUser, clearUser, initializeLoggedUser } = userSlice.actions;

export default userSlice.reducer;
