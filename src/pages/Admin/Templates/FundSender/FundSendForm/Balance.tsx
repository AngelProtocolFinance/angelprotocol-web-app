import { useFormContext } from "react-hook-form";
import toCurrency from "helpers/toCurrency";
import { currency_text } from "constants/currency";
import { denoms } from "constants/denoms";
import { FundSendValues } from "../fundSendSchema";

export default function Balance() {
  const { watch, setValue } = useFormContext<FundSendValues>();
  const currency = watch("currency");
  const haloBalance = watch("haloBalance");
  const ustBalance = watch("ustBalance");

  const displayBalance = currency === denoms.uusd ? ustBalance : haloBalance;

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
      <span>{toCurrency(displayBalance, 3, true)}</span>
      <span>{currency_text[currency]}</span>
    </button>
  );
}
