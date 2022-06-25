import { AccountBase, TransactionPaymentChannelEnum } from 'plaid';

export type LoginData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

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
  plaidTransactionId: string;
  accountId: number;
  name: string;
  amount: number;
  transactionDate: Date;
  pending: boolean;
  pladiCategoryId: string | null;
  category: string | null;
  subCategory: string | null;
  paymentChannel: TransactionPaymentChannelEnum;
  address: string | null;
  city: string | null;
  country: string | null;
  merchantName: string | null;
  isoCurrencyCode: string | null;
  unofficialCurrencyCode: string | null;
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
}

export interface GetTransactionsOptions {
  accountIds?: number[];
  startDate?: string;
  endDate?: string;
}

export enum TxFilterMode {
  CATEGORY_SUMMARY = 'CATEGORY_SUMMARY',
  TRANSACTION_LIST = 'TRANSACTION_LIST',
}

export interface TxFilter {
  month: string;
  startDate: string;
  endDate: string;
  mode: TxFilterMode;
  category?: number;
}
