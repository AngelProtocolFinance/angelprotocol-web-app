import { useEffect, FC } from "react";

export function useRefreshingEffect(
  fn: (...args: any[]) => any,
  timeout: number,
  deps = []
) {
  useEffect(() => {
    // Invoke immediately
    fn();

    // And then every specified ms
    // passing true to the function for refresh-specific logic
    const interval = setInterval(fn, timeout, true);

    return () => clearInterval(interval);

    /* eslint-disable react-hooks/exhaustive-deps */
  }, deps);
}
