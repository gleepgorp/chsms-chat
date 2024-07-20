import { useEffect, useState } from "react";

export default function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebounceeValue] = useState<string>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceeValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    }
  }, [value, delay]);

  return debouncedValue;
}