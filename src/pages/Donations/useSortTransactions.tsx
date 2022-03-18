import { useMemo, useState } from "react";
import { Transaction } from "services/aws/endowment_admin/types";

export type SortDirection = "asc" | "desc";
export type SortKey = keyof Transaction;
export default function useSortedTransactions(transactions: Transaction[]) {
  const [sortKey, setSortKey] = useState<SortKey>("transaction_date");
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
    if (transactions.length <= 1) return transactions;

    const txsCopy = [...transactions];
    const keyValue = txsCopy[0][sortKey];

    if (typeof keyValue === "string") {
      if (sortDirection === "asc") txsCopy.sort();
      if (sortDirection === "desc") txsCopy.reverse();
    }

    if (typeof keyValue === "number") {
      txsCopy.sort((prevTx, nextTx) => {
        const prevValue = prevTx[sortKey];
        const nextValue = nextTx[sortKey];
        if (typeof prevValue === "number" && typeof nextValue === "number") {
          return sortDirection === "asc"
            ? prevValue - nextValue
            : nextValue - prevValue;
        } else {
          return 0;
        }
      });
    }

    return txsCopy;
  }, [transactions, sortKey, sortDirection]);

  return { sortedTransactions, handleHeaderClick, sortDirection, sortKey };
}
