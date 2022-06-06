import { CURRENCIES, denoms, MAIN_DENOM } from "constants/currency";
import toCurrency from "helpers/toCurrency";
import { useFormContext } from "react-hook-form";
import { useBalances, useHaloBalance } from "services/terra/queriers";
import { SwapValues } from "./types";

export default function Balance() {
  const { watch, setValue } = useFormContext<SwapValues>();
  const { haloBalance } = useHaloBalance();
  const { main } = useBalances(MAIN_DENOM);
  const is_buy = watch("is_buy");
  const balance = is_buy ? main : { amount: haloBalance, denom: denoms.uhalo };

  function setAmount() {
    setValue("amount", `${balance}`, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  return (
    <p className="ml-auto mr-1 text-xs font-light font-heading flex items-baseline text-angel-grey">
      <span className="mr-1 text-2xs font-semibold uppercase">balance</span>
      <button
        type="button"
        onClick={setAmount}
        className="inline hover:text-angel-blue"
      >
        {toCurrency(balance.amount, 3, true)} {CURRENCIES[balance.denom].ticker}
      </button>
    </p>
  );
}
