import { useMemo, useState } from "react";
import { SortDirection, SortKey } from "pages/Admin/types";
import { CharityApplication } from "types/server/aws";

export default function useSortedApplications(
  applications: CharityApplication[]
) {
  const [sortKey, setSortKey] = useState<SortKey>("RegistrationDate");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  //if key is already set, just toggle direction
  const handleHeaderClick = (headerKey: SortKey) => () => {
    if (headerKey === sortKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(headerKey);
    }
  };

  const sortedApplications = useMemo(() => {
    const txs = [...applications];
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
  }, [applications, sortKey, sortDirection]);

  return { sortedApplications, handleHeaderClick, sortDirection, sortKey };
}
