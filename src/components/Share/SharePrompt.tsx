import Icon from "components/Icons/Icons";
import { useModalContext } from "components/ModalContext/ModalContext";
import Share from "./Share";

export default function SharePrompt() {
  const { closeModal } = useModalContext();

  return (
    <div className="relative bg-white-grey rounded-md pt-4 w-full max-w-md">
      <button
        onClick={closeModal}
        className="absolute right-2 top-2 text-angel-grey hover:text-black"
      >
        <Icon type="Close" size={25} />
      </button>
      <Share />
    </div>
  );
}
