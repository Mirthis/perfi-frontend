import { Alert, AlertTitle, Button, Stack } from '@mui/material';
import { AddAccount, PageTitle } from '../components';
import AccountsManagementList from '../components/AccountsManagementList';
import { DEMO_ONLY } from '../utils/config';

const Accounts = () => (
  <>
    {DEMO_ONLY && (
      <Alert severity="info">
        <AlertTitle>Demo restriction</AlertTitle>
        Adding, updating or syncing accounts are not available in the demo app.
      </Alert>
    )}
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <PageTitle title="Accounts" />
      {DEMO_ONLY && (
        <Button variant="outlined" disabled>
          Add Account
        </Button>
      )}
      {!DEMO_ONLY && <AddAccount />}
    </Stack>
    <AccountsManagementList />
  </>
);

export default Accounts;
