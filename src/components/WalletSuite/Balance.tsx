import { CURRENCIES, denoms } from "constants/currency";
import toCurrency from "helpers/toCurrency";

type Props = {
  denom: denoms;
  amount: number;
  precision: number;
};

export default function Balance(props: Props) {
  const denom = props.denom || denoms.coin;

  return (
    <li className="p-3 grid grid-cols-aa1 border-b border-angel-grey/10 items-center">
      <img
        src={CURRENCIES[denom].icon}
        className="w-7 h-7 mr-2 object-contain"
        alt=""
      />
      <span className="uppercase text-sm font-bold mr-2 text-angel-grey">
        {CURRENCIES[denom].ticker}
      </span>
      <span className="ml-auto text-angel-grey">
        {toCurrency(props.amount, props.precision)}
      </span>
    </li>
  );
}
