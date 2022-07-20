import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../reducers/hooks';
import {
  clearAccountFilter,
  setAccountFilter,
  setCategoryFilter,
  setModeFilter,
  setMonthFilter,
} from '../reducers/txFilterReducer';
import { useGetAccountsQuery, useGetCategoriesQuery } from '../services/api';
import { TxFilterMode } from '../types/types';
import { queryDateFormatter, selectDateFormatter } from '../utils/formatters';

const getMonthsList = (earliestDate: Date, latestDate: Date) => {
  latestDate.setDate(1);
  const selectDateOptions: Array<{ key: string; value: string }> = [];
  for (
    let curDate = latestDate;
    curDate >= earliestDate;
    curDate.setMonth(curDate.getMonth() - 1)
  ) {
    selectDateOptions.push({
      key: queryDateFormatter.format(curDate),
      value: selectDateFormatter.format(curDate),
    });
  }
  return selectDateOptions;
};

const TransactionsFilter = () => {
  const dispatch = useAppDispatch();
  const { month, mode, category, account } = useAppSelector(
    (state) => state.txFilter,
  );
  const latestDate = new Date();
  const earliestDate = new Date('01 January 2021');
  const selectDateOptions = getMonthsList(earliestDate, latestDate);

  const handleMonthChange = (event: SelectChangeEvent) => {
    dispatch(setMonthFilter(event.target.value));
  };

  const handleModeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMode: TxFilterMode,
  ) => {
    if (newMode !== null) {
      dispatch(setModeFilter(newMode));
    }
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    dispatch(setCategoryFilter(Number(event.target.value)));
  };

  const handleAccountChange = (event: SelectChangeEvent) => {
    if (event.target.value === '-1') {
      dispatch(clearAccountFilter());
    }
    dispatch(setAccountFilter(Number(event.target.value)));
  };

  // TODO: manage loading and errors
  const { data: categoriesList } = useGetCategoriesQuery();
  const { data: accountsList } = useGetAccountsQuery();

  return (
    <Box sx={{ minWidth: 120, display: 'flex', gap: 2, m: 2, p: 2 }}>
      <FormControl>
        <InputLabel id="transaction-month-label">Month</InputLabel>
        <Select
          labelId="dtransaction-month-label"
          id="transaction-month"
          value={month}
          label="Month"
          onChange={handleMonthChange}
        >
          {selectDateOptions.map((d) => (
            <MenuItem key={d.key} value={d.key}>
              {d.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ToggleButtonGroup
        color="primary"
        value={mode}
        exclusive
        onChange={handleModeChange}
      >
        {Object.entries(TxFilterMode).map(([key, value]) => (
          <ToggleButton key={key} value={value}>
            {key}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {accountsList && (
        <FormControl>
          <InputLabel id="transaction-category-label">Account</InputLabel>
          <Select
            labelId="transaction-account-label"
            id="transaction-account"
            value={account?.toString() || '-1'}
            label="account"
            onChange={handleAccountChange}
          >
            <MenuItem key={-1} value="-1">
              Select an account
            </MenuItem>
            {accountsList.map((acc) => (
              <MenuItem key={acc.id} value={acc.id}>
                {acc.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {categoriesList && mode === TxFilterMode.List && (
        <FormControl>
          <InputLabel id="transaction-category-label">Category</InputLabel>
          <Select
            labelId="transaction-category-label"
            id="transaction-category"
            value={category?.toString() || '-1'}
            label="Category"
            onChange={handleCategoryChange}
          >
            <MenuItem key={-1} value="-1">
              Select a category
            </MenuItem>
            {categoriesList.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

export default TransactionsFilter;
