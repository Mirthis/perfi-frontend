import CategoriesSummaryList from '../components/CategorySummaryList';
import TransactionsFilter from '../components/TransactionsFilter';
import TransactionsList from '../components/TransactionsList';
import { useAppSelector } from '../reducers/hooks';
import { TxFilterMode } from '../types/types';

const Transactions = () => {
  const mode = useAppSelector((state) => state.txFilter.mode);
  return (
    <>
      <TransactionsFilter />
      {mode === TxFilterMode.CATEGORY_SUMMARY && <CategoriesSummaryList />}
      {mode === TxFilterMode.TRANSACTION_LIST && <TransactionsList />}
    </>
  );
};

export default Transactions;
