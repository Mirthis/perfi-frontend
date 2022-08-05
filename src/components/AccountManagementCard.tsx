import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import { MouseEventHandler } from 'react';
import {
  capitalizeFirst,
  chartDateFormatter,
  dateTimeFormatter,
  formatCurrency,
} from '../utils/formatters';
import { Account, Item } from '../types/types';
import EditAccount from './EditAccount';

const AccountManagementCard = ({
  item,
  accounts,
  // handleDeleteButton,
  handleSyncButton,
}: {
  item: Item;
  accounts: Account[];
  // handleDeleteButton: MouseEventHandler<HTMLButtonElement>;
  handleSyncButton: MouseEventHandler<HTMLButtonElement>;
}) => (
  <Card
    variant="outlined"
    sx={{
      borderLeftWidth: 4,
      borderLeftColor: item.institution.color,
      height: '100%',
    }}
  >
    <CardContent
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'space-between',
        height: '100%',
      }}
    >
      <Stack direction="row" gap={2} mb={2}>
        <Avatar src={`data:image/png;base64,${item.institution.logo}`} />
        <Typography variant="h6" color="text.secondary">
          {item.institution.name}
        </Typography>
      </Stack>
      <Stack direction="column" gap={1} flexGrow={1}>
        {accounts.map((account) => (
          <Stack
            key={account.id}
            direction="row"
            gap={4}
            justifyContent="space-between"
          >
            <Stack>
              <Typography variant="body1" color="text.secondary">
                {account.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {account.subType ? capitalizeFirst(account.subType) : 'N/A'}
              </Typography>
            </Stack>
            <Typography variant="body1" color="text.secondary">
              {account.currentBalance && account.isoCurrencyCode
                ? formatCurrency(
                    Number(account.currentBalance),
                    account.isoCurrencyCode,
                  )
                : '-'}
            </Typography>
          </Stack>
        ))}
      </Stack>
      <Stack direction="row" justifyContent="flex-end" gap={2} mt={4}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <Button
            data-itemid={item.id}
            onClick={handleSyncButton}
            startIcon={<SyncIcon />}
          >
            Sync now
          </Button>
          <Typography mr={1} variant="subtitle2">
            Last synced
          </Typography>
          <Typography mr={1} variant="body2">
            {dateTimeFormatter.format(new Date(item.lastSynced))}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <EditAccount itemId={item.id} />
          <Typography mr={1} variant="subtitle2">
            Access expires
          </Typography>
          <Typography mr={1} variant="body2">
            {chartDateFormatter.format(new Date(item.consentExpirationTime))}
          </Typography>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

export default AccountManagementCard;
