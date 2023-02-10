import { useFormContext } from "react-hook-form";
import { Allocation, FormValues } from "../types";
import { AccountType } from "types/contracts";
import { useVaultListQuery } from "services/juno/registrar";
import QueryLoader from "components/QueryLoader";
import Vault from "./Vault";

type Props = { type: AccountType; selected: Allocation[] };

export default function Vaults({ type, selected }: Props) {
  const { setValue, getValues } = useFormContext<FormValues>();

  const queryState = useVaultListQuery({
    acct_type: type,
    approved: true,
    endowment_type: "Charity",
  });

  function onSelect(addr: string) {
    const prev = getValues("allocations");
    setValue("allocations", [...prev, { vault: addr, percentage: 0 }]);
  }

  return (
    <QueryLoader
      messages={{
        error: "Failed to get vault list",
        loading: "Loading vault list..",
        empty: "No investments options found",
      }}
      classes={{
        container: "",
      }}
      queryState={queryState}
    >
      {(vaults) => (
        <div className="grid content-start gap-3">
          {vaults.map((v) => (
            <Vault
              key={v.address}
              address={v.address}
              isSelected={selected.some(({ vault }) => vault === v.address)}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </QueryLoader>
  );
}
