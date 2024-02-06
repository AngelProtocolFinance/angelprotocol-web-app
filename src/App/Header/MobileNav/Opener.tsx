import Icon from "components/Icon";
import { useModalContext } from "contexts/ModalContext";
import useHandleScreenResize, { SCREEN_LG } from "hooks/useHandleScreenResize";
import { Link } from "../../types";
import Menu from "./Menu";

type Props = { links: Link[] };

export function Opener({ links }: Props) {
  const { showModal, closeModal, isModalOpen } = useModalContext();

  useHandleScreenResize(
    (screenSize) => {
      if (screenSize >= SCREEN_LG) {
        closeModal();
      }
    },
    { shouldAttachListener: isModalOpen, debounceTime: 50 }
  );

  return (
    <button
      onClick={() => showModal(Menu, { links })}
      className="flex items-center justify-center"
    >
      <Icon type="Menu" size={24} className="md:hidden text-gray" />
      <Icon type="ArrowDown" size={24} className="max-md:hidden text-blue-d7" />
    </button>
  );
}
