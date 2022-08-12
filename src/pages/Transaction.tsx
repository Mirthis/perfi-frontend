import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
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
  const navigate = useNavigate();

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

  const navigateBack = () => {
    navigate(-1);
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
          <Button startIcon={<ArrowBackIosIcon />} onClick={navigateBack}>
            Back
          </Button>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              columnGap: 2,
            }}
          >
            <Box
              flexGrow={3}
              overflow="hidden"
              whiteSpace="normal"
              textOverflow="ellipsis"
            >
              <Typography variant="h5">{transaction.name}</Typography>
              <Typography variant="h6">{transaction.merchantName}</Typography>
            </Box>
            <Typography
              flexGrow={1}
              flexShrink={0}
              variant="h5"
              color="primary"
            >
              {formatCurrency(
                transaction.amount,
                transaction.isoCurrencyCode || 'GBP',
              )}
            </Typography>
          </Box>
          {/* Account, category and visibility details */}
          <Grid container columnSpacing={2} rowSpacing={2} marginTop={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent
                  sx={{
                    direction: 'row',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Avatar
                    sx={{ width: 75, height: 75 }}
                    alt={transaction.account.name}
                    src={`data:image/png;base64,${transaction.account.item.institution.logo}`}
                  />
                  <Typography variant="h6">
                    {transaction.account.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent
                  sx={{
                    direction: 'row',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <CategoryIcon
                    name={transaction.category.iconName}
                    color={transaction.category.iconColor}
                    fontSize={75}
                  />
                  <Box>
                    <Typography variant="h6">
                      {transaction.category.name}
                    </Typography>
                    <Button
                      onClick={() => setModalState({ show: true, transaction })}
                    >
                      Change Category
                    </Button>
                  </Box>
                </CardContent>
              </Card>{' '}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent
                  sx={{
                    direction: 'row',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  {transaction.exclude || transaction.category.exclude ? (
                    <Visibility sx={{ padding: 1, fontSize: 75 }} />
                  ) : (
                    <VisibilityOff sx={{ padding: 1, fontSize: 75 }} />
                  )}
                  <Box>
                    <Typography variant="body1">
                      {getExclusionText()}
                    </Typography>
                    {!transaction.category.exclude && (
                      <Button onClick={toggleTransactionExclusion}>
                        {transaction.exclude ? 'Include' : 'Exclude'}{' '}
                        Transaction
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Transaction;
