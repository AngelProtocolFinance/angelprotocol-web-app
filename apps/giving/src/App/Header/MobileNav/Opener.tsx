import Icon from "@ap/components/icon";
import { useModalContext } from "@ap/contexts";
import { SCREEN_LG, useHandleScreenResize } from "@ap/hooks";
import Menu from "./Menu";

export function Opener({ classes = "" }: { classes?: string }) {
  const { showModal, closeModal, isModalOpen } = useModalContext();

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
      onClick={() => showModal(Menu, {})}
      className={`${classes} items-center text-white justify-center`}
    >
      <Icon type="Menu" size={24} />
    </button>
  );
}
