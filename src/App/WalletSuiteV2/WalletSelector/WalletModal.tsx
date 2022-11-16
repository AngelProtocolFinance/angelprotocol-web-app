import { Dialog } from "@headlessui/react";
import { useModalContext } from "contexts/ModalContext";
import { useSetWallet } from "contexts/WalletContext";
import Icon from "components/Icon";
import Connector from "./Connector";

export default function WalletModal() {
  const { closeModal } = useModalContext();
  const { connections } = useSetWallet();

  return (
    <Dialog.Panel className="fixed inset-0 sm:fixed-center z-20 flex flex-col sm:items-center w-full sm:max-w-lg h-full sm:max-h-[572px] sm:border border-gray-l2 sm:rounded bg-gray-l5 text-gray-d2 dark:bg-blue-d6 dark:border-bluegray dark:text-white">
      <Dialog.Title
        as="h3"
        className="relative w-full pl-4 py-6 bg-orange-l6 border-b border-gray-l2 font-heading font-black sm:font-bold sm:text-center text-xl max-sm:text-orange dark:bg-blue-d7 dark:border-bluegray"
      >
        Connect Wallet
        <button
          className="absolute right-4 top-4 flex items-center justify-center w-10 h-10 mr-4 border border-gray-l2 rounded dark:border-bluegray"
          onClick={closeModal}
        >
          <Icon type="Close" size={24} />
        </button>
      </Dialog.Title>
      <div className="flex flex-col justify-center items-center gap-4 sm:gap-6 p-6 sm:p-8 w-full overflow-y-auto">
        <h4 className="font-work sm:font-heading font-semibold sm:font-bold text-center text-base sm:text-lg">
          Select one of the available wallets to continue
        </h4>
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          {connections.map((conn) => (
            <Connector key={conn.name} {...conn} />
          ))}
        </div>
      </div>
    </Dialog.Panel>
  );
}
