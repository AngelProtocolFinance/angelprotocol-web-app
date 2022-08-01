import { useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useGetter } from "store/accessors";
import toCurrency from "helpers/toCurrency";

function Misc(props: { title: string; value: string }) {
  return (
    <div className="flex justify-between font-heading items-center text-xs text-angel-grey/80 m-1">
      <p className="text-xs font-semibold uppercase">{props.title}</p>
      <p className="font-bold">{props.value}</p>
    </div>
  );
}

export function Fee() {
  const { fee } = useGetter((state) => state.transaction);
  const { wallet } = useGetWallet();
  return (
    <Misc
      title="tx fee"
      value={`${toCurrency(fee, 3)} ${wallet?.chain.native_currency.symbol}`}
    />
  );
}

export function Total() {
  const { watch } = useFormContext<WithdrawValues>();
  const { wallet } = useGetWallet();
  const total_ust = watch("total_ust");
  return (
    <Misc
      title="total"
      value={`${toCurrency(total_ust, 3)} ${
        wallet?.chain.native_currency.symbol
      }`}
    />
  );
}

export function ToReceive() {
  const { watch } = useFormContext<WithdrawValues>();
  const { wallet } = useGetWallet();
  const total_receive = watch("total_receive");
  return (
    <Misc
      title="to receive"
      value={`${toCurrency(total_receive, 3)} ${
        wallet?.chain.native_currency.symbol
      }`}
    />
  );
}
