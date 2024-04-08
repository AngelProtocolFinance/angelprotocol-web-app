import { useMemo, useState } from "react";

type SortDirection = "asc" | "desc";
type SortKey<T> = keyof T;

//TODO: remove custom sorter and pass sort params to AWS instead
export default function useSort<T>(donations: T[], defaultSortKey: keyof T) {
  const [sortKey, setSortKey] = useState<SortKey<T>>(defaultSortKey);
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  //if key is already set, just toggle direction
  const handleHeaderClick = (headerKey: SortKey<T>) => () => {
    if (headerKey === sortKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(headerKey);
    }
  };

  /**
   * biome-ignore lint/correctness/useExhaustiveDependencies: biome wrongly assumes prev[sortKey]
   * and next[sortKey] should be part of deps. array.
   * This is an issue with biome@1.5.3, upgrading to 1.6.* fixes the issue.
   * Related issue: https://github.com/biomejs/biome/issues/1871
   */
  const sorted = useMemo(() => {
    const txs = [...donations];
    const gtSortVal = sortDirection === "asc" ? 1 : -1;
    const ltSortVal = sortDirection === "asc" ? -1 : 1;
    txs.sort((prev, next) => {
      if (prev[sortKey]! > next[sortKey]!) {
        return gtSortVal;
      } else if (prev[sortKey]! < next[sortKey]!) {
        return ltSortVal;
      } else {
        return 0;
      }
    });
    return txs;
  }, [donations, sortKey, sortDirection]);

  return { sorted, handleHeaderClick, sortDirection, sortKey };
}
