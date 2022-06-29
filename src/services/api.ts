import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  AccountsGetResponse,
  GetCategoriesSummaryOptions,
  GetTransactionsOptions,
  GetUserCategoriesRes,
  LoginRequest,
  TransactionsCategorySummaryRes,
  TransactionsGetResponse,
  User,
} from '../types/types';

const baseUrl = '/api/';

// TODO: fix naming convention for queries
// TODO: split across different files: https://redux-toolkit.js.org/rtk-query/usage/examples
// Define a service using a base URL and expected endpoints

export const perfiApi = createApi({
  reducerPath: 'perfiApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getUserAccounts: builder.query<AccountsGetResponse, void>({
      query: () => 'accounts',
    }),
    getUserCategories: builder.query<GetUserCategoriesRes, void>({
      query: () => 'categories',
    }),
    getTransactions: builder.query<
      TransactionsGetResponse,
      GetTransactionsOptions
    >({
      query: (options?: GetTransactionsOptions) => ({
        url: `transactions`,
        method: 'GET',
        params: options,
      }),
    }),
    getTransactionsCategorySummary: builder.query<
      TransactionsCategorySummaryRes,
      GetCategoriesSummaryOptions
    >({
      query: (options?: GetCategoriesSummaryOptions) => ({
        url: `transactions/category_summary`,
        method: 'GET',
        params: options,
      }),
    }),
    login: builder.mutation<User, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetUserAccountsQuery,
  useGetTransactionsQuery,
  useGetTransactionsCategorySummaryQuery,
  useGetUserCategoriesQuery,
  useLoginMutation,
  useLogoutMutation,
} = perfiApi;
