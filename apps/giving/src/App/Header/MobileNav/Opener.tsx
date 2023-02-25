import Icon from "@giving/components/Icon";
import { LogoProps } from "@giving/components/Logo";
import { Link } from "../../types";
import { useModalContext } from "contexts/ModalContext";
import useHandleScreenResize, { SCREEN_LG } from "hooks/useHandleScreenResize";
import Menu from "./Menu";

type Props = { classes: string; links: Link[]; logo: LogoProps };

export function Opener({ classes, links, logo }: Props) {
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
      onClick={() => showModal(Menu, { links, logo })}
      className={`${classes} items-center text-white justify-center`}
    >
      <Icon type="Menu" size={24} />
    </button>
  );
}
