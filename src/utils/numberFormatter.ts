export const formatCurrency = (value: number, currency: string): string => {
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
    currencyDisplay: 'narrowSymbol',
  });

  return formatter.format(value);
};

export const capitalizeFirst = (sentence: string): string =>
  sentence
    .split(' ')
    .map((w: string) => w[0].toUpperCase() + w.substring(1))
    .join(' ');

export const formatPercentage = () => {};
