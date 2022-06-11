import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AccountsGetResponse, TransactionsGetResponse } from '../types/types';

const baseUrl = '/api/';

// TODO: fix naming convention for queries
// Define a service using a base URL and expected endpoints
export const perfiApi = createApi({
  reducerPath: 'perfiApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getUserAccounts: builder.query<AccountsGetResponse, void>({
      query: () => 'accounts',
    }),
    getTransactionsByAccount: builder.query<TransactionsGetResponse, number>({
      query: (accountId: number) => `transactions/account/${accountId}`,
    }),
  }),
});

export const { useGetUserAccountsQuery, useGetTransactionsByAccountQuery } =
  perfiApi;
