import { VaultsProps } from "./types";
import { useModalContext } from "contexts/ModalContext";
import VaultSelection from ".";

export default function useVaultSelection(props: VaultsProps) {
  const { showModal } = useModalContext();
  const showVaults = () => {
    showModal(VaultSelection, props);
  };
  return showVaults;
}
