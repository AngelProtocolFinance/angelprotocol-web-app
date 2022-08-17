import { useFormContext } from "react-hook-form";
import { DonateValues } from "../types";
import { humanize } from "helpers";

export default function Balance() {
  const { watch, setValue } = useFormContext<DonateValues>();
  const token = watch("token");
  function setMaxVal() {
    setValue("amount", humanize(+token.balance, 4), {
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
      BAL: {humanize(+token.balance, 3)} {token.symbol}
    </button>
  );
}
