import { Coin } from "@terra-money/terra.js";
import toCurrency from "helpers/toCurrency";
import { Denoms } from "types/currencies";

type Props = {
  coinData: Coin.Data[];
};

const userDenoms: { [index: string]: string } = {
  [Denoms.ULUNA]: "Luna",
  [Denoms.UUSD]: "UST",
  [Denoms.UKRW]: "KRT",
};

export default function Holdings(props: Props) {
  return (
    <ul className="p-4">
      {props.coinData.map(({ denom, amount }) => {
        return (
          <li
            key={denom}
            className="p-1 grid grid-cols-a1 border-b border-angel-grey border-opacity-10"
          >
            <span className="uppercase text-sm font-bold mr-2 text-angel-grey">
              {userDenoms[denom] || "other"}
            </span>
            <span className="ml-auto text-angel-grey">
              {toCurrency(Number(amount))}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
