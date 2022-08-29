import { useMemo, useState } from "react";
import { SortDirection, SortKey } from "pages/Donations/types";
import { Transaction } from "types/aws";

export default function useSortedTransactions(transactions: Transaction[]) {
  const [sortKey, setSortKey] = useState<SortKey>("block_timestamp");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  //if key is already set, just toggle direction
  const handleHeaderClick = (headerKey: SortKey) => () => {
    if (headerKey === sortKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(headerKey);
    }
  };

  const sortedTransactions = useMemo(() => {
    const txs = [...transactions];
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
  }, [transactions, sortKey, sortDirection]);

  return { sortedTransactions, handleHeaderClick, sortDirection, sortKey };
}
