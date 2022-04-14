import { Dec } from "@terra-money/terra.js";
import { useMemo } from "react";
import { useApprovedVaultsRateState } from "services/terra/registrar/states";
import Icon from "components/Icons/Icons";
import toCurrency from "helpers/toCurrency";
import { HoldingSummary } from "./types";

export default function Summary(props: HoldingSummary) {
  const { vaultsRate, isVaultsRateError } = useApprovedVaultsRateState();
  const total_holding = useMemo(() => {
    const total_dec = props.holdings.reduce((total, holding) => {
      const vaultInfo = vaultsRate.find(
        (vault) => vault.vault_addr === holding.address
      );
      return total.add(new Dec(holding.amount).mul(vaultInfo?.fx_rate || "0"));
    }, new Dec(0));
    return total_dec.div(1e6).toNumber();
  }, [vaultsRate, props.holdings]);

  const title =
    props.type === "liquid" ? "Liquid Account" : "Endowment Account";

  return (
    <div className="flex flex-col bg-white/10 p-4 rounded-md shadow-md border border-white/10 text-white/80">
      <h3 className="text-lg font-bold uppercase flex items-center justify-end">
        <span>{title}</span>
        <Icon
          type="Cog"
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
          disabled={!props.isOwner || isVaultsRateError}
          onClick={props.opener}
          className="mt-2 mb-4 bg-blue-accent disabled:bg-grey-accent hover:bg-angel-blue/60 px-2 py-1 rounded-md uppercase text-xs  border-2 border-white/20 font-heading self-end"
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
