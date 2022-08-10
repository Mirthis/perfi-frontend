export const queryDateFormatter = new Intl.DateTimeFormat('sv-SE', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export const selectDateFormatter = new Intl.DateTimeFormat('en-GB', {
  month: 'long',
  year: 'numeric',
});

export const chartDateFormatter = new Intl.DateTimeFormat('en-GB', {
  month: 'short',
  year: '2-digit',
});

export const ddmmDateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
});

export const dateTimeFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

// TODO: miove together with other styling
export const amountStyle = (value: Number) => ({
  fontWeight: 'bold',
  color: value >= 0 ? 'green' : 'red',
});

export const formatCurrency = (
  value: number,
  currency: string,
  decimals: number = 2,
): string => {
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    maximumFractionDigits: decimals,
    currencyDisplay: 'narrowSymbol',
  });

  return formatter.format(value);
};

export const capitalizeFirst = (sentence: string): string =>
  sentence
    .split(' ')
    .map((w: string) => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(' ');

export const formatPercentage = () => {};

export const getFirstDayOfMonth = (
  date: Date,
  monthDelta: number = 0,
): Date => {
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0);
  startDate.setMonth(date.getMonth() + monthDelta);
  return startDate;
};

export const getLastDayOfMonth = (date: Date, monthDelta: number = 0): Date => {
  const endDate = new Date(
    date.getFullYear(),
    date.getMonth() + 1 + monthDelta,
    0,
  );
  // endDate.setMonth(date.getMonth() );
  return endDate;
};

export const getDateAsYyyyMmDd = (date: Date) =>
  String(
    10000 * date.getFullYear() + 100 * (date.getMonth() + 1) + date.getDate(),
  );

export const getStartEndDate = (
  month: Date,
  startMonthDelta: number = 0,
  endMonthDelta: number = 0,
) => {
  // const startDate = getFirstDayOfMonth(month, startMonthDelta);
  const startDate = queryDateFormatter.format(
    getFirstDayOfMonth(month, startMonthDelta),
  );
  // const endDate = getLastDayOfMonth(month, endMonthDelta);
  const endDate = queryDateFormatter.format(
    getLastDayOfMonth(month, endMonthDelta),
  );
  return { startDate, endDate };
};
