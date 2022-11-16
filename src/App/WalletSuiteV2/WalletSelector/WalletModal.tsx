import { Dialog } from "@headlessui/react";
import { useModalContext } from "contexts/ModalContext";
import { useSetWallet } from "contexts/WalletContext";
import Icon from "components/Icon";
import Connector from "./Connector";

export default function WalletModal() {
  const { closeModal } = useModalContext();
  const { connections } = useSetWallet();

  return (
    <Dialog.Panel className="fixed-center z-20 flex flex-col items-center max-w-lg max-h-[572px] border border-gray-l2 rounded bg-gray-l5 text-gray-d2">
      <Dialog.Title
        as="h3"
        className="relative w-full py-6 bg-orange-l6 border-b border-gray-l2 font-heading font-bold text-center text-xl"
      >
        Connect Wallet
        <button
          className="absolute right-4 top-4 flex items-center justify-center w-10 h-10 mr-4 border border-gray-l2 rounded"
          onClick={closeModal}
        >
          <Icon type="Close" size={24} />
        </button>
      </Dialog.Title>
      <div className="flex flex-col justify-center items-center gap-6 p-8 w-full overflow-y-auto">
        <h4 className="font-heading font-bold font-lg">
          Select one of the available wallets to continue
        </h4>
        <div className="grid grid-cols-2 gap-4 w-full">
          {connections.map((conn) => (
            <Connector {...conn} />
          ))}
        </div>
      </div>
    </Dialog.Panel>
  );
}
