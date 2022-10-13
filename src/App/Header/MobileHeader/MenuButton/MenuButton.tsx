import Icon from "components/Icon";
import useMenuModal from "./useMenuModal";

export default function MenuButton() {
  const openMenu = useMenuModal();

  return (
    <button
      onClick={openMenu}
      className="flex items-center text-white justify-center w-10 h-10"
    >
      <Icon type="Menu" className="text-2xl" />
    </button>
  );
}
