import { Dialog } from "@headlessui/react";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";

export default function WalletModal() {
  const { closeModal } = useModalContext();

  return (
    <Dialog.Panel className="fixed-center z-20 flex flex-col items-center bg-gray-l5 border border-gray-l2 rounded text-gray-d2">
      <Dialog.Title
        as="h3"
        className="grid grid-rows-1 grid-cols-3 items-center justify-items-end w-full px-4 py-6 bg-orange-l6 border-b border-gray-l2"
      >
        <span className="col-start-2 w-full font-heading font-bold text-xl justify-self-center">
          Connect Wallet
        </span>
        <button
          className="flex items-center justify-center w-10 h-10 mr-4 border border-gray-l2 rounded"
          onClick={closeModal}
        >
          <Icon type="Close" size={24} />
        </button>
      </Dialog.Title>
      <div className="flex flex-col justify-center items-center p-8 gap-6">
        <h4 className="font-heading font-bold font-lg">
          Select one of the available wallets to continue
        </h4>
      </div>
    </Dialog.Panel>
  );
}
