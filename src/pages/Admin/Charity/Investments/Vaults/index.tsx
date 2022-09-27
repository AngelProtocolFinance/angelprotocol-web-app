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
    <Dialog.Panel className="w-[90%] md:w-full max-w-lg flex flex-col fixed-center z-20 bg-zinc-50 p-3 rounded-md min-h-[15rem] min-w-[15rem]">
      <QueryLoader
        messages={{
          error: "Failed to get vault list",
          loading: "Loading vault list..",
          empty: "No investments options found",
        }}
        classes={{
          container: "place-self-center",
        }}
        queryState={queryState}
      >
        {(vaults) => (
          <div className="grid sm:flex flex-wrap gap-3 mb-4">
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
        className="mt-auto uppercase font-heading text-sm font-bold px-4 py-2 bg-angel-blue disabled:bg-grey-accent self-center rounded-md text-white-grey"
      >
        add vaults
      </button>
    </Dialog.Panel>
  );
}
