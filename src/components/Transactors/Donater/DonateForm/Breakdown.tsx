<<<<<<< HEAD
=======
import { DonateValues } from "components/Transactors/Donater/types";
import { CURRENCIES, denoms } from "constants/currency";
import toCurrency from "helpers/toCurrency";
>>>>>>> master
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
    <div className="m-1">
      <Entry title="tx fee" amount={fee} symbol={feeSymbol} />
      <Entry title="total amount" amount={total} symbol={token.symbol} />
    </div>
  );
}

<<<<<<< HEAD
function Entry(props: { title: string; amount: number; symbol: string }) {
=======
function Entry(props: { title: string; amount: number; currency: denoms }) {
>>>>>>> master
  return (
    <div className="flex justify-between items-center text-xs font-heading text-blue-accent mb-.5">
      <p className="uppercase">{props.title}</p>
      <p className="text-sm">
<<<<<<< HEAD
        {toCurrency(props.amount, 6)} {props.symbol}
=======
        {toCurrency(props.amount, decimals[props.currency])}{" "}
        {CURRENCIES[props.currency].ticker}
>>>>>>> master
      </p>
    </div>
  );
}
<<<<<<< HEAD
=======

const decimals: Partial<{ [index in denoms]: number }> = {
  [denoms.ether]: 6,
  [denoms.uluna]: 6,
  [denoms.bnb]: 6,
};
>>>>>>> master
