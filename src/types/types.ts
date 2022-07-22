import { AccountBase, TransactionPaymentChannelEnum } from 'plaid';
import { Location } from 'react-router-dom';

export type LoginRequest = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export interface User {
  id: string;
  email: string;
}

export type AuthState = User | null;

export type SignUpData = {
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

export type EditCategoryData = {
  id?: number;
  name: string;
  iconName: string;
  iconColor: string;
  exclude: boolean;
};

export type SignUpReq = {
  email: string;
  password: string;
};

export type AccountListItemData = AccountBase & {
  institution_name: string;
  institution_logo: string;
  institution_color: string;
};

export interface InstitutionData {
  id: number;
  plaidInstitutionId: string;
  name: string;
  color: string | null;
  url: string | null;
  logo: string | null;
}

export interface AccountData {
  id: number;
  plaidAccountId: string;
  name: string;
  officialName: string | null;
  type: string | null;
  subType: string | null;
  currentBalance: number | null;
  availableBalance: number | null;
  isoCurrencyCode: string | null;
}

export type GetAccountsRes = GetAccountsItemRes[];

export interface GetAccountsItemRes extends AccountData {
  item: {
    id: number;
    status: string;
    institution: InstitutionData;
  };
}

export interface TransactionData {
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
  account: {
    id: number;
    name: string;
    item: {
      id: number;
      institution: {
        logo: string;
        name: string;
        color: string;
      };
    };
  };
  category: {
    id: number;
    name: string;
    iconName: string;
    iconColor: string;
    exclude: boolean;
  };
  plaidCategory: {
    id: number;
    name_lvl1: string;
    name_lvl2: string;
    name_lvl3: string;
  };
}

export interface TransactionsGetResponse {
  count: number;
  rows: TransactionData[];
}

export interface CategorySummaryItem {
  id: number;
  name: string;
  year: number;
  month: number;
  iconName: string;
  iconColor: string;
  txAmount: string;
  txCount: string;
}

export type TransactionsCategorySummaryRes = Array<CategorySummaryItem>;

export type AccountsListData = AccountListItemData[];

export interface GetSpendingByCategoryOptions {
  accountIds?: number[];
  startDate?: string;
  endDate?: string;
  categoryIds?: number[];
  removeZeroCounts?: boolean;
}

export enum ExcludedTransactionsFilter {
  ONLY_EXCLUDED,
  ONLY_INCLUDED,
  ALL,
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
}

export interface Category {
  id: number;
  name: string;
  iconName: string;
  iconColor: string;
  exclude: string;
  userId: number;
}

export interface GetTransactionsSummaryOptions {
  startDate?: string;
  endDate?: string;
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

export type GetTransactionsSummaryRes = Array<{
  year: number;
  month: number;
  txAmount: string;
  txCount: string;
}>;

export enum TxFilterMode {
  Summary = 'Summary',
  List = 'List',
}

export interface TxFilter {
  month: string;
  startDate: string;
  endDate: string;
  mode: TxFilterMode;
  category?: number;
  account?: number;
}

export interface CategoryData {
  id: number;
  name: string;
  iconName: string;
  iconColor: string;
  exclude: boolean;
}

export interface UserCategoryData extends CategoryData {
  txCount: string;
}

export type GetuserCategoriesRes = Array<UserCategoryData>;

export type GetUserCategoriesRes = Array<CategoryData>;

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

export type AccountListWithStats = Array<AccountWithStats>;

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

export interface SetTransactionCategoryReq {
  transactionId: number;
  categoryId: number;
}

export interface GetSimilarTransactionCountRes {
  txCount: number;
}

export interface EditCategoryModalState {
  show: boolean;
  category: UserCategoryData | null;
}
