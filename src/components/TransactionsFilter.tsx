import {
  ToggleButtonGroup,
  ToggleButton,
  Tabs,
  Tab,
  Stack,
  Button,
  Typography,
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useAppDispatch, useAppSelector } from '../reducers/hooks';
import {
  clearAccountFilter,
  clearCategoryFilter,
  setModeFilter,
  setMonthFilter,
} from '../reducers/txFilterReducer';
import { useGetAccountsQuery, useGetCategoriesQuery } from '../services/api';
import { TxFilterMode } from '../types/types';
import { queryDateFormatter, selectDateFormatter } from '../utils/formatters';

// TODO: Get months list from back-end
const getMonthsList = (earliestDate: Date, latestDate: Date) => {
  latestDate.setDate(1);
  const selectDateOptions: Array<{ key: string; value: string }> = [];
  for (
    let curDate = earliestDate;
    curDate <= latestDate;
    curDate.setMonth(curDate.getMonth() + 1)
  ) {
    selectDateOptions.push({
      key: queryDateFormatter.format(curDate),
      value: selectDateFormatter.format(curDate),
    });
  }
  return selectDateOptions;
};

const TransactionsFilter = ({ showMode = false }: { showMode?: boolean }) => {
  const dispatch = useAppDispatch();
  const { month, mode, category, account } = useAppSelector(
    (state) => state.txFilter,
  );
  const latestDate = new Date();
  const earliestDate = new Date('01 January 2021');
  const selectDateOptions = getMonthsList(earliestDate, latestDate);

  const handleMonthChange = (
    _event: React.SyntheticEvent,
    newValue: string,
  ) => {
    dispatch(setMonthFilter(newValue));
  };

  const handleModeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMode: TxFilterMode,
  ) => {
    if (newMode !== null) {
      dispatch(setModeFilter(newMode));
    }
  };

  const handleCategoryFilterClick = () => {
    dispatch(clearCategoryFilter());
  };

  const handleAccountFilterClick = () => {
    dispatch(clearAccountFilter());
  };

  // TODO: manage loading and errors
  const { data: categoriesList } = useGetCategoriesQuery();
  const { data: accountsList } = useGetAccountsQuery();

  return (
    <Stack rowGap={1}>
      <Tabs
        value={month}
        onChange={handleMonthChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {selectDateOptions.map((d) => (
          <Tab key={d.key} label={d.value} value={d.key} />
        ))}
      </Tabs>
      <Stack
        direction="row"
        columnGap={4}
        rowGap={2}
        alignItems="center"
        flexWrap="wrap"
      >
        {showMode && (
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
        )}
        <Stack direction="row" columnGap={1} alignItems="center">
          {(category || account) && (
            <Typography variant="subtitle1">Filters</Typography>
          )}
          {category && (
            <Button
              onClick={handleCategoryFilterClick}
              startIcon={<HighlightOffIcon />}
              variant="text"
            >
              {categoriesList?.find((c) => c.id === category)?.name}
            </Button>
          )}
          {account && (
            <Button
              onClick={handleAccountFilterClick}
              startIcon={<HighlightOffIcon />}
              variant="text"
            >
              {accountsList?.find((a) => a.id === account)?.name}
            </Button>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TransactionsFilter;
