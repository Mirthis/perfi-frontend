import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LinkTokenCreateResponse } from 'plaid';
import {
  Account,
  AccountWithStats,
  ExcludeTransactionReq,
  GetSpendingByOptionsBase,
  GetTopMechantsOptions,
  GetTopMechantsRes,
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
    getAccounts: builder.query<Account[], void>({
      query: () => ({
        url: 'accounts',
        method: 'GET',
      }),
    }),
    getAccountsWithStats: builder.query<AccountWithStats[], string>({
      query: (monthKey) => ({
        url: 'accounts/with_stats',
        method: 'GET',
        params: { monthKey },
      }),
    }),
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
    getTransactions: builder.query<GetTransactionsRes, GetTransactionsOptions>({
      query: (options?: GetTransactionsOptions) => ({
        url: `transactions`,
        method: 'GET',
        params: options,
      }),
      providesTags: ['Transactions'],
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

    // getSpendingByCategory: builder.query<
    //   TransactionsCategorySummaryRes,
    //   GetSpendingByOptionsBase
    // >({
    //   query: (options?: GetSpendingByOptionsBase) => ({
    //     url: `transactions/spending_summary_category`,
    //     method: 'GET',
    //     params: options,
    //   }),
    // }),
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
    }),
    getSpendingByCategoryLatest: builder.query<
      SpendingByCategoryLatest,
      string
    >({
      query: (refDate) => ({
        url: `transactions/spending/compare/bycategory`,
        method: 'GET',
        params: { refDate },
      }),
    }),
    getSpending: builder.query<GetSpendingRes, GetSpendingByOptionsBase>({
      query: (options?: GetSpendingByOptionsBase) => ({
        url: `transactions/spending`,
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
    getSpendingCumulative: builder.query<GetSpendingTrendRes, string>({
      query: (refDate) => ({
        url: `transactions/spending/compare/cumulative`,
        method: 'GET',
        params: { refDate },
      }),
    }),
    requestVerifyEmail: builder.mutation<void, string>({
      query: (email) => ({
        url: 'auth/verify_email',
        method: 'POST',
        body: { email },
      }),
    }),
    verifyEmail: builder.mutation<void, string>({
      query: (token) => ({
        url: 'auth/verify_email',
        method: 'PUT',
        body: { token },
      }),
    }),
    requestResetPassword: builder.mutation<void, string>({
      query: (email) => ({
        url: 'auth/reset_password',
        method: 'POST',
        body: { email },
      }),
    }),
    resetPassword: builder.mutation<void, ResetPasswordReq>({
      query: (params) => ({
        url: 'auth/reset_password',
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
  useGetUserCategoriesQuery,
  useGetTransactionQuery,
  useGetTopMechantsQuery,
  useGetSpendingCumulativeQuery,
  useGetSpendingByCategoryLatestQuery,
  useGetSimilarTransactionsCountQuery,
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
} = perfiApi;
