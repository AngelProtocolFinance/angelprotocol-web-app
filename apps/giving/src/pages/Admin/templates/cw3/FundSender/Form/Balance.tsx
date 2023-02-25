import { axlUSDCDenom, symbols } from "@giving/constants/tokens";
import { humanize } from "@giving/helpers";
import { useFormContext } from "react-hook-form";
import { FundSendValues } from "@giving/types/pages/admin";

export default function Balance() {
  const { watch, setValue } = useFormContext<FundSendValues>();
  const denom = watch("denom");
  const haloBalance = watch("haloBalance");
  const usdBalance = watch("usdBalance");

  const displayBalance = denom === axlUSDCDenom ? usdBalance : haloBalance;

  function setMax() {
    setValue("amount", displayBalance, {
      shouldDirty: true,
    });
  }

  return (
    <button
      type="button"
      onClick={setMax}
      className="cursor-pointer text-sm text-blue hover:text-orange flex gap-1 items-baseline"
    >
      <span>{humanize(displayBalance, 3, true)}</span>
      <span>{symbols[denom]}</span>
    </button>
  );
}
