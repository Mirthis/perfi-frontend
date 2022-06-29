import CategoriesSummaryList from '../components/CategorySummaryList';
import CategorySummaryStats from '../components/CategorySummaryStats';
import TransactionsFilter from '../components/TransactionsFilter';
import TransactionsList from '../components/TransactionsList';
import { useAppSelector } from '../reducers/hooks';
import { TxFilterMode } from '../types/types';

const Transactions = () => {
  const { mode, category } = useAppSelector((state) => state.txFilter);
  return (
    <>
      <TransactionsFilter />
      {mode === TxFilterMode.Summary && <CategoriesSummaryList />}
      {mode === TxFilterMode.List && category && <CategorySummaryStats />}
      {mode === TxFilterMode.List && <TransactionsList />}
    </>
  );
};

export default Transactions;
