import { useEffect, useState } from "react";
import { useDonorsQuery } from "../../../services/aws/alliance/alliance";
import { Details } from "../../../services/aws/alliance/types";

export const prepareData = (prevData: Details[] | undefined) => {
  let result: Details[] = [];
  if (prevData) {
    prevData.forEach((item) => {
      result.push({
        address: item.address,
        name: item.name,
        icon: item.icon || "",
        url: item.url || "",
        iconLight: item.iconLight || false,
        otherWallets: [item.address],
      });
    });
  }
  return result;
};

export function useAllianceMembers() {
  const [members, setMembers] = useState<Details[]>([]);
  const { data, isLoading } = useDonorsQuery("");

  useEffect(() => {
    const result = prepareData(data);
    setMembers(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { members, isLoading };
}
