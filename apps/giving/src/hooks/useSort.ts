import { useMemo, useState } from "react";
import { Donation } from "types/aws";

export type SortDirection = "asc" | "desc";
export type SortKey = keyof Pick<
  Donation,
  "amount" | "date" | "chainName" | "charityName" | "usdValue"
>;

//TODO: remove custom sorter and pass sort params to AWS instead
export default function useSort(donations: Donation[]) {
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  //if key is already set, just toggle direction
  const handleHeaderClick = (headerKey: SortKey) => () => {
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
