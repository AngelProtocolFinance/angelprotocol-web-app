import { DonateValues } from "components/Transactors/Donater/types";
import { currency_text, denoms } from "constants/currency";
import toCurrency from "helpers/toCurrency";
import { useFormContext } from "react-hook-form";
import { useGetter } from "store/accessors";

export default function Breakdown() {
  const { fee } = useGetter((state) => state.transaction);
  const { watch } = useFormContext<DonateValues>();
  const amount = Number(watch("amount")) || 0;
  const currency = watch("currency");

  return (
    <div className="pb-1">
      <Entry title="tx fee" amount={fee} currency={currency} />
      <Entry title="total amount" amount={amount + fee} currency={currency} />
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
};
