import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LinkTokenCreateResponse } from 'plaid';
import {
  AccountListWithStats,
  ExcludeTransactionReq,
  GetAccountsRes,
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
  TransactionData,
  User,
  SetTransactionCategoryReq,
} from '../types/types';

const baseUrl = '/api/';

// TODO: fix naming convention for queries
// TODO: split across different files: https://redux-toolkit.js.org/rtk-query/usage/examples
// Define a service using a base URL and expected endpoints

export const perfiApi = createApi({
  reducerPath: 'perfiApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Accounts', 'Transactions', 'Categories'],
  endpoints: (builder) => ({
    getAccounts: builder.query<GetAccountsRes, void>({
      query: () => ({
        url: 'accounts',
        method: 'GET',
      }),
    }),
    getAccountsWithStats: builder.query<AccountListWithStats, string>({
      query: (monthKey) => ({
        url: 'accounts/with_stats',
        method: 'GET',
        params: { monthKey },
      }),
    }),
    getCategories: builder.query<GetUserCategoriesRes, void>({
      query: () => 'categories',
      providesTags: ['Categories'],
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
      providesTags: ['Transactions'],
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
    getTransaction: builder.query<TransactionData, number>({
      query: (transactionId) => ({
        url: `transactions/${transactionId}`,
        method: 'GET',
      }),
      providesTags: ['Transactions'],
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
    excludeTransaction: builder.mutation<
      TransactionData,
      ExcludeTransactionReq
    >({
      query: (params) => ({
        url: 'transactions/exclude',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Transactions'],
    }),
    setTransactionCategory: builder.mutation<
      TransactionData,
      SetTransactionCategoryReq
    >({
      query: (params) => ({
        url: 'transactions/update_category',
        method: 'PUT',
        body: params,
      }),
      invalidatesTags: ['Transactions'],
    }),
    setSimilarTransactionsCategory: builder.mutation<
      number[],
      SetTransactionCategoryReq
    >({
      query: (params) => ({
        url: 'transactions/update_category_similar',
        method: 'PUT',
        body: params,
      }),
      invalidatesTags: ['Transactions'],
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
  useGetAccountsQuery,
  useGetAccountsWithStatsQuery,
  useGetTransactionsQuery,
  useGetSpendingByCategoryQuery,
  useGetCategoriesQuery,
  useGetTransactionQuery,
  useGetTransactionsSummaryQuery,
  useGetTopMechantsQuery,
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useCreateLinkTokenMutation,
  useSetAccessTokenMutation,
  useExcludeTransactionMutation,
  useSetTransactionCategoryMutation,
  useSetSimilarTransactionsCategoryMutation,
} = perfiApi;
