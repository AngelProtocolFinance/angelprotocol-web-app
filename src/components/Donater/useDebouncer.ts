import { useEffect, useState } from "react";

export default function useDebouncer(value: number, delay: number) {
  const [_value, _setValue] = useState(value);
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
