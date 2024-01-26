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

  const sorted = useMemo(() => {
    const txs = [...donations];
    const gtSortVal = sortDirection === "asc" ? 1 : -1;
    const ltSortVal = sortDirection === "asc" ? -1 : 1;
    txs.sort((prev, next) => {
      if (prev[sortKey]! > next[sortKey]!) {
        return gtSortVal;
      }
      if (prev[sortKey]! < next[sortKey]!) {
        return ltSortVal;
      }
      return 0;
    });
    return txs;
  }, [donations, sortKey, sortDirection]);

  return { sorted, handleHeaderClick, sortDirection, sortKey };
}
