import { Dialog } from "@headlessui/react";
import { VaultsProps } from "./types";
import { useVaultListQuery } from "services/juno/registrar";
import { QueryLoader } from "components/admin";
import Vault from "./Vault";

export default function Vaults({ type, selected, onSelect }: VaultsProps) {
  const queryState = useVaultListQuery({
    acct_type: type,
    approved: true,
    endowment_type: "Charity",
  });

  return (
    <Dialog.Panel className="grid fixed-center z-20 bg-zinc-50 p-3 rounded-md min-h-[15rem] min-w-[15rem]">
      <QueryLoader
        messages={{
          error: "Failed to get vault list",
          loading: "Loading vault list..",
        }}
        classes={{
          container: "place-self-center",
          loadingText: "text-zinc-600",
        }}
        queryState={queryState}
      >
        {(vaults) =>
          (vaults.length > 0 && (
            <>
              {vaults.map((v) => (
                <Vault
                  address={v.address}
                  isSelected={selected.some((addr) => addr === v.address)}
                  onSelect={onSelect}
                />
              ))}
            </>
          )) || <p className="text-zinc-50/80">No investment options found.</p>
        }
      </QueryLoader>
    </Dialog.Panel>
  );
}
