import { useFormContext } from "react-hook-form";
import { SwapValues } from "./types";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useGetter } from "store/accessors";
import toCurrency from "helpers/toCurrency";
import { symbols } from "constants/currency";

function Misc(props: { title: string; value: string; class?: string }) {
  const classes = `text-xs font-light ${props.class}`;
  return (
    <div className="flex justify-between font-heading items-center text-xs text-angel-grey/80 m-1">
      <p className="text-xs font-semibold uppercase">{props.title}</p>
      <p className={classes}>{props.value}</p>
    </div>
  );
}

export function Fee() {
  const { fee } = useGetter((state) => state.transaction);
  const { wallet } = useGetWallet();
  return (
    <Misc
      title="tx fee"
      value={`${fee} ${wallet?.chain.native_currency.symbol}`}
    />
  );
}

export function Commission() {
  const { watch } = useFormContext<SwapValues>();
  const pct_commission = watch("pct_commission");
  return <Misc title="commission" value={`${pct_commission || 0.0} %`} />;
}

export function SwapRate() {
  const { watch } = useFormContext<SwapValues>();
  const { wallet } = useGetWallet();
  const ratio = watch("ratio");
  const is_buy = watch("is_buy");

  const formattedRatio = toCurrency(ratio, 6, true);
  const nativeSymbol = wallet?.chain.native_currency.symbol;
  const haloSymbol = symbols.halo;
  return (
    <Misc
      title="Rate"
      value={
        is_buy
          ? `${formattedRatio} ${nativeSymbol} = 1 ${haloSymbol}`
          : `${formattedRatio} ${haloSymbol} = 1 ${nativeSymbol}`
      }
      class="font-semibold"
    />
  );
}
