import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import WalletInfoModal from "./WalletInfoModal";

// Purpose of this component is to avoid rendering the InfoIcon in a non-intuitive way on smaller screens
// (the user would expect the info icon to remain at the end of the string even on smaller screens, but
// React renders it all the way to the right, making it appear unrelated to the title, reducing UX)
export default function Title() {
  return (
    <h2 className="flex text-lg xl:text-xl font-semibold gap-2 items-center">
      Please connect Keplr to register a new wallet for your endowment
      <InfoIcon />
    </h2>
  );
}

function InfoIcon() {
  const { showModal } = useModalContext();
  return (
    <Icon
      type="ExclamationCircle"
      className="text-blue cursor-pointer text-5xl md:text-2xl"
      onClick={() => showModal(WalletInfoModal, {})}
    />
  );
}
