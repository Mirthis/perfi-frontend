import { LoadingButton } from '@mui/lab';
import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  Grid,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Switch,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../reducers/hooks';
import { setForceDataRefresh } from '../../reducers/txFilterReducer';
import {
  useGetCategoriesQuery,
  useLazyGetSimilarTransactionsCountQuery,
  useSetSimilarTransactionsCategoryMutation,
  useSetTransactionCategoryMutation,
} from '../../services/api';
import { ChangeCategoryModalState } from '../../types/types';
import CategoryIcon from '../CategoryIcon';

const ChangeCategoryModal = ({
  state: { show, transaction },
  setState,
}: {
  state: ChangeCategoryModalState;
  setState: React.Dispatch<React.SetStateAction<ChangeCategoryModalState>>;
}) => {
  const { data: categories } = useGetCategoriesQuery();
  const [newCategory, setNewCategory] = useState<string>('-1');
  const [updateSimilar, setUpdateSimilar] = useState<boolean>(false);
  const [
    setTransactionCategory,
    { isLoading: setCategoryLoading, reset: setCategoryReset },
  ] = useSetTransactionCategoryMutation();
  const [
    setSimilarTransacctionsCategory,
    { isLoading: setSimilarCategoryLoading, reset: setSimilarCategoryReset },
  ] = useSetSimilarTransactionsCategoryMutation();

  const dispatch = useAppDispatch();

  const [getSimilarTransaction, { data: similarTransactionsCount }] =
    useLazyGetSimilarTransactionsCountQuery();

  useEffect(() => {
    if (transaction) {
      getSimilarTransaction(transaction.id, true);
    }
  }, [transaction]);

  const handleSubmit = async () => {
    if (!transaction) return;
    if (updateSimilar) {
      await setSimilarTransacctionsCategory({
        transactionId: transaction.id,
        categoryId: Number(newCategory),
      }).unwrap();
    } else {
      await setTransactionCategory({
        transactionId: transaction.id,
        categoryId: Number(newCategory),
      }).unwrap();
    }
    if (updateSimilar) {
      setSimilarCategoryReset();
    } else {
      setCategoryReset();
    }
    setState({ show: false, transaction: null });
    setNewCategory('-1');
    setUpdateSimilar(false);
    dispatch(setForceDataRefresh(true));
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '100%', sm: 600 },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    transaction && (
      <Modal
        aria-labelledby="Change transaction category"
        aria-describedby="Change transaction category"
        open={show}
        onClose={() => setState({ show: false, transaction: null })}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={show}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Change Transaction Category
            </Typography>
            <Typography>
              {transaction.txDate} - {transaction.name}
            </Typography>

            <Grid
              container
              alignItems="center"
              mt={2}
              rowSpacing={2}
              columnSpacing={2}
            >
              <Grid item xs={4} sm={6}>
                <Typography>Current category</Typography>
              </Grid>
              <Grid item xs={8} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CategoryIcon
                    name={transaction.category.iconName}
                    fontSize={40}
                  />
                  <Typography>{transaction.category.name}</Typography>
                </Box>
              </Grid>
              <Grid item xs={4} sm={6}>
                <Typography>New Category</Typography>
              </Grid>
              <Grid xs={8} sm={6} item>
                {categories && (
                  <FormControl fullWidth size="small">
                    <Select
                      labelId="dtransaction-month-label"
                      id="transaction-month"
                      value={newCategory}
                      onChange={(event: SelectChangeEvent) =>
                        setNewCategory(event.target.value)
                      }
                    >
                      <MenuItem key="-1" value="-1">
                        Select a category
                      </MenuItem>
                      {categories
                        .filter((c) => c.id !== transaction.category.id)
                        .map((c) => (
                          <MenuItem key={c.id} value={c.id}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CategoryIcon name={c.iconName} fontSize={30} />
                              {c.name}
                            </Box>
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                )}
              </Grid>
              <Grid item xs={4} sm={6}>
                {similarTransactionsCount &&
                  similarTransactionsCount.txCount > 1 && (
                    <Typography>Update similar?</Typography>
                  )}
                {similarTransactionsCount && (
                  <Typography variant="body2">
                    {similarTransactionsCount.txCount - 1} similar transactions
                    found
                  </Typography>
                )}
              </Grid>
              <Grid xs={8} sm={6} item>
                {similarTransactionsCount &&
                  similarTransactionsCount?.txCount > 1 && (
                    <Switch
                      checked={updateSimilar}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        setUpdateSimilar(event.target.checked);
                      }}
                    />
                  )}
              </Grid>
            </Grid>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
              }}
              mt={2}
            >
              <Button
                variant="outlined"
                color="error"
                onClick={() => setState({ show: false, transaction: null })}
              >
                Cancel
              </Button>
              <LoadingButton
                loading={setCategoryLoading || setSimilarCategoryLoading}
                variant="contained"
                onClick={handleSubmit}
              >
                Change Category
              </LoadingButton>
            </Box>
          </Box>
        </Fade>
      </Modal>
    )
  );
};

export default ChangeCategoryModal;
