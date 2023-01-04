import { Dialog } from "@headlessui/react";
import { useModalContext } from "contexts/ModalContext";
import { DisconnectedWallet } from "contexts/WalletContext";
import Icon from "components/Icon";
import Connector from "./Connector";

export default function WalletModal({
  wallets,
}: {
  wallets: DisconnectedWallet[];
}) {
  const { closeModal } = useModalContext();

  return (
    <Dialog.Panel className="fixed inset-0 sm:fixed-center z-20 grid sm:items-center w-full sm:max-w-lg h-full sm:h-fit sm:border border-gray-l2 sm:rounded bg-gray-l5 text-gray-d2 dark:bg-blue-d6 dark:border-bluegray dark:text-white shadow-[0_0_60px_rgba(0,0,0,0.3)]">
      <Dialog.Title
        as="h3"
        className="relative w-full pl-4 px-4 sm:px-0 py-4 sm:py-6 bg-orange-l6 border-b border-gray-l2 font-heading font-black sm:font-bold sm:text-center text-xl text-orange sm:text-inherit uppercase sm:capitalize dark:bg-blue-d7 dark:border-bluegray"
      >
        Connect Wallet
        <button
          className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 mr-4 sm:border border-gray-l2 hover:border-gray sm:rounded dark:border-bluegray dark:hover:border-bluegray-d1 text-gray-d2 hover:text-black dark:text-white dark:hover:text-gray"
          onClick={closeModal}
        >
          <Icon type="Close" className="w-8 sm:w-7 h-8 sm:h-7" />
        </button>
      </Dialog.Title>
      <div className="flex flex-col items-center gap-4 sm:gap-6 p-6 sm:p-8 dark:p-8 w-full sm:max-h-[492px] overflow-y-auto scroller">
        <p className="font-work sm:font-heading font-semibold sm:font-bold text-center text-base sm:text-lg">
          Select one of the available wallets to continue
        </p>
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          {wallets.map((wallet) => (
            <Connector key={wallet.id} {...wallet} />
          ))}
        </div>
      </div>
    </Dialog.Panel>
  );
}
