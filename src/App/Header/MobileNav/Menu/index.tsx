import { Dialog } from "@headlessui/react";
import Icon from "components/Icon";
import Logo from "../../Logo";
import { adminMobileNavId } from "../constants";
import Links from "./Links";

export default function Menu({ onClose }: { onClose: () => void }) {
  return (
    <Dialog.Panel
      as="div"
      className="fixed top-0 inset-x-0 z-10 bg-blue dark:bg-blue-d4 flex flex-col gap-4 shadow-lg pb-8"
    >
      <div className="flex justify-between items-center w-full h-24 padded-container border-b border-gray-l2">
        <Logo />
        <button
          onClick={onClose}
          className="flex items-center text-white justify-center"
        >
          <Icon type="Close" size={24} />
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 padded-container">
        <Links />
        <div
          className="empty:hidden w-full border-t pt-4 sm:pt-0 sm:border-l sm:border-t-0 sm:pl-4 border-white/20"
          id={adminMobileNavId}
        />
      </div>
    </Dialog.Panel>
  );
}
