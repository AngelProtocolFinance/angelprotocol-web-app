import { CURRENCIES, denoms } from "constants/currency";
import getTokenBalance from "helpers/getTokenBalance";
import toCurrency from "helpers/toCurrency";
import { useFormContext } from "react-hook-form";
import { useGetter } from "store/accessors";
import { SwapValues } from "./types";

export default function Balance() {
  const { watch, setValue } = useFormContext<SwapValues>();
  const { displayCoin, coins } = useGetter((state) => state.wallet);
  const haloBalance = getTokenBalance(coins, denoms.uhalo);
  const is_buy = watch("is_buy");
  const balance = is_buy
    ? displayCoin
    : { amount: haloBalance, denom: denoms.uhalo };

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
