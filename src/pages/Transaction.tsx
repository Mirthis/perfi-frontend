import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CategoryIcon } from '../components';
import ChangeCategoryModal from '../components/modals/ChangeCategoryModal';
import {
  useExcludeTransactionMutation,
  useGetTransactionQuery,
} from '../services/api';
import { ChangeCategoryModalState } from '../types/types';
import { formatCurrency } from '../utils/formatters';

const Transaction = () => {
  const { id } = useParams();

  const { isLoading, data: transaction } = useGetTransactionQuery(Number(id));
  const [toggleExclusion] = useExcludeTransactionMutation();
  const [modalState, setModalState] = useState<ChangeCategoryModalState>({
    show: false,
    transaction: null,
  });

  const toggleTransactionExclusion = async () => {
    await toggleExclusion({
      transactionId: transaction!.id,
      exclude: !transaction!.exclude,
    });
  };

  const getExclusionText = () => {
    if (transaction!.category.exclude) {
      return 'The transaction is excluded from your spending view, cause it belongs to an excluded category';
    }
    if (transaction!.exclude) {
      return 'The transaction is excluded from your spending view.';
    }
    return 'The transaction is included in your spending view';
  };

  return (
    <Box>
      {isLoading && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
      {transaction && (
        <>
          <ChangeCategoryModal state={modalState} setState={setModalState} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography variant="h4">{transaction.name}</Typography>
              <Typography variant="h5">{transaction.merchantName}</Typography>
            </Box>
            <Typography variant="h4" color="primary">
              {formatCurrency(
                transaction.amount,
                transaction.isoCurrencyCode || 'GBP',
              )}
            </Typography>
          </Box>
          {/* Account, category and visibility details */}
          <Grid
            container
            columnSpacing={4}
            rowSpacing={4}
            alignItems="flex-start"
            marginTop={4}
          >
            <Grid
              item
              sx={{ display: 'flex' }}
              xs={12}
              sm={6}
              md={4}
              border="1px solid black"
            >
              <Avatar
                sx={{ width: 75, height: 75 }}
                alt={transaction.account.name}
                src={`data:image/png;base64,${transaction.account.item.institution.logo}`}
              />
              <Typography variant="h5">{transaction.account.name}</Typography>
            </Grid>
            <Grid
              item
              sx={{ display: 'flex' }}
              xs={12}
              sm={6}
              md={4}
              border="1px solid black"
            >
              <CategoryIcon
                name={transaction.category.iconName}
                fontSize={75}
              />
              <Box>
                <Typography variant="h5">
                  {transaction.category.name}
                </Typography>
                <Button
                  onClick={() => setModalState({ show: true, transaction })}
                >
                  Change Category
                </Button>
              </Box>
            </Grid>
            <Grid
              item
              sx={{ display: 'flex' }}
              xs={12}
              sm={6}
              md={4}
              border="1px solid black"
            >
              {transaction.exclude || transaction.category.exclude ? (
                <Visibility sx={{ padding: 1, fontSize: 75 }} />
              ) : (
                <VisibilityOff sx={{ padding: 1, fontSize: 75 }} />
              )}
              <Box>
                <Typography variant="body1">{getExclusionText()}</Typography>
                {!transaction.category.exclude && (
                  <Button onClick={toggleTransactionExclusion}>
                    {transaction.exclude ? 'Include' : 'Exclude'} Transaction
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Transaction;
