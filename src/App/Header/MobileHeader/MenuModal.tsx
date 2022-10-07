import { Dialog } from "@headlessui/react";
import AppLinks from "./AppLinks";
import Content from "./Content";
import { adminMobileNavId } from "./constants";

export default function MenuModal({ onClose }: { onClose: () => void }) {
  return (
    <Dialog.Panel
      as="header"
      className="fixed top-0 left-0 right-0 w-full z-10 bg-blue-accent flex flex-col"
    >
      <Content onMenuClick={onClose} menuIconType="Close" />
      <Separator />
      <div className="grid grid-cols-[1fr_1fr]">
        <AppLinks />
        <div id={adminMobileNavId} />
      </div>
    </Dialog.Panel>
  );
}

const Separator = () => (
  <div className="h-px bg-white-grey w-full col-span-3 mb-5" />
);
