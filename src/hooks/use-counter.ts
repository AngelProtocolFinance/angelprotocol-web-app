import { useEffect, useState } from "react";

export function use_counter(countFrom: number) {
  const [counter, set_counter] = useState(countFrom);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (counter === 0) {
        clearInterval(interval);
        return;
      }

      set_counter((prev) => prev - 1);
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [counter]);

  return { counter, reset_counter: () => set_counter(countFrom) };
}
