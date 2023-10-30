import { useCallback, useRef, useState } from "react";

function useDebounce(): [
  (callback: () => void, delay: number) => void,
  boolean,
] {
  const [isDebouncing, setDebouncing] = useState(false);
  const lastKeyStroke = useRef(0);
  const timeoutId = useRef<NodeJS.Timeout>();

  const debounce = useCallback(
    (callback: () => void | Promise<void>, delay: number) => {
      lastKeyStroke.current = Date.now();
      setDebouncing(true);

      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

      timeoutId.current = setTimeout(async () => {
        if (Date.now() - lastKeyStroke.current >= delay) {
          await callback();
          setDebouncing(false);
        }
      }, delay);
    },
    []
  );

  return [debounce, isDebouncing];
}

export default useDebounce;
