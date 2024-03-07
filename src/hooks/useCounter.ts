import { useEffect, useState } from "react";

export default function useCounter(countFrom: number) {
  const [counter, setCounter] = useState(countFrom);

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter === 0) {
        clearInterval(interval);
        return;
      }

      setCounter((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [counter]);

  return { counter, resetCounter: () => setCounter(countFrom) };
}
