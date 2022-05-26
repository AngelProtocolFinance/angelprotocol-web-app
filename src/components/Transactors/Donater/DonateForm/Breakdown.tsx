import { useFormContext } from "react-hook-form";
import { useGetter } from "store/accessors";
import toCurrency from "helpers/toCurrency";
import { DonateValues } from "../types";

export default function Breakdown() {
  const { fee } = useGetter((state) => state.transaction);
  const { watch } = useFormContext<DonateValues>();
  const amount = Number(watch("amount")) || 0;
  const token = watch("token");

  return (
    <div className="m-1">
      <Entry title="tx fee" amount={fee} symbol={token.symbol} />
      <Entry title="total amount" amount={fee + amount} symbol={token.symbol} />
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
