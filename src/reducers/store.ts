import {
  configureStore,
  isRejectedWithValue,
  Middleware,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './authReducer';
import plaidReducer from './plaidReducer';
import { perfiApi } from '../services/api';
import txFilterReducer from './txFilterReducer';
import { LOC_STORAGE_KEY } from '../utils/config';
import { AuthErrorName } from '../types/types';

const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    // if(action.payload.data)
    if (action.payload.data.name === AuthErrorName.USER_UNAUTHORIZED) {
      window.localStorage.removeItem(LOC_STORAGE_KEY);
      window.location.reload();
    }
  }

  return next(action);
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    plaid: plaidReducer,
    txFilter: txFilterReducer,
    [perfiApi.reducerPath]: perfiApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(perfiApi.middleware)
      .concat(rtkQueryErrorLogger),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
