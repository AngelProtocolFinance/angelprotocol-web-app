import { currency_text, denoms } from "constants/currency";
import toCurrency from "helpers/toCurrency";
import { useFormContext } from "react-hook-form";
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
      shouldValidate: true,
    });
  }

  return (
    <button
      onClick={setMax}
      className="cursor-pointer font-heading text-sm text-angel-blue hover:text-angel-orange flex gap-1 items-baseline"
    >
      <span className="uppercase text-xs">balance:</span>
      <span>{toCurrency(displayBalance, 3, true)}</span>
      <span>{currency_text[currency]}</span>
    </button>
  );
}
