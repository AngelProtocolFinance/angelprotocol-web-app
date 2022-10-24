import { Dialog } from "@headlessui/react";
import Logo from "App/Header/Logo";
import Icon from "components/Icon";
import { adminMobileNavId } from "../constants";
import Links from "./Links";

export default function Menu({ onClose }: { onClose: () => void }) {
  return (
    <Dialog.Panel
      as="div"
      className="fixed top-0 left-0 right-0 w-full z-10 bg-blue dark:bg-blue-d4 flex flex-col shadow-lg"
    >
      <div className="flex justify-between mb-4 items-center w-full padded-container pt-3">
        <Logo />
        <button
          onClick={onClose}
          className="flex p-2 items-center text-white justify-center"
        >
          <Icon type="Close" className="text-2xl" />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <Links />
        <div id={adminMobileNavId} />
      </div>
    </Dialog.Panel>
  );
}
