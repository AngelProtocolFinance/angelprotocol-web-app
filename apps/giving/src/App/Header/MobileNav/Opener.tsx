import { LogoProps } from "@ap/components";
import Icon from "@ap/components/icon";
import { useModalContext } from "@ap/contexts";
import { SCREEN_LG, useHandleScreenResize } from "@ap/hooks";
import { Link } from "../../types";
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
