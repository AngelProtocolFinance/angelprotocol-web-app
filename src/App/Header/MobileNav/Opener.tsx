import { useEffect } from "react";
import useHandleScreenResize from "pages/Registration/Steps/useHandleScreenResize";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import Menu from "./Menu";

export function Opener({ classes = "" }: { classes?: string }) {
  const { showModal, closeModal, isModalOpen } = useModalContext();

  const handleCloseModal = () => {
    closeModal();
  };

  const openMenu = () => {
    showModal(Menu, { onClose: handleCloseModal });
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
    <button
      onClick={openMenu}
      className={`${classes} items-center text-white justify-center`}
    >
      <Icon type="Menu" size={24} />
    </button>
  );
}
