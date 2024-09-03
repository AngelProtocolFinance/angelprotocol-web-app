import type { Allocation } from "types/aws";

export const MIN_PROCESSING_AMOUNT = 50;
export const unprocessed = (alloc: Allocation, amount: number) => {
  return Object.values(alloc).reduce((unprocessed, pct) => {
    const val = (pct / 100) * amount;
    if (val === 0) return unprocessed;
    if (val > MIN_PROCESSING_AMOUNT) return unprocessed;
    return unprocessed + val;
  }, 0);
};
