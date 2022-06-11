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

export type TransactionsGetResponse = TransactionData[];

export type AccountsListData = AccountListItemData[];
