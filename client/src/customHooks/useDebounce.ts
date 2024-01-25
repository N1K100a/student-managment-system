import { useEffect, useState } from "react";

export const useDebounce = (value: any, delay: number) => {
  const [executeValue, setExecuteValue] = useState(NaN);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setExecuteValue(value);
    }, delay);
    return () => clearTimeout(timeOut);
  }, [value, delay]);
  return executeValue;
};
