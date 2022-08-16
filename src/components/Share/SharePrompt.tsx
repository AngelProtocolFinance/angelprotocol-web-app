import { Dialog } from "@headlessui/react";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import Share from "./Share";

export default function SharePrompt() {
  const { closeModal } = useModalContext();

  return (
    <Dialog.Panel className="bg-white-grey rounded-md pt-4 w-full max-w-md fixed-center z-20">
      <button
        onClick={closeModal}
        className="absolute right-2 top-2 text-angel-grey hover:text-black"
      >
        <Icon type="Close" size={25} />
      </button>
      <Share />
    </Dialog.Panel>
  );
}
