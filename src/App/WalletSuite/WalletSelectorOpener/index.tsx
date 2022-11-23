import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import { COMMON_BUTTON_STYLE } from "../constants";
import WalletModal from "./WalletModal";

type Props = { isLoading: boolean };

export default function WalletSelectorOpener(props: Props) {
  const { showModal } = useModalContext();

  const handleClick = () => showModal(WalletModal, {});

  return (
    <button
      className={`${COMMON_BUTTON_STYLE} text-base`}
      disabled={props.isLoading}
      onClick={handleClick}
    >
      <Icon type="Wallet" size={20} />
      <span className="uppercase">
        {props.isLoading ? "Loading" : "Connect"}
      </span>
    </button>
  );
}
