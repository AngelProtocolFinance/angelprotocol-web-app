import { useFormContext } from "react-hook-form";
import { DonateValues } from "../types";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useGetter } from "store/accessors";
import toCurrency from "helpers/toCurrency";

export default function Breakdown() {
  const { wallet } = useGetWallet();
  const { fee } = useGetter((state) => state.transaction);
  const { watch } = useFormContext<DonateValues>();
  const amount = Number(watch("amount")) || 0;
  const token = watch("token");
  const isAltToken = wallet!.isNativeCoin(token);
  const totalAmount = isAltToken ? amount : fee + amount;

  return (
    <div className="m-1">
      <Entry
        title="tx fee"
        amount={fee}
        symbol={wallet!.chain.native_currency.symbol}
      />
      <Entry title="total amount" amount={totalAmount} symbol={token.symbol} />
    </div>
  );
}

function Entry(props: { title: string; amount: number; symbol: string }) {
  return (
    <div className="flex justify-between items-center text-xs font-heading text-blue-accent mb-.5">
      <p className="uppercase">{props.title}</p>
      <p className="text-sm">
        {toCurrency(props.amount, 6)} {props.symbol}
      </p>
    </div>
  );
}
