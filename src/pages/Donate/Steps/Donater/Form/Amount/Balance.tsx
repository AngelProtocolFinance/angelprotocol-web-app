import { useFormContext } from "react-hook-form";
import { DonateValues } from "../../types";
import { humanize } from "helpers";

export default function Balance() {
  const { watch, setValue } = useFormContext<DonateValues>();
  const token = watch("token");
  function setMaxVal() {
    setValue("token.amount", humanize(+token.balance, 4), {
      shouldDirty: true,
      shouldValidate: true,
    });
  }
  return (
    <button
      type="button"
      onClick={setMaxVal}
      className="text-right hover:text-blue text-xs"
    >
      BAL: {humanize(+token.balance, 3)} {token.symbol}
    </button>
  );
}
