import { FieldArrayWithId, UseFieldArrayAppend } from "react-hook-form";
import { StrategyFormValues } from "./types";
import { AccountType } from "types/contracts";
import { useVaultListQuery } from "services/juno/registrar";
import Icon from "components/Icon";
import { QueryLoader } from "components/admin";
import { maskAddress } from "helpers";

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
        {(vaults) => (
          <>
            {vaults.map(({ address }) => {
              const isSelected = selected.some((s) => s.vault === address);
              return (
                <div
                  key={address}
                  className="flex gap-2 p-2 items-center relative text-zinc-50/80 font-heading"
                >
                  <Icon type="Safe" size={36} />
                  <span className="font-mono">{maskAddress(address)}</span>
                  <button
                    disabled={isSelected}
                    type="button"
                    className="disabled:text-emerald-400"
                    onClick={() => {
                      select(
                        { percentage: 0, vault: address },
                        { shouldFocus: true }
                      );
                    }}
                  >
                    {/**   TODO: better way to determine if vault is selected */}
                    <Icon type={isSelected ? "CheckCircle" : "Plus"} />
                  </button>
                </div>
              );
            })}
          </>
        )}
      </QueryLoader>
    </div>
  );
}
