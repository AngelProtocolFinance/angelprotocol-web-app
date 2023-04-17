import { useEffect, useMemo, useState } from "react";
import { Path, useFormContext } from "react-hook-form";
import { FundIdContext } from "pages/Admin/types";
import { useContractQuery, useLatestBlockQuery } from "services/juno";
import { hasElapsed } from "helpers/admin";

export default function useFundSelection<T extends FundIdContext>(
  fieldName: Path<T>
) {
  const { setValue } = useFormContext<T>();

  const { data: blockHeight = "0" } = useLatestBlockQuery(null);
  const { data: fundList = [] } = useContractQuery("index-fund.funds", {
    startAfter: 0,
    limit: 10,
  });

  const [activeRow, setActiveRow] = useState<number | undefined>();

  const unexpiredFundList = useMemo(
    () =>
      fundList.filter((fund) => {
        let isExpired = false;
        if (fund.expiryHeight) {
          isExpired = fund.expiryHeight <= +blockHeight;
        }
        if (fund.expiryTime) {
          isExpired = hasElapsed(+fund.expiryTime);
        }
        return !isExpired;
      }),
    [fundList, blockHeight]
  );

  const handleSelectRow = (rowIndex: number) => () => {
    setActiveRow(rowIndex);
  };

  useEffect(() => {
    if (activeRow !== undefined) {
      const fundId = unexpiredFundList[activeRow].id;
      setValue(fieldName, `${fundId}` as any);
    }
    //eslint-disable-next-line
  }, [activeRow]);

  return { unexpiredFundList, activeRow, handleSelectRow };
}
