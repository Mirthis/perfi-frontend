import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../reducers/hooks';
import { setMonthFilter } from '../reducers/txFilterReducer';
import { selectDateFormatter } from '../utils/formatters';

const getMonthsList = (earliestDate: Date, latestDate: Date) => {
  const selectDateOptions: string[] = [];
  for (
    let curDate = latestDate;
    curDate >= earliestDate;
    curDate.setMonth(curDate.getMonth() - 1)
  ) {
    selectDateOptions.push(selectDateFormatter.format(curDate));
  }
  return selectDateOptions;
};

const TransactionsFilter = () => {
  const dispatch = useAppDispatch();
  const month = useAppSelector((state) => state.txFilter.month);
  const latestDate = new Date();
  const earliestDate = new Date('01 January 2020');
  const selectDateOptions = getMonthsList(earliestDate, latestDate);

  const handleMonthChange = (event: SelectChangeEvent) => {
    dispatch(setMonthFilter(event.target.value));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={month}
          label="Month"
          onChange={handleMonthChange}
        >
          {selectDateOptions.map((d) => (
            <MenuItem key={d} value={d}>
              {d}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default TransactionsFilter;
