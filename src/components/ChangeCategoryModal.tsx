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
import { useState } from 'react';
import {
  useGetCategoriesQuery,
  useGetSimilarTransactionsCountQuery,
  useSetSimilarTransactionsCategoryMutation,
  useSetTransactionCategoryMutation,
} from '../services/api';
import { TransactionData } from '../types/types';
import CategoryIcon from './CategoryIcon';

const ChangeCategoryModal = ({
  showModal,
  setShowModal,
  transaction,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  transaction: TransactionData;
}) => {
  const { data: categories } = useGetCategoriesQuery();
  const [newCategory, setNewCategory] = useState<string>('-1');
  const [updateSimilar, setUpdateSimilar] = useState<boolean>(false);
  const [
    setTransactionCategory,
    {
      isSuccess: setCategorySuccess,
      isLoading: setCategoryLoading,
      reset: setCategoryReset,
    },
  ] = useSetTransactionCategoryMutation();
  const [
    setSimilarTransacctionsCategory,
    {
      isSuccess: setSimilarCategorySuccess,
      isLoading: setSimilarCategoryLoading,
      reset: setSimilarCategoryReset,
    },
  ] = useSetSimilarTransactionsCategoryMutation();

  console.log('transaction.id');
  console.log(transaction.id);
  const { data: similarTransactionsCount } =
    useGetSimilarTransactionsCountQuery(transaction.id);

  if (similarTransactionsCount) {
    console.log('similarTransactionsCount');
    console.log(similarTransactionsCount);
  }

  if (setCategorySuccess || setSimilarCategorySuccess) {
    if (updateSimilar) {
      setSimilarCategoryReset();
    } else {
      setCategoryReset();
    }
    setShowModal(false);
    setNewCategory('-1');
  }

  const handleSubmit = () => {
    if (updateSimilar) {
      setSimilarTransacctionsCategory({
        transactionId: transaction.id,
        categoryId: Number(newCategory),
      });
    } else {
      setTransactionCategory({
        transactionId: transaction.id,
        categoryId: Number(newCategory),
      });
    }
  };

  console.log('Modal state:');
  console.log(showModal);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <Modal
        aria-labelledby="Change transaction category"
        aria-describedby="Change transaction category"
        open={showModal}
        onClose={() => setShowModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal}>
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
              <Grid item xs={6}>
                <Typography variant="h6">Current category</Typography>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CategoryIcon
                    name={transaction.category.iconName}
                    fontSize={40}
                  />
                  <Typography>{transaction.category.name}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">New Category</Typography>
              </Grid>
              <Grid xs={6} item>
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
              <Grid item xs={6}>
                <Typography variant="h6">
                  Update category for similar transactions?
                </Typography>
                {similarTransactionsCount && (
                  <Typography>
                    {similarTransactionsCount.txCount} similar transactions
                    found
                  </Typography>
                )}
              </Grid>
              <Grid xs={6} item>
                <Switch
                  checked={updateSimilar}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setUpdateSimilar(event.target.checked);
                  }}
                />
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
                onClick={() => setShowModal(false)}
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
    </div>
  );
};

export default ChangeCategoryModal;
