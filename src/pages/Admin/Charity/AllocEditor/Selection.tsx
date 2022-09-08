import { FieldArrayWithId, UseFieldArrayAppend } from "react-hook-form";
import { StrategyFormValues } from "./types";
import { AccountType } from "types/contracts";
import { useVaultListQuery } from "services/juno/registrar";
import { QueryLoader } from "components/admin";
import Vault from "./Vault";

type Props = {
  select: UseFieldArrayAppend<StrategyFormValues, "allocations">;
  selected: FieldArrayWithId<StrategyFormValues, "allocations", "id">[];
  type: AccountType;
};

export default function Selection({ selected, select, type }: Props) {
  const queryState = useVaultListQuery({
    acct_type: type,
    approved: true,
    endowment_type: "Charity",
  });

  return (
    <div className="flex gap-4 col-span-2 mb-6">
      <QueryLoader
        messages={{
          error: "Failed to get strategy options",
          loading: "Getting strategy options...",
        }}
        queryState={queryState}
      >
        {(vaults) =>
          (vaults.length > 0 && (
            <>
              {vaults.map((v) => (
                <Vault
                  {...v}
                  isSelected={selected.some(
                    (field) => field.vault === v.address
                  )}
                  select={select}
                />
              ))}
            </>
          )) || <p className="text-zinc-50/80">No investment options found.</p>
        }
      </QueryLoader>
    </div>
  );
}
