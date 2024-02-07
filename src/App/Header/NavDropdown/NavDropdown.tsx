import Icon from "components/Icon";
import { useModalContext } from "contexts/ModalContext";
import useHandleScreenResize, {
  SCREEN_WIDTH_BREAKPOINTS,
} from "hooks/useHandleScreenResize";
import { Link } from "../../types";
import Menu from "./Menu";

type Props = { links: Link[] };

export default function NavDropdown({ links }: Props) {
  const { showModal, closeModal, isModalOpen } = useModalContext();

  useHandleScreenResize(
    (screenSize) => {
      if (screenSize >= SCREEN_WIDTH_BREAKPOINTS.lg) {
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
      <Icon type="Menu" size={24} className="sm:hidden text-gray" />
      <Icon type="ArrowDown" size={24} className="max-sm:hidden text-blue-d7" />
    </button>
  );
}
