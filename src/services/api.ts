import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LinkTokenCreateResponse } from 'plaid';
import {
  AccountsGetResponse,
  GetSpendingByCategoryOptions,
  GetTopMechantsOptions,
  GetTopMechantsRes,
  GetTransactionsOptions,
  GetTransactionsSummaryOptions,
  GetTransactionsSummaryRes,
  GetUserCategoriesRes,
  LoginRequest,
  SignUpReq,
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
    getSpendingByCategory: builder.query<
      TransactionsCategorySummaryRes,
      GetSpendingByCategoryOptions
    >({
      query: (options?: GetSpendingByCategoryOptions) => ({
        url: `transactions/spending_summary_category`,
        method: 'GET',
        params: options,
      }),
    }),
    getTransactionsSummary: builder.query<
      GetTransactionsSummaryRes,
      GetTransactionsSummaryOptions
    >({
      query: (options?: GetTransactionsSummaryOptions) => ({
        url: `transactions/transactions_summary`,
        method: 'GET',
        params: options,
      }),
    }),
    getTopMechants: builder.query<GetTopMechantsRes, GetTopMechantsOptions>({
      query: (options?: GetTopMechantsOptions) => ({
        url: `transactions/transactions_summary`,
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
    signup: builder.mutation<User, SignUpReq>({
      query: (credentials) => ({
        url: 'auth/signup',
        method: 'POST',
        body: credentials,
      }),
    }),
    createLinkToken: builder.mutation<LinkTokenCreateResponse, void>({
      query: () => ({
        url: `plaid/create_link_token`,
        method: 'POST',
      }),
    }),
    setAccessToken: builder.mutation<void, string>({
      query: (publicToken) => ({
        url: `plaid/set_access_token`,
        method: 'POST',
        body: { publicToken },
      }),
    }),
  }),
});

export const {
  useGetUserAccountsQuery,
  useGetTransactionsQuery,
  useGetSpendingByCategoryQuery,
  useGetUserCategoriesQuery,
  useGetTransactionsSummaryQuery,
  useGetTopMechantsQuery,
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useCreateLinkTokenMutation,
  useSetAccessTokenMutation,
} = perfiApi;
