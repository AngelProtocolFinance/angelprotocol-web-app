import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useModalContext } from "contexts/ModalContext";
import AppLinks from "./AppLinks";
import Content from "./Content";
import { adminMobileNavId } from "./constants";

export default function MobileHeader() {
  const { showModal, closeModal } = useModalContext();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    closeModal();
    setModalOpen(false);
  };

  const handleOpenModal = () => {
    showModal(Modal, { onClose: handleCloseModal });
    setModalOpen(true);
  };

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    function handleCloseModal() {
      // 1024 === tailwind's large screen size (in px)
      // https://tailwindcss.com/docs/responsive-design
      if (window.innerWidth >= 1024) {
        closeModal();
      }
    }
    window.addEventListener("resize", handleCloseModal);

    return () => window.removeEventListener("resize", handleCloseModal);
  }, [isModalOpen, closeModal]);

  return (
    <header className="lg:hidden">
      <Content onMenuClick={handleOpenModal} menuIconType="Menu" />
    </header>
  );
}

function Modal({ onClose }: { onClose: () => void }) {
  return (
    <Dialog.Panel
      as="header"
      className="fixed top-0 left-0 right-0 w-full z-10 bg-blue-accent flex flex-col"
    >
      <Content onMenuClick={onClose} menuIconType="Close" />
      <div className="h-px bg-white-grey w-full col-span-3 mb-5" />
      <div className="grid grid-cols-[1fr_1fr]">
        <AppLinks />
        <div id={adminMobileNavId} />
      </div>
    </Dialog.Panel>
  );
}
