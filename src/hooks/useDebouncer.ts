import { useEffect, useState } from "react";

export default function useDebouncer<T = number>(value: T, delay: number) {
  const [_value, _setValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      _setValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return _value;
}
