import { useState, useCallback } from 'react';
import { getQueryStringValue, setQueryStringValue } from '../utils/queryString';

function useQueryString(
  key: string,
  initialValue: string | (string | null)[] | null,
): [
  string | (string | null)[] | null,
  (newValue: string | (string | null)[] | null) => void,
] {
  const [value, setValue] = useState(getQueryStringValue(key) || initialValue);
  const onSetValue = useCallback(
    (newValue) => {
      setValue(newValue);
      setQueryStringValue(key, newValue);
    },
    [key],
  );

  return [value, onSetValue];
}

export default useQueryString;
