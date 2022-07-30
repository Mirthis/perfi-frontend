import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAppDispatch, useAppSelector } from '../reducers/hooks';
import { setHasMore, setPageFilter } from '../reducers/txFilterReducer';
import {
  useExcludeTransactionMutation,
  useLazyGetTransactionsQuery,
} from '../services/api';
import {
  ChangeCategoryModalState,
  ExcludedTransactionsFilter,
  GetTransactionsOptions,
  Transaction,
} from '../types/types';
import { useAlert } from './AlertProvider';
import LoadingSpinner from './LoadingSpinner';
import ChangeCategoryModal from './modals/ChangeCategoryModal';
import TransactionLine from './TransactionLine';

const TransactionsList = () => {
  const { startDate, endDate, category, account, page, hasMore } =
    useAppSelector((state) => state.txFilter);
  const [sbowExcludedTransactions, setShowExcludedTransactions] =
    useState<ExcludedTransactionsFilter>(
      ExcludedTransactionsFilter.ONLY_INCLUDED,
    );

  const ITEM_PER_PAGE = 20;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuTransactionid, setMenuTransactionId] = useState<number | null>();
  const menuOpen = Boolean(anchorEl);
  const [modalState, setModalState] = useState<ChangeCategoryModalState>({
    show: false,
    transaction: null,
  });
  const [toggleExclusion] = useExcludeTransactionMutation();
  const { setError, setSuccess } = useAlert();
  const dispatch = useAppDispatch();

  const [getTransactions, { isFetching }] = useLazyGetTransactionsQuery();

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const executeQuery = async () => {
      const queryFilter: GetTransactionsOptions = {
        startDate,
        endDate,
        limit: ITEM_PER_PAGE,
        offset: ITEM_PER_PAGE * (page - 1),
        excludedTransactions: sbowExcludedTransactions,
      };
      if (category) {
        queryFilter.categoryIds = [category];
      }

      if (account) {
        queryFilter.accountIds = [account];
      }

      try {
        const pageTransactions = await getTransactions(
          queryFilter,
          true,
        ).unwrap();
        if (pageTransactions) {
          if (page === 1) {
            setTransactions(pageTransactions.rows);
          } else {
            setTransactions(transactions.concat(pageTransactions.rows));
          }
          const more = pageTransactions.count > page * ITEM_PER_PAGE;
          dispatch(setHasMore(more));
        }
      } catch (err) {
        console.error(err);
      }
    };
    executeQuery();
  }, [startDate, endDate, sbowExcludedTransactions, account, page, category]);

  const closeMenu = () => {
    setAnchorEl(null);
    setMenuTransactionId(null);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    const transactionId = event.currentTarget.dataset.transactionid;
    setMenuTransactionId(Number(transactionId));
  };

  const handleExcludeTransaction = async () => {
    const transaction = transactions!.find((t) => t.id === menuTransactionid);
    if (transaction) {
      try {
        await toggleExclusion({
          transactionId: transaction!.id,
          exclude: !transaction.exclude,
        }).unwrap();
        setSuccess(
          `Transaction ${transaction.name} ${
            sbowExcludedTransactions ===
            ExcludedTransactionsFilter.ONLY_INCLUDED
              ? 'excluded from'
              : 'Included in'
          } spending view`,
        );
      } catch (err) {
        setError('Something weent wrong. Try again later');
      }
    }

    closeMenu();
  };

  const handleChangeCategory = async () => {
    const transaction = transactions.find((t) => t.id === menuTransactionid);
    if (transaction) {
      setModalState({ show: true, transaction });
    }

    closeMenu();
  };

  const handleClose = () => {
    closeMenu();
  };

  const toggleExcludeTransactionsView = () => {
    const excludedFilter =
      sbowExcludedTransactions === ExcludedTransactionsFilter.ONLY_EXCLUDED
        ? ExcludedTransactionsFilter.ONLY_INCLUDED
        : ExcludedTransactionsFilter.ONLY_EXCLUDED;
    setShowExcludedTransactions(excludedFilter);
  };

  const { ref } = useInView({
    /* Optional options */
    threshold: 0,
    onChange: (inView) => {
      if (inView) {
        dispatch(setPageFilter(page + 1));
      }
    },
  });

  let lastUsedDate: string = '';

  return (
    <Box>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '20ch',
          },
        }}
      >
        <MenuItem key="Change Category" onClick={handleChangeCategory}>
          Change Category
        </MenuItem>
        <MenuItem key="Exclude Transaction" onClick={handleExcludeTransaction}>
          {sbowExcludedTransactions === ExcludedTransactionsFilter.ONLY_INCLUDED
            ? 'Exclude'
            : 'Include'}{' '}
          in spending
        </MenuItem>
      </Menu>

      <ChangeCategoryModal state={modalState} setState={setModalState} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">
          {sbowExcludedTransactions === ExcludedTransactionsFilter.ONLY_EXCLUDED
            ? 'Excluded Transactions '
            : 'Transactions List'}
        </Typography>
        <Button variant="text" onClick={toggleExcludeTransactionsView}>
          {sbowExcludedTransactions === ExcludedTransactionsFilter.ONLY_EXCLUDED
            ? 'Transactions'
            : 'Excluded transactions'}
        </Button>
      </Box>
      {transactions.length > 0 ? (
        <Box>
          {transactions.map((tx) => {
            const mk = (
              <Box key={tx.id}>
                {tx.txDate !== lastUsedDate && (
                  <Box sx={{ marginTop: 2 }} borderBottom="2px solid grey">
                    <Typography variant="h5">{tx.txDate}</Typography>
                  </Box>
                )}
                <TransactionLine
                  key={tx.id}
                  transaction={tx}
                  handleMenuClick={handleMenuClick}
                />
              </Box>
            );

            lastUsedDate = tx.txDate;
            return mk;
          })}
          {hasMore && <div ref={ref}>Loader</div>}
        </Box>
      ) : (
        <Typography variant="body1">No transaction found</Typography>
      )}
      {isFetching && <LoadingSpinner />}
    </Box>
  );

  // if (isLoading)
  //   return (
  //     <Box sx={{ display: 'flex' }}>
  //       <CircularProgress />
  //     </Box>
  //   );

  // if (transactions) {
  //   if (transactions.count) {
  //     <Typography variant="h4">Transactions List</Typography>;
  //     let lastUsedDate: string = '';
  //     return (
  //       <Box>
  //         <Box />
  //         {transactions.rows.map((tx) => {
  //           const mk = (
  //             <Box key={tx.id}>
  //               {tx.txDate !== lastUsedDate && (
  //                 <Box sx={{ marginTop: 2 }} borderBottom="2px solid grey">
  //                   <Typography variant="h5">{tx.txDate}</Typography>
  //                 </Box>
  //               )}
  //               <TransactionLine key={tx.id} transaction={tx} />
  //             </Box>
  //           );

  //           lastUsedDate = tx.txDate;
  //           return mk;
  //         })}
  //       </Box>
  //     );
  //   }
  //   return <Typography variant="body1">No transaction found</Typography>;
  // }

  // return null;
};

export default TransactionsList;
