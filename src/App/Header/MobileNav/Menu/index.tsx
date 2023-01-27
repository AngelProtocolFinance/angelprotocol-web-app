import { Dialog } from "@headlessui/react";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import Logo from "../../Logo";
import Links from "./Links";

export default function Menu() {
  const { closeModal } = useModalContext();
  return (
    <Dialog.Panel
      as="div"
      className="fixed top-0 inset-x-0 z-10 bg-blue dark:bg-blue-d5 flex flex-col gap-4 shadow-lg pb-8"
    >
      <div className="flex justify-between items-center w-full py-4 padded-container border-b border-gray-l2">
        <Logo />
        <button
          onClick={closeModal}
          className="flex items-center text-white justify-center"
        >
          <Icon type="Close" size={32} />
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 padded-container">
        <Links />
      </div>
    </Dialog.Panel>
  );
}
