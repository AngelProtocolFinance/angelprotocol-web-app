import { useModalContext } from "contexts/ModalContext";
import { DisconnectedWallet } from "contexts/Wallet";
import Icon from "components/Icon";
import { COMMON_BUTTON_STYLE } from "../constants";
import WalletModal from "./WalletModal";

export default function WalletSelectorOpener({
  wallets,
}: {
  wallets: DisconnectedWallet[];
}) {
  const { showModal } = useModalContext();

  const handleClick = () => showModal(WalletModal, { wallets });

  return (
    <button
      className={`${COMMON_BUTTON_STYLE} gap-1 text-sm`}
      onClick={handleClick}
    >
      <Icon type="Wallet" size={20} />
      <span className="uppercase">Connect</span>
    </button>
  );
}
