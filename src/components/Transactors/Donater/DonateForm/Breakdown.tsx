import { DonateValues, SupportedDenoms } from "@types-component/donater";
import { useFormContext } from "react-hook-form";
import { useGetter } from "store/accessors";
import toCurrency from "helpers/toCurrency";
import { currency_text } from "constants/currency";
import { decimals } from "../constants";

export default function Breakdown() {
  const { fee } = useGetter((state) => state.transaction);
  const { watch } = useFormContext<DonateValues>();
  const amount = Number(watch("amount")) || 0;
  const currency = watch("currency");

  return (
    <div className="">
      <Entry title="tx fee" amount={fee} currency={currency} />
      <Entry title="total amount" amount={amount + fee} currency={currency} />
    </div>
  );
}

function Entry(props: {
  title: string;
  amount: number;
  currency: SupportedDenoms;
}) {
  return (
    <div className="flex justify-between items-center text-xs font-heading text-blue-accent mb-.5">
      <p className="uppercase">{props.title}</p>
      <p className="text-sm">
        {toCurrency(props.amount, decimals[props.currency])}{" "}
        {currency_text[props.currency]}
      </p>
    </div>
  );
}
