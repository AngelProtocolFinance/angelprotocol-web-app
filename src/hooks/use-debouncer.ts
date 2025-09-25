import { useEffect, useState } from "react";

export function use_debouncer<T = number>(
  value: T,
  delay: number
): [T, boolean] {
  const [loading, set_loading] = useState(false);
  const [v, set_v] = useState<T>(value);

  useEffect(() => {
    set_loading(true);
    const timer = setTimeout(() => {
      set_v(value);
      set_loading(false);
    }, delay);
    return () => {
      clearTimeout(timer);
      set_loading(false);
    };
  }, [value, delay]);

  return [v, loading];
}
