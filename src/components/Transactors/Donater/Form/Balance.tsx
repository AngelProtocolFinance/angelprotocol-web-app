import { useFormContext } from "react-hook-form";
import { DonateValues } from "../types";
import { useBalanceQuery } from "services/apes";
import { useChainWallet } from "contexts/ChainGuard";
import { humanize, roundDown } from "helpers";

export default function Balance() {
  const { watch, setValue } = useFormContext<DonateValues>();
  const wallet = useChainWallet();
  const token = watch("token");
  const { data = 0, isLoading } = useBalanceQuery({ token, wallet });
  function setMaxVal() {
    setValue("amount", roundDown(data, 4), {
      shouldDirty: true,
      shouldValidate: true,
    });
  }
  return (
    <button
      type="button"
      disabled={isLoading}
      onClick={setMaxVal}
      className="text-right text-angel-grey/80 hover:text-angel-blue text-xs font-semibold font-mono"
    >
      BAL: {isLoading ? "..." : `${humanize(data, 3)} ${token.symbol}`}
    </button>
  );
}
