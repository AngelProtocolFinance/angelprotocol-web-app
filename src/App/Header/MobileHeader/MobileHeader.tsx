import { Dialog } from "@headlessui/react";
import { useModalContext } from "contexts/ModalContext";
import AppLinks from "./AppLinks";
import HeaderContent from "./HeaderContent";

export default function MobileHeader() {
  const { showModal, closeModal } = useModalContext();

  return (
    <header className="lg:hidden">
      <HeaderContent
        onMenuClick={() => showModal(Modal, { closeModal })}
        menuIconType="Menu"
      />
    </header>
  );
}

function Modal({ closeModal }: { closeModal: () => void }) {
  return (
    <Dialog.Panel
      as="header"
      className="fixed top-0 left-0 right-0 w-full z-10 bg-blue-accent flex flex-col"
    >
      <HeaderContent onMenuClick={closeModal} menuIconType="Close" />
      <div className="h-px bg-white-grey w-full col-span-3 mb-5" />
      <AppLinks />
    </Dialog.Panel>
  );
}
