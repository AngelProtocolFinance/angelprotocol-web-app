import { useFormContext } from "react-hook-form";
import { SwapValues } from "./types";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import getTokenBalance from "helpers/getTokenBalance";
import toCurrency from "helpers/toCurrency";
import { denoms } from "constants/currency";

export default function Balance() {
  const { watch, setValue } = useFormContext<SwapValues>();
  const is_buy = watch("is_buy");
  const { wallet } = useGetWallet();
  const coins = wallet?.coins || [];
  const haloBalance = getTokenBalance(coins, denoms.halo);
  const balance = is_buy ? wallet?.chain.native_currency.balance : haloBalance;

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
        {toCurrency(balance, 3, true)}{" "}
        {is_buy ? wallet?.chain.native_currency.symbol : "HALO"}
      </button>
    </p>
  );
}
