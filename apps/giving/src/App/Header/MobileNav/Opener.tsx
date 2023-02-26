import Icon from "@giving/components/Icon";
import { useModalContext } from "@giving/contexts/modal-context";
import useHandleScreenResize, {
  SCREEN_LG,
} from "@giving/hooks/useHandleScreenResize";
import { Link } from "../../types";
import { LogoProps } from "@giving/types/components/logo";
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
