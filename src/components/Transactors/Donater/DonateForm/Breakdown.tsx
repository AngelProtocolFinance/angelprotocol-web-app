import { useFormContext } from "react-hook-form";
import { DonateValues } from "components/Transactors/Donater/types";
import { useGetter } from "store/accessors";
import toCurrency from "helpers/toCurrency";
import { currency_text, denoms } from "constants/currency";

export default function Breakdown() {
  const { fee } = useGetter((state) => state.transaction);
  const { watch } = useFormContext<DonateValues>();
  const amount = Number(watch("amount")) || 0;
  const token = watch("token");
  const isTokenNative = !token.cw20_contracts;
  const total = isTokenNative ? amount + fee : amount;
  const feeCurrency = isTokenNative ? token.symbol : "UST"; //for CW20 tx, fee is in UST

  return (
    <div className="">
      <Entry title="tx fee" amount={fee} currency={feeCurrency} />
      <Entry title="total amount" amount={total} currency={token.symbol} />
    </div>
  );
}

function Entry(props: { title: string; amount: number; currency: string }) {
  return (
    <div className="flex justify-between items-center text-xs font-heading text-blue-accent mb-.5">
      <p className="uppercase">{props.title}</p>
      <p className="text-sm">
        {toCurrency(props.amount, decimals[props.currency])}{" "}
        {currency_text[props.currency as denoms]}
      </p>
    </div>
  );
}

const decimals: { [index: string]: number } = {
  [denoms.uusd]: 2,
  [denoms.btc]: 6,
  [denoms.ether]: 6,
  [denoms.sol]: 6,
  [denoms.uluna]: 6,
  [denoms.bnb]: 6,
};
