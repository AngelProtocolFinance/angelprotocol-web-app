import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { VaultsProps } from "./types";
import { useVaultListQuery } from "services/juno/registrar";
import { useModalContext } from "contexts/ModalContext";
import { QueryLoader } from "components/admin";
import Vault from "./Vault";

export default function Vaults({ type, preSelected, onSelect }: VaultsProps) {
  const { closeModal } = useModalContext();
  const [selected, setSelected] = useState<string[]>([]);

  const handleVaultSelect = (addr: string) => () => {
    setSelected([...selected, addr]);
  };

  function saveSelection() {
    selected.forEach((addr) => onSelect(addr));
    closeModal();
  }

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
          empty: "No investments options found",
        }}
        classes={{
          container: "place-self-center",
          loadingText: "text-zinc-600",
        }}
        queryState={queryState}
      >
        {(vaults) => (
          <div className="w-full flex gap-2s flex-wrap gap-2">
            {vaults.map((v) => (
              <Vault
                key={v.address}
                address={v.address}
                isPreselected={preSelected.some((addr) => addr === v.address)}
                isSelected={selected.some((addr) => addr === v.address)}
                handleVaultSelect={handleVaultSelect(v.address)}
              />
            ))}
          </div>
        )}
      </QueryLoader>
      <button
        type="button"
        onClick={saveSelection}
        disabled={selected.length <= 0}
      >
        add vaults
      </button>
    </Dialog.Panel>
  );
}
