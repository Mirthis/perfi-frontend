import {
  AccountSubtype,
  AccountType,
  TransactionPaymentChannelEnum,
} from 'plaid';
import { Location } from 'react-router-dom';

// Category
export interface BaseCategory {
  name: string;
  iconName: string;
  iconColor: string;
  exclude: boolean;
}

export interface Category extends BaseCategory {
  id: number;
}

export interface CategorySummary extends Category {
  year: number;
  month: number;
  txAmount: string;
  txCount: string;
}

export interface EditCategory extends BaseCategory {
  id?: number;
}

export interface GetSpendingByOptionsBase {
  accountIds?: number[];
  startDate?: string;
  endDate?: string;
  refDate?: string;
  categoryIds?: number[];
  removeZeroCounts?: boolean;
}

export interface GetSpendingByOptions extends GetSpendingByOptionsBase {
  aggregateBy?: string[];
}

export interface SetTransactionCategoryReq {
  transactionId: number;
  categoryId: number;
}

export interface EditCategoryModalState {
  show: boolean;
  category: CategorySummary | null;
}

export interface ChangeCategoryModalState {
  show: boolean;
  transaction: Transaction | null;
}

export interface SpendingByCategoryLatest {
  cmValues: CategorySummary[];
  pmValues: CategorySummary[];
}

export interface TopCategorySummaryDataPoint {
  name: string;
  label: string;
  cmAmount: number;
  pmAmount: number;
}

export type TopCategorySummaryChartData = TopCategorySummaryDataPoint[];

// Auth
export enum LoginState {
  PENDING,
  LOGGEDOUT,
  LOGGEDIN,
}

export type LoginRequest = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export interface User {
  id: string;
  email: string;
}

export type SignUpData = {
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

export type SignUpReq = Pick<SignUpData, 'email' | 'password'>;

export type AuthState = {
  state: LoginState;
  user: User | null;
};

// Item
export interface Item {
  id: number;
  status: string;
  institution: Institution;
  consentExpirationTime: string;
  lastSynced: string;
}

//  Accounts
export interface Account {
  id: number;
  name: string;
  officialName: string | null;
  type: AccountType;
  subType: AccountSubtype | null;
  currentBalance: number | null;
  availableBalance: number | null;
  isoCurrencyCode: string | null;
  item: Item;
}

export interface AccountSummary extends Omit<Account, 'item'> {
  year: number;
  month: number;
  institutionId: number;
  institutionName: string;
  institutionColor: string;
  institutionLogo: string;
  txAmount: string;
  txCount: string;
}

// institutions
export interface Institution {
  id: number;
  plaidInstitutionId: string;
  name: string;
  color: string | null;
  url: string | null;
  logo: string | null;
}

// transaction
export interface Transaction {
  id: number;
  name: string;
  amount: number;
  txDate: string;
  txDateTime: string;
  pending: boolean;
  paymentChannel: TransactionPaymentChannelEnum;
  address: string | null;
  city: string | null;
  country: string | null;
  merchantName: string | null;
  isoCurrencyCode: string | null;
  unofficialCurrencyCode: string | null;
  exclude: boolean;
  account: Account;
  category: Category;
  plaidCategory: {
    id: number;
    name_lvl1: string;
    name_lvl2: string;
    name_lvl3: string;
  };
}

export interface GetTransactionsRes {
  count: number;
  rows: Transaction[];
}

export interface GetSpendByBase {
  year: number;
  month: number;
}

export interface GetTransactionsOptions {
  offset?: number;
  limit?: number;
  accountIds?: number[];
  startDate?: string;
  endDate?: string;
  categoryIds?: number[];
  orderBy?: string;
  excludedTransactions?: ExcludedTransactionsFilter;
  onlyPositiveAmounts?: boolean;
}

export enum ExcludedTransactionsFilter {
  ONLY_EXCLUDED,
  ONLY_INCLUDED,
  ALL,
}

export interface TransactionTrendBarChartDataPoint {
  label: string;
  monthKey: string;
  date: Date;
  txAmount: number;
  txCount: number;
}

export interface SpendingTrendData {
  day: number;
  txAmount: string;
  txCount: string;
}

export interface GetSpendingTrendRes {
  cmValues: SpendingTrendData[];
  pmValues: SpendingTrendData[];
  p12Values: SpendingTrendData[];
}

export interface GetTopMechantsOptions {
  startDate?: string;
  endDate?: string;
  limit?: number;
}

export type GetTopMechantsRes = Array<{
  name: string;
  txAmount: string;
  txCount: string;
}>;

export type GetSpendingRes = Array<{
  year: number;
  month: number;
  txAmount: string;
  txCount: string;
}>;

export enum TxFilterMode {
  Categories = 'Categories',
  Accounts = 'Accounts',
}

export interface TxFilter {
  month: string;
  startDate: string;
  endDate: string;
  mode: TxFilterMode;
  category?: number;
  account?: number;
  page: number;
  hasMore: boolean;
}

export enum AlertSeverity {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  SUCCESS = 'success',
}

export interface AlertState {
  alertSeverity: AlertSeverity;
  alertMessage: string | null;
  alertTitle: string | null;
  alertOpen: boolean;
  setError: (message: string, title?: string, timeout?: number) => void;
  setSuccess: (message: string, title?: string, timeout?: number) => void;
  setWarning: (message: string, title?: string, timeout?: number) => void;
  setInfo: (message: string, title?: string, timeout?: number) => void;
  clearAlert: () => void;
}

export interface NavigateFromState {
  from: Location;
}

export interface NavigateEmailState {
  email: string;
}

export interface AccountWithStats {
  id: number;
  name: string;
  officialName: string;
  type: string;
  subType: string;
  currentBalance: string;
  isoCurrencyCode: string;
  institutionId: number;
  institutionName: string;
  institutionColor: string;
  institutionLogo: Buffer;
  currMonthAmount: string;
  prevMonthAmount: string;
  currYearAmount: string;
}

export interface ExcludeTransactionReq {
  transactionId: number;
  exclude: boolean;
}

export interface PrivateRouteData {
  path: string;
  element: React.ReactElement;
  key?: string;
  onlyLoggedOut?: boolean;
}

export interface GetSimilarTransactionCountRes {
  txCount: number;
}

export enum ErrorType {
  AUTH_ERROR = 'AuthError',
  VALIDATION_ERROR = 'ValidationError',
  PLAID_ERROR = 'PlaidError',
  GENERIC_ERROR = 'GenericError',
}

export enum PlaidErrorName {
  DUPLICATE_INSTITUTION = 'DuplicateInstitution',
}

export enum AuthErrorName {
  USER_ALREADY_VERIFIED = 'UserAlreadyVerified',
  USER_INACTIVE = 'UserInactive',
  USER_CREDENTIALS_NOT_FOUND = 'UserCredentialsNotFound',
  USER_EMAIL_NOT_FOUND = 'UserEmailNotFound',
  USER_NOT_VERIFIED = 'UserNotVerified',
  USER_UNAUTHORIZED = 'UserUnauthorized',
  VERIFY_EMAIL_TOKEN_NOT_FOUND = 'VerifyEmailTokenNotFound',
  VERIFY_EMAIL_TOKEN_EXPIRED = 'VerifyEmailTokenExpired',
  VERIFY_PASSWORD_TOKEN_NOT_FOUND = 'VerifyPasswordTokenNotFound',
  VERIFY_PASSWORD_TOKEN_EXPIRED = 'VerifyPasswordTokenExpired',
}

export interface AuthError {
  data: {
    type: ErrorType.AUTH_ERROR;
    name: AuthErrorName;
    message: string;
  };
}

export interface PlaidError {
  data: {
    type: ErrorType.PLAID_ERROR;
    name: PlaidErrorName;
    message: string;
  };
}

export interface ValidationError {
  data: {
    type: ErrorType.VALIDATION_ERROR;
    name: string;
    errors: Array<{
      type: string;
      message: string;
      path: string;
    }>;
  };
}

export type RequestVerifyEmailReq = {
  email: string;
};

export type RequestResetPasswordReq = {
  email: string;
};

export type ResetPasswordFields = {
  password: string;
  confirmPassword: string;
};

export type ResetPasswordReq = {
  token: string;
  password: string;
};

export type BarChartExpensesData = Array<{
  amount: number;
  name: string;
  label: string;
}>;

export interface SpendingChartDataPoint {
  dateLabel: string;
  amount: number;
  amountLabel: string;
  count: number;
}
