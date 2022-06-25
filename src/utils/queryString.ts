import qs from 'query-string';

export const setQueryStringWithoutPageReload = (qsValue: string) => {
  const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${qsValue}`;

  window.history.pushState({ path: newurl }, '', newurl);
};

export const setQueryStringValue = (
  key: string,
  value: string | number,
  queryString = window.location.search,
) => {
  const values = qs.parse(queryString);
  const newQsValue = qs.stringify({ ...values, [key]: value });
  setQueryStringWithoutPageReload(`?${newQsValue}`);
};

export const getQueryStringValue = (
  key: string,
  queryString = window.location.search,
): string | (string | null)[] | null => {
  const values = qs.parse(queryString);
  return values[key];
};
