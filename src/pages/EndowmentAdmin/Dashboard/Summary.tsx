import Icon from "components/Icon";
import toCurrency from "helpers/toCurrency";
import { HoldingSummary } from "../types";

export default function Summary(props: HoldingSummary) {
  const title =
    props.type === "liquid" ? "Liquid Account" : "Endowment Account";

  return (
    <div className="grid grid-rows-a1a rounded-md text-white/80 shadow-inner bg-white/10 p-4">
      <h3 className="text-lg w-full font-bold uppercase flex items-center justify-self-start">
        <Icon type="Cog" size={16} className="mr-1 text-grey-accent" />
        <span>{title}</span>
        {props.opener !== undefined && (
          <button
            disabled={!props.isOwner}
            onClick={props.opener}
            className="ml-auto bg-angel-blue hover:bg-bright-blue disabled:bg-grey-accen px-2 py-1 rounded-md uppercase text-sm font-heading"
          >
            withdraw
          </button>
        )}
      </h3>
      <p className="font-bold text-3xl md:text-4xl font-heading mt-4 mb-2 pb-4 border-b border-white/10 text-center">
        $ {toCurrency(props.balance)}
      </p>

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
