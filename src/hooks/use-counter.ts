import { useEffect, useState } from "react";

export function use_counter(count_from: number) {
  const [counter, set_counter] = useState(count_from);

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

  return { counter, reset_counter: () => set_counter(count_from) };
}
