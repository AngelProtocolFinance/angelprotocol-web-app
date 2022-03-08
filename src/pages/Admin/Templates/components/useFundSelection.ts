import { useState, useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useFundList } from "services/terra/indexFund/queriers";
import { useLatestBlock } from "services/terra/queriers";
import { FundIdContext } from "./FundSelection";

export default function useFundSelection<_ extends FundIdContext>() {
  const { setValue } = useFormContext<FundIdContext>();

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

  const selectRow = (rowIndex: number) => () => {
    setActiveRow(rowIndex);
  };

  useEffect(() => {
    if (activeRow !== undefined) {
      const fundId = unexpiredFundList[activeRow].id;
      setValue("fundId", `${fundId}`);
    }
    //eslint-disable-next-line
  }, [activeRow]);

  return { unexpiredFundList, activeRow, selectRow };
}
