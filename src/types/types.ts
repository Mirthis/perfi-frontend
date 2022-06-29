import { AccountBase, TransactionPaymentChannelEnum } from 'plaid';

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

export type AccountsGetResponse = AccountGetResponseItem[];

export interface AccountGetResponseItem extends AccountData {
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
  account: {
    id: number;
    name: number;
  };
  category: {
    id: number;
    name: string;
    iconName: string;
    iconColor: string;
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
  iconName: string;
  iconColor: string;
  txAmount: string;
  txCount: string;
}

export type TransactionsCategorySummaryRes = Array<CategorySummaryItem>;

export type AccountsListData = AccountListItemData[];

export interface GetCategoriesSummaryOptions {
  accountIds?: number[];
  startDate?: string;
  endDate?: string;
  categoryIds?: number[];
}

export interface GetTransactionsOptions {
  offset?: number;
  limit?: number;
  accountIds?: number[];
  startDate?: string;
  endDate?: string;
  categoryIds?: number[];
}

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

export interface UserCategoryData {
  id: number;
  name: string;
  iconName: string;
  iconColor: string;
}

export type GetUserCategoriesRes = Array<UserCategoryData>;

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
