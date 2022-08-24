import { useFormContext } from "react-hook-form";
import { DonateValues } from "../types";
import { useChain } from "contexts/ChainGuard";
import { useGetter } from "store/accessors";
import { humanize } from "helpers";

export default function Breakdown() {
  const chain = useChain();
  const { fee } = useGetter((state) => state.transaction);
  const { watch } = useFormContext<DonateValues>();
  const amount = Number(watch("amount")) || 0;
  const token = watch("token");
  const isNativeCoin = chain.native_currency.token_id === token.token_id;
  const totalAmount = isNativeCoin ? fee + amount : amount;

  return (
    <div className="m-1">
      <Entry
        title="tx fee"
        amount={fee}
        symbol={chain.native_currency.symbol}
      />
      <Entry title="total amount" amount={totalAmount} symbol={token.symbol} />
    </div>
  );
}

function Entry(props: {
  title: string;
  amount: number;
  symbol: string | undefined;
}) {
  return (
    <div className="flex justify-between items-center text-xs font-heading text-blue-accent mb-.5">
      <p className="uppercase">{props.title}</p>
      <p className="text-sm">
        {humanize(props.amount, 6)} {props.symbol}
      </p>
    </div>
  );
}
