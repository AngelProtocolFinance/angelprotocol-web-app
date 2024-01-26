import { Link } from "../../types";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import useHandleScreenResize, { SCREEN_LG } from "hooks/useHandleScreenResize";
import Menu from "./Menu";

type Props = { classes: string; links: Link[] };

export function Opener({ classes, links }: Props) {
  const { showModal, closeModal, isModalOpen } = useModalContext();

  useHandleScreenResize(
    (screenSize) => {
      if (screenSize >= SCREEN_LG) {
        closeModal();
      }
    },
    { shouldAttachListener: isModalOpen, debounceTime: 50 },
  );

  return (
    <button
      onClick={() => showModal(Menu, { links })}
      className={`${classes} items-center text-blue justify-center`}
    >
      <Icon type="Menu" size={24} />
    </button>
  );
}
