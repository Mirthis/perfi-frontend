import { Stack } from '@mui/material';
import { AddAccount, PageTitle } from '../components';
import AccountsManagementList from '../components/AccountsManagementList';

const Accounts = () => (
  <>
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <PageTitle title="Accounts" />
      <AddAccount />
    </Stack>
    <AccountsManagementList />
  </>
);

export default Accounts;
