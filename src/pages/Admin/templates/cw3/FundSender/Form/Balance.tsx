import { useFormContext } from "react-hook-form";
import { FundSendValues } from "pages/Admin/types";
import { humanize } from "helpers";
import { axlUSDCDenom, symbols } from "constants/tokens";

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
      className="cursor-pointer font-heading text-sm text-angel-blue hover:text-angel-orange flex gap-1 items-baseline"
    >
      <span className="uppercase text-xs">balance:</span>
      <span>{humanize(displayBalance, 3, true)}</span>
      <span>{symbols[denom]}</span>
    </button>
  );
}
