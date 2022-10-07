import { useCallback, useEffect, useState } from "react";
import { useModalContext } from "contexts/ModalContext";
import MenuModal from "./MenuModal";

export default function useMenuModal() {
  const { showModal, closeModal } = useModalContext();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCloseModal = useCallback(() => {
    closeModal();
    setModalOpen(false);
  }, [closeModal]);

  const openMenu = useCallback(() => {
    showModal(MenuModal, { onClose: handleCloseModal });
    setModalOpen(true);
  }, [showModal, handleCloseModal]);

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

  return openMenu;
}
