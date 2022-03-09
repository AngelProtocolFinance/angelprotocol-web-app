import { useCallback, useState } from "react";
import { DonationTransactions } from "services/aws/endowment_admin/types";

export enum Direction {
  Asc = "Asc",
  Desc = "Dsc",
}

export default function useSortList<T>(sortKeys?: string[]) {
  const [key, setKey] = useState<keyof DonationTransactions | string>("");
  const [direction, setDirection] = useState(Direction.Asc);

  const toggleDirection = () =>
    setDirection(direction === Direction.Asc ? Direction.Desc : Direction.Asc);

  const setSortKey = (key: string) =>
    sortKeys ? sortKeys.includes(key) && setKey(key) : setKey(key);

  const sortList = useCallback(
    (dataList: T[]) => {
      if (!key) return dataList;
      const arrayOfSort = [...dataList];
      const sorted = arrayOfSort.sort((a: any, b: any) => {
        return direction === Direction.Asc ? b[key] - a[key] : a[key] - b[key];
      });
      return sorted;
    },
    [key, direction]
  );

  return { sortList, toggleDirection, setKey: setSortKey, direction, key };
}
