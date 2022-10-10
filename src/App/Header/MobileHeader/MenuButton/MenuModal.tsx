import { Dialog } from "@headlessui/react";
import Icon from "components/Icon";
import Logo from "../../Logo";
import NavLinks from "./NavLinks";
import { adminMobileNavId } from "./constants";

export default function MenuModal({ onClose }: { onClose: () => void }) {
  return (
    <Dialog.Panel
      as="header"
      className="fixed top-0 left-0 right-0 w-full z-10 bg-blue-accent flex flex-col"
    >
      <div className="flex justify-between mb-4 items-center w-full padded-container pt-3">
        <Logo />
        <button
          onClick={onClose}
          className="flex p-2 items-center text-white-grey justify-center"
        >
          <Icon type="Close" className="text-2xl" />
        </button>
      </div>
      <Separator />
      <div className="grid grid-cols-1 gap-3">
        <NavLinks />
        <div id={adminMobileNavId} />
      </div>
    </Dialog.Panel>
  );
}

const Separator = () => (
  <div className="h-px bg-white-grey w-full col-span-3 mb-5" />
);
