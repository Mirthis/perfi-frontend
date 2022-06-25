import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  AccountsGetResponse,
  GetCategoriesSummaryOptions,
  GetTransactionsOptions,
  TransactionsCategorySummaryRes,
  TransactionsGetResponse,
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
  }),
});

export const {
  useGetUserAccountsQuery,
  useGetTransactionsQuery,
  useGetTransactionsCategorySummaryQuery,
} = perfiApi;
