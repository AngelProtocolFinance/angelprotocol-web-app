import { useParams } from "react-router-dom";
import { AdminParams } from "../types";
import { AccountType, YieldVault } from "types/contracts";
import { useVaultListQuery } from "services/juno/registrar";
import Icon from "components/Icon";
import { QueryLoader } from "components/admin";
import { maskAddress } from "helpers";

export default function Investments() {
  const { type } = useParams<AdminParams>();
  const accounType = getAccounType(type);

  const queryState = useVaultListQuery({
    acct_type: accounType,
    approved: true,
    endowment_type: "Charity",
  });

  return (
    <div className="grid content-start">
      <h3 className="mt-6 uppercase text-2xl font-extrabold text-zinc-50/80">
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
              <Vault {...v} key={v.address} />
            ))}
          </div>
        )}
      </QueryLoader>
    </div>
  );
}

function Vault({ address }: YieldVault) {
  return (
    <div
      key={address}
      className="text-zinc-700 bg-zinc-50 rounded-md p-3 aspect-square "
    >
      <div className="flex items-center gap-2">
        <Icon type="Safe" size={25} />
        <span className="font-mono text-sm">{maskAddress(address)}</span>
      </div>
    </div>
  );
}

function getAccounType(typeParam?: string): AccountType {
  const locked: AccountType = "locked";
  const liquid: AccountType = "liquid";
  return typeParam === locked ? locked : liquid;
}
