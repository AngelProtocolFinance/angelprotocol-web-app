import { useState, useEffect, useMemo } from "react";
import { useFormContext, Path } from "react-hook-form";
import { useFundList } from "services/terra/indexFund/queriers";
import { useLatestBlock } from "services/terra/queriers";
import { FundIdContext } from "./FundSelection";

export default function useFundSelection<T extends FundIdContext>(
  fieldName: Path<T>
) {
  const { setValue } = useFormContext<T>();

  const blockHeight = useLatestBlock();
  const { fundList } = useFundList();
  const [activeRow, setActiveRow] = useState<number | undefined>();

  const unexpiredFundList = useMemo(
    () =>
      fundList.filter((fund) => {
        let isExpired = false;
        if (fund.expiry_height) {
          isExpired = +fund.expiry_height <= +blockHeight;
        }
        if (fund.expiry_time) {
          isExpired =
            +fund.expiry_time <= Math.floor(new Date().getTime() / 1000);
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
