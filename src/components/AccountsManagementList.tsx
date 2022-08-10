/* eslint-disable @typescript-eslint/indent */
import { Grid, Typography } from '@mui/material';
import {
  useGetAccountsQuery,
  useSyncTransactionsMutation,
} from '../services/api';
import AccountManagementCard from './AccountManagementCard';
import LoadingSpinner from './LoadingSpinner';

const AccountsManagementList = () => {
  const { data: accounts, isLoading } = useGetAccountsQuery();

  // const handleDeleteButton = (event: React.MouseEvent<HTMLElement>) => {
  //   console.log('Delete');
  //   console.log(event);
  // };

  const [syncTransctions] = useSyncTransactionsMutation();

  const handleSyncButton = (event: React.MouseEvent<HTMLElement>) => {
    const itemId = event.currentTarget.dataset.itemid;
    if (!itemId) return;
    syncTransctions(Number(itemId));
  };

  const uniqueItems = accounts
    ?.map((acc) => acc.item)
    .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {accounts && (
        <>
          <Typography variant="h6" mb={2}>
            {accounts?.length === 0 ? 'No' : accounts.length} accounts added.
          </Typography>
          <Grid container spacing={2}>
            {uniqueItems?.map((item) => (
              <Grid key={item.id} item xs={12} md={6} lg={4}>
                <AccountManagementCard
                  item={item}
                  accounts={accounts.filter((a) => a.item.id === item.id)}
                  // handleDeleteButton={handleDeleteButton}
                  handleSyncButton={handleSyncButton}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default AccountsManagementList;
