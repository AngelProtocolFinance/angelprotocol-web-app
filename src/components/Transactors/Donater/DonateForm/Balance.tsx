import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { DonateValues } from "../types";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import getTokenBalance from "helpers/getTokenBalance";
import toCurrency from "helpers/toCurrency";

export default function Balance() {
  const { watch, setValue } = useFormContext<DonateValues>();
  const { coins } = useGetWallet();
  const token = watch("token");
  const tokenBalance = useMemo(
    () => getTokenBalance(coins, token.min_denom),
    [token, coins]
  );

  function setMaxVal() {
    setValue("amount", `${tokenBalance}`, {
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
      BAL: {toCurrency(tokenBalance, 3)} {token.symbol}
    </button>
  );
}
