import { useModalContext } from "contexts/ModalContext";
import VaultSelection from ".";

export default function useVaultSelection() {
  const { showModal } = useModalContext();
  const showVaults = showModal(VaultSelection, {});
  return showVaults;
}
