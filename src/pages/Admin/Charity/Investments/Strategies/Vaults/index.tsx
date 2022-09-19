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
    <Dialog.Panel className="flex gap-4 col-span-2 mb-6 fixed-center z-20 bg-zinc-50 p-3 rounded-md">
      <QueryLoader
        messages={{
          error: "Fetching vault options",
          loading: "Getting strategy options...",
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
