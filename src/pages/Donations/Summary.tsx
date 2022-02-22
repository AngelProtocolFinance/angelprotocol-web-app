import { FaCog } from "react-icons/fa";
import toCurrency from "helpers/toCurrency";
import { Dec } from "@terra-money/terra.js";
import { useExchangeRateState } from "services/terra/vaults/states";
import { useMemo } from "react";
import { HoldingSummary } from "./types";

export default function Summary(props: HoldingSummary) {
  const { rates } = useExchangeRateState();
  const total_holding = useMemo(() => {
    const total_dec = props.holdings.reduce(
      (total, holding) =>
        //NOTE: having fallback "0" is for instances where account page is a testnet endowment, then suddenly user disconnected
        //making the chainID to be `mainnet` vice versa, thus having mismatch in holdings and exchange rates
        //the querier won't know the difference since same endowment address applies regardless of chainID
        total.add(new Dec(holding.amount).mul(rates[holding.address] || "0")),
      new Dec(0)
    );
    return total_dec.div(1e6).toNumber();
  }, [rates, props.holdings]);

  const title =
    props.type === "liquid" ? "Liquid Account" : "Principal Account";

  return (
    <div className="flex flex-col bg-white bg-opacity-10 p-4 rounded-md shadow-md border border-opacity-10 text-white text-opacity-80">
      <h3 className="text-lg font-bold uppercase flex items-center justify-end">
        <span>{title}</span>
        <FaCog
          size={16}
          className="ml-1 text-grey-accent"
          title="Coming Soon!"
        />
      </h3>
      <p className="text-3xl md:text-4xl font-heading mt-8 text-right">
        $ {toCurrency(total_holding)}
      </p>
      {props.opener !== undefined && (
        <button
          disabled={!props.isOwner}
          onClick={props.opener}
          className="mt-2 mb-4 bg-blue-accent disabled:bg-grey-accent hover:bg-angel-blue bg-opacity-60 px-2 py-1 rounded-md uppercase text-xs  border-2 border-opacity-20 font-heading self-end"
        >
          withdraw
        </button>
      )}

      {/**TODO: render this distribution based of props.holdings */}
      <table className="mt-auto w-full">
        <thead>
          <tr className="text-md text-left font-heading uppercase text-xs">
            <th className="pr-8">Strategy</th>
            <th className="text-right">Allocation</th>
          </tr>
        </thead>
        <tbody>
          <tr className="">
            <td className="pr-8">Anchor Protocol</td>
            <td className="font-heading text-right">100%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
