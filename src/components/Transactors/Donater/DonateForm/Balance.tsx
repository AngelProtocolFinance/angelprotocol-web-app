import { useFormContext } from "react-hook-form";
import toCurrency from "helpers/toCurrency";
import { DonateValues } from "../types";

export default function Balance() {
  const { watch, setValue } = useFormContext<DonateValues>();
  const token = watch("token");
  function setMaxVal() {
    setValue("amount", toCurrency(+token.balance, 4), {
      shouldDirty: true,
      shouldValidate: true,
    });
  }
  return (
    <button
      type="button"
      onClick={setMaxVal}
      className="text-right text-angel-grey/80 hover:text-angel-blue text-xs font-semibold font-mono"
    >
      BAL: {toCurrency(+token.balance, 3)} {token.symbol}
    </button>
  );
}
