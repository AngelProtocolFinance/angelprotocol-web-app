import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import useHandleScreenResize, { SCREEN_LG } from "hooks/useHandleScreenResize";
import Menu from "./Menu";

export function Opener({ classes = "" }: { classes?: string }) {
  const { showModal, closeModal, isModalOpen } = useModalContext();

  const handleCloseModal = () => {
    closeModal();
  };

  const openMenu = () => {
    showModal(Menu, { onClose: handleCloseModal });
  };

  useHandleScreenResize(
    (screenSize) => {
      if (screenSize >= SCREEN_LG) {
        closeModal();
      }
    },
    50,
    {},
    { shouldAttachListener: isModalOpen }
  );

  return (
    <button
      onClick={openMenu}
      className={`${classes} items-center text-white justify-center`}
    >
      <Icon type="Menu" size={24} />
    </button>
  );
}
