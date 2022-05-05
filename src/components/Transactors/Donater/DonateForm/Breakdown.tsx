import { useFormContext } from "react-hook-form";
import { DonateValues } from "components/Transactors/Donater/types";
import { useGetter } from "store/accessors";
import toCurrency from "helpers/toCurrency";

export default function Breakdown() {
  const { fee } = useGetter((state) => state.transaction);
  const { watch } = useFormContext<DonateValues>();
  const amount = Number(watch("amount")) || 0;
  const token = watch("token");
  const isTokenNative = !token.cw20_contract;
  const total = isTokenNative ? amount + fee : amount;
  const feeSymbol = isTokenNative ? token.symbol : "UST"; //for CW20 tx, fee is in UST

  return (
    <div className="">
      <Entry title="tx fee" amount={fee} symbol={feeSymbol} />
      <Entry title="total amount" amount={total} symbol={token.symbol} />
    </div>
  );
}

function Entry(props: { title: string; amount: number; symbol: string }) {
  return (
    <div className="flex justify-between items-center text-xs font-heading text-blue-accent mb-.5">
      <p className="uppercase">{props.title}</p>
      <p className="text-sm">
        {toCurrency(props.amount, 6)}
        {props.symbol}
      </p>
    </div>
  );
}
