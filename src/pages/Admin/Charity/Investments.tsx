import { useParams } from "react-router-dom";
import { AdminParams } from "../types";
import { YieldVault } from "types/contracts";
import { useVaultListQuery } from "services/juno/registrar";
import Icon from "components/Icon";
import { QueryLoader } from "components/admin";
import { maskAddress } from "helpers";
import { useAdminResources } from "../Guard";
import { getAccounType } from "./helpers";

export default function Investments() {
  const { endowment } = useAdminResources();
  const { type } = useParams<AdminParams>();
  const accounType = getAccounType(type);

  const strats = endowment.strategies[accounType];

  const queryState = useVaultListQuery({
    acct_type: accounType,
    approved: true,
    endowment_type: "Charity",
  });

  return (
    <div className="grid content-start">
      <h3 className="mt-6 mb-4 uppercase text-2xl font-extrabold text-zinc-50/80">
        {accounType} investments
      </h3>
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Loading invesment options",
          error: "Failed to get investment options",
        }}
      >
        {(vaults) => (
          <div className="flex gap-2 mt-4">
            {vaults.map((v) => (
              <Vault
                {...v}
                //TODO: set this to true also if in endowments.one_off
                isAdded={strats.some((s) => v.address === s.vault)}
                key={v.address}
              />
            ))}
          </div>
        )}
      </QueryLoader>
    </div>
  );
}

function Vault({ address, isAdded }: YieldVault & { isAdded: boolean }) {
  return (
    <div
      key={address}
      className="text-zinc-700 bg-zinc-50 rounded-md p-3 aspect-square flex flex-col"
    >
      <div className="flex items-center gap-2">
        <Icon type="Safe" size={25} />
        <span className="font-mono text-sm">{maskAddress(address)}</span>
      </div>
      <button className="mt-auto text-xs rounded-sm font-heading py-2 uppercase font-bold bg-sky-400 text-zinc-50">
        add to strategies
      </button>
      <button
        onClick={() => {
          alert("show invest form (one-off investments)");
        }}
        className="mt-2 text-xs rounded-sm font-heading py-2 uppercase font-bold bg-emerald-400 text-zinc-50"
      >
        invest
      </button>
    </div>
  );
}
