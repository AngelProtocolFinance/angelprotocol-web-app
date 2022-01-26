import { useEffect, useState } from "react";
import { useDonorsQuery } from "../../../services/aws/alliance/alliance";
import { Details, Member } from "../../../services/aws/alliance/types";

export default function useAllianceMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const { data, isLoading } = useDonorsQuery("");

  useEffect(() => {
    const result = prepareData(data);
    setMembers(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const prepareData = (prevData: Details[] | undefined) => {
    let result: Member[] = [];
    if (prevData) {
      let prevName = "";
      prevData.forEach((item) => {
        if (prevName === item.name) {
          result[result.length - 1].addresses.push(item.address);
        } else {
          result.push({
            name: item.name,
            icon: item.icon,
            iconLight: item.iconLight,
            addresses: [item.address],
          });
        }
        prevName = item.name;
      });
    }
    return result;
  };

  return { members, isLoading };
}
