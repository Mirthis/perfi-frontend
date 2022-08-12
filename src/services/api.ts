import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LinkTokenCreateResponse } from 'plaid';
import { PlaidLinkOnSuccessMetadata } from 'react-plaid-link';
import {
  Account,
  AccountWithStats,
  ExcludeTransactionReq,
  GetSpendingByOptionsBase,
  GetTransactionsOptions,
  LoginRequest,
  SignUpReq,
  GetTransactionsRes,
  Transaction,
  User,
  SetTransactionCategoryReq,
  GetSimilarTransactionCountRes,
  Category,
  EditCategory,
  ResetPasswordReq,
  GetSpendingTrendRes,
  CategorySummary,
  SpendingByCategoryLatest,
  GetSpendingRes,
  AccountSummary,
} from '../types/types';

const baseUrl = '/api/';

// TODO: fix naming convention for queries
// TODO: split across different files: https://redux-toolkit.js.org/rtk-query/usage/examples
// TODO: review tags
// Define a service using a base URL and expected endpoints

export const perfiApi = createApi({
  reducerPath: 'perfiApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Accounts', 'Transactions', 'Categories'],
  endpoints: (builder) => ({
    // accounts queries
    getAccounts: builder.query<Account[], void>({
      query: () => ({
        url: 'accounts',
        method: 'GET',
      }),
      providesTags: ['Accounts'],
    }),
    getAccountsWithStats: builder.query<AccountWithStats[], string>({
      query: (monthKey) => ({
        url: 'accounts/with_stats',
        method: 'GET',
        params: { monthKey },
      }),
      providesTags: ['Accounts'],
    }),
    // categories queries
    getCategories: builder.query<CategorySummary[], void>({
      query: () => 'categories',
      providesTags: ['Categories'],
    }),
    getUserCategories: builder.query<CategorySummary[], void>({
      query: () => ({
        url: `categories/userdefined`,
        method: 'GET',
      }),
      providesTags: ['Categories'],
    }),
    // transactions queries
    getTransactions: builder.query<GetTransactionsRes, GetTransactionsOptions>({
      query: (options?: GetTransactionsOptions) => ({
        url: `transactions`,
        method: 'GET',
        params: options,
      }),
      providesTags: ['Transactions'],
    }),
    getTransactionDates: builder.query<
      { minDate: string; maxDate: string },
      void
    >({
      query: () => ({
        url: `transactions/dates`,
        method: 'GET',
      }),
      providesTags: ['Transactions'],
    }),
    getTransactionsList: builder.query<
      GetTransactionsRes,
      GetTransactionsOptions
    >({
      query: (options?: GetTransactionsOptions) => ({
        url: `transactions`,
        method: 'GET',
        params: options,
      }),
    }),
    getSimilarTransactionsCount: builder.query<
      GetSimilarTransactionCountRes,
      number
    >({
      query: (transactionId) => ({
        url: `transactions/similar_count`,
        method: 'GET',
        params: { transactionId },
      }),
      providesTags: ['Transactions'],
    }),
    getTransaction: builder.query<Transaction, number>({
      query: (transactionId) => ({
        url: `transactions/id/${transactionId}`,
        method: 'GET',
      }),
      providesTags: ['Transactions'],
    }),
    getSpendingByCategory: builder.query<
      CategorySummary[],
      GetSpendingByOptionsBase
    >({
      query: (options) => ({
        url: `transactions/spending/bycategory`,
        method: 'GET',
        params: options,
      }),
      providesTags: ['Transactions'],
    }),
    getSpendingByAccount: builder.query<
      AccountSummary[],
      GetSpendingByOptionsBase
    >({
      query: (options) => ({
        url: `transactions/spending/byaccount`,
        method: 'GET',
        params: options,
      }),
      providesTags: ['Transactions'],
    }),
    getSpendingCompareByCategory: builder.query<
      SpendingByCategoryLatest,
      string
    >({
      query: (refDate) => ({
        url: `transactions/spending/compare/bycategory`,
        method: 'GET',
        params: { refDate },
      }),
      providesTags: ['Transactions'],
    }),
    getSpending: builder.query<GetSpendingRes, GetSpendingByOptionsBase>({
      query: (options?: GetSpendingByOptionsBase) => ({
        url: `transactions/spending`,
        method: 'GET',
        params: options,
      }),
      providesTags: ['Transactions'],
    }),
    getSpendingCumulative: builder.query<GetSpendingTrendRes, string>({
      query: (refDate) => ({
        url: `transactions/spending/compare/cumulative`,
        method: 'GET',
        params: { refDate },
      }),
      providesTags: ['Transactions'],
    }),
    requestVerifyEmail: builder.mutation<void, string>({
      query: (email) => ({
        url: 'auth/verify-email',
        method: 'POST',
        body: { email },
      }),
    }),
    verifyEmail: builder.mutation<void, string>({
      query: (token) => ({
        url: 'auth/verify-email',
        method: 'PUT',
        body: { token },
      }),
    }),
    requestResetPassword: builder.mutation<void, string>({
      query: (email) => ({
        url: 'auth/reset-password',
        method: 'POST',
        body: { email },
      }),
    }),
    resetPassword: builder.mutation<void, ResetPasswordReq>({
      query: (params) => ({
        url: 'auth/reset-password',
        method: 'PUT',
        body: params,
      }),
    }),
    excludeTransaction: builder.mutation<Transaction, ExcludeTransactionReq>({
      query: (params) => ({
        url: 'transactions/exclude',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Transactions'],
    }),
    setTransactionCategory: builder.mutation<
      Transaction,
      SetTransactionCategoryReq
    >({
      query: (params) => ({
        url: 'transactions/update_category',
        method: 'PUT',
        body: params,
      }),
      invalidatesTags: ['Transactions', 'Categories'],
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
      invalidatesTags: ['Transactions', 'Categories'],
    }),
    deleteCategory: builder.mutation<void, number>({
      query: (categoryId) => ({
        url: `categories/${categoryId}/delete`,
        method: 'DELETE',
        body: [categoryId],
      }),
      invalidatesTags: ['Transactions', 'Categories'],
    }),
    updateCategory: builder.mutation<Category, EditCategory>({
      query: (categoryData) => ({
        url: `categories/${categoryData.id}/update`,
        method: 'PUT',
        body: categoryData,
      }),
      invalidatesTags: ['Transactions', 'Categories'],
    }),
    createCategory: builder.mutation<Category, EditCategory>({
      query: (categoryData) => ({
        url: `categories/create`,
        method: 'POST',
        body: categoryData,
      }),
      invalidatesTags: ['Categories'],
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
    createLinkToken: builder.mutation<LinkTokenCreateResponse, number | void>({
      query: (itemId) => ({
        url: `plaid/create_link_token`,
        method: 'POST',
        body: { itemId },
      }),
    }),
    setAccessToken: builder.mutation<
      void,
      { publicToken: string; metadata: PlaidLinkOnSuccessMetadata }
    >({
      query: (params) => ({
        url: `plaid/set_access_token`,
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Accounts', 'Categories', 'Transactions'],
    }),
    syncTransactions: builder.mutation<void, number>({
      query: (itemId) => ({
        url: `plaid/sync_transactions`,
        method: 'POST',
        body: { itemId },
      }),
      invalidatesTags: ['Accounts', 'Categories', 'Transactions'],
    }),
    updateItemAccess: builder.mutation<
      void,
      { publicToken: string; metadata: PlaidLinkOnSuccessMetadata }
    >({
      query: (params) => ({
        url: `plaid/update_item_access`,
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Accounts', 'Categories', 'Transactions'],
    }),
    careteDemoAccount: builder.mutation<User, void>({
      query: () => ({
        url: `demo/create`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useGetAccountsWithStatsQuery,
  useGetTransactionsQuery,
  useGetSpendingByCategoryQuery,
  useGetSpendingByAccountQuery,
  useGetCategoriesQuery,
  useGetUserCategoriesQuery,
  useGetTransactionQuery,
  useGetTransactionDatesQuery,
  useLazyGetTransactionsQuery,
  useLazyGetTransactionsListQuery,
  useGetSpendingCumulativeQuery,
  useGetSpendingCompareByCategoryQuery,
  useGetSimilarTransactionsCountQuery,
  useLazyGetSimilarTransactionsCountQuery,
  useGetSpendingQuery,
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useCreateLinkTokenMutation,
  useSetAccessTokenMutation,
  useDeleteCategoryMutation,
  useExcludeTransactionMutation,
  useSetTransactionCategoryMutation,
  useSetSimilarTransactionsCategoryMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useRequestVerifyEmailMutation,
  useVerifyEmailMutation,
  useRequestResetPasswordMutation,
  useResetPasswordMutation,
  useUpdateItemAccessMutation,
  useSyncTransactionsMutation,
  useCareteDemoAccountMutation,
} = perfiApi;
