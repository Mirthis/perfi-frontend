import { Grid, Typography } from '@mui/material';
import { useAppSelector } from '../reducers/hooks';
import { useGetSpendingByCategoryQuery } from '../services/api';
import { GetSpendingByOptionsBase } from '../types/types';
import CategoryCard from './CategoryCard';
import LoadingSpinner from './LoadingSpinner';

const CategoriesList = () => {
  const { startDate, endDate } = useAppSelector((state) => state.txFilter);

  const queryFilter: GetSpendingByOptionsBase = {
    startDate,
    endDate,
    removeZeroCounts: true,
  };

  const { data: categories, isLoading } =
    useGetSpendingByCategoryQuery(queryFilter);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {categories && categories.length === 0 && (
        <Typography>No transactions.</Typography>
      )}
      <Grid container spacing={2}>
        {categories
          ?.slice()
          .sort((prev, next) => Number(next.txAmount) - Number(prev.txAmount))
          .map((sd) => (
            <Grid key={sd.id} item xs={12} md={6} xl={4}>
              <CategoryCard category={sd} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default CategoriesList;
